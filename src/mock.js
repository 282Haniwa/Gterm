import uuidv4 from 'uuid/v4'

const commandIDArray = Array.from(new Array(6), () => uuidv4())
// eslint-disable-next-line import/prefer-default-export
export const commandList = [
  {
    type: 'RunnableUnit',
    id: uuidv4(),
    commandMap: {
      [commandIDArray[0]]: {
        id: commandIDArray[0],
        type: 'NormalCommand',
        command: 'pwd',
        args: [],
        pipe: {
          stdin: null,
          stdout: null,
          stderr: null
        }
      }
    },
    commands: [commandIDArray[0]]
  },
  {
    type: 'RunnableUnit',
    id: uuidv4(),
    commandMap: {
      [commandIDArray[1]]: {
        id: commandIDArray[1],
        type: 'NormalCommand',
        command: 'ls',
        args: ['-1'],
        pipe: {
          stdin: null,
          stdout: null,
          stderr: null
        }
      }
    },
    commands: [commandIDArray[1]]
  },
  {
    type: 'RunnableUnit',
    id: uuidv4(),
    commandMap: {
      [commandIDArray[2]]: {
        id: commandIDArray[2],
        type: 'NormalCommand',
        command: 'ls',
        args: ['-1'],
        pipe: {
          stdin: null,
          stdout: commandIDArray[3],
          stderr: null
        }
      },
      [commandIDArray[3]]: {
        id: commandIDArray[3],
        type: 'NormalCommand',
        command: 'wc',
        args: ['-l'],
        pipe: {
          stdin: commandIDArray[2],
          stdout: null,
          stderr: null
        }
      }
    },
    commands: [commandIDArray[2], commandIDArray[3]]
  },
  {
    type: 'RunnableUnit',
    id: uuidv4(),
    commandMap: {
      [commandIDArray[4]]: {
        id: commandIDArray[4],
        type: 'NormalCommand',
        command: 'ls',
        args: ['-1', '-a'],
        pipe: {
          stdin: null,
          stdout: commandIDArray[5],
          stderr: null
        }
      },
      [commandIDArray[5]]: {
        id: commandIDArray[5],
        type: 'NormalCommand',
        command: 'wc',
        args: ['-l'],
        pipe: {
          stdin: commandIDArray[4],
          stdout: null,
          stderr: null
        }
      }
    },
    commands: [commandIDArray[4], commandIDArray[5]]
  }
]
