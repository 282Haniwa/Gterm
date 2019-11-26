import { Record, Map, List } from 'immutable'
import NormalCommand from './NormalCommand'
import SpecialCommand from './SpecialCommand'

const defaultRunnableUnitData = {
  type: 'RunnableUnit',
  id: '',
  commandMap: Map(),
  commands: List()
}

const RunnableUnitRecord = Record(defaultRunnableUnitData)

const commandSelector = data => {
  if (data.type === 'NormalCommand') {
    return new NormalCommand(data)
  }

  if (data.type === 'SpecialCommand') {
    return new SpecialCommand(data)
  }

  return null
}

class RunnableUnit extends RunnableUnitRecord {
  constructor(data) {
    if (data.type === 'NormalCommand' || data.type === 'SpecialCommand') {
      super({
        type: 'RunnableUnit',
        id: data.id,
        commandMap: Map({
          [data.id]: commandSelector(data)
        }),
        commands: List([data.id])
      })
      return
    }

    super({
      type: 'RunnableUnit',
      id: data.id,
      commandMap: Map(data.commandMap).map(value => commandSelector(value)),
      commands: List(data.commands)
    })
  }
}

export default RunnableUnit
