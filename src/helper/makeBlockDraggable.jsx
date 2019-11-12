import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlockInfo } from 'src/actions/gui'
import PropTypes from 'prop-types'

const makeBlockDraggable = Component => {
  const propTypes = {
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func
  }

  const DraggableBlock = props => {
    const { onDragEnd, onDragStart, ...other } = props
    const commandTrackingBlockRef = useSelector(state => state.gui.dragBlock.ref.command)
    const dispatch = useDispatch()
    const handleDragStart = useCallback(
      event => {
        console.log('handleDragStart', event)
        const rect = event.target.getBoundingClientRect()
        const mouseOffsetX = event.clientX - rect.left
        const mouseOffsetY = event.clientY - rect.top
        dispatch(
          setBlockInfo({
            isDragged: true
          })
        )
        if (commandTrackingBlockRef) {
          event.dataTransfer.setDragImage(
            commandTrackingBlockRef.current,
            mouseOffsetX,
            mouseOffsetY
          )
        }
        if (onDragStart) {
          onDragStart(event)
        }
      },
      [dispatch, onDragStart, commandTrackingBlockRef]
    )

    const handleDragEnd = useCallback(
      event => {
        console.log('handleDragEnd', event)
        dispatch(
          setBlockInfo({
            isDragged: false
          })
        )
        if (onDragEnd) {
          onDragEnd(event)
        }
      },
      [dispatch, onDragEnd]
    )

    return (
      <Component draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart} {...other} />
    )
  }

  DraggableBlock.propTypes = propTypes
  DraggableBlock.displayName = `Draggable-Block-${Component.displayName || Component.name}`

  return DraggableBlock
}

export default makeBlockDraggable
