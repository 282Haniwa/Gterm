import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MenuBar from 'src/components/MenuBar'
import GUI from 'src/components/GUI'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw'
  },
  menuBar: {
    height: '56px'
  },
  menuBarFake: {
    height: '56px'
  },
  content: {
    display: 'flex',
    height: '100%'
  },
  gui: {
    width: '50%'
  }
})

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MenuBar className={classes.menuBar} />
      <div className={classes.menuBarFake} />
      <div className={classes.content}>
        <GUI className={classes.gui} />
      </div>
    </div>
  )
}

export default App
