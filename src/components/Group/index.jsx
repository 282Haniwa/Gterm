import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto'
  },
  group: {
    height: 64,
    width: 64,
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    borderBottom: `solid 1px ${theme.palette.divider}`,
    fontSize: 12,
    transition: theme.transitions.easing,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.number,
  paletteRef: PropTypes.any,
  width: PropTypes.number
}

const defaultProps = {
  data: [],
  height: '100%',
  width: '100%'
}

const Group = props => {
  const { className, height, width, data, paletteRef, ...other } = props
  const classes = useStyles()

  const handleClick = useCallback(
    groupKey => () => {
      if (paletteRef) {
        const target = document.getElementById(`palette-${groupKey}`)
        paletteRef.current.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        })
      }
    },
    [paletteRef]
  )

  return (
    <div
      className={clsx(classes.root, className)}
      style={{
        height: height,
        width: width
      }}
      {...other}
    >
      {data.map(commandGroup => (
        <div
          className={classes.group}
          key={`group-${commandGroup.group.key}`}
          onClick={handleClick(commandGroup.group.key)}
        >
          {commandGroup.group.name}
        </div>
      ))}
    </div>
  )
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
