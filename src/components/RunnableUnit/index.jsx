import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import { RunnableUnit } from 'src/models'
import Command from '../Command'
import DroppableZone from '../DroppableZone'

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
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 0
    },
    beforeList: {
      width: theme.spacing(8),
      flexGrow: 0
    },
    afterList: {
      flexGrow: 1
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

  // const handleChange = useCallback(event => {
  //   setData(data)
  // }, [])

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

  return (
    <div className={classes.root} {...other}>
      <DroppableZone className={classes.beforeList} onBlockDrop={handleDropBeforeList} />
      <div className={classes.wrapper}>
        {dataProp.commands.map((command, index) => (
          <Command
            editable
            data={dataProp.commandMap.get(command)}
            key={command}
            onDragEnd={handleDragEnd(index)}
            onDragStart={handleDragStart(index)}
          />
        ))}
      </div>
      <DroppableZone className={classes.afterList} onBlockDrop={handleDropAfterList} />
    </div>
  )
}

RunnableUnitComponent.propTypes = propTypes
RunnableUnitComponent.defaultProps = defaultProps

export default makeBlockDroppable(RunnableUnitComponent)
