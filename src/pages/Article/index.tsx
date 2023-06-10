import Icon from '../../components/Icon'
import NavBar from '../../components/NavBar'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getArticleDetail } from '../../store/actions/article'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import dayjs from 'dayjs'

const Article = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(getArticleDetail(id))
  }, [dispatch, id])
  const details = useSelector((state: RootState) => state.article.detail)
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
              <div className="content-html dg-html" dangerouslySetInnerHTML={{
                __html: details.content
              }}></div>
              <div className="date">发布文章时间：{dayjs(details.pubdate).format('YYYY-MM-DD')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
