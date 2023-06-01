import request from '../../utils/request'
import { getLocalChannels, hasToken, setLocalChannels } from '../../utils/storage'
import { SAVE_CHANNELS } from '../action_types/home'

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