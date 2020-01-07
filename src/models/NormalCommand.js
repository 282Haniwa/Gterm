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
    const aCommand = this.clearEmptyArg()
    const pipeString = aCommand.pipe.toString()
    const argsString = aCommand.args.join(' ')
    return `${aCommand.command}${argsString && ` ${argsString}`}${pipeString && ` ${pipeString}`}`
  }
}

export default NormalCommand
