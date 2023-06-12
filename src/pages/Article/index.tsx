import Icon from '../../components/Icon'
import NavBar from '../../components/NavBar'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getArticleDetail, getCommentList, getMoreCommentList } from '../../store/actions/article'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { InfiniteScroll } from 'antd-mobile'
import NoComment from './component/NoComment'
import CommentItem from './component/CommentItem'
import dayjs from 'dayjs'
// import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
// import throttle from 'lodash/throttle'

const Article = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const dispatch: any = useDispatch()
  // send request and get all details
  useEffect(() => {
    dispatch(getArticleDetail(id))
  }, [dispatch, id])
  const details = useSelector((state: RootState) => state.article.detail)
  // send request and get comments
  useEffect(() => {
    dispatch(getCommentList(id))
  }, [dispatch, id])
  const comment = useSelector((state: RootState) => state.article.comment)
  // InfiniteScroll - comment
  const hasMore = comment.last_id !== comment.end_id
  const loadMore = async () => {
    dispatch(getMoreCommentList(id, comment.last_id))
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          onLeftClick={() => history.go(-1)}
          extra={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          文章详情
        </NavBar>
        <div className="wrapper">
          <div className="article-wrapper">
            {/* 文章描述信息栏 */}
            <div className="header">
              <h1 className="title">{details.title}</h1>
              <div className="info">
                <span>{dayjs(details.pubdate).format('YYYY-MM-DD')}</span>
                <span>{details.read_count} 阅读</span>
                <span>{details.comm_count} 评论</span>
              </div>
              <div className="author">
                <img src={details.aut_photo} alt="" />
                <span className="name">{details.aut_name}</span>
                <span
                  className={classnames('follow', {
                    followed: details.is_followed,
                  })}
                >
                  {details.is_followed ? '已关注' : '关注'}
                </span>
              </div>
            </div>
            {/* 文章正文内容区域 */}
            <div className="content">
              <div
                className="content-html dg-html"
                dangerouslySetInnerHTML={{
                  __html: details.content,
                }}
              ></div>
              <div className="date">
                发布文章时间：{dayjs(details.pubdate).format('YYYY-MM-DD')}
              </div>
            </div>
          </div>
          <div className="comment">
            {/* 评论总览信息 */}
            <div className="comment-header">
              <span>全部评论 ({details.comm_count})</span>
              <span>{details.like_count}点赞</span>
            </div>
            {/* 评论列表 */}
            {details.comm_count === 0 ? (
              <NoComment></NoComment>
            ) : (
              comment.results?.map((item) => (
                <CommentItem key={item.com_id} comment={item}></CommentItem>
              ))
            )}
            <InfiniteScroll
              hasMore={hasMore}
              loadMore={loadMore}
            ></InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
