import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import { File } from 'src/assets/pipe'
import useCUI from 'src/hooks/useCUI'

const propTypes = {
  fileName: PropTypes.string
}

const defaultProps = {
  fileName: ''
}

const useStyles = makeStyles(() => ({
  root: {
    height: '48px',
    width: '38px',
    boxSizing: 'border-box',
    fontSize: '0.8em'
  },
  button: {
    height: '48px',
    width: '38px',
    padding: '0'
  }
}))

const FileComponent = props => {
  const { fileName } = props
  const classes = useStyles()
  const cui = useCUI()

  const handleClick = useCallback(() => {
    cui.send(`less ${fileName}`)
  }, [cui, fileName])

  return (
    <Tooltip className={classes.root} placement='top' title={fileName}>
      <Button className={classes.button} onClick={handleClick}>
        <File />
      </Button>
    </Tooltip>
  )
}

FileComponent.propTypes = propTypes
FileComponent.defaultProps = defaultProps

export default FileComponent
