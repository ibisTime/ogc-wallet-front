"use strict";define("js/app/controller/user/Login",["js/app/controller/base","js/app/interface/UserCtr","js/app/module/validate/index","js/app/module/smsCaptchaNC/index"],function(e,t,n,i){function o(){e.showLoading(),a(),r(),s()}function r(){return t.getListCountry().then(function(t){e.hideLoading();var n='<option class="selectTitle" value ="">'+e.getText("请选择国家")+"</option>";t.forEach(function(e){n+="cn"==d?'<option value ="'+e.interCode+'">'+e.chineseName+"</option>":'<option value ="'+e.interCode+'">'+e.interName+"</option>"}),$("#interCode").html(n);var i=$("#interCode").val()?$("#interCode").val():"0086";$("#interCode").val(i),$("#interCode").change()},e.hideLoading)}function a(){$("title").html(e.getText("登录")),$(".title").html(e.getText("绑定手机号并登录")),$("#mobile").attr("placeholder",e.getText("请输入手机号码")),$("#smsCaptcha").attr("placeholder",e.getText("请输入验证码")),$("#getVerification").html(e.getText("获取验证码")),$("#loginBtn").html(e.getText("登录"))}function l(n){return t.login(n).then(function(t){e.hideLoading(),e.showMsg(e.getText("操作成功！")),e.setSessionUser(t),setTimeout(function(){e.gohref(sessionStorage.getItem("l-return"))},1200)},function(){$("#getVerification").text(e.getText("获取验证码")).prop("disabled",!1),clearInterval(c)})}function s(){var t=$("#formWrapper");t.validate({rules:{mobile:{required:!0,number:!0},smsCaptcha:{required:!0,sms:!0}},onkeyup:!1}),c=i.init({bizType:"805044"}),$("#interCode").change(function(){var e=$("#interCode");$("#interNum").html("+"+e.val().substring(2))}),$("#loginBtn").click(function(){if(t.valid()){var n=t.serializeObject();n.inviteCode=$("#interCode").text(),e.showLoading(),l(n)}})}var c,d=(e.getUrlParam("inviteCode")||"",e.getUrlParam("lang")||"cn");o()});