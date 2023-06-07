import { useDispatch, useSelector } from 'react-redux'
import Icon from '../../../../components/Icon'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useState } from 'react'
import { addChannel, delChannel } from '../../../../store/actions/home'
import { Toast } from 'antd-mobile'
import { RootState } from '@/store'
import { Channel } from '@/store/reducers/home'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */

type Props = {
  index: number 
  onClose: () => void 
  onChange: (i: number) => void
}
const Channels = ({ index, onClose, onChange }: Props) => {
  // console.log(index)
  // 用户频道渲染
  const userChannels = useSelector((state: RootState) => state.home.userChannels)
  // 推荐频道渲染
  const recommendChannels = useSelector((state: RootState) => {
    const { userChannels, allChannels } = state.home
    return allChannels.filter((item: any) => {
      // 如果这个频道在userChannels中，就不要这个频道
      if (userChannels.findIndex((v: any) => v.id === item.id) === -1) {
        return true
      } else {
        return false
      }
    })
  })

  // 切换频道
  const changeChannel = (i: number) => {
    // 如果是编辑状态，不允许跳转
    if (editing) return
    onChange(i)
    onClose()
  }

  // 编辑按钮切换事件
  const [editing, setEditing] = useState(false)

  // 删除频道
  const dispatch: any = useDispatch()
  const del = (channel: any, i: number) => {
    if (userChannels.length <= 4) {
      Toast.show({ icon: 'fail', content: '至少保留4个频道' })
      return
    }
    dispatch(delChannel(channel))
    // 高亮处理
    // 1. 如果删除的 i 和 index 相等，默认让推荐 0 高亮
    // 2. 如果删除的 i 小于 index，默认让 i - 1 高亮
    // 3. 如果删除的 i 大于 index，不用处理
    if (i < index) {
      onChange(i - 1)
    } else if (i === index) {
      onChange(0)
    } else {
      onChange(i)
    }
  }

  // 添加频道
  const add = async (channel: Channel) => {
    await dispatch(addChannel(channel))
    Toast.show({ icon: 'success', content: '添加成功' })
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div
          className={classnames('channel-item', {
            edit: editing,
          })}
        >
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {editing ? '点击删除频道' : '点击进入频道'}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setEditing(!editing)
              }}
            >
              {editing ? '完成' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => (
              <span
                className={classnames('channel-list-item', {
                  selected: index === i,
                })}
                key={item.id}
                onClick={() => changeChannel(i)}
              >
                {item.name}
                {/* 推荐不允许删除 */}
                {item.id !== 0 && (
                  <Icon type="iconbtn_tag_close" onClick={() => del(item, i)} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannels.map((item) => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => add(item)}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
