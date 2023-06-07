// import React, { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string 
  extra?: string
  onExtraClick?: () => void 
  type?: 'text' | 'password'
}

export default function Input({ className, extra, onExtraClick, ...rest }: Props) {
  return (
    <div className={styles.root}>
      <input className={classNames(className, 'input')} {...rest} />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  )
}
