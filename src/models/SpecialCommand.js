import Command from './Command'

class SpecialCommand extends Command {
  constructor(data) {
    super({
      ...data,
      type: 'SpecialCommand'
    })
  }

  toString() {
    return `${this.command} ${this.info} ${this.pipe.toString({
      prev: this.existence.prev,
      next: this.existence.next
    })}`
  }
}

export default SpecialCommand
