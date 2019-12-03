import Command from './Command'

class NormalCommand extends Command {
  constructor(data) {
    super({
      ...data,
      type: 'NormalCommand'
    })
  }

  toString() {
    return `${this.command} ${this.pipe.toString({
      prev: this.existence.prev,
      next: this.existence.next
    })}`
  }
}

export default NormalCommand
