import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  getProfile,
  updatePhoto,
  updateProfile,
} from '../../../store/actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import NavBar from '../../../components/NavBar'
import { List, DatePicker, Toast, Modal } from 'antd-mobile'
import { Drawer } from 'antd-mobile-v2'
import dayjs from 'dayjs'
import classNames from 'classnames'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import { useHistory } from 'react-router'
import { logout } from '../../../store/actions/login'

const { Item } = List

export default function ProfileEdit() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  // 获取 redux 中的 profile 数据
  const history = useHistory()
  const profile = useSelector((state) => state.profile.profile)
  // console.log(profile)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState({
    visible: false,
    type: '',
  })
  const [file, setFile] = useState(false)
  // 控制列表抽屉的显示喝隐藏
  const [listOpen, setListOpen] = useState({
    visible: false,
    // photo | gender
    type: '',
  })
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {
          console.log('拍照')
        },
      },
      {
        title: '本地选择',
        onClick: () => {
          console.log('本地选择')
          setFile(true)
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          // console.log('男')
          onCommit('gender', 0)
          onClose()
        },
      },
      {
        title: '女',
        onClick: () => {
          // console.log('女')
          onCommit('gender', 1)
          onClose()
        },
      },
    ],
  }
  const onClose = () => {
    setOpen({
      visible: false,
      type: '',
    })
    setListOpen({
      visible: false,
      type: '',
    })
  }
  const onCommit = async (type, value) => {
    // console.log(type, value)
    await dispatch(
      updateProfile({
        [type]: value,
      })
    )
    Toast.show({
      icon: 'success',
      content: '修改成功',
    })
    onClose()
  }
  // 上传头像绑定事件
  const onFileChange = async (e) => {
    // console.log(e.target.files)
    const file = e.target.files[0]
    // 把文件上传到服务器
    const fd = new FormData()
    fd.append('photo', file)
    await dispatch(updatePhoto(fd))
    Toast.show({
      icon: 'success',
      content: '修改头像成功',
    })
    onClose()
    setFile(false)
  }
  // 生日修改onConfirm事件绑定函数
  const onBirthChange = (e) => {
    onCommit('birthday', dayjs(e).format('YYYY-MM-DD'))
  }
  // DataPicker新建now时间
  const now = new Date()

  // 退出登录事件
  const logoutFn = async () => {
    // 1. 显示弹窗
    const result = await Modal.confirm({
      content: '确定退出登录吗？'
    })
    if (result) {
      dispatch(logout())
      // console.log(1)
      // 跳转登录页
      history.push('/login')
      Toast.show({
        icon: 'success',
        content: '退出登录',
      })
    } else {
      Toast.show({ content: '取消', position: 'bottom' })
    }
    // 2. 删除 token (redux | localStorage)
    // 3. 跳转到登录页
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部的导航栏 */}
        <NavBar>个人信息 </NavBar>
        <div className="wrapper">
          <List className="profile-list">
            <Item
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: 'photo',
                })
              }}
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
            >
              头像
            </Item>
            <Item
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'name',
                })
              }}
              extra={profile.name}
            >
              昵称
            </Item>
            <Item
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'intro',
                })
              }}
              extra={
                <span
                  className={classNames('intro', profile.intro ? 'normal' : '')}
                >
                  {profile.intro || '未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: 'gender',
                })
              }}
              extra={profile.gender === 0 ? '男' : '女'}
            >
              性别
            </Item>
            <Item
              onClick={() => {
                setVisible(true)
              }}
              extra={
                <DatePicker
                  title="时间选择"
                  visible={visible}
                  value={new Date(profile.birthday)}
                  onConfirm={onBirthChange}
                  onClose={() => {
                    setVisible(false)
                  }}
                  max={now}
                  min={new Date(1900, 1, 1, 0, 0, 0)}
                  // onConfirm={val => {
                  //   Toast.show(val.toDateString())
                  // }}
                >
                  {(value) =>
                    value ? dayjs(value).format('YYYY-MM-DD') : '请选择'
                  }
                </DatePicker>
              }
            >
              生日
            </Item>
          </List>
          {file && <input onChange={onFileChange} type="file" />}
        </div>
        <div className="logout">
          <button className="btn" onClick={logoutFn}>退出登录</button>
        </div>
      </div>

      {/* 抽屉 */}
      <Drawer
        position="right"
        className="drawer"
        open={open.visible}
        sidebar={
          open.visible && (
            <div
              style={{
                minHeight: document.documentElement.clientHeight,
                backgroundColor: '#fff',
                width: '100%',
              }}
            >
              <EditInput
                onClose={onClose}
                type={open.type}
                onCommit={onCommit}
              ></EditInput>
            </div>
          )
        }
      >
        {''}
      </Drawer>

      {/* 列表的抽屉组件 */}
      <Drawer
        className="drawer-list"
        position="bottom"
        // open={listOpen.visible}
        // onOpenChange={onClose}
        sidebar={
          listOpen.visible && (
            <EditList
              config={config}
              onClose={onClose}
              type={listOpen.type}
            ></EditList>
          )
        }
      >
        {''}
      </Drawer>
    </div>
  )
}
