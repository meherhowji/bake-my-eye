const { app } = require('electron')
const monitor = require('active-window');
const brightness = require('brightness');

let mainWindow
let currentWindow = ''

function createWindow() {
  monitor.getActiveWindow(callback, -1, 0.5);
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

callback = function (window) {
  if (currentWindow === window.app) return;
  
  try {
    console.log('APP => ', window.app);
    currentWindow = window.app;

    if (window.app === 'Terminal') {
      brightness.set(1).then(() => {
        console.log('Changed brightness to 100%');
      });
    }
    
    if (window.app === 'Google Chrome') {
      brightness.set(0.5).then(() => {
        console.log('Changed brightness to 50%');
      });
    }
  } catch (err) {
    console.log(err);
  }
}
