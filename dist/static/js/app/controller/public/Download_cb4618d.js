"use strict";define("js/app/controller/public/Download",["js/app/controller/base","js/app/util/ajax","js/app/interface/GeneralCtr","js/app/interface/UserCtr"],function(t,n,e){function a(){i(),d()}function i(){t.showLoading(),$("title").html(t.getText("下载橙wallet",g)),$(".upload-text .txt1").html(t.getText("全球首款跨链生态钱包",g)),$(".uploadBtn").html(t.getText("立即下载",g)),$(".upload-remark").html(t.getText("若无法安装或任何原因需卸载原版本...",g)),$(".installTutorial-wrap .title .txt").html(t.getText("安装教程",g)),$(".section .first").html(t.getText("1.第一次打开橙wallet的时候会弹出如下框。",g)),$(".section .img-wrap1").html('<img src="/static/images/installFirst_'+INSTALLIMG[g]+'.png"/>'),$(".section .second").html(t.getText("2.首次安装的用户,请前往...",g)),$(".section .img-wrap2").html('<img src="/static/images/installSecond_'+INSTALLIMG[g]+'.png"/>'),$(".section .third").html(t.getText("3.点击信任这个证书就可以...",g)),$(".section .img-wrap3").html('<img src="/static/images/installThird_'+INSTALLIMG[g]+'.png"/>'),$(".upload-mask p").html(t.getText("请点击右上角<br/>点击在浏览器打开下载APP",g)),$.when(s(),o(),l()).then(function(){t.hideLoading(),$("#uploadBtn").off("click").click(function(){"ios"==t.getUserBrowser()?""!=r&&r?t.is_mqqbrowser()?$(".upload-mask").removeClass("hidden"):$(this).hasClass("on")||($(this).addClass("on"),window.location.href=r):t.confirm(t.getText("当前版本尚未上线，敬请期待！",g),t.getText("取消",g),t.getText("确定",g)).then(function(){},function(){}):""!=u&&u?t.is_weixn()?$(".upload-mask").removeClass("hidden"):window.location.href=u:t.confirm(t.getText("当前版本尚未上线，敬请期待！",g),t.getText("取消",g),t.getText("确定",g)).then(function(){},function(){})})})}function o(){return e.getSysConfigKey("h5_download_android").then(function(t){u=c(t.cvalue)},function(){t.showMsg(t.getText("获取下载地址失败",g))})}function l(){return e.getSysConfigKey("h5_download_ios").then(function(t){r=c(t.cvalue)},function(){t.showMsg(t.getText("获取下载地址失败",g))})}function s(){var n=LANGUAGELIST,e="";n.forEach(function(t){var n="";g==t.key&&(n="on",p=!1,f=t.value),e+='<div class="country-list '+n+'" data-value="'+t.value+'" data-key="'+t.key+'">\n						<samp>'+t.value+'</samp>\n						<i class="icon"></i>\n					</div>'}),$("#countryList").html(e),$("#language").text(f).attr("data-key",g),t.hideLoading()}function c(t){if(-1==t.indexOf("{")&&-1==t.indexOf("}"))return t;var n=t.split("{")[0],e=t.split("}")[1],a=n+h+e;return a}function d(){$(".upload-mask").click(function(){$(".upload-mask").addClass("hidden")}),$("#languagePopup .close").click(function(){$("#languagePopup").addClass("hidden")}),$("#language-wrap").click(function(){$("#languagePopup").removeClass("hidden")}),$("#countryList").on("click",".country-list",function(){return g=$(this).attr("data-key"),g==$("#language").attr("data-key")?void $("#languagePopup").addClass("hidden"):(t.showLoading(),window.location.href="ZH_CN"==g?DOWNLOADLINK+".html?channel="+h:DOWNLOADLINK+"-"+g+".html?channel="+h,void t.hideLoading())}),$("#upload_appStore").on("click",function(){window.location.href=DOWNLOADLINKAPPSTORE}),$("#upload_google").on("click",function(){window.location.href=DOWNLOADLINKGOOGLE})}var r,u,g=$("body").attr("data-lang")||"ZH_CN",h=t.getUrlParam("channel")||"theia",p=!0,f="";a()});