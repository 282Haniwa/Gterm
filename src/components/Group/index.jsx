import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  height: PropTypes.number,
  rectProps: PropTypes.object,
  width: PropTypes.number
}

const defaultProps = {
  height: '100%',
  rectProps: {},
  width: '100%'
}

const Group = props => {
  const { rectProps, height, width, ...other } = props

  return (
    <div
      style={{
        height: height,
        width: width
      }}
    >
      <svg height={height} width={width} xmlns='http://www.w3.org/2000/svg' {...other}>
        <rect fill='blue' height={height} name='group' width={width} {...rectProps} />
      </svg>
    </div>
  )
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
