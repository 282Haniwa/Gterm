import { Record } from 'immutable'

const defaultCommandData = {
  type: 'Command',
  id: '',
  command: '',
  args: [],
  pipe: {
    stdin: null,
    stdout: null,
    stderr: null
  }
}

const CommandRecord = Record(defaultCommandData)

export default CommandRecord
