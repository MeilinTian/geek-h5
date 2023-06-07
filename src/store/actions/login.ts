import { Dispatch } from 'redux'
import store from '..'
import request from '../../utils/request'
import { setTokenInfo } from '../../utils/storage'
import { LoginAction } from '../reducers/login'
import { RootThunkAction } from '..'
import { Root } from 'react-dom/client'

const sendCode = (mobile: string): RootThunkAction => {
  return async (dispatch) => {
    // 发送请求
    await request({
      url: `/sms/codes/${mobile}`,
      method: 'get',
    })
  }
}

type Token = {
  token: string
  refresh_token: string
}

const saveToken = (payload: Token): LoginAction => {
  return {
    type: 'login/token',
    payload,
  }
}

/**
 * 登录功能
 * @param {*} data
 * @returns
 */
const login = (data: { mobile: string; code: string }): RootThunkAction => {
  return async (dispatch) => {
    const res = await request({
      url: `/authorizations`,
      method: 'post',
      data,
    })
    // 保存token到redux中
    dispatch(saveToken(res.data))
    // 保存到本地
    setTokenInfo(res.data)
  }
}

/**
 * 退出
 * @returns
 */
const logout = () => {
  // return (dispatch: Dispatch) => {
  //   // 移除本地的 token
  //   removeTokenInfo()
  //   // 移除 redux 中的 token
  //   dispatch({
  //     type: 'login/logout' as const,
  //   })
  // }
  return {
    type: 'login/logout' as const,
  }
}

export { sendCode, login, saveToken, logout }
