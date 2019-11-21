import CommandFactory from './CommandFactory'

const defaultSpecialCommandData = {
  type: 'SpecialCommand',
  id: '',
  command: '',
  pipe: {
    stdin: null,
    stdout: null,
    stderr: null
  },
  info: {},
  content: []
}

class SpecialCommand extends CommandFactory(defaultSpecialCommandData) {
  toString() {
    return `${this.command} ${this.info}`
  }
}

export default SpecialCommand
