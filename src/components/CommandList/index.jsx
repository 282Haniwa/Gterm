import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import makeStyles from '@material-ui/styles/makeStyles'
import { orange } from '@material-ui/core/colors'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import { insertRunnableUnit, setRunnableUnit } from 'src/actions/commands'
import { CommandList } from 'src/models'
import RunnableUnit from '../RunnableUnit'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    minWidth: '100%',
    height: '100%'
  },
  wrapper: {
    position: 'relative'
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
  }
}))

const propTypes = {
  data: PropTypes.instanceOf(CommandList)
}

const defaultProps = {
  data: new CommandList()
}

const DroppableZone = makeBlockDroppable(props => <div {...props} />)

const CommandListComponent = props => {
  const { data: dataProp, ...other } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleDragBlockEnterDroppableZone = useCallback(
    event => {
      event.target.classList.add(classes.droppableZoneOnBlockOver)
    },
    [classes.droppableZoneOnBlockOver]
  )

  const handleDragBlockLeaveDroppableZone = useCallback(
    event => {
      event.target.classList.remove(classes.droppableZoneOnBlockOver)
    },
    [classes.droppableZoneOnBlockOver]
  )

  const handlePushCommand = useCallback(
    index => (event, data) => {
      const anRunnableUnit = dataProp.getItem(index)
      dispatch(setRunnableUnit(index, anRunnableUnit.pushCommand(data)))
    },
    [dataProp, dispatch]
  )

  const handleInsertRunnableUnit = useCallback(
    index => (event, data) => {
      event.target.classList.remove(classes.droppableZoneOnBlockOver)
      dispatch(insertRunnableUnit(index, data))
    },
    [classes.droppableZoneOnBlockOver, dispatch]
  )

  return (
    <div className={classes.root} {...other}>
      {dataProp.map((command, index) => (
        <div className={classes.wrapper} key={`${command.id}`}>
          <DroppableZone
            className={classes.droppableZone}
            onBlockDragEnter={handleDragBlockEnterDroppableZone}
            onBlockDragLeave={handleDragBlockLeaveDroppableZone}
            onBlockDrop={handleInsertRunnableUnit(index)}
          />
          <RunnableUnit data={command} onBlockDrop={handlePushCommand(index)} />
        </div>
      ))}
    </div>
  )
}

CommandListComponent.propTypes = propTypes
CommandListComponent.defaultProps = defaultProps

export default makeBlockDroppable(CommandListComponent)
