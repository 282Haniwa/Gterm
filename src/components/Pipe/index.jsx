import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import { Pipe } from 'src/models'
import PipeSelect from './PipeSelect'

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.instanceOf(Pipe),
  first: PropTypes.bool,
  last: PropTypes.bool,
  middle: PropTypes.bool,
  onChange: PropTypes.func
}

const defaultProps = {
  first: false,
  middle: false,
  last: false
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '64px'
  },
  button: {
    height: '100%',
    width: '64px'
  },
  popoverContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  switchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 0
  },
  switchLabel: {
    fontSize: '0.8em'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    width: '6ch',
    flexGrow: 0
  },
  select: {
    width: '150px',
    flexGrow: 0
  },
  input: {
    flexGrow: 0
  },
  marginLeft: {
    marginLeft: theme.spacing(1)
  }
}))

// TODO: Refactoring
const PipeComponent = props => {
  const { className, data: dataProp, first, middle, last, onChange, ...other } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selfInputMode, setSelfInputMode] = useState(false)
  const [selfInputString, setSelfInputString] = useState('')
  const [selectValues, setSelectValues] = useState({
    stdin: dataProp.stdin.selected,
    stdout: dataProp.stdout.selected,
    stderr: dataProp.stderr.selected
  })
  const [fileNames, setFileNames] = useState({
    stdin: '',
    stdout: '',
    stderr: ''
  })
  const [appendingSwitchValues, setAppendingSwitchValues] = useState({
    stdin: false,
    stdout: false,
    stderr: false
  })
  const open = Boolean(anchorEl)

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget)
  }, [])

  const getNextPipeData = useCallback(
    target => {
      if (selectValues[target] === '/dev/null') {
        return dataProp[target].setFile('/dev/null')
      }

      if (selectValues[target] === 'file') {
        return dataProp[target].setFile(fileNames[target], appendingSwitchValues[target])
      }

      return dataProp[target].setSelected(selectValues[target])
    },
    [appendingSwitchValues, dataProp, fileNames, selectValues]
  )

  const handleClose = useCallback(
    event => {
      setAnchorEl(null)
      onChange(
        event,
        dataProp.merge({
          stdin: getNextPipeData('stdin'),
          stdout: getNextPipeData('stdout'),
          stderr: getNextPipeData('stderr'),
          other: selfInputString
        })
      )
    },
    [dataProp, getNextPipeData, onChange, selfInputString]
  )

  const handleChangeSelfInput = useCallback((event, value) => {
    setSelfInputMode(value)
  }, [])

  const handleChangeSelect = useCallback(
    target => event => {
      setSelectValues({ ...selectValues, [target]: event.target.value })
    },
    [selectValues]
  )

  const handleChangeFileName = useCallback(
    target => event => {
      setFileNames({ ...fileNames, [target]: event.target.value })
    },
    [fileNames]
  )

  const handleChangeAppendingValues = useCallback(
    target => (event, value) => {
      setAppendingSwitchValues({ ...appendingSwitchValues, [target]: value })
    },
    [appendingSwitchValues]
  )

  const handleChangeSelfInputString = useCallback(event => {
    setSelfInputString(event.target.value)
  }, [])

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Button className={classes.button} onClick={handleClick}>
        {'pipe'}
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Paper className={classes.popoverContent}>
          <div className={classes.switchWrapper}>
            <div className={classes.switchLabel}>入力する</div>
            <Switch
              checked={selfInputMode}
              color='primary'
              onChange={handleChangeSelfInput}
              value='selfInput'
            />
          </div>
          {selfInputMode && (
            <Input
              className={classes.input}
              onChange={handleChangeSelfInputString}
              placeholder='ex.) > stdout.txt'
              value={selfInputString}
            />
          )}
          {!selfInputMode && (
            <>
              {first && (
                <div className={classes.wrapper}>
                  <div className={classes.label}>stdin</div>
                  <PipeSelect
                    next
                    stdin
                    className={clsx(classes.marginLeft, classes.select)}
                    onChange={handleChangeSelect('stdin')}
                    value={selectValues.stdin}
                  />
                  {selectValues.stdin === 'file' && (
                    <>
                      <Input
                        className={clsx(classes.marginLeft, classes.input)}
                        onChange={handleChangeFileName('stdin')}
                        placeholder='ファイルパス'
                        value={fileNames.stdin}
                      />
                      <div className={clsx(classes.marginLeft, classes.switchWrapper)}>
                        <div className={classes.switchLabel}>追記</div>
                        <Switch
                          checked={appendingSwitchValues.stdin}
                          color='primary'
                          onChange={handleChangeAppendingValues('stdin')}
                          value='appending-stdin'
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              {(middle || last) && (
                <div className={classes.wrapper}>
                  <div className={classes.label}>stdout</div>
                  <PipeSelect
                    stdout
                    className={clsx(classes.marginLeft, classes.select)}
                    next={middle}
                    onChange={handleChangeSelect('stdout')}
                    value={selectValues.stdout}
                  />
                  {selectValues.stdout === 'file' && (
                    <>
                      <Input
                        className={clsx(classes.marginLeft, classes.input)}
                        onChange={handleChangeFileName('stdout')}
                        placeholder='ファイルパス'
                        value={fileNames.stdout}
                      />
                      <div className={clsx(classes.marginLeft, classes.switchWrapper)}>
                        <div className={classes.switchLabel}>追記</div>
                        <Switch
                          checked={appendingSwitchValues.stdout}
                          color='primary'
                          onChange={handleChangeAppendingValues('stdout')}
                          value='appending-stdout'
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              {(middle || last) && (
                <div className={classes.wrapper}>
                  <div className={classes.label}>stderr</div>
                  <PipeSelect
                    stderr
                    className={clsx(classes.marginLeft, classes.select)}
                    next={middle}
                    onChange={handleChangeSelect('stderr')}
                    value={selectValues.stderr}
                  />
                  {selectValues.stderr === 'file' && (
                    <>
                      <Input
                        className={clsx(classes.marginLeft, classes.input)}
                        onChange={handleChangeFileName('stderr')}
                        placeholder='ファイルパス'
                        value={fileNames.stderr}
                      />
                      <div className={clsx(classes.marginLeft, classes.switchWrapper)}>
                        <div className={classes.switchLabel}>追記</div>
                        <Switch
                          checked={appendingSwitchValues.stderr}
                          color='primary'
                          onChange={handleChangeAppendingValues('stderr')}
                          value='appending-stderr'
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </Paper>
      </Popover>
    </div>
  )
}

PipeComponent.propTypes = propTypes
PipeComponent.defaultProps = defaultProps

export default PipeComponent
