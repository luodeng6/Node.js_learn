
const { app, BrowserWindow } = require('electron')
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false
        }
    })

    win.loadURL('https://www.ldeng6.top/') // 使用 loadURL() 方法加载远程网页

    // 在窗口关闭时退出应用
    win.on('closed', () => {
        app.quit()
    })
}

app.whenReady().then(createWindow)
