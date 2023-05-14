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
  console.log(state)
  return state
}
