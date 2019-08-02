import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

const HelloWorld = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>
        HelloWorld!!
      </h1>
    </div>
  )
}

export default HelloWorld
