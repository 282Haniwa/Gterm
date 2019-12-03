import Command from './Command'

class NormalCommand extends Command {
  constructor(data) {
    super({
      ...data,
      type: 'NormalCommand'
    })
  }

  toString() {
    return `${this.command} ${this.args.join(' ')} ${this.pipe.toString({
      stdin: this.existence.prev,
      stdout: this.existence.next,
      stderr: this.existence.next
    })}`
  }
}

export default NormalCommand
