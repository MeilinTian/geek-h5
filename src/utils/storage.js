const TOKEN_KEY = 'geek-itcast'
const CHANNEL_KEY = 'geek-itcast-channels'

/**
 * 将 Token 信息存入缓存
 * @param {*} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 从本地缓存中获取 Token 信息
 * @returns
 */
export const getTokenInfo = () => {
  // console.log(JSON.parse(localStorage.getItem(TOKEN_KEY)) || {})
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 * @returns
 */
export const hasToken = () => {
  return !!getTokenInfo().token
}

/**
 * 保存频道数据到本地
 * @param {*} channels 
 */
export const setLocalChannels = (channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 获取本地的频道数据，如果没有数据，不要默认为空数组
 * @returns 
 */
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY))
}

/**
 * 删除本地地频道数据
 */
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}