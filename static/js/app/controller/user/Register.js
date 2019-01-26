define([
    'app/controller/base',
    'app/interface/UserCtr',
    'app/module/validate',
    'app/module/smsCaptcha'
], function(base, UserCtr, Validate, smsCaptcha) {
	var inviteCode = base.getUrlParam('inviteCode') || '';// 推荐人编号
	var lang = base.getUrlParam('lang') || 'ZH_CN';
	var timer;
	var emailTimer;
    var clickType = 'mobile';

	if($("body").get(0).offsetHeight <= $("body").get(0).offsetWidth){
		$("body").height($("body").get(0).offsetHeight + $(".register-from").height());
		$("body").css({"background-position": "initial"});
		$(".register-from").css({"position": "absolute"});
	}
    init();

    function init(){
    	base.showLoading();
    	setHtml();
        addListener();
    }

    // 根据设置文本
    function setHtml(){
    	$("title").html(base.getText('立即注册',lang));
    	$("#mobile").attr("placeholder", base.getText('请输入手机号码',lang));
      $("#email").attr("placeholder", base.getText('请输入邮箱号',lang));
    	$("#smsCaptcha").attr("placeholder", base.getText('请输入验证码',lang));
      $("#smsCaptchaEmail").attr("placeholder", base.getText('请输入验证码',lang));
      $("#zhpas").attr("placeholder", base.getText('请输入账号登录密码',lang));
      $("#qr_zhpas").attr("placeholder", base.getText('请确认账号登录密码',lang));
      $("#yx-zhpas").attr("placeholder", base.getText('请输入账号登录密码',lang));
      $("#yx-qr_zhpas").attr("placeholder", base.getText('请确认账号登录密码',lang));
    	$("#getVerification").html(base.getText('获取验证码',lang));
      $("#getEmailVerification").html(base.getText('获取验证码',lang));
    	$("#subBtn").html(base.getText('立即注册',lang));
      $(".chan-left").html(base.getText('手机注册',lang));
      $(".chan-right").html(base.getText('邮箱注册',lang));
      $(".paw-ws").html(base.getText('密码位数为8~25位(字母+数字)',lang));
      $(".paw-xx").html(base.getText('密码中包含小写字母',lang));
      $(".paw-dx").html(base.getText('密码中包含大写字母',lang));

      if(lang === 'EN') {
        $('#formWrapper1 .paw-box').css('padding-bottom', '0.4rem');
      }
      base.hideLoading();
    }

    // 登录
    function register(params, type){
    	let loginParams = {
    		client: params.client,
            loginName: '',
            loginPwd: params.loginPwd
        };
    	if(type === 'mobile') {
    		loginParams.loginName = params.countryCode + params.mobile;
            UserCtr.mobileRegister(params).then(data => {

            }, () => {
                $("#getVerification").text(base.getText('获取验证码', lang)).prop("disabled", false);
                clearInterval(timer);
            });
        }
        if(type === 'email') {
            loginParams.loginName = params.email;
            UserCtr.emailRegister(params).then(data => {
        }, () => {
            $("#getEmailVerification").text(base.getText('获取验证码', lang)).prop("disabled", false);
            clearInterval(emailTimer);
        });
			}
    }

    function addListener(){
      var _formWrapper = $("#formWrapper");
      var _formWrapperEmail = $("#formWrapperEmail");
      var formWrapperData = null;
      var formWrapperEmailData = null;
      _formWrapper.validate({
            'rules': {
                interCode: {
                    required: true,
                },
                mobile: {
                    required: true,
                    number: true
                },
                smsCaptcha: {
                    required: true,
                    "sms": true
                }
            },
            onkeyup: false
        });
      _formWrapperEmail.validate({
        'rules': {
          email: {
            required: true,
            email: true
          },
          smsCaptchaEmail: {
            required: true,
            "sms": true
          }
        },
        onkeyup: false
      });

      // 手机号验证码
      timer = smsCaptcha.init({
          id: "getVerification",
          bizType: '805041',
          mobile: 'mobile',
          sendCode: '630090'
      });

        // 切换登录方式
        // 短信
      $('.chan-left').click(function() {
        clickType = 'mobile';
        $(this).addClass('set-chan');
        $('.chan-right').removeClass('set-chan');
        $('#formWrapper').removeClass('hidden');
        $('.smsCaptcha-box').removeClass('hidden');
        $('#formWrapperEmail').addClass('hidden').validate().resetForm();

        // 清空
        $('#email').val('');
        $('#smsCaptchaEmail').val('');
        $('#qr_zhpas').val('');
        $('#qr_zjpas').val('');
        $('#yx-qr_zhpas').val('');
        $('#yx-qr_zjpas').val('');

        // 重置
        formWrapperEmailData = null;
        $('#mobile').focus();
      });

			// 邮箱
      $('.chan-right').click(function() {
        // 邮箱验证码
        clickType = 'email';
        emailTimer = smsCaptcha.init({
          id: "getEmailVerification",
          bizType: '805043',
          mobile: 'email',
          sendCode: '630093'
        });
      	$(this).addClass('set-chan');
        $('.chan-left').removeClass('set-chan');
        $('.smsCaptcha-box').removeClass('hidden');
        $('#formWrapperEmail').removeClass('hidden');
        $('#formWrapper').addClass('hidden').validate().resetForm();

        // 清空
        $('#mobile').val('');
        $('#smsCaptcha').val('');
        $('#zhpas').val('');
        $('#qr_zhpas').val('');

        // 重置
        formWrapperData = null;
        $('#email').focus();
      });

      // 登录
      $(".register-from #subBtn").click(function(){
        if(clickType === 'email') {
          if(_formWrapperEmail.valid()) {
            if($('#yx-zhpas').val() !== $('#yx-qr_zhpas').val()) {
              base.showMsg(base.getText('密码不一致，请重新输入', lang));
              $('#yx-zjpas').val('');
              $('#yx-qr_zjpas').val('');
            }else { // 邮箱注册
              base.showLoading();
              let params = {
                email: $('#email').val().trim(),
                captcha: $('#smsCaptchaEmail').val().trim(),
                userReferee: inviteCode,
                loginPwd: $('#yx-zhpas').val().trim()
              };
              UserCtr.emailRegister(params).then(data => {
                base.hideLoading();
                base.showMsg(base.getText('注册成功', lang));
                setTimeout(() => {
                  registerSuccess();
                }, 1800);
              }, base.hideLoading);
            }
          }
        }else {
          if(_formWrapper.valid()) {
            if($('#zhpas').val() !== $('#qr_zhpas').val()) {
              base.showMsg(base.getText('密码不一致，请重新输入', lang));
              $('#zjpas').val('');
              $('#qr_zjpas').val('');
            }else { // 短信注册
              base.showLoading();
              let params = {
                mobile: $('#mobile').val().trim(),
                smsCaptcha: $('#smsCaptcha').val().trim(),
                userReferee: inviteCode,
                loginPwd: $('#zhpas').val().trim()
              };
              UserCtr.mobileRegister(params).then(data => {
                base.showMsg(base.getText('注册成功', lang));
                setTimeout(() => {
                  registerSuccess();
                }, 1800);
              }, base.hideLoading);
            }
          }
        }
      });

      function registerSuccess() {
        var uhref = sessionStorage.getItem('uhref') || '';
        let msg = base.getText("注册成功，请前往下载APP！",lang);
        base.confirm(msg, base.getText("取消",lang), base.getText("前往下载",lang)).then(function(){
          if(lang == 'ZH_CN'){
            window.location.href = DOWNLOADLINK+'.html';
          } else {
            window.location.href = DOWNLOADLINK+'-'+ lang +'.html';
          }
        },function(){
          if(uhref) {
            base.showLoading();
            window.location.href = uhref;
          }else {
            window.location.reload();
          }
        });
      }

      $("#rpReceivePopup .close").click(function() {
          $("#rpReceivePopup").addClass("hidden");
      });

      $("#countryPopup .close").click(function() {
          $("#countryPopup").addClass("hidden");
      });

      $("#country-wrap").click(() => {
          $("#countryPopup").removeClass("hidden");
      });

      $("#countryList").on("click", ".country-list", function(){
          lang = $(this).attr("data-lang");
          setHtml();
          $(this).addClass("on").siblings('.country-list').removeClass('on');
          $("#nationalFlag").css({"background-image": `url('${base.getImg($(this).attr("data-pic"))}')`});
          $("#interCode").text("+"+$(this).attr("data-value").substring(2)).attr("value", $(this).attr("data-value")).attr("code", $(this).attr("data-code"));
          $("#countryPopup").addClass("hidden");
      });

    }
});
