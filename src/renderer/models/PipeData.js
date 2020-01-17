import { Record } from 'immutable'
import uuidv4 from 'uuid/v4'

const defaultPipeDataUnitData = {
  type: 'PipeData',
  id: '',
  selected: 'terminal',
  fileName: '',
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

  static isPipeData(object) {
    return object instanceof PipeData
  }

  setSelected(value) {
    return this.set('selected', value)
  }

  setFile(fileName, appending = false) {
    return this.merge({
      selected: 'file',
      fileName: fileName,
      appending: appending
    })
  }

  toString() {
    if (this.selected === 'file') {
      return this.fileName
    }
    return ''
  }
}

export default PipeData
