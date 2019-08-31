import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const makeDraggable = Component => {
  const propTypes = {
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func
  }

  const DraggableComponent = props => {
    const {
      onDrag,
      onDragEnd,
      onDragStart,
      ...other
    } = props
    const [isDragged, setIsDragged] = useState(false)

    const handleDragStart = useCallback(event => {
      if (onDragStart) {
        setIsDragged(true)
        onDragStart(event)
      }
    }, [onDragStart])

    const handleDrag = useCallback(event => {
      if (onDrag && isDragged) {
        if (event.buttons === 0) {
          setIsDragged(false)
          return
        }
        onDrag(event)
      }
    }, [onDrag, isDragged])

    const handleDragEnd = useCallback(event => {
      if (onDragEnd && isDragged) {
        setIsDragged(false)
        onDragEnd(event)
      }
    }, [onDragEnd, isDragged])

    useEffect(() => {
      window.addEventListener('mousemove', handleDrag)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('mouseleave', handleDragEnd)

      return () => {
        window.removeEventListener('mousemove', handleDrag)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('mouseleave', handleDragEnd)
      }
    }, [handleDrag, handleDragEnd])

    return <Component onMouseDown={handleDragStart} {...other} />
  }

  DraggableComponent.propTypes = propTypes
  DraggableComponent.displayName = `Draggable-${Component.displayName || Component.name}`

  return DraggableComponent
}

export default makeDraggable
