import React from 'react'
import NavBar from '../../components/NavBar'
import Input from '../../components/Input'
import { sendCode, login } from '../../store/actions/login'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Toast } from 'antd-mobile'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import { useHistory } from 'react-router'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [time, setTime] = useState(0)
  const onExtraClick = async () => {
    if (time > 0) return
    // console.log('hahaha')
    // 先对手机号进行验证
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      })
      return
    }
    await dispatch(sendCode(mobile))
    // console.log('获取验证码成功')
    // 开启倒计时
    setTime(60)
    let timeId = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          clearInterval(timeId)
        }
        return time - 1
      })
    }, 1000)
    Toast.show({
      icon: 'success',
      content: '获取验证码成功',
    })
  }

  const formik = useFormik({
    initialValues: {
      mobile: '15652605977',
      code: '246810',
    },
    validationSchema: Yup.object().shape({
      mobile: Yup.string()
        .required('请输入手机号')
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字'),
    }),
    // 当表单提交的时候会触发
    async onSubmit(values) {
      dispatch(login(values))
      Toast.show({
        icon: 'success',
        content: '登录成功',
      })
      history.push('/home')
    },
  })

  // 注意⚠️ 对象解构的方法
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    isValid,
  } = formik

  return (
    <div className={styles.root}>
      {/* 导航条 */}
      <NavBar extra="右侧">登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                placeholder="请输入手机号"
                name="mobile"
                autoComplete="off"
                value={mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={11}
              ></Input>
            </div>
            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>

          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                placeholder="请输入验证码"
                extra={time === 0 ? '获取验证码' : time + 's后获取'}
                name="code"
                value={code}
                onChange={handleChange}
                autoComplete="off"
                onExtraClick={onExtraClick}
                onBlur={handleBlur}
                maxLength={6}
              ></Input>
            </div>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className={classNames('login-btn', { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
