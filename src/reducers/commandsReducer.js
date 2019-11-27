import { ActionTypes } from 'src/actions/commands'
import { CommandList } from 'src/models'
import { commandList } from 'src/mock'

const initialState = {
  // commandList: new CommandList()
  commandList: new CommandList(commandList)
}

const setCommandList = (state, action) => {
  return {
    ...state,
    commandList: action.payload.value
  }
}

const pushRunnableUnit = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.pushItem(action.payload.command)
  }
}

const insertRunnableUnit = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.insertItem(action.payload.index, action.payload.command)
  }
}

const moveRunnableUnit = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.moveItem(action.payload.index, action.payload.to)
  }
}

const setRunnableUnit = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.setItem(action.payload.index, action.payload.command)
  }
}

const removeRunnableUnit = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.removeItem(action.payload.index)
  }
}

const actionMap = {
  [ActionTypes.SET_COMMAND_LIST]: setCommandList,
  [ActionTypes.PUSH_RUNNABLE_UNIT]: pushRunnableUnit,
  [ActionTypes.INSERT_RUNNABLE_UNIT]: insertRunnableUnit,
  [ActionTypes.MOVE_RUNNABLE_UNIT]: moveRunnableUnit,
  [ActionTypes.SET_RUNNABLE_UNIT]: setRunnableUnit,
  [ActionTypes.REMOVE_RUNNABLE_UNIT]: removeRunnableUnit
}

const guiReducer = (state = initialState, action) => {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state
}

export default guiReducer
