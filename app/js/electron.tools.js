const shell = require('electron').shell;
const ipc = require('electron').ipcRenderer
/**
 * 使用浏览器打开url
 * @param url 打开的url
 * @param e 点击事件源，可选，如果不填则需要手动 处理保证事件不在处理
 */

function openToBrowser(url,e){
    (e)&&(e.preventDefault()); //给页面该事件不在处理
    shell.openExternal(url);
}

/**
* 使用指定窗口打开
 * @param url 打开的url
 * @param e 点击事件源，可选，如果不填则需要手动 处理保证事件不在处理
 */
function openToForm(url,e){ 
    (e)&&(e.preventDefault()); //给页面该事件不在处理
    ipc.send("openFome",url);
}

/**
 * 接管浏览器器请求，使用系统浏览器打卡
 * @param {jqSelect} webSelector 
 * @param {回调函数} callback 
 */
function webOpenToForm(webSelector,callback){
    $(webSelector).on('new-window', (e) => {
        var url = e.url||e.originalEvent.url;
        if (url.indexOf('http:')>=0 || url.indexOf('https:')>=0) {
            //shell.openExternal(e.url)
            callback(url); 
            //window.open(url)
        }
    });
}
/**
 * 接管浏览器器请求，使用系统浏览器打卡
 * @param {jqSelect} webSelector 
 * @param {回调函数} callback 
 */
function webOpenToBrowser(webSelector,callback){
    $(webSelector).on('new-window', (e) => {
        var url = e.url||e.originalEvent.url;
        if (url.indexOf('http:')>=0 || url.indexOf('https:')>=0) {
            callback(url); 
            //shell.openExternal(url)
        }
    });
}

/**
 * 接管浏览器器请求，使用系统浏览器打卡
 * @param {jqSelect} webSelector 
 * @param {回调函数} callback 
 */
function openFormToUrl(url){
    ipc.send("openForm",url);
}