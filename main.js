const {ipcMain, app, BrowserWindow } = require('electron');  //此种写反==》ipcMain=require('electron').ipcMain,app=require('electron').app,BrowserWindow=require('electron').BrowserWindow ;即获取对象的属性值
// let {setUrl,setWebView}=require("./apps/js/setUrl.js");

let win = null;
let parentWin;




/**
 * 解决浏览器播放问题
 */
const libDirectory = __dirname+'/apps/lib/';
const path = require('path');
// 指定 flash 路径，假定它与 main.js 放在同一目录中。
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname,"/apps/lib/"+ pluginName))
app.commandLine.appendSwitch('ppapi-flash-version', '22.0.0.192');








//在 ready 事件中创建窗体
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
        backgroundColor: "black",
        webPreferences: {
            plugins: true
        }
    });
    win.loadURL(__dirname + "/apps/index.html");
    // win.openDevTools();
    openForm();

    
    win.show();
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
        backgroundColor: "black",
        webPreferences: {
            plugins: true
        }
    });
    openFile.loadURL(__dirname + "/apps/htmls/system/openFile.html");
    openFile.minimize();
    openFile.openDevTools();
    //openFile.closable=false;
    
}

ipcMain.on("openForm",(event,url)=>{
    openFileUrl=url;
    if(openFile.isDestroyed()){
        openForm();
    }
    openFile.show();
    openFile.send("setUrl",openFileUrl);
});

