import request from '../../utils/request'
import { removeTokenInfo, setTokenInfo } from '../../utils/storage'

const sendCode = (mobile) => {
  return async (dispatch) => {
    // 发送请求
    await request({
      url: `/sms/codes/${mobile}`,
      method: 'get',
    })
  }
}

const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload
  }
}

/**
 * 登录功能
 * @param {*} data 
 * @returns 
 */
const login = (data) => {
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
  return dispatch => {
    // 移除本地的 token
    removeTokenInfo()
    // 移除 redux 中的 token
    dispatch({
      type: 'login/logout',
    })
  }
}





export { sendCode, login, saveToken, logout }
