import { SAVE_CHANNELS } from "../action_types/home"

let initValue = {
  userChannels: []
}

export default function reducer (state = initValue, action) {
  const { type, payload } = action
  if (type === SAVE_CHANNELS) {
    return {
      ...state,
      userChannels: payload,
    }
  }
  return state
}