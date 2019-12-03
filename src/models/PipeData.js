import { Record } from 'immutable'
import uuidv4 from 'uuid/v4'
import path from 'path'

const defaultPipeDataUnitData = {
  type: 'PipeData',
  id: '',
  selected: 'terminal',
  path: '',
  name: '',
  appending: false,
  string: ''
}

const PipeDataRecord = Record(defaultPipeDataUnitData)

class PipeData extends PipeDataRecord {
  constructor(data) {
    super({
      ...data,
      type: 'PipeData',
      id: uuidv4(),
      string: ''
    })
  }

  setSelected(value) {
    return this.set('selected', value)
  }

  setFile(fileName, appending = false) {
    const file = path.parse(fileName)
    return this.merge({
      selected: 'file',
      path: file.dir,
      name: file.base,
      appending: appending
    })
  }

  toString() {
    if (this.selected === 'file') {
      return `${this.path}/${this.name}`
    }
    return ''
  }
}

export default PipeData
