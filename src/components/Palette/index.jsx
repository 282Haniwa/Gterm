import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import Command, { defaultCommandData } from 'src/components/Command'
import commands from 'src/resources/commands'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto'
  },
  group: {
    paddingBottom: theme.spacing(1)
  },
  groupName: {
    width: '100%',
    padding: theme.spacing(1),
    paddingBottom: 0,
    fontSize: '0.8em',
    boxSizing: 'border-box'
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
      {commands.map(commandGroup => (
        <div
          className={classes.group}
          id={`palette-${commandGroup.group}`}
          key={`palette-${commandGroup.group}`}
        >
          <div className={classes.groupName}>{commandGroup.group}</div>
          {commandGroup.commands.map(command => (
            <Command
              className={classes.command}
              data={{
                ...defaultCommandData,
                id: `palette-${commandGroup.group}-${command}`,
                command: command
              }}
              key={`palette-${command}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

Palette.propTypes = propTypes
Palette.defaultProps = defaultProps

export default Palette
