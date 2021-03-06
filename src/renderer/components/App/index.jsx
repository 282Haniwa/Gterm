import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MenuBar from 'src/components/MenuBar'
import GUI from 'src/components/GUI'
import CUI from 'src/components/CUI'
import { ui } from 'src/static'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw'
  },
  menuBar: {
    height: ui.menuBar.height
  },
  menuBarFake: {
    height: ui.menuBar.height
  },
  content: {
    display: 'flex',
    height: ui.content.height,
    width: ui.content.width
  },
  gui: {
    height: ui.gui.height,
    width: ui.gui.width
  },
  cui: {
    height: '50%',
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
        <CUI className={classes.cui} id='cui' />
      </div>
    </div>
  )
}

export default App
