import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const makeBlockDroppable = Component => {
  const propTypes = {
    onBlockDragEnter: PropTypes.func,
    onBlockDragExit: PropTypes.func,
    onBlockDragLeave: PropTypes.func,
    onBlockDragOver: PropTypes.func,
    onBlockDrop: PropTypes.func
  }

  const DraggableBlock = props => {
    const {
      onBlockDragEnter,
      onBlockDragExit,
      onBlockDragLeave,
      onBlockDragOver,
      onBlockDrop,
      ...other
    } = props
    const dragBlock = useSelector(state => state.gui.dragBlock)

    const handleBlockDragEnter = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (dragBlock.info.isDragged) {
          // console.log('handleBlockDragEnter', event)
          if (onBlockDragEnter) {
            onBlockDragEnter(event)
          }
        }
      },
      [dragBlock.info.isDragged, onBlockDragEnter]
    )

    const handleBlockDragExit = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (dragBlock.info.isDragged) {
          // console.log('handleBlockDragExit', event)
          if (onBlockDragExit) {
            onBlockDragExit(event)
          }
        }
      },
      [dragBlock.info.isDragged, onBlockDragExit]
    )

    const handleBlockDragLeave = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (dragBlock.info.isDragged) {
          // console.log('handleBlockDragLeave', event)
          if (onBlockDragLeave) {
            onBlockDragLeave(event)
          }
        }
      },
      [dragBlock.info.isDragged, onBlockDragLeave]
    )

    const handleBlockDragOver = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (dragBlock.info.isDragged) {
          // console.log('handleBlockOver', event)
          if (onBlockDragOver) {
            onBlockDragOver(event)
          }
        }
      },
      [dragBlock.info.isDragged, onBlockDragOver]
    )

    const handleBlockDrop = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (dragBlock.info.isDragged) {
          // console.log('handleBlockDrop', event)
          if (onBlockDrop) {
            onBlockDrop(event)
          }
        }
      },
      [dragBlock.info.isDragged, onBlockDrop]
    )

    return (
      <Component
        onDragEnter={handleBlockDragEnter}
        onDragExit={handleBlockDragExit}
        onDragLeave={handleBlockDragLeave}
        onDragOver={handleBlockDragOver}
        onDrop={handleBlockDrop}
        {...other}
      />
    )
  }

  DraggableBlock.propTypes = propTypes
  DraggableBlock.displayName = `Block-Droppable-${Component.displayName || Component.name}`

  return DraggableBlock
}

export default makeBlockDroppable
