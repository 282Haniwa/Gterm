import { ActionTypes } from 'src/actions/gui'
import { ui } from 'src/static'
import { NormalCommand } from 'src/models'

const initialState = {
  viewSize: {
    root: {
      height: 0,
      width: 0,
      offsetX: 0,
      offsetY: 0
    },
    group: {
      height: 0,
      width: ui.group.width,
      offsetX: 0,
      offsetY: 0
    },
    palette: {
      height: 0,
      width: ui.palette.width,
      offsetX: ui.group.width,
      offsetY: 0
    },
    canvas: {
      height: 0,
      width: 0,
      offsetX: ui.group.width + ui.palette.width,
      offsetY: 0
    }
  },
  dragBlock: {
    ref: {
      command: null,
      runnableUnit: null
    },
    info: {
      isDragged: false,
      data: new NormalCommand()
    }
  }
}

const setViewSize = (state, action) => {
  return {
    ...state,
    viewSize: {
      root: {
        ...state.viewSize.root,
        height: action.payload.height,
        width: action.payload.width
      },
      group: {
        ...state.viewSize.group,
        height: action.payload.height
      },
      palette: {
        ...state.viewSize.palette,
        height: action.payload.height
      },
      canvas: {
        ...state.viewSize.canvas,
        height: action.payload.height,
        width: action.payload.width - state.viewSize.canvas.offsetX
      }
    }
  }
}

const setBlockInfo = (state, action) => {
  const data = new NormalCommand(action.payload.value.data)
  return {
    ...state,
    dragBlock: {
      ...state.dragBlock,
      info: {
        ...state.dragBlock.info,
        ...action.payload.value,
        data: data
      }
    }
  }
}

const setTrackingBlockRef = (state, action) => {
  return {
    ...state,
    dragBlock: {
      ...state.dragBlock,
      ref: {
        ...state.dragBlock.ref,
        ...action.payload.value
      }
    }
  }
}

const actionMap = {
  [ActionTypes.SET_VIEW_SIZE]: setViewSize,
  [ActionTypes.SET_BLOCK_INFO]: setBlockInfo,
  [ActionTypes.SET_TRACKING_BLOCK_REF]: setTrackingBlockRef
}

const guiReducer = (state = initialState, action) => {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state
}

export default guiReducer
