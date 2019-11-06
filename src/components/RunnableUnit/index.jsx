import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import Command from '../Command'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box'
  }
}))

const propTypes = {
  data: PropTypes.shape({
    type: PropTypes.oneOf(['RunnableUnit']),
    id: PropTypes.string,
    commandMap: PropTypes.object,
    commands: PropTypes.arrayOf(PropTypes.string)
  })
}

const defaultProps = {}

const RunnableUnit = props => {
  const { data } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {data.commands.map(command => (
        <Command data={data.commandMap[command]} key={command} />
      ))}
    </div>
  )
}

RunnableUnit.propTypes = propTypes
RunnableUnit.defaultProps = defaultProps

export default RunnableUnit
