export const ActionTypes = {
  SET_VIEW_SIZE: 'gui/SET_VIEW_SIZE',
  SET_DRAG_TARGET: 'gui/SET_DRAG_TARGET',
  SET_BLOCK_INFO: 'gui/SET_BLOCK_INFO',
  BLOCK_MOVE_BY: 'gui/BLOCK_MOVE_BY',
  BLOCK_MOVE_TO: 'gui/BLOCK_MOVE_TO'
}

export const setViewSize = ({ height, width }) => ({
  type: ActionTypes.SET_VIEW_SIZE,
  value: {
    height,
    width
  }
})

export const setDragBlock = element => ({
  type: ActionTypes.SET_DRAG_TARGET,
  value: element
})

export const setBlockInfo = value => ({
  type: ActionTypes.SET_BLOCK_INFO,
  value: value
})

export const blockMoveBy = ({ x, y }) => ({
  type: ActionTypes.BLOCK_MOVE_BY,
  value: {
    x,
    y
  }
})

export const blockMoveTo = ({ x, y }) => ({
  type: ActionTypes.BLOCK_MOVE_TO,
  value: {
    x,
    y
  }
})