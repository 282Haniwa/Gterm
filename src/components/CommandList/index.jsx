import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import { orange } from '@material-ui/core/colors'
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
  data: PropTypes.instanceOf(CommandList),
  onChange: PropTypes.func
}

const defaultProps = {
  data: new CommandList()
}

const CommandListComponent = props => {
  const { data: dataProp, onChange, ...other } = props
  const classes = useStyles()

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
      if (onChange) {
        onChange(event, dataProp.insertItem(index, data))
      }
    },
    [classes.droppableZoneOnBlockOver, dataProp, onChange]
  )

  const handlePushRunnableUnit = useCallback(
    (event, data) => {
      event.target.classList.remove(classes.blackSpaceOnBlockOver)
      if (onChange) {
        onChange(event, dataProp.pushItem(data))
      }
    },
    [classes.blackSpaceOnBlockOver, dataProp, onChange]
  )

  const handleChangeRunnableCommand = useCallback(
    index => (event, data) => {
      if (onChange) {
        dataProp.map(aRunnableUnit => console.log('aRunnableUnit', aRunnableUnit.toString()))
        onChange(event, dataProp.setItem(index, data))
      }
    },
    [dataProp, onChange]
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

export default CommandListComponent
