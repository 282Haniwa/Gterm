import { combineReducers } from 'redux'
import test from './testReducer'
import gui from './guiReducer'

export default combineReducers({
  test,
  gui
})
