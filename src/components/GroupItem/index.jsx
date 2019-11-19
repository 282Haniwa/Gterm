import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  groupName: PropTypes.string,
  paletteRef: PropTypes.any
}

const defaultProps = {
  groupName: ''
}

const Group = props => {
  const { groupName, paletteRef, ...other } = props

  const handleClick = useCallback(() => {
    if (paletteRef) {
      const target = paletteRef.getElementById(`palette-${groupName}`)
      paletteRef.current.scrollTo(target)
    }
  }, [groupName, paletteRef])

  return (
    <div onClick={handleClick} {...other}>
      {groupName}
    </div>
  )
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
