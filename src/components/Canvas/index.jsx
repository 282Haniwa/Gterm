import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import makeStyles from '@material-ui/styles/makeStyles'
import { setCommandList } from 'src/actions/commands'
import CommandList from '../CommandList'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    width: 'max-content',
    overflow: 'auto'
  }
}))

const propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
}

const defaultProps = {
  height: '100%',
  width: '100%'
}

const Canvas = props => {
  const { className, height, width, ...other } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const commandList = useSelector(state => state.commands.commandList)

  const handleChangeCommandList = useCallback(
    (event, data) => {
      dispatch(setCommandList(data))
    },
    [dispatch]
  )

  return (
    <div
      className={clsx(classes.root, className)}
      style={{
        height: height,
        width: width
      }}
      {...other}
    >
      <CommandList data={commandList} onChange={handleChangeCommandList} />
    </div>
  )
}

Canvas.propTypes = propTypes
Canvas.defaultProps = defaultProps

export default Canvas
