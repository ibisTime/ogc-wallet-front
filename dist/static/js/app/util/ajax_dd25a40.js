define("js/app/util/ajax",["js/lib/jquery-2.1.4","js/app/util/cookie","js/app/util/dialog","js/app/module/loading/index"],function(e,o,n,t){function r(){return"/api"}function i(e){var o=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(o);return null!=n?decodeURIComponent(n[2]):""}function a(e,o){var n=ERRORINFO[e]&&ERRORINFO[e][NOWLANG]?ERRORINFO[e][NOWLANG]:"";return ERRORINFO[e]&&""!=n||(ERRORINFO[e]?(n=ERRORINFO[e].EN?o:o,console.log(NOWLANG+": ["+e+"]没有翻译配置")):(n=o,console.log("["+e+"]没有翻译配置"))),n}function u(e,o){var t=n({content:e,quickClose:!0});return t.show(),setTimeout(function(){t.close().remove()},o||1500),t}var s={},c=i("lang")||"ZH_CN";return{get:function(e,o,n,t){return("undefined"==typeof o||"boolean"==typeof o)&&(n=o,o={}),this.post(e,o,!!n,t)},post:function(o,n,i,d){i="undefined"==typeof i?!0:i,d="undefined"==typeof d?!1:i;var l=sessionStorage.getItem("token")||"";d||l&&(n.token=l),n.systemCode=SYSTEM_CODE,n.companyCode=SYSTEM_CODE,n.client=CLIENT;var f=r(o),p={code:o,json:n},R=f+JSON.stringify(p);return i&&delete s[o],s[o]=s[o]||{},s[o][R]||(p.json=JSON.stringify(n),s[o][R]=e.ajax({headers:{"Accept-Language":c},type:"post",url:f,data:p})),s[o][R].pipe(function(o){return"用户状态异常"==o.errorInfo&&location.replace("../user/isRock.html?isRock=1"),"0"!=o.errorCode?(t.hideLoading(),e.Deferred().reject(a(o.errorBizCode,o.errorInfo))):o.data}).fail(function(e){e&&u(e)})}}});