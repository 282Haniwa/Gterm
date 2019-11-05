import React from 'react'
import PropTypes from 'prop-types'
import DraggableBlock from 'src/components/DraggableBlock'

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

const Palette = props => {
  const { rectProps, height, width, ...other } = props

  return (
    <div
      style={{
        height: height,
        width: width
      }}
    >
      <svg height={height} width={width} xmlns='http://www.w3.org/2000/svg' {...other}>
        <rect fill='red' height={height} name='palette' width={width} {...rectProps} />
        <DraggableBlock x={rectProps.x} />
      </svg>
    </div>
  )
}

Palette.propTypes = propTypes
Palette.defaultProps = defaultProps

export default Palette
