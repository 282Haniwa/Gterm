import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrackingBlockRef } from 'src/actions/gui'
import Block from 'src/components/Block'

const DragTrackingBlock = props => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  useEffect(() => {
    dispatch(setTrackingBlockRef({ command: ref }))

    return () => {
      dispatch(setTrackingBlockRef({ command: null }))
    }
  }, [dispatch])

  return <Block ref={ref} {...props} />
}

DragTrackingBlock.displayName = 'DragTrackingBlock'

export default DragTrackingBlock
