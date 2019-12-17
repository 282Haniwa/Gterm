import { Record } from 'immutable'
import uuidv4 from 'uuid/v4'
import PipeData from './PipeData'

const defaultPipeUnitData = {
  type: 'Pipe',
  id: '',
  stdin: null,
  stdout: null,
  stderr: null,
  other: ''
}

const PipeRecord = Record(defaultPipeUnitData)

const inputPipeStringMap = {
  file: data => ` < ${data.toString()}`
}

const redirectSymbol = data => (data.appending ? '>>' : '>')

/**
 * outputPipeStringMap[stdoutSelected][stderrSelected]
 * いくつか理想的な使い方でないものがある
 * 特に、次のコマンドに渡すものがないパターンはパイプでつなぐべきではない
 * 現状、次のコマンドにデータを渡さないものは使われないようにしているので正しく動作するか確認していない
 */
const outputPipeStringMap = {
  next: {
    next: () => '2>&1 |',
    terminal: () => '|',
    file: (stdout, stderr) => `2${redirectSymbol(stderr)} ${stderr.fileName} |`
  },
  terminal: {
    // あまりよくはない(stdoutをターミナルに出して、stderrを使うuse caseはまずないはず)
    next: () => '3>&1 1>&2 2>&3 |',
    // 最後のコマンドの時のみ
    terminal: () => '',
    // あまりよくはない(stdoutをターミナルに出して、stderrを使うuse caseはまずないはず)
    file: stdout => `1>&2 2${redirectSymbol(stdout)} ${stdout.fileName} |`
  },
  file: {
    next: stdout => `2>&1 ${redirectSymbol(stdout)} ${stdout.fileName} |`,
    // 最後のコマンドの時のみ
    terminal: stdout => `${redirectSymbol(stdout)} ${stdout.fileName}`,
    // 最後のコマンドの時のみ
    // eslint-disable-next-line prettier/prettier
    file: (stdout, stderr) =>
      `${redirectSymbol(stdout)} ${stdout.fileName} 2${redirectSymbol(stderr)} ${stderr.fileName}`
  }
}

class Pipe extends PipeRecord {
  constructor(data, { prev, next } = { prev: false, next: false }) {
    if (Pipe.isPipe(data)) {
      super(data)
    } else {
      const stdin = prev
        ? new PipeData({ selected: 'prev' })
        : new PipeData({ selected: 'terminal' })
      const stdout = next
        ? new PipeData({ selected: 'next' })
        : new PipeData({ selected: 'terminal' })
      const stderr = new PipeData({ selected: 'terminal' })
      super({
        ...data,
        type: 'Pipe',
        id: uuidv4(),
        stdin: stdin,
        stdout: stdout,
        stderr: stderr
      })
    }
  }

  static isPipe(object) {
    return object instanceof Pipe
  }

  resetSelected({ prev, next } = { prev: false, next: false }) {
    const stdin = prev ? new PipeData({ selected: 'prev' }) : new PipeData({ selected: 'terminal' })
    const stdout = next
      ? new PipeData({ selected: 'next' })
      : new PipeData({ selected: 'terminal' })
    const stderr = new PipeData({ selected: 'terminal' })
    return this.merge({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr
    })
  }

  toString({ stdin = true, stdout = true, stderr = true } = {}) {
    if (this.other) {
      return this.other
    }

    let str = ''
    if (stdin && inputPipeStringMap[this.stdin.selected]) {
      str = `${inputPipeStringMap[this.stdin.selected](this.stdin)} `
    }
    if (stdout && stderr) {
      const pipeString = outputPipeStringMap[this.stdout.selected][this.stderr.selected](
        this.stdout,
        this.stderr
      )
      str = `${str}${pipeString}`
    }
    return str
  }
}

export default Pipe
