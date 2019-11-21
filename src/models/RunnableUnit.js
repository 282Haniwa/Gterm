import { Record, Map } from 'immutable'
import NormalCommand from './NormalCommand'
import SpecialCommand from './SpecialCommand'

const defaultRunnableUnitData = {
  type: 'RunnableUnit',
  commandMap: {},
  commands: []
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
  constructor(runnableUnit) {
    const data = runnableUnit.type === 'RunnableUnit' ? runnableUnit : {}
    super({
      type: 'RunnableUnit',
      commandMap: Map(data.commandMap).map(value => commandSelector(value)),
      commands: data.commands
    })
  }
}

export default RunnableUnit
