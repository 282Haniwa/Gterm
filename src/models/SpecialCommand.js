import { Record } from 'immutable'

const defaultSpecialCommandData = {
  type: 'SpecialCommand',
  id: '',
  command: '',
  info: {},
  pipe: {
    stdin: null,
    stdout: null,
    stderr: null
  },
  content: []
}

const SpecialCommandRecord = Record(defaultSpecialCommandData)

export default SpecialCommandRecord
