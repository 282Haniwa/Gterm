import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/styles/makeStyles'
import Command, { defaultCommandData } from 'src/components/Command'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
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
  className: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.number,
  width: PropTypes.number
}

const defaultProps = {
  data: [],
  height: '100%',
  width: '100%'
}

const Palette = forwardRef((props, ref) => {
  const { className, data, height, width, ...other } = props
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.root, className)}
      ref={ref}
      style={{
        height: height,
        width: width
      }}
      {...other}
    >
      {data.map(commandGroup => (
        <div
          className={classes.group}
          id={`palette-${commandGroup.group.key}`}
          key={`palette-${commandGroup.group.key}`}
        >
          <div className={classes.groupName}>{commandGroup.group.name}</div>
          {commandGroup.commands.map(command => (
            <Command
              className={classes.command}
              data={{
                ...defaultCommandData,
                id: `palette-${commandGroup.group.key}-${command}`,
                command: command
              }}
              key={`palette-${command}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
})

Palette.propTypes = propTypes
Palette.defaultProps = defaultProps

export default Palette
