import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Canvas from 'src/components/Canvas'
import Group from 'src/components/Group'
import Palette from 'src/components/Palette'
import DragTrackingBlock from 'src/components/DragTrackingBlock'
import { setViewSize } from 'src/actions/gui'
import { ui } from 'src/static'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 0
  },
  dragTrackingBlock: {
    position: 'absolute',
    zIndex: theme.zIndex.appBar + 1
  }
}))

const propTypes = {
  className: PropTypes.string
}

const GUI = props => {
  const { className, ...other } = props
  const rootRef = useRef(null)
  const dispatch = useDispatch()
  const gui = useSelector(state => state.gui)
  const { viewSize, dragBlock } = gui
  const classes = useStyles()

  const handleResize = useCallback(() => {
    dispatch(
      setViewSize({
        height: rootRef.current.clientHeight,
        width: rootRef.current.clientWidth
      })
    )
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
      <div className={clsx(classes.root, className)} onLoad={handleResize} ref={rootRef} {...other}>
        <Group height={viewSize.group.height} width={viewSize.group.width} />
        <Palette height={viewSize.palette.height} width={viewSize.palette.width} />
        <Canvas height={viewSize.canvas.height} width={viewSize.canvas.width} />
      </div>
      <DragTrackingBlock
        className={classes.dragTrackingBlock}
        name='drag-tracking-block'
        style={{
          pointerEvents: 'none',
          display: dragBlock.info.display ? 'block' : 'none',
          transform: `translate3d(${dragBlock.position.x}px, ${dragBlock.position.y -
            ui.menuBar.height}px, 1000px)`
        }}
      />
    </>
  )
}

GUI.propTypes = propTypes

export default GUI
