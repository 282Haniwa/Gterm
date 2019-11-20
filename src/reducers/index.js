import { combineReducers } from 'redux'
import gui from './guiReducer'
import commands from './commandsReducer'

export default combineReducers({
  gui,
  commands
})
