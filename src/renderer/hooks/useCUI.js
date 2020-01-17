import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ipcRenderer } from 'electron'

const useCUI = () => {
  const xterm = useSelector(state => state.cui.xtermList[0])

  const sendCommand = useCallback(
    (str, send = true) => {
      const commandString = send ? `${str}\n` : str
      ipcRenderer.send(`${xterm.id}_STDIN`, commandString)
    },
    [xterm]
  )

  return { send: sendCommand }
}

export default useCUI
