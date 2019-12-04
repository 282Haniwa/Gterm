const key = 'cui'

export const ActionTypes = {
  ADD_XTERM: `${key}/ADD_XTERM`,
  REMOVE_XTERM: `${key}/REMOVE_XTERM`
}

export const addXterm = (id, xterm) => ({
  type: ActionTypes.ADD_XTERM,
  payload: {
    value: {
      id: id,
      xterm: xterm
    }
  }
})

export const removeXterm = id => ({
  type: ActionTypes.REMOVE_XTERM,
  payload: {
    value: id
  }
})
