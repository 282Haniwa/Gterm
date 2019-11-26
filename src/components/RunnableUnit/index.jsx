import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import { RunnableUnit } from 'src/models'
import Command from '../Command'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: `${theme.spacing(2)}px`,
      paddingRight: theme.spacing(8),
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxSizing: 'border-box'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row'
    }
  }),
  { name: 'RunnableUnit' }
)

const propTypes = {
  data: PropTypes.instanceOf(RunnableUnit)
}

const defaultProps = {}

const RunnableUnitComponent = props => {
  const { data, ...other } = props
  const classes = useStyles()

  return (
    <div className={classes.root} {...other}>
      <div className={classes.wrapper}>
        {data.commands.map(command => (
          <Command data={data.commandMap.get(command)} key={command} />
        ))}
      </div>
    </div>
  )
}

RunnableUnitComponent.propTypes = propTypes
RunnableUnitComponent.defaultProps = defaultProps

export default makeBlockDroppable(RunnableUnitComponent)
