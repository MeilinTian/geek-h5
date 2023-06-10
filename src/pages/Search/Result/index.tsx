import ArticleItem from '../../Home/components/ArticleItem'
import NavBar from '../../../components/NavBar'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import { useState } from 'react'
import { getSearchResults } from '../../../store/actions/search'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { InfiniteScroll } from 'antd-mobile'

let page = 1
const SearchResult = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch: any = useDispatch()
  // 获取查询字符串
  const search = new URLSearchParams(location.search)
  const key = search.get('key')!
  // useEffect(() => {
  //   dispatch(getSearchResults(key, 1))
  // }, [dispatch, key])
  // 获取搜索结果
  const results = useSelector((state: RootState) => state.search.results)
  // 触底，显示更多
  const [hasMore, setHasMore] = useState(true) // 是否有更多数据
  const [loading, setLoading] = useState(false) // 加载状态
  const loadMore = async () => {
    // 加载更多数据
    if (loading) return
    setLoading(true)
    try {
      await dispatch(getSearchResults(key, page))
      page = page + 1
    } finally {
      setLoading(false)
    }
    if (page > 5) {
      setHasMore(false)
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="navBar" onLeftClick={() => history.go(-1)}>
        搜索结果
      </NavBar>

      <div className="article-list">
        {results.map((item, index) => (
          <ArticleItem key={index} article={item}></ArticleItem>
        ))}
      </div>

      {/* 无限加载 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default SearchResult
