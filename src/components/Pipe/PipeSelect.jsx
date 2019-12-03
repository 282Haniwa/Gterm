import React from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const propTypes = {
  next: PropTypes.bool,
  onChange: PropTypes.func,
  prev: PropTypes.bool,
  stderr: PropTypes.bool,
  stdin: PropTypes.bool,
  stdout: PropTypes.bool
}

const defaultProps = {
  next: false,
  prev: false,
  stderr: false,
  stdin: false,
  stdout: false
}

const PipeSelect = props => {
  const { next, prev, stderr, stdin, stdout, ...other } = props

  return (
    <Select {...other}>
      <MenuItem value='terminal'>ターミナル画面</MenuItem>
      <MenuItem value='file'>ファイル</MenuItem>
      {(stdout || stderr) && <MenuItem value='/dev/null'>出力を捨てる</MenuItem>}
      {/* {stdin && prev && <MenuItem value='prev'>前のコマンド</MenuItem>} */}
      {(stdout || stderr) && next && <MenuItem value='next'>次のコマンド</MenuItem>}
    </Select>
  )
}

PipeSelect.propTypes = propTypes
PipeSelect.defaultProps = defaultProps

export default PipeSelect
