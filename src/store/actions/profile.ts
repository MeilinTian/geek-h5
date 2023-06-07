import request from '../../utils/request'
// import { SAVE_PROFILE, SAVE_USER } from '../action_types/profile'
import { User, Profile, ProfileAction } from '../reducers/profile'
import { Dispatch } from 'redux'
import { RootState, RootThunkAction } from '..'

/**
 * 保存用户信息
 * @param {*} payload
 * @returns
 */
export const saveUser = (payload: User): ProfileAction => {
  return {
    type: 'profile/user',
    payload: payload,
  }
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/user')
    dispatch(saveUser(res.data))
  }
}

export const saveProfile = (payload: Profile): ProfileAction => {
  return {
    type: 'profile/profile',
    payload: payload,
  }
}

export const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(saveProfile(res.data))
    // console.log(res)
  }
}

type PartialProfile = Partial<Profile>

// 修改用户的信息
export const updateProfile = (data: PartialProfile): RootThunkAction => {
  return async (dispatch) => {
    await request.patch('/user/profile', data)
    // console.log(res)
    dispatch(getProfile())
  }
}

export const updatePhoto = (fd: FormData): RootThunkAction => {
  return async (dispatch) => {
    await request.patch('/user/photo', fd)
    dispatch(getProfile())
  }
}
