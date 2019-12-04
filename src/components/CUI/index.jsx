import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { ipcRenderer } from 'electron'
import { addXterm } from 'src/actions/cui'

const propTypes = {
  id: PropTypes.string.isRequired
}

const defaultProps = {}

const CUI = props => {
  const { id, ...other } = props
  const dispatch = useDispatch()

  const initializeTerminal = useCallback(() => {
    const ptyId = 'PTY1'
    const xterm = new Terminal()
    const fitAddon = new FitAddon()
    xterm.loadAddon(fitAddon)
    xterm.open(document.getElementById(id))
    fitAddon.fit()
    xterm.onData(data => {
      console.log(`${ptyId}_STDIN code: `, data.charCodeAt())
      ipcRenderer.send(`${ptyId}_STDIN`, data)
    })
    ipcRenderer.on(`${ptyId}_STDOUT`, (event, data) => {
      console.log(`${ptyId}_STDOUT    : `, data)
      xterm.write(data)
    })
    ipcRenderer.send('OPEN_PTY', ptyId)
    dispatch(addXterm(ptyId, xterm))
  }, [dispatch, id])

  useEffect(() => {
    initializeTerminal()
  }, [initializeTerminal])

  return <div id={id} {...other} />
}

CUI.propTypes = propTypes
CUI.defaultProps = defaultProps

export default CUI
