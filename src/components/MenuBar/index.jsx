import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})

const MenuBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar color='default' position='static'>
        <Toolbar>
          <Typography color='inherit' variant='h6'>
            Bash GUI
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuBar
