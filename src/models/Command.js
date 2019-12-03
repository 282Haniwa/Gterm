import { Record } from 'immutable'
import uuidv4 from 'uuid/v4'
import Pipe from './Pipe'

const defaultCommandData = {
  type: 'Command',
  id: '',
  command: '',
  existence: {
    prev: false,
    next: false
  },
  pipe: {},
  args: [],
  info: {},
  content: []
}

const CommandRecord = Record(defaultCommandData)

class Command extends CommandRecord {
  constructor(data) {
    if (Command.isCommand(data)) {
      super({
        ...data,
        pipe: new Pipe(data.pipe, { prev: data.existence.prev, next: data.existence.next })
      })
      return
    }
    super({
      ...data,
      id: uuidv4(),
      pipe: new Pipe(data.pipe, {
        prev: data.existence && data.existence.prev,
        next: data.existence && data.existence.next
      })
    })
  }

  static isCommand(object) {
    return object instanceof Command
  }

  toString() {
    return `${this.command} ${this.pipe.toString({
      prev: this.existence.prev,
      next: this.existence.next
    })}`
  }
}

export default Command
