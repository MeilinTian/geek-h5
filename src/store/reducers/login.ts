// const initValue = {
//   token: '',
//   refresh_token: '',
// }

import { getTokenInfo } from '../../utils/storage'

let initValue: Token = getTokenInfo()

type Token = {
  token: string
  refresh_token: string
}

export type LoginAction =
  | {
      type: 'login/token'
      payload: Token
    }
  | {
      type: 'login/logout'
      payload: null
    }

export default function reducer(state = initValue, action: LoginAction) {
  // const { type, payload } = action
  if (action.type === 'login/token') {
    return action.payload
  }
  if (action.type === 'login/logout') {
    return {}
  }
  // console.log(state)
  return state
}
