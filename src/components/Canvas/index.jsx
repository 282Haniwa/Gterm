import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import CommandList from '../CommandList'
import { commandList } from '../../mock'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    width: 'max-content',
    overflow: 'auto'
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

const Canvas = props => {
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
      <CommandList data={commandList} />
    </div>
  )
}

Canvas.propTypes = propTypes
Canvas.defaultProps = defaultProps

export default makeBlockDroppable(Canvas)
