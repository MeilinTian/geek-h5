import React from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import Icon from '../../../../components/Icon'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useHistory } from 'react-router'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type Props = {
  article: {
    aut_name: string
    comm_count: number | string
    pubdate: string
    title: string
    cover: {
      type: string | number
      images: string[]
    }
    art_id: string
  }
}

export default function ArticleItem({ article }: Props) {
  const { aut_name, comm_count, pubdate, title, cover, art_id } = article
  const { type } = cover
  const images = [] && cover.images
  const time = dayjs().from(dayjs(pubdate))
  const history = useHistory()
  return (
    <div
      className={styles.root}
      onClick={() => history.push('/article/' + art_id)}
    >
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{time}</span>

        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}
