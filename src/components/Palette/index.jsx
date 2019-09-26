import React from 'react'
import PropTypes from 'prop-types'
import DraggableBlock from 'src/components/DraggableBlock'

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

const Palette = props => {
  const {
    rectProps,
    height,
    width,
    ...other
  } = props

  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...other}>
      <rect
        fill='red'
        height={height}
        name='palette'
        width={width}
        {...rectProps}
      />
      <DraggableBlock
        x={rectProps.x}
      />
    </svg>
  )
}

Palette.propTypes = propTypes
Palette.defaultProps = defaultProps

export default Palette
