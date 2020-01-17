import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@material-ui/core/Button'
import { PipeData } from 'src/models'
import { InputPipe, DefaultOutputPipe, ErrorNextOutputPipe, MergedPipe } from 'src/assets/pipe'
import PipeTarget from './PipeTarget'

const propTypes = {
  first: PropTypes.bool,
  last: PropTypes.bool,
  middle: PropTypes.bool,
  onClick: PropTypes.func,
  stderr: PropTypes.instanceOf(PipeData).isRequired,
  stdin: PropTypes.instanceOf(PipeData).isRequired,
  stdout: PropTypes.instanceOf(PipeData).isRequired
}

const defaultProps = {
  first: false,
  last: false,
  middle: false
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    height: '48px',
    width: '64px',
    padding: '0',
    textTransform: 'none',
    fontFamily: 'monaco, courier-new, courier, monospace'
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  first: {
    width: '48px',
    minWidth: '48px'
  }
}))

const PipeSurface = props => {
  const { first, middle, last, stdin, stdout, stderr, onClick } = props
  const classes = useStyles()

  if (first) {
    return (
      <div className={classes.root}>
        <PipeTarget fileName={stdin.fileName} target={stdin.selected} />
        <Button className={clsx(classes.button, classes.first)} onClick={onClick}>
          <InputPipe />
        </Button>
      </div>
    )
  }

  if (middle || last) {
    if (stdout.selected === 'next' && stderr.selected === 'next') {
      return (
        <div className={classes.root}>
          <Button className={classes.button} onClick={onClick}>
            <MergedPipe />
          </Button>
        </div>
      )
    }

    if (stdout.selected !== 'next' && stderr.selected === 'next') {
      return (
        <div className={classes.root}>
          <div className={classes.innerWrapper}>
            <Button className={classes.button} onClick={onClick}>
              <ErrorNextOutputPipe />
            </Button>
            <PipeTarget fileName={stdout.fileName} target={stdout.selected} />
          </div>
        </div>
      )
    }

    if (stderr.selected !== 'next') {
      return (
        <div className={classes.root}>
          <div className={classes.innerWrapper}>
            <Button className={classes.button} onClick={onClick}>
              <DefaultOutputPipe />
            </Button>
            <PipeTarget fileName={stderr.fileName} target={stderr.selected} />
          </div>
          <PipeTarget fileName={stdout.fileName} target={stdout.selected} />
        </div>
      )
    }
  }

  return 'PIPE'
}

PipeSurface.propTypes = propTypes
PipeSurface.defaultProps = defaultProps

export default PipeSurface
