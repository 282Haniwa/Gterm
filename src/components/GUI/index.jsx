import React, {
  useCallback,
  useEffect,
  useRef
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Canvas from 'src/components/Canvas'
import Group from 'src/components/Group'
import Palette from 'src/components/Palette'
import DraggableBlock from 'src/components/DraggableBlock'
import { setViewSize, blockMoveTo, setBlockInfo } from 'src/actions/gui'
import { ui } from 'src/static'

const useStyles = makeStyles(theme => ({
  draggableBlock: {
    position: 'absolute',
    zIndex: theme.zIndex.appBar + 1
  }
}))

const GUI = props => {
  const rootRef = useRef(null)
  const dispatch = useDispatch()
  const gui = useSelector(state => state.gui)
  const { viewSize, dragBlock } = gui
  const classes = useStyles()

  const handleResize = useCallback(() => {
    dispatch(setViewSize({
      height: rootRef.current.height.baseVal.value,
      width: rootRef.current.width.baseVal.value
    }))
  }, [dispatch])

  const handleLoad = useCallback(() => {
    handleResize()
  }, [handleResize])

  const handleDragStart = useCallback(event => {
    console.log('handleDragStart', event.nativeEvent)
    dispatch(setBlockInfo({
      isDragged: true,
      display: true,
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY
    }))
  }, [dispatch])

  const handleDrag = useCallback(event => {
    console.log('handleDrag', event)
    if (dragBlock.info.isDragged) {
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
    handleLoad()
    dispatch(blockMoveTo({
      x: 0,
      y: ui.menuBar.height
    }))
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleLoad, handleResize, dispatch])

  return (
    <>
      <svg
        onLoad={handleResize}
        ref={rootRef}
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <Group width={`${viewSize.group.width}`} />
        <Palette
          rectProps={{
            x: `${viewSize.palette.offsetX}`
          }}
          width={`${viewSize.palette.width}`}
        />
        <Canvas
          rectProps={{
            x: `${viewSize.canvas.offsetX}`
          }}
          width={`${viewSize.canvas.width}`}
        />
      </svg>
      <DraggableBlock
        className={classes.draggableBlock}
        name='draggable-block'
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        style={{
          display: 'block',
          transform: `translate3d(${dragBlock.position.x}px, ${dragBlock.position.y - ui.menuBar.height}px, 1000px)`
        }}
      />
    </>
  )
}

export default GUI
