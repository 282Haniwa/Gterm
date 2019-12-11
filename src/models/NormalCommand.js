import Command from './Command'

class NormalCommand extends Command {
  constructor(data) {
    if (Command.isCommand(data)) {
      super(data)
      return
    }

    super({
      ...data,
      type: 'NormalCommand'
    })
  }

  toString() {
    return `${this.command} ${this.args.join(' ')} ${this.pipe.toString()}`
  }
}

export default NormalCommand
