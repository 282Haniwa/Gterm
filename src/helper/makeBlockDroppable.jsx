import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const makeBlockDroppable = Component => {
  const propTypes = {
    onBlockDrop: PropTypes.func,
    onBlockMove: PropTypes.func,
    onBlockOver: PropTypes.func
  }

  const DraggableBlock = props => {
    const { onBlockDrop, onBlockMove, onBlockOver, ...other } = props
    const dragBlock = useSelector(state => state.gui.dragBlock)

    const handleBlockDrop = event => {
      if (dragBlock.info.isDragged) {
        // console.log('handleBlockDrop', event)
        const rect = event.target.getBoundingClientRect()
        const mouseOffsetX = event.clientX - rect.left
        const mouseOffsetY = event.clientY - rect.top
        // 第二引数でドロップした場所を渡す
        if (onBlockDrop) {
          onBlockDrop(event, {
            rect: rect,
            mousePosition: {
              x: mouseOffsetX,
              y: mouseOffsetY
            }
          })
        }
      }
    }

    const handleBlockMove = event => {
      if (dragBlock.info.isDragged) {
        // console.log('handleBlockMove', event)
        const rect = event.target.getBoundingClientRect()
        const mouseOffsetX = event.clientX - rect.left
        const mouseOffsetY = event.clientY - rect.top
        // 第二引数で動いている場所を渡す
        if (onBlockMove) {
          onBlockMove(event, {
            rect: rect,
            mousePosition: {
              x: mouseOffsetX,
              y: mouseOffsetY
            }
          })
        }
      }
    }

    const handleBlockOver = event => {
      if (dragBlock.info.isDragged) {
        console.log('handleBlockOver', event)
        if (onBlockOver) {
          onBlockOver(event)
        }
      }
    }

    return (
      <Component
        onFocus={handleBlockOver}
        onMouseMove={handleBlockMove}
        onMouseOver={handleBlockOver}
        onMouseUp={handleBlockDrop}
        {...other}
      />
    )
  }

  DraggableBlock.propTypes = propTypes
  DraggableBlock.displayName = `Block-Droppable-${Component.displayName || Component.name}`

  return DraggableBlock
}

export default makeBlockDroppable
