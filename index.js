const { app, BrowserWindow  } = require('electron');
const url = require('url');
const path = require('path');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 380,
        height: 640,
        transparent: true,
        frame: true,
        resizable: false,
        icon: 'assets/img/icon.png'
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join( __dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }
    ));
    mainWindow.on('closed', () => {
        app.quit();
    }
    );
    }
    );