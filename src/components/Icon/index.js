import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
const Icon = ({ type, className, ...rest }) => {
  return (
    <svg
      className={classNames('icon', className)}
      {...rest}
      aria-hidden="true"
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon