import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import { green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import { PlayArrow } from '@material-ui/icons'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import { RunnableUnit } from 'src/models'
import Command from '../Command'
import DroppableZone from '../DroppableZone'
import Pipe from '../Pipe'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      padding: `${theme.spacing(2)}px 0`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxSizing: 'border-box'
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 0
    },
    beforeList: {
      width: theme.spacing(8),
      flexGrow: 0
    },
    afterList: {
      flexGrow: 1,
      minWidth: theme.spacing(8)
    },
    runButton: {
      color: green[400]
    }
  }),
  { name: 'RunnableUnit' }
)

const propTypes = {
  data: PropTypes.instanceOf(RunnableUnit),
  onChange: PropTypes.func
}

const defaultProps = {}

const RunnableUnitComponent = props => {
  const { data: dataProp, onChange, ...other } = props
  const classes = useStyles()
  const [dragTarget, setDragTarget] = useState(null)

  const handleDragStart = useCallback(
    index => event => {
      event.target.style.opacity = 0.5
      setDragTarget(index)
    },
    []
  )

  const handleDragEnd = useCallback(
    index => event => {
      event.target.style.opacity = 1.0
      /* 以下のif文はDroppableでないところにドロップされた時に走る
       * eventの発生順がonDropの後にonDragEndであるから
       * onDrop終了時にはdragTargetをnullに初期化している */
      if (Number.isInteger(dragTarget)) {
        onChange(event, dataProp.removeCommand(index))
      }
    },
    [dataProp, dragTarget, onChange]
  )

  const handleDropBeforeList = useCallback(
    (event, data) => {
      if (onChange) {
        if (dataProp.commands.indexOf(data.id) === dragTarget) {
          onChange(event, dataProp.removeCommand(dragTarget).insertCommand(0, data))
          setDragTarget(null)
          return
        }
        onChange(event, dataProp.insertCommand(0, data))
      }
    },
    [dataProp, dragTarget, onChange]
  )

  const handleDropAfterList = useCallback(
    (event, data) => {
      if (onChange) {
        if (dataProp.commands.indexOf(data.id) === dragTarget) {
          onChange(event, dataProp.removeCommand(dragTarget).pushCommand(data))
          setDragTarget(null)
          return
        }
        onChange(event, dataProp.pushCommand(data))
      }
    },
    [dataProp, dragTarget, onChange]
  )

  const handleDropOnCommand = useCallback(
    index => (event, data) => {
      if (onChange) {
        if (dataProp.commands.indexOf(data.id) === dragTarget) {
          onChange(event, dataProp.moveCommand(dragTarget, index))
          setDragTarget(null)
          return
        }
        onChange(event, dataProp.insertCommand(index, data))
      }
    },
    [dataProp, dragTarget, onChange]
  )

  const handleChangePipe = useCallback(
    index => (event, value) => {
      const aCommand = dataProp.getCommand(index).set('pipe', value)
      onChange(event, dataProp.updateCommand(aCommand))
    },
    [dataProp, onChange]
  )

  const handleClickRunButton = useCallback(() => {
    console.log(dataProp.toString(), dataProp.toJS())
  }, [dataProp])

  return (
    <div className={classes.root} {...other}>
      <DroppableZone className={classes.beforeList} onBlockDrop={handleDropBeforeList}>
        <IconButton className={classes.runButton} onClick={handleClickRunButton}>
          <PlayArrow />
        </IconButton>
      </DroppableZone>
      <div className={classes.flexRow}>
        {dataProp.commands.map((commandId, index) => {
          const aCommand = dataProp.commandMap.get(commandId)
          const isFirst = index === 0
          const isLast = index === dataProp.commands.size - 1
          return (
            <div className={classes.flexRow} key={commandId}>
              <DroppableZone className={classes.flexRow} onBlockDrop={handleDropOnCommand(index)}>
                {isFirst && <Pipe first data={aCommand.pipe} onChange={handleChangePipe(index)} />}
                <Command
                  editable
                  data={aCommand}
                  onDragEnd={handleDragEnd(index)}
                  onDragStart={handleDragStart(index)}
                />
              </DroppableZone>
              <DroppableZone
                className={classes.flexRow}
                onBlockDrop={handleDropOnCommand(index + 1)}
              >
                <Pipe
                  data={aCommand.pipe}
                  last={isLast}
                  middle={!isLast}
                  onChange={handleChangePipe(index)}
                />
              </DroppableZone>
            </div>
          )
        })}
      </div>
      <DroppableZone className={classes.afterList} onBlockDrop={handleDropAfterList} />
    </div>
  )
}

RunnableUnitComponent.propTypes = propTypes
RunnableUnitComponent.defaultProps = defaultProps

export default makeBlockDroppable(RunnableUnitComponent)
