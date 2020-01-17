const electron = require('electron')
const path = require('path')
const os = require('os')
const pty = require('node-pty')

const isDevelopment = process.env.NODE_ENV === 'development'

const { app, ipcMain, BrowserWindow, Menu } = electron
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
const ptyMap = {}

let mainWindow

const installExtensions = async () => {
  // eslint-disable-next-line global-require
  const installer = require('electron-devtools-installer')
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS

  await Promise.all(
    extensions.map(async name => {
      try {
        await installer.default(installer[name], forceDownload)
      } catch (e) {
        console.log(`Error installing ${name} extension: ${e.message}`)
      }
    })
  )
}

const openPty = id => {
  if (ptyMap[id]) {
    console.log('DESTROY_UNNECESSARY_PTY', id)
    ptyMap[id].destroy()
  }

  console.log('OPEN_PTY', id)
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env
  })
  ipcMain.on(`${id}_STDIN`, (event, data) => {
    console.log(`${id}_STDIN code: `, data.charCodeAt())
    ptyProcess.write(data)
  })
  ptyProcess.on('data', data => {
    console.log(`${id}_STDOUT    : `, data)
    mainWindow.webContents.send(`${id}_STDOUT`, data)
  })
  ptyMap[id] = ptyProcess
}

const createWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')))

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools()

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            mainWindow.inspectElement(props.x, props.y)
          }
        }
      ]).popup(mainWindow)
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions()
  }
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('OPEN_PTY', (event, id) => {
  openPty(id)
})
