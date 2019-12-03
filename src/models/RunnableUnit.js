import { Record, Map, List } from 'immutable'
import uuidv4 from 'uuid/v4'
import Command from './Command'
import NormalCommand from './NormalCommand'
import SpecialCommand from './SpecialCommand'

const defaultRunnableUnitData = {
  type: 'RunnableUnit',
  id: '',
  commandMap: Map(),
  commands: List()
}

const RunnableUnitRecord = Record(defaultRunnableUnitData)

const commandCreator = (data, { prev, next } = { prev: false, next: false }) => {
  if (Command.isCommand(data)) {
    return data.merge({
      existence: {
        prev: prev,
        next: next
      }
    })
  }

  if (data && data.type === 'NormalCommand') {
    return new NormalCommand({
      ...data,
      existence: {
        prev: prev,
        next: next
      }
    })
  }

  if (data && data.type === 'SpecialCommand') {
    return new SpecialCommand({
      ...data,
      existence: {
        prev: prev,
        next: next
      }
    })
  }

  return null
}

const commandExistence = (index, listSize) => {
  if (listSize === 1) {
    return { prev: false, next: false }
  }
  if (index === 0) {
    return { prev: false, next: true }
  }
  if (index === listSize - 1) {
    return { prev: true, next: false }
  }
  return { prev: true, next: true }
}

class RunnableUnit extends RunnableUnitRecord {
  constructor(data) {
    if (Command.isCommand(data)) {
      const aCommand = commandCreator(data, commandExistence(0, 1))
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

    const commandMap = {}
    const commandList = List(data.commands)
    const commands = commandList.map((commandId, index) => {
      const aCommand = commandCreator(
        Map(data.commandMap).get(commandId),
        commandExistence(index, commandList.size)
      )
      commandMap[aCommand.id] = aCommand
      return aCommand.id
    })

    if (RunnableUnit.isRunnableUnit(data)) {
      super({
        type: 'RunnableUnit',
        id: data.id,
        commandMap: Map(commandMap),
        commands: commands
      })
      return
    }

    super({
      type: 'RunnableUnit',
      id: uuidv4(),
      commandMap: Map(commandMap),
      commands: commands
    })
  }

  static isRunnableUnit(object) {
    return object instanceof RunnableUnit
  }

  getCommandList() {
    return this.commands.map(commandId => this.getCommandById(commandId))
  }

  getCommand(index) {
    return this.commandMap.get(this.commands.get(index))
  }

  getCommandById(id) {
    return this.commandMap.get(id)
  }

  pushCommand(command) {
    const lastCommandId = this.commands.last()
    const listSize = this.commands.size + 1
    return this.merge({
      commandMap: this.commandMap.withMutations(mutator => {
        mutator.set(
          lastCommandId,
          this.commandMap
            .get(lastCommandId)
            .updateExistence(commandExistence(listSize - 2, listSize))
        )
        mutator.set(command.id, command.updateExistence(commandExistence(listSize - 1, listSize)))
      }),
      commands: this.commands.push(command.id)
    })
  }

  insertCommand(index, command) {
    const prevCommandId = this.commands.get(index - 1)
    const nextCommandId = this.commands.get(index)
    const listSize = this.commands.size + 1
    return this.merge({
      commandMap: this.commandMap.withMutations(mutator => {
        if (prevCommandId) {
          mutator.set(
            prevCommandId,
            this.commandMap
              .get(prevCommandId)
              .updateExistence(commandExistence(index - 1, listSize))
          )
        }
        if (nextCommandId) {
          mutator.set(
            nextCommandId,
            this.commandMap
              .get(nextCommandId)
              .updateExistence(commandExistence(index + 1, listSize))
          )
        }
        mutator.set(command.id, command.updateExistence(commandExistence(index, listSize)))
      }),
      commands: this.commands.insert(index, command.id)
    })
  }

  updateCommand(command) {
    return this.set('commandMap', this.commandMap.set(command.id, command))
  }

  moveCommand(index, to) {
    const moveData = this.commands.get(index)
    const prevCommandId = this.commands.get(to - 1)
    const nextCommandId = this.commands.get(to)
    const listSize = this.commands.size
    return this.merge({
      commandMap: this.commandMap.withMutations(mutator => {
        if (prevCommandId) {
          mutator.set(
            prevCommandId,
            this.commandMap
              .get(prevCommandId)
              .updateExistence(commandExistence(index - 1, listSize))
          )
        }
        if (nextCommandId) {
          mutator.set(
            nextCommandId,
            this.commandMap
              .get(nextCommandId)
              .updateExistence(commandExistence(index + 1, listSize))
          )
        }
        mutator.set(moveData.id, moveData.updateExistence(commandExistence(index, listSize)))
      }),
      commands: this.commands.remove(index).insert(to, moveData)
    })
  }

  removeCommand(index) {
    const command = this.getCommand(index)
    const prevCommandId = this.commands.get(index - 1)
    const nextCommandId = this.commands.get(index + 1)
    const listSize = this.commands.size - 1
    return this.merge({
      commandMap: this.commandMap.withMutations(mutator => {
        mutator.remove(command.id)
        if (prevCommandId) {
          mutator.set(
            prevCommandId,
            this.commandMap
              .get(prevCommandId)
              .updateExistence(commandExistence(index - 1, listSize))
          )
        }
        if (nextCommandId) {
          mutator.set(
            nextCommandId,
            this.commandMap.get(nextCommandId).updateExistence(commandExistence(index, listSize))
          )
        }
      }),
      commands: this.commands.remove(index)
    })
  }

  removeCommandById(id) {
    return this.removeCommand(this.commands.indexOf(id))
  }

  toString() {
    const commandList = this.getCommandList()
    const commandStrings = commandList.map(aCommand => {
      return aCommand.toString()
    })
    return commandStrings.join(' ')
  }
}

export default RunnableUnit
