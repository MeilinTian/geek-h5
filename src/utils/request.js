import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo } from './storage'
// import { config } from 'antd-mobile/es/components/toast/methods'

const instance = axios.create({
  timeout: 50000,
  baseURL: 'http://geek.itheima.net/v1_0/',
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
  (err) => {
    if (err.response) {
      Toast.show({
        icon: 'fail',
        content: err.response.data.message,
      })
    } else {
      Toast.show({
        icon: 'fail',
        content: '服务器繁忙，请稍后再试',
      })
    }
    return Promise.reject(err)
  }
)

export default instance
