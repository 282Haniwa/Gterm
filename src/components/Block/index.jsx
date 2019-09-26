import React from 'react'

const Block = props => (
  <g>
    <rect
      height='64'
      width='64'
      {...props}
    />
  </g>
)

export default Block
