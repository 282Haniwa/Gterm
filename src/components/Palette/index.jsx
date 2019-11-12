import React from 'react'
import PropTypes from 'prop-types'
import DraggableBlock from 'src/components/DraggableBlock'

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}

const defaultProps = {
  height: '100%',
  width: '100%'
}

const Palette = props => {
  const { height, width, ...other } = props

  return (
    <div
      style={{
        height: height,
        width: width
      }}
      {...other}
    >
      <DraggableBlock />
    </div>
  )
}

Palette.propTypes = propTypes
Palette.defaultProps = defaultProps

export default Palette
