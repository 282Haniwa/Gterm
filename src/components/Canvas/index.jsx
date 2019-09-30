import React from 'react'
import PropTypes from 'prop-types'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'

const propTypes = {
  height: PropTypes.string,
  rectProps: PropTypes.object,
  width: PropTypes.string
}

const defaultProps = {
  height: '100%',
  rectProps: {},
  width: '100%'
}

const Canvas = props => {
  const { rectProps, height, width, ...other } = props

  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...other}>
      <rect fill='#fafafa' height={height} name='canvas' width={width} {...rectProps} />
    </svg>
  )
}

Canvas.propTypes = propTypes
Canvas.defaultProps = defaultProps

export default makeBlockDroppable(Canvas)
