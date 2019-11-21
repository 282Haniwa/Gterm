import { Record } from 'immutable'

const defaultCommandData = {
  type: '',
  id: '',
  command: '',
  pipe: {
    stdin: null,
    stdout: null,
    stderr: null
  }
}

const CommandRecord = extendsRecords => Record({ ...defaultCommandData, ...extendsRecords })

const CommandFactory = extendsProps =>
  class extends CommandRecord(extendsProps) {
    toString() {
      return `${this.command}`
    }
  }

export default CommandFactory
