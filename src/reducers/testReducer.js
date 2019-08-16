import { ActionTypes } from 'src/actions/test'

const initialState = {
  test: 'test'
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.TEST1:
    return Object.assign({}, state, {
      value: action.value
    })
  case ActionTypes.TEST2:
    return Object.assign({}, state, {
      value: action.value
    })
  default:
    return state
  }
}

export default testReducer
