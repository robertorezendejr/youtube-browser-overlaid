const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

const config = require('./config')

let win = null, contents = null;

function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    /* Pra sumir com a barra de cima: titleBar... */
    /* titleBarStyle: 'hidden', */
    /* lwaysOnTop = prra deixar sempre o navegador sobreposto */
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  /* Aqui tem que botar o endereço que pretende abrir */
  win.loadURL('https://www.youtube.com/')
  /* win.loadURL('https://www.youtube.com/') */
  /* win.loadFile('index.html') */
}


function toggleDevTools() {
    contents.toggleDevTools()
}
  
function fullScreen() {
win.isSimpleFullScreen() ? win.setSimpleFullScreen(false) : win.setSimpleFullScreen(true);
}

/* function createShortcuts() {
globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
globalShortcut.register('F11', fullScreen)
} */




app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
