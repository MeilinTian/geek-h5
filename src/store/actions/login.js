import request from '../../utils/request'
import { setTokenInfo } from '../../utils/storage'

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



export { sendCode, login, saveToken }
