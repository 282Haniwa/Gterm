import React, { forwardRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setBlockInfo } from 'src/actions/gui'
import PropTypes from 'prop-types'

const makeBlockDraggable = Component => {
  const propTypes = {
    data: PropTypes.object,
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func
  }

  const defaultProps = {
    data: {}
  }

  const DraggableBlock = forwardRef((props, ref) => {
    const { data, onDragEnd, onDragStart, ...other } = props
    const dispatch = useDispatch()
    const handleDragStart = useCallback(
      event => {
        console.log('handleDragStart', { ...event })
        dispatch(
          setBlockInfo({
            isDragged: true,
            data: data
          })
        )
        if (onDragStart) {
          onDragStart(event)
        }
      },
      [dispatch, data, onDragStart]
    )

    const handleDragEnd = useCallback(
      event => {
        console.log('handleDragEnd', { ...event })
        dispatch(
          setBlockInfo({
            isDragged: false,
            data: null
          })
        )
        if (onDragEnd) {
          onDragEnd(event)
        }
      },
      [dispatch, onDragEnd]
    )

    return (
      <Component
        draggable
        data={data}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        ref={ref}
        {...other}
      />
    )
  })

  DraggableBlock.propTypes = propTypes
  DraggableBlock.defaultProps = defaultProps
  DraggableBlock.displayName = `Draggable-Block-${Component.displayName || Component.name}`

  return DraggableBlock
}

export default makeBlockDraggable
