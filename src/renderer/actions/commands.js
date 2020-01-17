const key = 'commands'

export const ActionTypes = {
  SET_COMMAND_LIST: `${key}/SET_COMMAND_LIST`
}

export const setCommandList = commandList => ({
  type: ActionTypes.SET_COMMAND_LIST,
  payload: {
    value: commandList
  }
})
