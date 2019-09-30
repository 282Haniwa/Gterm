import { ActionTypes } from 'src/actions/gui'
import { ui } from 'src/static'

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
    target: null,
    info: {
      isDragged: false,
      display: false,
      type: '',
      offsetX: 0,
      offsetY: 0
    },
    position: {
      x: 0,
      y: 0
    }
  }
}

const setViewSize = (state, action) => {
  return {
    ...state,
    viewSize: {
      root: {
        ...state.viewSize.root,
        height: action.value.height,
        width: action.value.width
      },
      group: {
        ...state.viewSize.group,
        height: action.value.height
      },
      palette: {
        ...state.viewSize.palette,
        height: action.value.height
      },
      canvas: {
        ...state.viewSize.canvas,
        height: action.value.height,
        width: action.value.width - state.viewSize.canvas.offsetX
      }
    }
  }
}

const setBlockInfo = (state, action) => {
  return {
    ...state,
    dragBlock: {
      ...state.dragBlock,
      info: {
        ...state.dragBlock.info,
        ...action.value
      }
    }
  }
}

const setDragTarget = (state, action) => {
  return {
    ...state,
    dragBlock: {
      ...state.dragBlock,
      target: action.value
    }
  }
}

const blockMoveBy = (state, action) => {
  return {
    ...state,
    dragBlock: {
      ...state.dragBlock,
      target: action.value,
      position: {
        x: state.dragBlock.position.x + action.value.x,
        y: state.dragBlock.position.y + action.value.y
      }
    }
  }
}

const blockMoveTo = (state, action) => {
  return {
    ...state,
    dragBlock: {
      ...state.dragBlock,
      target: action.value,
      position: {
        x: action.value.x,
        y: action.value.y
      }
    }
  }
}

const actionMap = {
  [ActionTypes.SET_VIEW_SIZE]: setViewSize,
  [ActionTypes.SET_BLOCK_INFO]: setBlockInfo,
  [ActionTypes.SET_DRAG_TARGET]: setDragTarget,
  [ActionTypes.BLOCK_MOVE_BY]: blockMoveBy,
  [ActionTypes.BLOCK_MOVE_TO]: blockMoveTo
}

const guiReducer = (state = initialState, action) => {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state
}

export default guiReducer
