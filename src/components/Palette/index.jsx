import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import Command, { defaultCommandData } from 'src/components/Command'
import commands from 'src/resources/commands'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto'
  },
  command: {
    margin: theme.spacing(1)
  }
}))

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}

const defaultProps = {
  height: '100%',
  width: '100%'
}

const Palette = props => {
  const { height, width, ...other } = props
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{
        height: height,
        width: width
      }}
      {...other}
    >
      {commands.map(command => (
        <Command
          className={classes.command}
          data={{
            ...defaultCommandData,
            id: `palette-${command}`,
            command: command
          }}
          id={`palette-${command}`}
          key={`palette-${command}`}
        />
      ))}
    </div>
  )
}

Palette.propTypes = propTypes
Palette.defaultProps = defaultProps

export default Palette
