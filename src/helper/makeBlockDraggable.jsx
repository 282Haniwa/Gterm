import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { blockMoveTo, setBlockInfo } from 'src/actions/gui'
import PropTypes from 'prop-types'

const makeBlockDraggable = Component => {
  const propTypes = {
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func
  }

  const DraggableBlock = props => {
    const { onDragEnd, onDragStart, ...other } = props

    const dispatch = useDispatch()
    const handleDragStart = useCallback(
      event => {
        console.log('handleDragStart', event.nativeEvent)
        const rect = event.target.getBoundingClientRect()
        const mouseOffsetX = event.clientX - rect.left
        const mouseOffsetY = event.clientY - rect.top
        dispatch(
          setBlockInfo({
            isDragged: true,
            display: true,
            offsetX: mouseOffsetX,
            offsetY: mouseOffsetY
          })
        )
        dispatch(
          blockMoveTo({
            x: event.nativeEvent.clientX - mouseOffsetX,
            y: event.nativeEvent.clientY - mouseOffsetY
          })
        )
      },
      [dispatch]
    )
    // const handleDragStart = useCallback(event => {
    //   // TODO: ブロックの情報をstoreへ登録する
    //   if (onDragStart) {
    //     onDragStart(event)
    //   }
    // }, [onDragStart])

    return <Component onMouseDown={handleDragStart} {...other} />
  }

  DraggableBlock.propTypes = propTypes
  DraggableBlock.displayName = `Draggable-Block-${Component.displayName || Component.name}`

  return DraggableBlock
}

export default makeBlockDraggable
