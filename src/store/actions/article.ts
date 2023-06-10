import request from '../../utils/request'
import { RootThunkAction } from ".."

export function getArticleDetail (id: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get('/articles/' + id)
    dispatch({
      type: 'article/saveDetail' as const,
      payload: res.data
    })
  } 
}