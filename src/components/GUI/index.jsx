import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Canvas from 'src/components/Canvas'
import Group from 'src/components/Group'
import Palette from 'src/components/Palette'
import Command from 'src/components/Command'
import { setViewSize, setTrackingBlockRef } from 'src/actions/gui'
import commands from 'src/resources/commands'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'monaco, courier-new, courier, monospace'
  },
  group: {
    borderRight: `solid 1px ${theme.palette.divider}`
  },
  palette: {
    borderRight: `solid 1px ${theme.palette.divider}`
  },
  canvas: {
    borderRight: `solid 1px ${theme.palette.divider}`
  },
  commandWrapper: {
    position: 'absolute',
    top: '-10000px',
    left: '-10000px'
  }
}))

const propTypes = {
  className: PropTypes.string
}

const GUI = props => {
  const { className, ...other } = props
  const classes = useStyles()
  const rootRef = useRef(null)
  const commandRef = useRef(null)
  const paletteRef = useRef(null)
  const dispatch = useDispatch()
  const gui = useSelector(state => state.gui)
  const { viewSize, dragBlock } = gui

  const handleResize = useCallback(() => {
    dispatch(
      setViewSize({
        height: rootRef.current.clientHeight,
        width: rootRef.current.clientWidth
      })
    )
  }, [dispatch])

  const handleLoad = useCallback(() => {
    dispatch(
      setTrackingBlockRef({
        command: commandRef
      })
    )
    handleResize()
  }, [dispatch, handleResize])

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
        <Group
          className={classes.group}
          data={commands}
          height={viewSize.group.height}
          paletteRef={paletteRef}
          width={viewSize.group.width}
        />
        <Palette
          className={classes.palette}
          data={commands}
          height={viewSize.palette.height}
          ref={paletteRef}
          width={viewSize.palette.width}
        />
        <Canvas
          className={classes.canvas}
          height={viewSize.canvas.height}
          width={viewSize.canvas.width}
        />
        <div className={classes.commandWrapper}>
          <Command data={dragBlock.info.data} ref={commandRef} />
        </div>
      </div>
    </>
  )
}

GUI.propTypes = propTypes

export default GUI
