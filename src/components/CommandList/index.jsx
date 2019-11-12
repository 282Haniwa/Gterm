import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import RunnableUnit from '../RunnableUnit'

const useStyles = makeStyles(() => ({
  root: {
    width: 'fit-content',
    minWidth: '100%'
  }
}))

const propTypes = {
  data: PropTypes.array
}

const defaultProps = {
  data: []
}

const CommandList = props => {
  const { data } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {data.map(command => (
        <RunnableUnit data={command} key={`${command.id}`} />
      ))}
    </div>
  )
}

CommandList.propTypes = propTypes
CommandList.defaultProps = defaultProps

export default CommandList
