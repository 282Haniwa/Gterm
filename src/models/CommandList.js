import { Record, List } from 'immutable'
import RunnableUnit from './RunnableUnit'

const defaultCommandListData = {
  commandList: List([])
}

const CommandListRecord = Record(defaultCommandListData)

class CommandList extends CommandListRecord {
  constructor(commandList = []) {
    super({
      commandList: List(commandList.map(command => new RunnableUnit(command)))
    })
  }

  getItem(index) {
    return this.commandList.get(index)
  }

  pushItem(command) {
    return this.set('commandList', this.commandList.push(new RunnableUnit(command)))
  }

  insertItem(index, command) {
    return this.set('commandList', this.commandList.insert(index, new RunnableUnit(command)))
  }

  moveItem(index, to) {
    const moveData = this.commandList.get(index)
    return this.set('commandList', this.commandList.remove(index).insert(to, moveData))
  }

  setItem(index, command) {
    return this.set('commandList', this.commandList.set(index, new RunnableUnit(command)))
  }

  removeItem(index) {
    return this.set('commandList', this.commandList.remove(index))
  }

  clearGarbage() {
    return this.set(
      'commandList',
      this.commandList.filterNot(runnableUnit => runnableUnit.commands.isEmpty())
    )
  }

  map(mapper) {
    return this.commandList.map(mapper)
  }

  toList() {
    return this.commandList
  }

  toArray() {
    return this.commandList.toArray()
  }

  toJS() {
    return this.commandList.toJS()
  }
}

export default CommandList
