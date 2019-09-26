import React from 'react'
import Block from 'src/components/Block'
import makeBlockDraggable from 'src/helper/makeBlockDraggable'

const DraggableBlock = props => {
  return (
    <Block {...props} />
  )
}

export default makeBlockDraggable(DraggableBlock)
