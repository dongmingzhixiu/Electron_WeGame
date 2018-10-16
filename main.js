const {ipcMain, app, BrowserWindow } = require('electron');  //此种写反==》ipcMain=require('electron').ipcMain,app=require('electron').app,BrowserWindow=require('electron').BrowserWindow ;即获取对象的属性值
// let {setUrl,setWebView}=require("./apps/js/setUrl.js");

let win = null;
let parentWin;

app.on("ready", createForm);

//定义初始化窗口大小
var initW=1280,initH=830;

function createForm() {
    win = new BrowserWindow({
        width: initW,   //宽度
        height: initH,  //高度
        center:true,    //居中
        transparent: true,  //透明
        frame: false,   //无边框
        minWidth: 1100, //最小宽度
        minHeight: 560, //最大宽度
    });
    win.loadURL(__dirname + "/apps/index.html");
    win.show();
    // win.openDevTools();
    openForm();
}

var openFile=null;
let openFileUrl=null;
var contents=null;
function openForm(){
    openFile=new BrowserWindow({
        width: initW,   //宽度
        height: initH,  //高度
        center:true,    //居中
        transparent: true,  //透明
        frame: false,   //无边框
        minWidth: 1100, //最小宽度
        minHeight: 560, //最大宽度
    });
    openFile.loadURL(__dirname + "/apps/htmls/system/openFile.html");
    openFile.minimize();
    openFile.openDevTools();
}

ipcMain.on("openForm",(event,url)=>{
    openFileUrl=url;
    openFile.show();
    openFile.send("setUrl",openFileUrl);
});
