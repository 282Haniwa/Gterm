import React, { forwardRef } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(() => ({
  root: {
    width: 64,
    height: 64,
    backgroundColor: 'aqua'
  }
}))

const Block = forwardRef((props, ref) => {
  const classes = useStyles()
  return <div className={classes.root} ref={ref} {...props} />
})

export default Block
