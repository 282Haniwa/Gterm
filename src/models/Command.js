import { Record } from 'immutable'
import uuidv4 from 'uuid/v4'
import Pipe from './Pipe'

const defaultCommandData = {
  type: 'Command',
  id: '',
  command: '',
  pipe: {},
  args: [],
  info: {},
  content: []
}

const CommandRecord = Record(defaultCommandData)

class Command extends CommandRecord {
  constructor(data) {
    if (Record.isRecord(data)) {
      super({
        ...data,
        pipe: new Pipe(data.pipe)
      })
      return
    }
    super({
      ...data,
      id: uuidv4(),
      pipe: new Pipe(data.pipe)
    })
  }

  static isCommand(object) {
    return object instanceof Command
  }

  toString() {
    return `${this.command}`
  }
}

export default Command
