"use strict";define("js/app/module/weixin/index",["js/lib/jweixin-1.2.0","js/app/module/loading/index","js/app/interface/GeneralCtr"],function(e,n,i){function t(n,i){e.config({appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]});e.ready(function(){e.onMenuShareAppMessage(i),e.onMenuShareTimeline(i),e.onMenuShareQQ(i),e.onMenuShareQZone(i)}),e.error(function(){})}function a(){var e=o.initPay,i=e.wxConfig,t=e.success,a=e.error;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:i.appId,timeStamp:i.timeStamp,nonceStr:i.nonceStr,"package":i.wechatPackage,signType:i.signType,paySign:i.paySign},function(e){n.hideLoading(),"get_brand_wcpay_request:ok"==e.err_msg?t&&t():"get_brand_wcpay_request:fail"==e.err_msg&&a&&a()})}function r(i,t,a){e.config({appId:i.appId,timestamp:i.timestamp,nonceStr:i.nonceStr,signature:i.signature,jsApiList:["scanQRCode"]}),e.ready(function(){n.hideLoading(),e.scanQRCode({needResult:1,success:t,fail:a})}),e.error(function(){n.hideLoading(),alert("微信sdk初始化失败")})}var o={};return{initShare:function(e){i.getInitWXSDKConfig().then(function(n){t(n,e)},function(e){alert(JSON.stringify(e))})},initPay:function(e,n,i){o.initPay={wxConfig:e,success:n,error:i},"undefined"==typeof WeixinJSBridge?document.addEventListener?(document.removeEventListener("WeixinJSBridgeReady",a),document.addEventListener("WeixinJSBridgeReady",a,!1)):document.attachEvent&&(document.detachEvent("WeixinJSBridgeReady",a),document.detachEvent("onWeixinJSBridgeReady",a),document.attachEvent("WeixinJSBridgeReady",a),document.attachEvent("onWeixinJSBridgeReady",a)):a()},initScanQRCode:function(e,n){i.getInitWXSDKConfig().then(function(i){r(i,e,n)},function(){alert("微信sdk初始化失败")})}}});