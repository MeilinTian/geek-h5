import { SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST, SAVE_CHANNELS } from "../action_types/home"

let initValue = {
  userChannels: [],
  allChannels: [],
  articles: {},
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
  if (type === SAVE_ARTICLE_LIST) {
    const {list, timestamp, loadMore, channelId}  = payload
    return {
      ...state,
      articles: {
        ...state.articles,
        [channelId]: {
          timestamp: timestamp,
          list: loadMore ? [...state.articles[channelId].list, ...list] : list,
        }
      }
    }
  }
  return state
}