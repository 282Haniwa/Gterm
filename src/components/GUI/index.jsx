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
import DragTrackingBlock from 'src/components/DragTrackingBlock'
import { setViewSize } from 'src/actions/gui'
import { ui } from 'src/static'

const useStyles = makeStyles(theme => ({
  dragTrackingBlock: {
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

  useEffect(() => {
    handleLoad()
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
      <DragTrackingBlock
        className={classes.dragTrackingBlock}
        name='drag-tracking-block'
        style={{
          pointerEvents: 'none',
          display: dragBlock.info.display ? 'block' : 'none',
          transform: `translate3d(${dragBlock.position.x}px, ${dragBlock.position.y - ui.menuBar.height}px, 1000px)`
        }}
      />
    </>
  )
}

export default GUI
