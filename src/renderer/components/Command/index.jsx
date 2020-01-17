import React, { forwardRef, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/styles/makeStyles'
import makeBlockDraggable from 'src/helper/makeBlockDraggable'
import { NormalCommand, SpecialCommand } from 'src/models'

const defaultData = {
  type: 'NormalCommand',
  id: '',
  command: '',
  args: [],
  pipe: {
    stdin: null,
    stdout: null,
    stderr: null
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '48px',
    width: 'max-content',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.jis.blue,
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing'
    }
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
    fontSize: '1em',
    backgroundColor: 'white'
  },
  addArgButton: {
    color: 'white'
  }
}))

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.instanceOf(NormalCommand),
    PropTypes.instanceOf(SpecialCommand),
    PropTypes.object
  ]),
  editable: PropTypes.bool,
  onChange: PropTypes.func
}

const defaultProps = {
  data: defaultData,
  editable: false
}

const Command = forwardRef((props, ref) => {
  const { className, data: dataProp, editable, onChange, ...other } = props
  const classes = useStyles()
  const [args, setArgs] = useState(dataProp.args || [])
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
    index => event => {
      event.target.style.width = calcStringWidth(event.target.value)
      if (index === args.size - 1) {
        setArgs(args.push(''))
      }
      setInputValue({ target: index, value: event.target.value })
    },
    [args, calcStringWidth]
  )

  const handleFocusArg = useCallback(
    index => event => {
      setInputValue({ target: index, value: event.target.value })
    },
    []
  )

  const handleBlurArg = useCallback(
    index => event => {
      event.target.style.width = calcStringWidth(event.target.value)
      if (onChange) {
        onChange(event, dataProp.setArg(index, inputValue.value))
      }
    },
    [calcStringWidth, onChange, dataProp, inputValue.value]
  )

  useEffect(() => {
    if (editable && dataProp) {
      setArgs(dataProp.addArg().args)
    }
  }, [dataProp, editable])

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      <div className={classes.command}>{dataProp.command}</div>
      <div className={classes.args}>
        {editable &&
          args.map((arg, index) => (
            <input
              className={classes.arg}
              defaultValue={arg}
              // eslint-disable-next-line react/no-array-index-key
              key={`${dataProp.command}-${arg}-${index}`}
              onBlur={handleBlurArg(index)}
              onFocus={handleFocusArg(index)}
              onInput={handleArgChange(index)}
              style={{
                width: calcStringWidth(arg)
              }}
              type='text'
            />
          ))}
        {!editable &&
          dataProp.args.map((arg, index) => (
            <div
              className={classes.arg}
              // eslint-disable-next-line react/no-array-index-key
              key={`${dataProp.command}-${arg}-${index}`}
              style={{
                width: calcStringWidth(arg)
              }}
            >
              {arg}
            </div>
          ))}
      </div>
    </div>
  )
})

Command.propTypes = propTypes
Command.defaultProps = defaultProps

export { defaultData as defaultCommandData }

export default makeBlockDraggable(Command)
