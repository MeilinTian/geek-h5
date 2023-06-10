import { Article } from './home'

type SearchType = {
  suggestions: string[]
  histories: string[]
  results: Article[]
}

const initValue: SearchType = {
  // 存放推荐的结果
  suggestions: [],
  histories: [],
  results: [],
} as SearchType

export type SearchAction =
  | {
      type: 'search/saveSuggestions'
      payload: string[]
    }
  | {
      type: 'search/clearSuggestions'
    }
  | {
      type: 'search/saveHistories'
      payload: string[]
    }
  | {
      type: 'search/clearHistories'
    }
  | {
      type: 'search/saveResults'
      payload: Article[]
    }

export default function reducer(state = initValue, action: SearchAction) {
  if (action.type === 'search/saveSuggestions') {
    return {
      ...state,
      suggestions: action.payload,
    }
  }
  if (action.type === 'search/clearSuggestions') {
    return {
      ...state,
      suggestions: [],
    }
  }
  if (action.type === 'search/saveHistories') {
    return {
      ...state,
      histories: action.payload,
    }
  }
  if (action.type === 'search/clearHistories') {
    return {
      ...state,
      histories: [],
    }
  }
  if (action.type === 'search/saveResults') {
    return {
      ...state,
      results: [...state.results, ...action.payload],
    }
  }
  return state
}
