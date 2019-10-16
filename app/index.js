const electron = require('electron')
const os = require('os')
const pty = require('node-pty')

const { app, ipcMain, BrowserWindow } = electron
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
const ptyMap = {}

let mainWindow

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

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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
