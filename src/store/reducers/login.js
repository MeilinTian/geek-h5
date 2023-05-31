// const initValue = {
//   token: '',
//   refresh_token: '',
// }

import { getTokenInfo } from '../../utils/storage'

let initValue = getTokenInfo()

export default function reducer(state = initValue, action) {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload
  }
  if (type === 'login/logout') {
    return {}
  }
  // console.log(state)
  return state
}
