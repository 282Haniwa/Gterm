import React, { forwardRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/styles/makeStyles'
import { blue } from '@material-ui/core/colors'
import makeBlockDraggable from 'src/helper/makeBlockDraggable'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: '5px',
    border: `solid 1px ${theme.palette.divider}`,
    backgroundColor: blue[400]
  },
  command: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    color: theme.palette.common.white
  },
  args: {
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content'
  },
  arg: {
    position: 'relative',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    marginRight: theme.spacing(1),
    border: 'none',
    borderRadius: 16,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontFamily: 'monaco, courier-new, courier, monospace',
    fontSize: '1em'
  }
}))

const propTypes = {
  className: PropTypes.string,
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

const defaultProps = {
  data: {
    type: 'Command',
    id: '',
    command: '',
    args: [],
    pipe: {
      stdin: null,
      stdout: null,
      stderr: null
    }
  }
}

const Command = forwardRef((props, ref) => {
  const { className, data, ...other } = props
  const classes = useStyles()
  const [args, setArgs] = useState(data.args)
  const [inputValue, setInputValue] = useState({})

  const calcStringWidth = useCallback(text => {
    if (!text) {
      return '1ch'
    }
    const fullWidthCharList = text.match(/[^\x20-\x7e]+/g)
    const fullWidthCharLength = fullWidthCharList ? fullWidthCharList.join('').length : 0
    return `calc(${text.length - fullWidthCharLength}ch + ${fullWidthCharLength}em + 8px)`
  }, [])

  const handleArgChange = useCallback(
    target => event => {
      event.target.style.width = calcStringWidth(event.target.value)
      setInputValue({ target: target, value: event.target.value })
    },
    [calcStringWidth]
  )

  const handleFocusArg = useCallback(
    target => event => {
      setInputValue({ target: target, value: event.target.value })
    },
    []
  )

  const handleBlurArg = useCallback(
    target => event => {
      event.target.style.width = calcStringWidth(event.target.value)
      setArgs(
        args.map((arg, index) => {
          if (index === target) {
            return inputValue.value
          }
          return arg
        })
      )
    },
    [calcStringWidth, args, inputValue.value]
  )

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      <div className={classes.command}>{data.command}</div>
      <div className={classes.args}>
        {args &&
          args.map((arg, index) => (
            <input
              className={classes.arg}
              defaultValue={arg}
              key={`${data.command}-${arg}`}
              onBlur={handleBlurArg(index)}
              onFocus={handleFocusArg(index)}
              onInput={handleArgChange(index)}
              style={{
                width: calcStringWidth(arg)
              }}
              type='text'
            />
          ))}
      </div>
    </div>
  )
})

Command.propTypes = propTypes
Command.defaultProps = defaultProps

export default makeBlockDraggable(Command)
