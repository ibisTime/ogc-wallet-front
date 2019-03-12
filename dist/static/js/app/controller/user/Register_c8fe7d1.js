"use strict";define("js/app/controller/user/Register",["js/app/controller/base","js/app/interface/UserCtr","js/app/module/validate/index","js/app/module/smsCaptcha/index"],function(e,a,t,i){function r(){e.showLoading(),s(),l()}function s(){$("title").html(e.getText("立即注册",h)),$("#mobile").attr("placeholder",e.getText("请输入手机号码",h)),$("#email").attr("placeholder",e.getText("请输入邮箱号",h)),$("#smsCaptcha").attr("placeholder",e.getText("请输入验证码",h)),$("#smsCaptchaEmail").attr("placeholder",e.getText("请输入验证码",h)),$("#zhpas").attr("placeholder",e.getText("请输入账号登录密码",h)),$("#qr_zhpas").attr("placeholder",e.getText("请确认账号登录密码",h)),$("#yx-zhpas").attr("placeholder",e.getText("请输入账号登录密码",h)),$("#yx-qr_zhpas").attr("placeholder",e.getText("请确认账号登录密码",h)),$("#getVerification").html(e.getText("获取验证码",h)),$("#getEmailVerification").html(e.getText("获取验证码",h)),$("#subBtn").html(e.getText("立即注册",h)),$(".chan-left").html(e.getText("手机注册",h)),$(".chan-right").html(e.getText("邮箱注册",h)),$(".paw-ws").html(e.getText("密码位数为8~25位(字母+数字)",h)),$(".paw-xx").html(e.getText("密码中包含小写字母",h)),$(".paw-dx").html(e.getText("密码中包含大写字母",h)),"EN"===h&&$("#formWrapper1 .paw-box").css("padding-bottom","0.4rem"),e.hideLoading()}function l(){function t(){var a=sessionStorage.getItem("uhref")||"",t=e.getText("注册成功，请前往下载APP！",h);e.confirm(t,e.getText("取消",h),e.getText("前往下载",h)).then(function(){window.location.href="ZH_CN"==h?DOWNLOADLINK+".html":DOWNLOADLINK+"-"+h+".html"},function(){a?(e.showLoading(),window.location.href=a):window.location.reload()})}var r=$("#formWrapper"),l=$("#formWrapperEmail"),m=null,p=null;r.validate({rules:{interCode:{required:!0},mobile:{required:!0,number:!0},smsCaptcha:{required:!0,sms:!0},zhpas:{required:!0,lgError:!0},qr_zhpas:{required:!0,lgError:!0}},onkeyup:!1}),l.validate({rules:{email:{required:!0,email:!0},smsCaptchaEmail:{required:!0,sms:!0},zhpas:{required:!0,lgError:!0},qr_zhpas:{required:!0,lgError:!0}},onkeyup:!1}),o=i.init({id:"getVerification",bizType:"805041",mobile:"mobile",sendCode:"630090"}),$(".chan-left").click(function(){c="mobile",$(this).addClass("set-chan"),$(".chan-right").removeClass("set-chan"),$("#formWrapper").removeClass("hidden"),$(".smsCaptcha-box").removeClass("hidden"),$("#formWrapperEmail").addClass("hidden").validate().resetForm(),$("#email").val(""),$("#smsCaptchaEmail").val(""),$("#qr_zhpas").val(""),$("#qr_zjpas").val(""),$("#yx-qr_zhpas").val(""),$("#yx-qr_zjpas").val(""),p=null,$("#mobile").focus()}),$(".chan-right").click(function(){c="email",n=i.init({id:"getEmailVerification",bizType:"805043",mobile:"email",sendCode:"630093"}),$(this).addClass("set-chan"),$(".chan-left").removeClass("set-chan"),$(".smsCaptcha-box").removeClass("hidden"),$("#formWrapperEmail").removeClass("hidden"),$("#formWrapper").addClass("hidden").validate().resetForm(),$("#mobile").val(""),$("#smsCaptcha").val(""),$("#zhpas").val(""),$("#qr_zhpas").val(""),m=null,$("#email").focus()}),$(".register-from #subBtn").click(function(){if("email"===c){if(l.valid())if($("#yx-zhpas").val()!==$("#yx-qr_zhpas").val())e.showMsg(e.getText("密码不一致，请重新输入",h)),$("#yx-zjpas").val(""),$("#yx-qr_zjpas").val("");else{e.showLoading();var i={email:$("#email").val().trim(),captcha:$("#smsCaptchaEmail").val().trim(),userReferee:d,loginPwd:$("#yx-zhpas").val().trim()};a.emailRegister(i).then(function(){e.hideLoading(),e.showMsg(e.getText("注册成功",h)),setTimeout(function(){t()},1800)},e.hideLoading)}}else if(r.valid())if($("#zhpas").val()!==$("#qr_zhpas").val())e.showMsg(e.getText("密码不一致，请重新输入",h)),$("#zjpas").val(""),$("#qr_zjpas").val("");else{e.showLoading();var s={mobile:$("#mobile").val().trim(),smsCaptcha:$("#smsCaptcha").val().trim(),userReferee:d,loginPwd:$("#zhpas").val().trim()};a.mobileRegister(s).then(function(){e.hideLoading(),e.showMsg(e.getText("注册成功",h)),setTimeout(function(){t()},1800)},e.hideLoading)}}),$("#rpReceivePopup .close").click(function(){$("#rpReceivePopup").addClass("hidden")}),$("#countryPopup .close").click(function(){$("#countryPopup").addClass("hidden")}),$("#country-wrap").click(function(){$("#countryPopup").removeClass("hidden")}),$("#countryList").on("click",".country-list",function(){h=$(this).attr("data-lang"),s(),$(this).addClass("on").siblings(".country-list").removeClass("on"),$("#nationalFlag").css({"background-image":"url('"+e.getImg($(this).attr("data-pic"))+"')"}),$("#interCode").text("+"+$(this).attr("data-value").substring(2)).attr("value",$(this).attr("data-value")).attr("code",$(this).attr("data-code")),$("#countryPopup").addClass("hidden")})}var o,n,d=e.getUrlParam("inviteCode")||"",h=e.getUrlParam("lang")||"ZH_CN",c="mobile";$("body").get(0).offsetHeight<=$("body").get(0).offsetWidth&&($("body").height($("body").get(0).offsetHeight+$(".register-from").height()),$("body").css({"background-position":"initial"}),$(".register-from").css({position:"absolute"})),r()});