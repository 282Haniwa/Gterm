import { ActionTypes } from 'src/actions/cui'

const initialState = {
  xtermList: []
}

const addXterm = (state, action) => {
  return {
    ...state,
    xtermList: [...state.xtermList, action.payload.value]
  }
}

const removeXterm = (state, action) => {
  return {
    ...state,
    xtermList: state.xtermList.filter(value => value.id === action.payload.value)
  }
}

const actionMap = {
  [ActionTypes.ADD_XTERM]: addXterm,
  [ActionTypes.REMOVE_XTERM]: removeXterm
}

const cuiReducer = (state = initialState, action) => {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state
}

export default cuiReducer
