import React from 'react'
import RunnableUnit from '../RunnableUnit'

const commandList = [
  {
    type: 'RunnableUnit',
    id: 'RunnableUnit1',
    commandMap: {
      commandId1: {
        id: 'commandId1',
        type: 'Command',
        command: 'ls',
        args: ['-1'],
        pipe: {
          stdin: null,
          stdout: 'commandId2',
          stderr: null
        }
      },
      commandId2: {
        id: 'commandId2',
        type: 'Command',
        command: 'wc',
        args: ['-l'],
        pipe: {
          stdin: 'commandId1',
          stdout: null,
          stderr: null
        }
      }
    },
    commands: ['commandId1', 'commandId2']
  },
  {
    type: 'RunnableUnit',
    id: 'RunnableUnit2',
    commandMap: {
      commandId3: {
        id: 'commandId3',
        type: 'Command',
        command: 'ls',
        args: ['-l', '-a'],
        pipe: {
          stdin: null,
          stdout: 'commandId4',
          stderr: null
        }
      },
      commandId4: {
        id: 'commandId4',
        type: 'Command',
        command: 'wc',
        args: ['-l'],
        pipe: {
          stdin: 'commandId3',
          stdout: null,
          stderr: null
        }
      }
    },
    commands: ['commandId3', 'commandId4']
  }
]

const CommandList = () => {
  return (
    <div>
      {commandList.map(command => (
        <RunnableUnit data={command} key={`${command.id}`} />
      ))}
    </div>
  )
}

export default CommandList
