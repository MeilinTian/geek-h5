import request from '../../utils/request'
import { getLocalChannels, hasToken, setLocalChannels } from '../../utils/storage'
import { SAVE_ALL_CHANNELS, SAVE_CHANNELS } from '../action_types/home'

/**
 * 获取用户的频道
 * @returns 
 */
export const getUserChannels = () => {
  return async (dispatch) => {
    // 1. 判断用户是否登录
    if (hasToken()) {
      const res = await request.get('/user/channels')
      dispatch(saveUserChannels(res.data.channels))
    } else {
      // 2. 没有token，从本地获取频道数据
      const channels = getLocalChannels()
      if (channels) {
        // 没有 token，但本地有 channels 数据
        dispatch(saveUserChannels(channels))
      } else {
        // 没有 token，且本地没有 channels 数据
        const res = await request.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        // 保存到本地
        setLocalChannels(res.data.channels)
      }
    }
    
  }
}

/**
 * 保存用户频道到 redux 中
 * @param {*} payload 
 * @returns 
 */
export const saveUserChannels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload,
  }
}

/**
 * 获取所有频道
 * @returns 
 */
export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

/**
 * 保存所有频道
 * @param {*} payload 
 * @returns 
 */
export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  }
}


export const delChannel = (channel) => {
  // 如果用户登录，需要发送请求删除频道
  // 如果用户没登录，需要删除本地中的这个频道
  // 不管登录还是没有登录，都需要修改 redux 中的频道
  return async (dispatch, getState) => {
    // 之前的channels
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      // 发送请求
      await request.delete('/user/channels/' + channel.id)
      // 同步频道的数据到 redux 中
      dispatch(
        saveUserChannels(userChannels.filter((item) => item.id !== channel.id))
      )
    } else {
      // 没有登录
      // 修改本地，修改 redux
      const result = userChannels.filter((item) => item.id !== channel.id)
      dispatch(saveUserChannels(result))
      setLocalChannels(result)
    }
  }
}