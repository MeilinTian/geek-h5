import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

type Props = {
  type: string
  className?: string
  onClick?: () => void
}
const Icon = ({ type, className, ...rest }: Props) => {
  return (
    <svg className={classNames('icon', className)} {...rest} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Icon
