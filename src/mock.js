// eslint-disable-next-line import/prefer-default-export
export const commandList = [
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
        args: ['-1', '-a'],
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
  },
  {
    type: 'RunnableUnit',
    id: 'RunnableUnit3',
    commandMap: {
      commandId5: {
        id: 'commandId5',
        type: 'Command',
        command: 'pwd',
        args: [],
        pipe: {
          stdin: null,
          stdout: null,
          stderr: null
        }
      }
    },
    commands: ['commandId5']
  }
]
