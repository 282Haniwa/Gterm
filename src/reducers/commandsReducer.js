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
    commandList: action.payload.value.clearGarbage()
  }
}

const actionMap = {
  [ActionTypes.SET_COMMAND_LIST]: setCommandList
}

const guiReducer = (state = initialState, action) => {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state
}

export default guiReducer
