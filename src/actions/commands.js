const key = 'commands'

export const ActionTypes = {
  PUSH_RUNNABLE_UNIT: `${key}/PUSH_RUNNABLE_UNIT`,
  INSERT_RUNNABLE_UNIT: `${key}/INSERT_RUNNABLE_UNIT`,
  MOVE_RUNNABLE_UNIT: `${key}/MOVE_RUNNABLE_UNIT`,
  SET_RUNNABLE_UNIT: `${key}/SET_RUNNABLE_UNIT`,
  REMOVE_RUNNABLE_UNIT: `${key}/REMOVE_RUNNABLE_UNIT`
}

export const pushRunnableUnit = command => ({
  type: ActionTypes.PUSH_RUNNABLE_UNIT,
  payload: {
    command: command
  }
})

export const insertRunnableUnit = (index, command) => ({
  type: ActionTypes.INSERT_RUNNABLE_UNIT,
  payload: {
    index: index,
    command: command
  }
})

export const moveRunnableUnit = (index, to) => ({
  type: ActionTypes.MOVE_RUNNABLE_UNIT,
  payload: {
    index: index,
    to: to
  }
})

export const setRunnableUnit = (index, command) => ({
  type: ActionTypes.SET_RUNNABLE_UNIT,
  payload: {
    index: index,
    command: command
  }
})

export const removeRunnableUnit = index => ({
  type: ActionTypes.REMOVE_RUNNABLE_UNIT,
  payload: {
    index: index
  }
})
