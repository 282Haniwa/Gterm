export const ActionTypes = {
  SET_VIEW_SIZE: 'gui/SET_VIEW_SIZE',
  SET_TRACKING_BLOCK_REF: 'gui/SET_TRACKING_BLOCK_REF',
  SET_BLOCK_INFO: 'gui/SET_BLOCK_INFO'
}

export const setViewSize = ({ height, width }) => ({
  type: ActionTypes.SET_VIEW_SIZE,
  value: {
    height,
    width
  }
})

export const setTrackingBlockRef = value => ({
  type: ActionTypes.SET_TRACKING_BLOCK_REF,
  value: value
})

export const setBlockInfo = value => ({
  type: ActionTypes.SET_BLOCK_INFO,
  value: value
})
