// import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router'
import Icon from '../Icon'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ReactElement } from 'react'

type Props = {
  children?: string | ReactElement
  extra?: string | ReactElement
  className?: string
  onLeftClick?: () => void
}

// history match location: 能拿到的前提条件 ❗️ 这个组件必须是通过路由配置的
// 方法一：withRouter的使用
// 方法二：路由提供了几个和路由相关的 hook
// useHistory, useLoacation, useParams
function NavBar({ className, children, extra, onLeftClick }: Props) {
  const history = useHistory()
  const back = () => {
    // 返回上一页
    if (onLeftClick) {
      onLeftClick()
    } else {
      history.go(-1)
    }
    // console.log(history)
    
  }
  return (
    <div className={classNames(styles.root, className)}>
      {/* 顶部工具栏 */}
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{ children }</div>
      {/* 右侧内容 */}
      <div className="right">{ extra }</div>
    </div>
  )
}

// export default withRouter(NavBar)
export default NavBar