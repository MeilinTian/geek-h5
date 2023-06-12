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
  comment: CommentType
}

export type Comment = {
  aut_id: string
  aut_name: string
  aut_photo: string
  com_id: string
  content: string
  is_followed: boolean
  is_liking: boolean
  like_count: number
  pubdate: string
  reply_count: number
}

export type CommentType = {
  end_id: string
  last_id: string
  total_count: number
  results: Comment[]
}

export type ArticleAction =
  | {
      type: 'article/saveDetail'
      payload: Detail
    }
  | {
      type: 'article/saveComment'
      payload: CommentType
    }
  | {
      type: 'article/saveMoreComment'
      payload: CommentType
    }

const initValue: ArticleType = {
  // 文章详情数据
  detail: {},
  comment: {},
} as ArticleType

export default function article(state = initValue, action: ArticleAction) {
  if (action.type === 'article/saveDetail') {
    return {
      ...state,
      detail: action.payload,
    }
  }
  if (action.type === 'article/saveComment') {
    return {
      ...state,
      comment: action.payload,
    }
  }
  if (action.type === 'article/saveMoreComment') {
    return {
      ...state,
      comment: {
        ...action.payload,
        results: [...state.comment.results, ...action.payload.results],
      }
    }
  }
  return state
}
