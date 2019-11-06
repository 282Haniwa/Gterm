import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}))

const propTypes = {
  data: PropTypes.shape({
    type: PropTypes.oneOf(['Command']),
    id: PropTypes.string,
    command: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.string),
    pipe: PropTypes.shape({
      stdin: PropTypes.any,
      stdout: PropTypes.any,
      stderr: PropTypes.any
    })
  })
}

const defaultProps = {}

const RunnableUnit = props => {
  const { data } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <span>{data.command}</span>
      <span>{data.args.toString()}</span>
    </div>
  )
}

RunnableUnit.propTypes = propTypes
RunnableUnit.defaultProps = defaultProps

export default RunnableUnit
