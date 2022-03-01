//获取URL参数
//GETjs文件的时候传入outTradeNo
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function getClientLocation_imdada() {
    var clientCityInfo = {};
    $.ajaxSettings.async = false;
    $.getJSON("https://map.imdada.cn/atencentmap/getIpPoi", function (result) {
        if (result.status == "ok") {
			clientIP = result.content.ip;
            clientCityInfo = result.content.ad_info.nation + result.content.ad_info.province + result.content.ad_info.city + result.content.ad_info.district;
        }
    });
    return [clientIP, clientCityInfo];
}

function getClientLocation_ipchaxun() {
    var clientCityInfo = {};
    $.ajaxSettings.async = false;
    $.getJSON("https://2021.ipchaxun.com/", function (result) {
        if (result.ret == "ok") {
			clientIP = result.ip;
            clientCityInfo = result.data['0'] + result.data['1'] + result.data['2'] + result.data['4'];
        }
    });
    return [clientIP, clientCityInfo];
}

function getCloudflareDataCenter(){
    $.ajax({
    type: 'HEAD', // 获取头信息，type=HEAD即可
    url : "/",
    complete: function( xhr,data ){
        // 获取相关Http Response header
        //console.log(xhr.getAllResponseHeaders());
        cloudflareDataCenter = xhr.getResponseHeader('cf-ray').split("-")[1];
        console.log(cloudflareDataCenter);
        }
    });
    return cloudflareDataCenter;
}


function getDeviceType() {
    var device = navigator.platform.toLowerCase();
    var mac_or_win = device.indexOf("win") != -1 || device.indexOf("mac") != -1;
    var isiOS = device.indexOf("iphone") != -1 || device.indexOf("ipad") != -1;
    var isAndroid = device.indexOf("android") != -1 || device.indexOf("linux") != -1;

    if (isAndroid == true)
        return "Android";
    if (isiOS == true)
        return "IOS";
    return "PC";
}

function getMobileUA() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var isIphone = sUserAgent.match(/iphone/i) == "iphone";
    var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
    var isHonor = sUserAgent.match(/honor/i) == "honor";
    var isOppo = sUserAgent.match(/oppo/i) == "oppo";
    var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
    var isVivo = sUserAgent.match(/vivo/i) == "vivo";
    var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
    var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
    var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
    var isSamsung = sUserAgent.match(/sm-/i) == "sm-";

    if (isIphone) {
        return 'iPhone';
    } else if (isHuawei || isHonor) {
        return 'Huawei';
    } else if (isOppo || isOppoR15) {
        return 'OPPO';
    } else if (isVivo) {
        return 'vivo';
    } else if (isXiaomi || isRedmi || isXiaomi2s) {
        return 'Xiaomi';
    } else if (isSamsung) {
        return 'Samsung';
    } else {
        return 'Default';
    }
}

//查询方法
var queryWay = getClientLocation_ipchaxun();
//////////
var outTradeNo = getQueryVariable("outTradeNo");
var IP = queryWay[0];
var cityInfo = queryWay[1] + "-" + getCloudflareDataCenter();
var deviceType = getDeviceType();
var mobileUA = getMobileUA();

//上报
$.ajax({
    url: "/report.php",
    type: "POST",
    data: {"outTradeNo": outTradeNo, "IP": IP, "cityInfo": cityInfo, "device": deviceType, "apiType": "commonV1"},
    dataType: "JSON",
})