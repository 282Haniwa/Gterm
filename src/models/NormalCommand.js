import Command from './Command'

class NormalCommand extends Command {
  constructor(data) {
    super({
      ...data,
      type: 'NormalCommand'
    })
  }

  toString() {
    return `${this.command} ${this.args.join(' ')}`
  }
}

export default NormalCommand
