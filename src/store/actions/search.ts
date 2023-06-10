import { removeLocalHistories, setLocalHistories } from '../../utils/storage'
import { RootThunkAction } from '..'
import request from '../../utils/request'
import { Article } from '../reducers/home'
import { SearchAction } from '../reducers/search'

/**
 * 获取推荐列表
 * @param keyword
 */

export function getSuggestionList(keyword: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request({
      url: '/suggestion',
      method: 'get',
      params: {
        q: keyword,
      },
    })
    let options = res.data.options
    if (!options[0]) {
      options = []
    }
    dispatch({
      type: 'search/saveSuggestions' as const,
      payload: options,
    })
  }
}

/**
 * 清空推荐记录
 */
export function clearSuggestions(): SearchAction {
  return {
    type: 'search/clearSuggestions',
  }
}

export function addSearchList(keyword: string): RootThunkAction {
  return async (dispatch, getState) => {
    // 获取到原来的history
    let histories = getState().search.histories
    // 1) 不允许有重复的历史记录，先删除原来历史记录中的 keyword
    histories = histories.filter((item) => item !== keyword)
    // 添加keyword
    histories = [keyword, ...histories]
    if (histories.length > 10) {
      histories = histories.slice(0, 10)
    }
    // 保存
    dispatch({
      type: 'search/saveHistories' as const,
      payload: histories,
    })
    // 保存到本地
    setLocalHistories(histories)
  }
}

/**
 * 清除历史记录
 */
export function clearHistories(): RootThunkAction {
  return async (dispatch) => {
    // 清空本地历史记录
    removeLocalHistories()
    // 清空reudx
    dispatch({
      type: 'search/clearHistories' as const,
    })
  }
}

/**
 * 获取搜索结果
 * @param keyword
 * @param page
 * @returns
 */
export function getSearchResults(
  keyword: string,
  page: number
): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get('search', {
      params: {
        q: keyword,
        page,
        per_page: 10,
      },
    })
    dispatch({
      type: 'search/saveResults' as const,
      payload: res.data.results,
    })
  }
}
