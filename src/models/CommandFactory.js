import { Record } from 'immutable'
import uuidv4 from 'uuid/v4'

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
    constructor(data) {
      if (Record.isRecord(data)) {
        super(data)
        return
      }
      super({
        ...data,
        id: uuidv4()
      })
    }

    toString() {
      return `${this.command}`
    }
  }

export default CommandFactory
