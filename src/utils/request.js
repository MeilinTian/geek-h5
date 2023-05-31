import axios from 'axios'
import history from './history'
import { Toast } from 'antd-mobile'
import { getTokenInfo, setTokenInfo } from './storage'
import store from '../store'
import { logout, saveToken } from '../store/actions/login'
// import { config } from 'antd-mobile/es/components/toast/methods'

const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  timeout: 50000,
  baseURL,
})

// 配置请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 对 config 做点什么
    // 获取 token
    const token = getTokenInfo().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      // console.log(token)
    }
    return config
  },
  (error) => {
    // 对错误做点什么
    return Promise.reject(error)
  }
)

// 配置响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应做点什么
    return response.data
  },
  async (err) => {
    // 如果因为网络原因，response 没有，给提示消息
    if (!err.response) {
      Toast.show({ icon: 'fail', content: '网络繁忙，请稍后重试' })
      return Promise.reject(err)
    }
    const { response, config } = err
    // 网路没有问题，后台返回了数据
    if (response.status !== 401) {
      // 不是 token 失效的问题
      Toast.show({ icon: 'fail', content: response.data.message })
      return Promise.reject(err)
    }
    // 网络没问题，而且是 401 token 失效的问题
    // 1. 判断有没有刷新 token
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      // 没有 token 跳转到登陆页
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(err)
    }
    // 2. 是401错误，且有刷新 token
    // 尝试发请求，获取新的 token，注意：刷新 token发送请求，不能使用封装的 instance
    try {
      const res = await axios({
        method: 'put',
        url: baseURL + 'authorizations',
        headers: {
          Authorization: 'Bearer ' + refresh_token,
        },
      })
      // 刷新成功，把新的 token 保存起来
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: refresh_token,
      }
      // 保存到redux和localStorage中
      store.dispatch(saveToken(tokenInfo))
      setTokenInfo(tokenInfo)
      // token 刷新成功后，重新把最开始失败的请求重新再发一次
      return instance(config)
    } catch {
      // 刷新 token 失败，刷新 token过期
      store.dispatch(logout())
      // 跳转到登录页
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      Toast.show({ icon: 'fail', content: '登录信息失效，请重新登录' })
      return Promise.reject(err)
    }
  }
)

export default instance
