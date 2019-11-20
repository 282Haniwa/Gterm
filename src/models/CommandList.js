import { Record, List } from 'immutable'

const defaultCommandListData = {
  commandList: List([])
}

const CommandListRecord = Record(defaultCommandListData)

class CommandList extends CommandListRecord {
  constructor(commandList) {
    super({
      commandList: List(commandList)
    })
  }

  getItem(index) {
    return this.commandList.get(index)
  }

  toList() {
    return this.commandList
  }

  toArray() {
    return this.commandList.toArray()
  }

  push(command) {
    return this.set('commandList', this.commandList.push(command))
  }

  insert(command) {
    return this.set('commandList', this.commandList.insert(command))
  }

  move(index, to) {
    const moveData = this.commandList.get(index)
    return this.set('commandList', this.commandList.remove(index).insert(to, moveData))
  }

  update(index, command) {
    return this.set('commandList', this.commandList.update(index, command))
  }

  remove(index) {
    return this.set('commandList', this.commandList.remove(index))
  }
}

export default CommandList
