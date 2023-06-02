import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '../../../../store/actions/home'

export default function ArticleList({ channelId, activeId }) {
  // 是否有更多数据
  const [hasMore, setHasMore] = useState(true)
  // 代表是否正在加载数据
  const [loading, setLoading] = useState(false)
  const loadMore = async () => {
    if (loading) { return }
    setLoading(true)
    if (!current.timestamp) {
      setHasMore(false)
      return
    }
    try {
      await dispatch(getArticleList(channelId, current.timestamp, true))
    } finally {
      setLoading(false)
    }
  }
  const dispatch = useDispatch()
  const current = useSelector((state) => state.home.articles[channelId])
  useEffect(() => {
    // 如果该频道有文章数据，没必要一进来就发送请求
    if (current) return
    if (channelId === activeId) {
      dispatch(getArticleList(channelId, Date.now()))
    }
  }, [channelId, activeId, dispatch, current])

  // 如果不是当前频道，没有文章数据可以先不渲染
  if (!current) {
    return null
  }
  const list = current.list
  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh onRefresh={async () => {
          setHasMore(true)
          await dispatch(getArticleList(channelId, Date.now()))
        }}>
          {list.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem article={item}></ArticleItem>
            </div>
          ))}
        </PullToRefresh>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
      </div>
    </div>
  )
}
