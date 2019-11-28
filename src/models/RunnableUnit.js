import { Record, Map, List } from 'immutable'
import uuidv4 from 'uuid/v4'
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
    if (Record.isRecord(data)) {
      if (data.type === 'NormalCommand' || data.type === 'SpecialCommand') {
        const aCommand = commandSelector(data)
        super({
          type: 'RunnableUnit',
          id: uuidv4(),
          commandMap: Map({
            [aCommand.id]: aCommand
          }),
          commands: List([data.id])
        })
        return
      }
    }

    const idMap = {}
    const entries = Map(data.commandMap).mapEntries(entry => {
      const aCommand = commandSelector(entry[1])
      idMap[entry[0]] = aCommand.id
      return [aCommand.id, aCommand]
    })

    if (Record.isRecord(data)) {
      super({
        type: 'RunnableUnit',
        id: data.id,
        commandMap: Map(entries),
        commands: List(data.commands).map(id => idMap[id])
      })
      return
    }

    super({
      type: 'RunnableUnit',
      id: uuidv4(),
      commandMap: Map(entries),
      commands: List(data.commands).map(id => idMap[id])
    })
  }

  getCommand(index) {
    return this.commandMap.get(this.commands.get(index))
  }

  getCommandById(id) {
    return this.commandMap.get(id)
  }

  pushCommand(command) {
    return this.merge({
      commandMap: this.commandMap.set(command.id, command),
      commands: this.commands.push(command.id)
    })
  }

  insertCommand(index, command) {
    return this.merge({
      commandMap: this.commandMap.set(command.id, command),
      commands: this.commands.insert(index, command.id)
    })
  }

  moveCommand(index, to) {
    const moveData = this.commands.get(index)
    return this.set('commands', this.commands.remove(index).insert(to, moveData))
  }

  removeCommand(index) {
    const command = this.getCommand(index)
    return this.merge({
      commandMap: this.commandMap.remove(command.id),
      commands: this.commands.remove(index)
    })
  }

  removeCommandById(id) {
    return this.merge({
      commandMap: this.commandMap.remove(id),
      commands: this.commands.remove(this.commands.indexOf(id))
    })
  }
}

export default RunnableUnit
