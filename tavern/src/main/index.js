import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// console.log('platform: ', process.platform) // test
import { listMembers } from './controllers/listMembers'
import { login } from './controllers/login'
import { logout } from './controllers/logout'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1065,
    height: 800,
    minWidth: 900,
    minHeight: 670,
    title: 'Tavern',
    icon: join(__dirname, '../../resources/icon32.png'),
    // backgroundMaterial: // 'acrylic', // test
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Opens devtools in the window in development environment
  if (is.dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle('list:members', async () => {
  try {
    const members = await listMembers()
    return members
  } catch (error) {
    console.error(error)
    return error
  }
})
ipcMain.handle('login:members', async (event, { id, password }) => {
  try {
    const member = await login(id, password, process.env.SECRET_TOKEN_KEY)
    return member
  } catch (error) {
    return error
  }
})
ipcMain.handle('logout:members', async (event, { id, password }) => {
  try {
    const member = await logout(id, password)
    return member
  } catch (error) {
    return error
  }
})
