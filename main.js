const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = require('electron')

let addWindow;
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html');

  // build menu from template
  const mainMenu =  Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  //Qujit App Window
  win.on('closed',() =>{
    app.quit();
  });
}

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add Shopping List Item",
        webPreferences: {
          nodeIntegration: true
        }
      })
    
      // and load the index.html of the app.
      addWindow.loadFile('addWindow.html');
      addWindow.on("close",function(){
        addWindow = null;
      });
}

app.whenReady().then(createWindow)

// Ctach item add
ipcMain.on("item:add", function(e,item){
  console.log("item - ",item);
  win.webContents.send("item:add",item);
  addWindow.close();
});

// create main menu
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                  win.webContents.send("item:clear");
                }
            },
            {
                label: "Quit",
                accelerator: process.platform == "darwin"? "Command+Q" : "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    }
];
// Add empty object for macos
if(process.platform == "darwin"){
  mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== "production"){
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu:[
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin"? "Command+I" : "Ctrl+I",
        click(item, focusedWindow ){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}