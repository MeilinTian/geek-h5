import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './index.module.scss'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number
  className?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({ maxLength, className, ...rest }: Props) {
  const [value, setValue] = useState(rest.value || '')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    rest.onChange && rest.onChange(e)
  }
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
        className={classNames('textarea', className)}
        maxLength={maxLength}
        {...rest}
        value={value}
        onChange={onChange}
      ></textarea>
      {/* 当前字数/最大允许字数 */}
      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  )
}
