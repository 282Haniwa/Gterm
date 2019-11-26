import { ActionTypes } from 'src/actions/commands'
import { CommandList } from 'src/models'
import { commandList } from 'src/mock'

const initialState = {
  // commandList: new CommandList()
  commandList: new CommandList(commandList)
}

const addCommand = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.push(action.payload.command)
  }
}

const insertCommand = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.insert(action.payload.index, action.payload.command)
  }
}

const moveCommand = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.move(action.payload.index, action.payload.to)
  }
}

const updateCommand = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.update(action.payload.index, action.payload.command)
  }
}

const removeCommand = (state, action) => {
  return {
    ...state,
    commandList: state.commandList.remove(action.payload.index)
  }
}

const actionMap = {
  [ActionTypes.ADD_COMMAND]: addCommand,
  [ActionTypes.INSERT_COMMAND]: insertCommand,
  [ActionTypes.MOVE_COMMAND]: moveCommand,
  [ActionTypes.UPDATE_COMMAND]: updateCommand,
  [ActionTypes.REMOVE_COMMAND]: removeCommand
}

const guiReducer = (state = initialState, action) => {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state
}

export default guiReducer
