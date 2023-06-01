import { SAVE_ALL_CHANNELS, SAVE_CHANNELS } from "../action_types/home"

let initValue = {
  userChannels: [],
  allChannels: [],
}

export default function reducer (state = initValue, action) {
  const { type, payload } = action
  if (type === SAVE_CHANNELS) {
    return {
      ...state,
      userChannels: payload,
    }
  }
  if (type === SAVE_ALL_CHANNELS) {
    return {
      ...state,
      allChannels: payload,
    }
  }
  return state
}