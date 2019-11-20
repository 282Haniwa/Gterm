import { Record } from 'immutable'

const defaultRunnableUnitData = {
  type: 'RunnableUnit',
  commandMap: {},
  commands: []
}

const RunnableUnitRecord = Record(defaultRunnableUnitData)

export default RunnableUnitRecord
