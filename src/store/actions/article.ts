import request from '../../utils/request'
import { RootThunkAction } from ".."
import { string } from 'yup'

export function getArticleDetail (id: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get('/articles/' + id)
    dispatch({
      type: 'article/saveDetail' as const,
      payload: res.data
    })
  } 
}

export function getCommentList (id: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get('/comments', {
      params: {
        type: 'a',
        source: id,
      },
    })
    dispatch({
      type: 'article/saveComment' as const,
      payload: res.data,
    })
  }
}

export function getMoreCommentList (id: string, offset: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get('/comments', {
      params: {
        type: 'a',
        source: id,
        offset
      },
    })
    dispatch({
      type: 'article/saveMoreComment' as const,
      payload: res.data,
    })
  }
}