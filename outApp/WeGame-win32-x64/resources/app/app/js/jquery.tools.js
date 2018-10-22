
/**
 * 依赖项: 需引入jQuery文件,jquery版本在1.10以上
 * 作  者: jpw
 * 日  期: 2018-9-25 16:57:07
 * 描  述: jquery 扩展方法
 * 邮  件：1427953302@qq.com
 */

;
//闭包限定命名空间
(function ($) {
    //扩展jquery 方法
    $.extend({
       
       
        /**
         * 接管所有弹出窗口请求
         * 使用回调函数处理 需要接管后的操作
         * @param iframe jquery iframe对象
         * @param target 接管的Tager类型 [_blank	在新窗口中打开被链接文档。_self	默认。在相同的框架中打开被链接文档。_parent	在父框架集中打开被链接文档。_top	在整个窗口中打开被链接文档。framename	在指定的框架中打开被链接文档。]        
         * @callback 回调函数，会返回2个参数 [e:所有target="_black"点击的事件源;url 获取到的url路径]
         */
       iframeTargetClick:function(iframe,target,callback){
            if(typeof target=="function"){
                callback=target;
                target=undefined;
            }
            var find=!target?"a:not([href^='#'])":"[target='"+target+"']";
            iframe.load(function(){
                iframe.contents().find(find).click(function(e){
                    var url=$(this).attr("href");
                    callback(e,url)
                });
                var ifrmaes=iframe.contents().find("iframe");
                if(iframes.length>0){
                    for(var i=0;i<iframe.length;i++){
                        $.fn.iframeTargetClick($(iframe[i]),target,callback);
                    }
                }
            });
       },
         /**
         * 接管所有a标签弹出窗口请求
         * 使用回调函数处理 需要接管后的操作
         * @param iframe jquery iframe对象
         * @param target 接管的Tager类型 [_blank	在新窗口中打开被链接文档。_self	默认。在相同的框架中打开被链接文档。_parent	在父框架集中打开被链接文档。_top	在整个窗口中打开被链接文档。framename	在指定的框架中打开被链接文档。]        
         * @callback 回调函数，会返回2个参数 [e:所有target="_black"点击的事件源;url 获取到的url路径]
         */
        iframeALinkClick:function(iframe,callback){
            var find="a:not([href^='#'])";
            iframe.load(function(){
                iframe.contents().find(find).click(function(e){
                    var url=$(this).attr("href");
                    callback(e,url)
                });
                var ifrmaes=iframe.contents().find("iframe");
                if(iframes.length>0){
                    for(var i=0;i<iframe.length;i++){
                        $.fn.iframeALinkClick($(iframe[i]),callback);
                    }
                }
            });
       },
    });
})(window.jQuery);
