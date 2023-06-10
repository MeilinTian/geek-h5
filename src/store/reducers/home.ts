// import {
//   SAVE_ALL_CHANNELS,
//   SAVE_ARTICLE_LIST,
//   SAVE_CHANNELS,
// } from '../action_types/home'

export type Channel = {
  id: number
  name: string
}

export type Article = {
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  comm_count: string
  pubdate: string
  cover: {
    type: string
    images: string[]
  }
}

type Articles = {
  [index: number]: {
    timestamp: string
    list: Article[]
  }
}

type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
  articles: Articles
}

export type ArticlePayload = {
  channelId: number
  timestamp: string
  list: Article[]
  loadMore: boolean
}

export type HomeAction =
  | {
      type: 'home/saveChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveAllChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveArticleList'
      payload: {
        channelId: number
        timestamp: string
        list: Article[]
        loadMore: boolean
      }
    }

let initValue: HomeType = {
  userChannels: [],
  allChannels: [],
  articles: {},
} as HomeType

export default function reducer(state = initValue, action: HomeAction) {
  // const { type, payload } = action
  if (action.type === 'home/saveChannels') {
    return {
      ...state,
      userChannels: action.payload,
    }
  }
  if (action.type === 'home/saveAllChannels') {
    return {
      ...state,
      allChannels: action.payload,
    }
  }
  if (action.type === 'home/saveArticleList') {
    const { list, timestamp, loadMore, channelId } = action.payload
    return {
      ...state,
      articles: {
        ...state.articles,
        [channelId]: {
          timestamp: timestamp,
          list: loadMore
            ? [...state.articles[action.payload.channelId].list, ...list]
            : list,
        },
      },
    }
  }
  return state
}
