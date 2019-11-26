const key = 'commands'

export const ActionTypes = {
  ADD_COMMAND: `${key}/ADD_COMMAND`,
  INSERT_COMMAND: `${key}/INSERT_COMMAND`,
  MOVE_COMMAND: `${key}/MOVE_COMMAND`,
  UPDATE_COMMAND: `${key}/UPDATE_COMMAND`,
  REMOVE_COMMAND: `${key}/REMOVE_COMMAND`
}

export const addCommand = command => ({
  type: ActionTypes.ADD_COMMAND,
  payload: {
    command: command
  }
})

export const insertCommand = (index, command) => ({
  type: ActionTypes.INSERT_COMMAND,
  payload: {
    index: index,
    command: command
  }
})

export const moveCommand = (index, to) => ({
  type: ActionTypes.MOVE_COMMAND,
  payload: {
    index: index,
    to: to
  }
})

export const updateCommand = (index, command) => ({
  type: ActionTypes.UPDATE_COMMAND,
  payload: {
    index: index,
    command: command
  }
})

export const removeCommand = index => ({
  type: ActionTypes.REMOVE_COMMAND,
  payload: {
    index: index
  }
})
