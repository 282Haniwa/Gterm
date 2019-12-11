import { Record, List } from 'immutable'
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
      super(
        data.merge({
          pipe: new Pipe(data.pipe, { prev: data.existence.prev, next: data.existence.next }),
          args: List(data.args)
        })
      )
      return
    }
    super({
      ...data,
      id: uuidv4(),
      pipe: new Pipe(data.pipe, {
        prev: data.existence && data.existence.prev,
        next: data.existence && data.existence.next
      }),
      args: List(data.args)
    })
  }

  static isCommand(object) {
    return object instanceof Command
  }

  updateExistence({ prev, next } = { prev: false, next: false }) {
    return this.merge({
      existence: {
        prev: prev,
        next: next
      },
      pipe: this.pipe.resetSelected({ prev: prev, next: next })
    })
  }

  addArg(arg = '') {
    if (this.args.last() === '') {
      return this
    }
    return this.set('args', this.args.push(arg))
  }

  setArg(index, arg) {
    return this.set('args', this.args.set(index, arg)).clearEmptyArg(true)
  }

  clearEmptyArg(leaveLast = false) {
    return this.set(
      'args',
      this.args.filter((arg, index) => {
        if (leaveLast && index === this.args.size - 1) {
          return true
        }
        return arg !== ''
      })
    )
  }

  toString() {
    return `${this.command} ${this.pipe.toString()}`
  }
}

export default Command
