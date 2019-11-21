import CommandFactory from './CommandFactory'

const defaultNormalCommandData = {
  type: 'Command',
  id: '',
  command: '',
  pipe: {
    stdin: null,
    stdout: null,
    stderr: null
  },
  args: []
}

class NormalCommand extends CommandFactory(defaultNormalCommandData) {
  toString() {
    return `${this.command} ${this.args.join(' ')}`
  }
}

export default NormalCommand
