const key = 'gui'

export const ActionTypes = {
  SET_VIEW_SIZE: `${key}/SET_VIEW_SIZE`,
  SET_TRACKING_BLOCK_REF: `${key}/SET_TRACKING_BLOCK_REF`,
  SET_BLOCK_INFO: `${key}/SET_BLOCK_INFO`
}

export const setViewSize = ({ height, width }) => ({
  type: ActionTypes.SET_VIEW_SIZE,
  payload: {
    height: height,
    width: width
  }
})

export const setTrackingBlockRef = value => ({
  type: ActionTypes.SET_TRACKING_BLOCK_REF,
  payload: {
    value: value
  }
})

export const setBlockInfo = value => ({
  type: ActionTypes.SET_BLOCK_INFO,
  payload: {
    value: value
  }
})
