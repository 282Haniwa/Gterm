import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}

const defaultProps = {
  height: '100%',
  width: '100%'
}

const Group = props => {
  const { height, width, ...other } = props

  return (
    <div
      style={{
        height: height,
        width: width
      }}
      {...other}
    />
  )
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
