import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function Input({ className, extra, onExtraClick, ...rest }) {
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
