const TOKEN_KEY = 'geek-itcast'

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
