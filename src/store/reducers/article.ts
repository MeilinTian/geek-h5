type Detail = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  content: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  is_collected: boolean
  attitude: number
  comm_count: number
  read_count: number
  like_count: number
}

export type ArticleType = {
  detail: Detail
}

export type ArticleAction = {
  type: 'article/saveDetail'
  payload: Detail
}

const initValue: ArticleType = {
  // 文章详情数据
  detail: {},
} as ArticleType

export default function article(state = initValue, action: ArticleAction) {
  if (action.type === 'article/saveDetail') {
    return {
      ...state,
      detail: action.payload,
    }
  }
  return state
}
