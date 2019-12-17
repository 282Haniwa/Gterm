import React from 'react'
import PropTypes from 'prop-types'
import Terminal from './Terminal'
import File from './File'

const propTypes = {
  fileName: PropTypes.string,
  target: PropTypes.string
}

const defaultProps = {
  fileName: '',
  target: ''
}

const PipeTarget = props => {
  const { target, fileName } = props

  if (target === 'terminal') {
    return <Terminal />
  }

  if (target === 'file') {
    return <File fileName={fileName} />
  }

  return null
}

PipeTarget.propTypes = propTypes
PipeTarget.defaultProps = defaultProps

export default PipeTarget
