import { combineReducers } from 'redux'
import gui from './guiReducer'
import cui from './cuiReducer'
import commands from './commandsReducer'

export default combineReducers({
  gui,
  cui,
  commands
})
