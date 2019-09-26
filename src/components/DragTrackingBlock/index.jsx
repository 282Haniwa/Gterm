import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockMoveTo, setBlockInfo } from 'src/actions/gui'
import Block from 'src/components/Block'

const DragTrackingBlock = props => {
  const dispatch = useDispatch()
  const dragBlock = useSelector(state => state.gui.dragBlock)

  const handleDrag = useCallback(event => {
    if (dragBlock.info.isDragged) {
      console.log('handleDrag', event)
      dispatch(blockMoveTo({
        x: event.clientX - dragBlock.info.offsetX,
        y: event.clientY - dragBlock.info.offsetY
      }))
    }
  }, [dispatch, dragBlock.info])

  const handleDragEnd = useCallback(event => {
    console.log('handleDragEnd', event)
    dispatch(setBlockInfo({ isDragged: false, display: false }))
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('mouseleave', handleDragEnd)

    return () => {
      window.removeEventListener('mousemove', handleDrag)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('mouseleave', handleDragEnd)
    }
  }, [handleDrag, handleDragEnd])

  return (
    <svg
      height='64'
      width='64'
      {...props}
    >
      <Block />
    </svg>
  )
}

DragTrackingBlock.displayName = 'DragTrackingBlock'

export default DragTrackingBlock
