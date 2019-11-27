import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import makeStyles from '@material-ui/styles/makeStyles'
import { orange } from '@material-ui/core/colors'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import { pushRunnableUnit, insertRunnableUnit, setRunnableUnit } from 'src/actions/commands'
import { CommandList } from 'src/models'
import RunnableUnit from '../RunnableUnit'
import DroppableZone from '../DroppableZone'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    minWidth: '100%',
    height: '100%'
  },
  wrapper: {
    position: 'relative',
    flexGrow: 0
  },
  droppableZone: {
    position: 'absolute',
    top: theme.spacing(-2),
    height: theme.spacing(4),
    width: '100%'
  },
  droppableZoneOnBlockOver: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 'calc(50% - 3px)',
      height: '6px',
      width: '100%',
      backgroundColor: orange[200]
    }
  },
  blackSpace: {
    position: 'relative',
    flexGrow: 1,
    minHeight: theme.spacing(8)
  },
  blackSpaceOnBlockOver: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-3px',
      height: '6px',
      width: '100%',
      backgroundColor: orange[200]
    }
  }
}))

const propTypes = {
  data: PropTypes.instanceOf(CommandList)
}

const defaultProps = {
  data: new CommandList()
}

const CommandListComponent = props => {
  const { data: dataProp, ...other } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleDragBlockEnterDroppableZone = useCallback(
    className => event => {
      event.target.classList.add(className)
    },
    []
  )

  const handleDragBlockLeaveDroppableZone = useCallback(
    className => event => {
      event.target.classList.remove(className)
    },
    []
  )

  const handleInsertRunnableUnit = useCallback(
    index => (event, data) => {
      event.target.classList.remove(classes.droppableZoneOnBlockOver)
      dispatch(insertRunnableUnit(index, data))
    },
    [classes.droppableZoneOnBlockOver, dispatch]
  )

  const handlePushRunnableUnit = useCallback(
    (event, data) => {
      event.target.classList.remove(classes.blackSpaceOnBlockOver)
      dispatch(pushRunnableUnit(data))
    },
    [classes.blackSpaceOnBlockOver, dispatch]
  )

  const handleChangeRunnableCommand = useCallback(
    index => (event, data) => {
      dispatch(setRunnableUnit(index, data))
    },
    [dispatch]
  )

  return (
    <div className={classes.root} {...other}>
      {dataProp.map((command, index) => (
        <div className={classes.wrapper} key={`${command.id}`}>
          <DroppableZone
            className={classes.droppableZone}
            onBlockDragEnter={handleDragBlockEnterDroppableZone(classes.droppableZoneOnBlockOver)}
            onBlockDragLeave={handleDragBlockLeaveDroppableZone(classes.droppableZoneOnBlockOver)}
            onBlockDrop={handleInsertRunnableUnit(index)}
          />
          <RunnableUnit data={command} onChange={handleChangeRunnableCommand(index)} />
        </div>
      ))}
      <DroppableZone
        className={classes.blackSpace}
        onBlockDragEnter={handleDragBlockEnterDroppableZone(classes.blackSpaceOnBlockOver)}
        onBlockDragLeave={handleDragBlockLeaveDroppableZone(classes.blackSpaceOnBlockOver)}
        onBlockDrop={handlePushRunnableUnit}
      />
    </div>
  )
}

CommandListComponent.propTypes = propTypes
CommandListComponent.defaultProps = defaultProps

export default makeBlockDroppable(CommandListComponent)
