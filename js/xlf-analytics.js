
var userPagePath = window.location.pathname;
console.log(userPagePath);
//console.log(userPagePath.search("login"));

//if((userPagePath.search("order") == -1) && (userPagePath.search("login") == -1) && (userPagePath.search("reg") == -1)){
//    console.info("Show")
    //window.$crisp=[];window.CRISP_WEBSITE_ID="19b27196-d05e-445a-98cd-017b5acaeb26";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
    //20220120新客服 tidio
    document.write('<script src="//code.tidio.co/wna3g8huoshyzahdoce8o9ti7dbzhdeb.js" async></script>');
//}else{
//    console.log("User is in the " + userPagePath + " list, disable show the flag of online services");
//}

var userID = getCookie("userID");
var agentID = getCookie("agentID");
console.log("UID:"+userID);
console.log("AID:"+agentID);




//20220121 Matomo统计 开始\\
  
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
	var _paq = window._paq = window._paq || [];
	if(userID == null && agentID != null){//agentID存在
		_paq.push(['setUserId', "AID-"+agentID]);
	}else if(userID != null && agentID == null){//agentID存在
		_paq.push(['setUserId', "uID-"+userID]);
	}else{}
	  
  
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.elephant-tech.xyz/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
//20220121 Matomo统计 结束\\




/*
document.write("<script language=javascript src='https://www.googletagmanager.com/gtag/js?id=G-RYGM2J83LK'></script>");

window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RYGM2J83LK');
  
*/


function getCookie(cookieName) { //获取cookie值
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(var i = 0; i < arrCookie.length; i++){
		var arr = arrCookie[i].split("=");
		if(cookieName == arr[0]){
			return arr[1];
		}
	}
	return null;
}