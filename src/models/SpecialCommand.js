import Command from './Command'

class SpecialCommand extends Command {
  constructor(data) {
    if (Command.isCommand(data)) {
      super(data)
      return
    }

    super({
      ...data,
      type: 'SpecialCommand'
    })
  }

  toString() {
    return `${this.command} ${this.info} ${this.pipe.toString({
      stdin: this.existence.prev,
      stdout: this.existence.next,
      stderr: this.existence.next
    })}`
  }
}

export default SpecialCommand
