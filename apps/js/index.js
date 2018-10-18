$(function(){
    init();
    function init(){
        //调用后台执行最大最小 系统菜单系统事件
        $("[title='关闭']").click(function(){
            //ipc.send('closeForm');
            formBtn('closeForm');
        });
        $("[title='最大化']").click(function(){
            var title=$(this).attr("title");
            if(title=="最大化"){
                $(this).attr("title","窗口化");
                $(this).css({"background":"url('../apps/images/mainframe_icon.png') -75px  -123px","-webkit-app-region":"no-drag"});
                //ipc.send('maxForm');
                formBtn('maxForm');
            }else{
                $(this).attr("title","最大化");
                $(this).css({"background":"url('../apps/images/mainframe_icon.png') 0px -20px","-webkit-app-region":"no-drag"});
                //ipc.send('restoreForm');
                formBtn('restoreForm');
            }
        });
        //最大窗口化鼠标访问改变图片
        $("[title='最大化']").mouseenter(function () { 
            var title=$(this).attr("title");
            if(title=="最大化"){
                $(this).css({"background":"url('../apps/images/mainframe_icon.png') -23px -20px","-webkit-app-region":"no-drag"});
            }else{
                $(this).css({"background":"url('../apps/images/mainframe_icon.png') -96px  -123px","-webkit-app-region":"no-drag"});
            }
        });
        $("[title='最大化']").mouseleave(function () { 
            var title=$(this).attr("title");
            if(title=="最大化"){
                $(this).css("background","url('../apps/images/mainframe_icon.png') 0px -20px");
            }else{
                $(this).css("background","url('../apps/images/mainframe_icon.png') -75px  -123px");
            }
        });

        $("[title='最小化']").click(function(){
            //ipc.send('minForm');
            formBtn('minForm');
        });
        $("[title='系统菜单']").click(function(){
            //ipc.send('menuForm');
            formBtn('menuForm');
        });

        //顶部中间按钮样式事件
        $(".e-h-center>div>div").click(function(){
            $(".e-h-center-bottom").hide();
            $(this).find(".e-h-center-bottom").show();
            var id=$(this).attr("id");
            $("#e-h-home").children().children().attr("class","e-h-home-no-visited");
            $("#e-h-shop").children().children().attr("class","e-h-shop-no-visited");
            $("#e-h-player").children().children().attr("class","e-h-player-no-visited");

            if(id=="e-h-home"){
                $("#e-h-home").children().children().attr("class","e-h-home-visited");
            }else if(id=="e-h-shop"){
                $("#e-h-shop").children().children().attr("class","e-h-shop-visited");
            }else if(id=="e-h-player"){
                $("#e-h-player").children().children().attr("class","e-h-player-visited");
            }
        });
    }
   
    function formBtn(click){
        var currwin = require('electron').remote.getCurrentWindow();
        initW=1280,initH=830;
        switch(click){
            case "menuForm":

            break;
            case "restoreForm":
                currwin.unmaximize();
            break;
            case "maxForm":
                currwin.maximize(); 
            break;
            case "minForm":
                currwin.minimize();
            break;
            case "closeForm":
                currwin.close();
            break;
        }
    }
   
});





//中部左侧菜单点击改变背景色
$(".e-c-left>div").click(function(){
    if($(this).attr("class").indexOf("e-c-l-toolbar")<0){
        $(".e-c-left>div").removeClass("e-c-left-hover");
        $(this).addClass("e-c-left-hover");
    }
    var href=$(this).attr("href");
    $("#frame").attr("src",href);
    webOpenToForm("#frame",function(url){
        openFormToUrl(url);
    });
    webOpenToForm("#shop",function(url){
        openFormToUrl(url);
    });
    webOpenToForm("#player",function(url){
        openFormToUrl(url);
    });
});





