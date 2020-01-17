import React from 'react'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '48px',
    lineHeight: '48px',
    width: '64px',
    padding: `0 ${theme.spacing(0.5)}px`,
    boxSizing: 'border-box',
    textAlign: 'center',
    backgroundColor: 'black',
    fontSize: '11px',
    color: 'white'
  }
}))

const Terminal = () => {
  const classes = useStyles()

  return <div className={classes.root}>{'Terminal'}</div>
}

export default Terminal
