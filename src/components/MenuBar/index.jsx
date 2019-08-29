import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const MenuBar = props => (
  <AppBar color='default' position='absolute' {...props}>
    <Toolbar>
      <Typography color='inherit' variant='h6'>
        {'Bash GUI'}
      </Typography>
    </Toolbar>
  </AppBar>
)

export default MenuBar
