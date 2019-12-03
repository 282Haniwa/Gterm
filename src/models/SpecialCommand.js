import Command from './Command'

class SpecialCommand extends Command {
  constructor(data) {
    super({
      ...data,
      type: 'SpecialCommand'
    })
  }

  toString() {
    return `${this.command} ${this.info}`
  }
}

export default SpecialCommand
