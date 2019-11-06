import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import makeBlockDroppable from 'src/helper/makeBlockDroppable'
import CommandList from '../CommandList'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem'
  }
}))

const propTypes = {
  height: PropTypes.number,
  rectProps: PropTypes.object,
  width: PropTypes.number
}

const defaultProps = {
  height: '100%',
  rectProps: {},
  width: '100%'
}

const Canvas = props => {
  const { rectProps, height, width, ...other } = props
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{
        height: height,
        width: width
      }}
    >
      <CommandList />
      <svg height={height} width={width} xmlns='http://www.w3.org/2000/svg' {...other}>
        <rect fill='#fafafa' height={height} name='canvas' width={width} {...rectProps} />
      </svg>
    </div>
  )
}

Canvas.propTypes = propTypes
Canvas.defaultProps = defaultProps

export default makeBlockDroppable(Canvas)
