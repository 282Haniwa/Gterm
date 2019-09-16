import React from 'react'
import Block from 'src/components/Block'
import makeDraggable from 'src/helper/makeDraggable'

const DraggableBlock = props => (
  <svg height='64' width='64' {...props}>
    <Block />
  </svg>
)
DraggableBlock.displayName = 'Block'

export default makeDraggable(DraggableBlock)
