/**
 * Created by Administrator on 2017/3/13.
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }()
};

var istank = false;
var ajaxcall = new Array();
function ajax(trcode, set, method, callback, ajaxcallac) {
    if (!ajaxcallac) {
        ajaxcallac = trcode
    }
    if (ajaxcall[ajaxcallac]) {
        ajaxcall[ajaxcallac].abort();
    }
    var tempajax = $.ajax({
        type: "POST",
        url: "/jh_web/SmkWtInfoServlet?trcode=" + trcode,
        async: false,   //问题的关键，明确是异步提交数据
        data: set,
        dataType: "json",
        success: function (data) {
            eval('callback(data)');
        }
    })
    ajaxcall[ajaxcallac] = tempajax
}


// 获取版本
function getAppVersion(calback) {
    if (browser.versions.ios){
        try {
            window.webkit.messageHandlers.version.postMessage(calback);
            return "ios"
        } catch (err) {
            return "err"
        }
    }else{
        try {
            callbackHandler(app.version(), "version");
        } catch (err) {
            return "err"
        }
    }
}

//判断是否实名
function isCertification(calback) {
    if (browser.versions.ios) {
        try {
            window.webkit.messageHandlers.isCertification.postMessage(calback);
            return "ios"
        } catch (err) {
            return "nozc"
        }
    }else{
        try {
            callbackHandler(app.isCertification(), "isCertification");
        } catch (err) {
            return "nozc"
        }
    }
}

// 获取ses_id
function getSes_id(calback) {
    if (browser.versions.ios) {
        try {
            window.webkit.messageHandlers.getSes_id.postMessage(calback);
            return "ios"
        } catch (err) {
            return "nozc"
        }
    }else{
        try {
            callbackHandler(app.getSes_id(), "getSes_id");
        } catch (err) {
            return "nozc"
        }
    }
}

/**
 * 获得用户名
 * @returns {string}
 */
function getUserName(calback) {
    if (browser.versions.ios){
        try {
            window.webkit.messageHandlers.getUserName.postMessage(calback);
            return "ios"
        } catch (err) {
            return "nozc"
        }
    }else{
        try {
            callbackHandler(app.getUserName(), "userName");
        } catch (err) {
            return "nozc"
        }
    }
}

// 跳转首页
function jumpIndex(){
    if (browser.versions.ios){
        try{
            window.webkit.messageHandlers.jumpIndex.postMessage(null);
            return "ios"
        }catch(err){
            return "nozc"
        }
    }else{
        try{
            app.jumpIndex(); 
        }catch(err){
            return "nozc"
        }
    }
}

// 跳转app登录页
function jumpLogin(){
    if (browser.versions.ios){
        try{
            window.webkit.messageHandlers.jumpLogin.postMessage(null);
            return "ios"
        }catch(err){
            return "nozc"
        }
    }else{
        try{
            app.jumpLogin();
        }catch(err){
            return "nozc"
        }
    }
}

// 跳转app实名页
function jumpVerify(){
    if (browser.versions.ios){
        try{
            window.webkit.messageHandlers.jumpVerify.postMessage(null);
            return "ios"
        }catch(err){
            return "nozc"
        }
    }else{
        try{
            app.jumpVerify();
        }catch(err){
            return "nozc"
        }
    }
}

// 跳转app实名页
function jumpVerify2(){
    if (browser.versions.ios){
        try{
            window.webkit.messageHandlers.jumpVerify2.postMessage(null);
            return "ios"
        }catch(err){
            return "nozc"
        }
    }else{
        try{
            app.jumpVerify2();
        }catch(err){
            return "nozc"
        }
    }
}

console.log("test");
function test(){
    console.log('function test');
    if (browser.versions.ios){
        console.log("ios");
    }else{
        console.log("android");
    }
}