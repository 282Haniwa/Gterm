import { Record, List } from 'immutable'
import RunnableUnit from './RunnableUnit'

const defaultCommandListData = {
  commandList: List([])
}

const CommandListRecord = Record(defaultCommandListData)

class CommandList extends CommandListRecord {
  constructor(commandList) {
    super({
      commandList: List(commandList.map(command => new RunnableUnit(command)))
    })
  }

  getItem(index) {
    return this.commandList.get(index)
  }

  push(command) {
    return this.set('commandList', this.commandList.push(new RunnableUnit(command)))
  }

  insert(index, command) {
    return this.set('commandList', this.commandList.insert(index, new RunnableUnit(command)))
  }

  move(index, to) {
    const moveData = this.commandList.get(index)
    return this.set('commandList', this.commandList.remove(index).insert(to, moveData))
  }

  update(index, command) {
    return this.set('commandList', this.commandList.update(index, new RunnableUnit(command)))
  }

  remove(index) {
    return this.set('commandList', this.commandList.remove(index))
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
