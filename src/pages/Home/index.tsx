import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import Tabs from '../../components/Tabs'
import Icon from '../../components/Icon'
import ArticleList from './components/ArticleList'
import { Drawer } from 'antd-mobile-v2'
import { getAllChannels, getUserChannels } from '../../store/actions/home'
import Channels from './components/Channels'
import { RootState } from '@/store'
import { useHistory } from 'react-router'

export default function Home() {
  // 渲染频道列表
  const dispatch: any = useDispatch()
  const history = useHistory()
  useEffect(() => {
    // 获取用户频道
    dispatch(getUserChannels())
    // 获取所有频道
    dispatch(getAllChannels())
  }, [dispatch])
  const tabs = useSelector((state: RootState) => state.home.userChannels)

  // 控制高亮
  const [active, setActive] = useState(0)

  // 控制 drawer 组件
  const [open, setOpen] = useState(false)
  // 关闭 drawer
  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.root}>
      {/* 顶部切换栏 */}
      <Tabs
        tabs={tabs}
        index={active}
        onChange={(e: number) => {
          setActive(e)
        }}
      >
        {tabs.map((item) => (
          <ArticleList
            key={item.id}
            channelId={item.id}
            activeId={tabs[active].id}
          />
        ))}
      </Tabs>
      {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)} />
      </div>
      {/* 频道组件管理 */}
      <Drawer
        position="left"
        // children={''}
        open={true}
        sidebar={
          open && (
            <Channels
              onClose={onClose}
              index={active}
              onChange={(e) => setActive(e)}
            ></Channels>
          )
        }
        className="my-drawer"
        style={{ height: document.documentElement.clientHeight }}
      ></Drawer>
    </div>
  )
}
