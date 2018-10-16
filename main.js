const {ipcMain, app, BrowserWindow } = require('electron');  //此种写反==》ipcMain=require('electron').ipcMain,app=require('electron').app,BrowserWindow=require('electron').BrowserWindow ;即获取对象的属性值

let win = null;
app.on("ready", createForm);

//定义初始化窗口大小
var initW=1280,initH=830;

function createForm() {
    win = new BrowserWindow({
        width: initW,   //宽度
        height: initH,  //高度
        frame: false,   //无边框
        center:true,    //居中
        transparent: true,  //透明
        minWidth: 1100, //最小宽度
        minHeight: 560, //最大宽度
    });

    win.loadURL(__dirname + "/apps/index.html");
    win.show();
    win.minimize();
    win.openDevTools();
}
//监听关闭事件
ipcMain.on('closeForm', ()=>{
  win.close();
});
//监听最大化事件
ipcMain.on("maxForm",()=>{
  win.webContents.send('changeContent');
  win.maximize(); 
});
//监听窗口化事件
ipcMain.on("restoreForm",()=>{
  win.setSize(initW,initH);
  win.webContents.send('changeContent');
});
//监听最小化事件
ipcMain.on("minForm",()=>{
  win.minimize();
});
//监听设置窗口位置
ipcMain.on("setPosition",(event,args)=>{
  win.setPosition((args[0]-1280)/2,(args[1]-830)/2);
});