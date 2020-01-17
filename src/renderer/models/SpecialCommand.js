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
    return `${this.command} ${this.info} ${this.pipe.toString()}`
  }
}

export default SpecialCommand
