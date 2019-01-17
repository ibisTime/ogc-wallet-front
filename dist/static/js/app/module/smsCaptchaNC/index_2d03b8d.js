'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define('js/app/module/smsCaptchaNC/index', ['js/lib/jquery-2.1.4', 'js/app/util/dialog', 'js/app/interface/GeneralCtr', 'js/app/controller/base'], function ($, dialog, GeneralCtr, Base) {
	var lang = Base.getUrlParam('lang') || 'ZH_CN';
	var tmpl = "<div class=\"popup ncCaptchaPopup hidden\" id=\"ncCaptchaPopup\">\n\t<div class=\"popup-content\">\n\t\t<div id=\"your-dom-id\"></div>\n\t</div>\n\t<div class=\"nc-wh wp100\"></div>\n</div>\n";
	var defaultOpt = {};
	var nCaptcha;
	var timer;

	function _showMsg(msg, time) {
		var d = dialog({
			content: msg,
			quickClose: true
		});
		d.show();
		setTimeout(function () {
			d.close().remove();
		}, time || 1500);
	}

	// 请求滑动拼图验证并初始化
	function getSysConfigType() {
		return GeneralCtr.getSysConfigType('aliyun_fas').then(function (data) {
			nCaptchaInit(data.h5_app_key, data.h5_scene_original);
		}, function () {});
	}

	function getSmsCaptcha() {
		var verification = $("#" + defaultOpt.id);
		verification.prop("disabled", true);
		return GeneralCtr.sendCaptcha(defaultOpt.sendCode, {
			bizType: defaultOpt.bizType,
			mobile: $("#" + defaultOpt.mobile).val(),
			interCode: $("#" + defaultOpt.interCode).attr("value"),
			ncToken: defaultOpt.ncToken,
			sessionId: defaultOpt.sessionId,
			sig: defaultOpt.sig,
			scene: defaultOpt.scene
		}).then(function () {
			var i = 60;
			if (defaultOpt.mobile === 'email' || defaultOpt.mobile === 'email-find') {
				Base.showMsg('' + Base.getText('验证码已通过邮件的形式发送到您的邮箱里', lang));
			} else {
				switch (lang) {
					case 'ZH_CN':
						Base.showMsg('\u9A8C\u8BC1\u7801\u5DF2\u901A\u8FC7\u77ED\u4FE1\u7684\u5F62\u5F0F\u53D1\u9001\u5230' + $("#" + defaultOpt.mobile).val() + '\u624B\u673A\u4E0A');break;
					case 'EN':
						Base.showMsg('The verification code has been sent to the ' + $("#" + defaultOpt.mobile).val() + ' phone via SMS');break;
					case 'KO':
						Base.showMsg('\uC778\uC99D\uBC88\uD638\uAC00 ' + $("#" + defaultOpt.mobile).val() + '\uD578\uB4DC\uD3F0\uC5D0 \uBB38\uC790\uB85C \uBC1C\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4.');break;
				}
			}
			timer = window.setInterval(function () {
				if (i > 0) {
					verification.text(i-- + "s");
				} else {
					verification.text(Base.getText('获取验证码', lang)).prop("disabled", false);
					clearInterval(timer);
				}
			}, 1000);
		}, function () {
			verification.text(Base.getText('获取验证码', lang)).prop("disabled", false);
		});
	}

	function nCaptchaInit(appkey, scene) {
		var nc_token = [appkey, new Date().getTime(), Math.random()].join(':');
		var ncWidth = Number($(".nc-wh").width()) > 300 ? Number($(".nc-wh").width()) : 300;
		var ncHeight = Number($(".nc-wh").height());
		var NC_Opt = {
			renderTo: "#your-dom-id",
			appkey: appkey,
			scene: scene,
			token: nc_token,
			trans: { 'key1': "code0" },
			is_Opt: 0,
			type: "scrape",
			width: ncWidth.toFixed(0),
			height: ncHeight.toFixed(0),
			isEnabled: true,
			language: 'cn',
			times: 5,
			objects: ["http://img.alicdn.com/tps/TB1BT9jPFXXXXbyXFXXXXXXXXXX-80-80.png"], //勿动，照抄即可
			apimap: {
				// 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
			},
			elements: ['http://img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png', 'http://img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png'],
			bg_back_prepared: 'http://img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
			bg_front: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
			obj_ok: 'http://img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
			bg_back_pass: 'http://img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
			obj_error: 'http://img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
			bg_back_fail: 'http://img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
			upLang: { "cn": {
					_ggk_guide: "请在屏幕上滑动，刮出两面盾牌",
					_ggk_success: "恭喜您成功刮出盾牌<br/>继续下一步操作吧",
					_ggk_loading: "加载中",
					_ggk_fail: ['呀，盾牌不见了<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
					_ggk_action_timeout: ['我等得太久啦<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
					_ggk_net_err: ['网络实在不给力<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
					_ggk_too_fast: ['您刮得太快啦<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题']
				}
			},
			callback: function callback(data) {
				//成功回调
				window.console && console.log(nc_token);
				window.console && console.log(data.sessionId);
				window.console && console.log(data.sig);

				var smsCaptchaOption = {
					ncToken: nc_token,
					sig: data.sig,
					sessionId: data.sessionId,
					scene: scene
				};
				defaultOpt = _extends({}, defaultOpt, smsCaptchaOption);
				smsCaptcha.hideCont(smsCaptchaOption);
			},
			failCallback: function failCallback(data) {
				//拦截or失败回调
				window.console && console.log('fail', data);
			},
			error: function error(data) {
				//异常回调
				window.console && console.log('error', data);
			}
		};
		nCaptcha = NoCaptcha.init(NC_Opt);
		nCaptcha.setEnabled(true); // 启动
	}

	var smsCaptcha = {
		init: function init(option) {
			this.options = $.extend({}, this.defaultOptions, option);
			defaultOpt = this.options;
			getSysConfigType();
			var temp = $(tmpl);
			$("body").append(tmpl);

			var _self = this;
			$("#" + this.options.id).off("click").on("click", function (e) {
				e.stopPropagation();
				e.preventDefault();
				_self.options.checkInfo() && _self.showCont();
			});
		},
		defaultOptions: {
			id: "getVerification",
			mobile: "mobile",
			interCode: "interCode",
			checkInfo: function checkInfo() {
				return $("#" + this.mobile).valid();
			},
			sendCode: '805953'
		},
		showCont: function showCont() {
			if (this.hasCont()) {
				var wrap = $("#ncCaptchaPopup");
				nCaptcha && nCaptcha.reset();
				wrap.removeClass("hidden");
			}
			return this;
		},
		hasCont: function hasCont() {
			if (!$("#ncCaptchaPopup").length) return false;
			return true;
		},
		hideCont: function hideCont(option) {
			if (this.hasCont()) {
				var wrap = $("#ncCaptchaPopup");
				setTimeout(function () {
					wrap.addClass("hidden");
					getSmsCaptcha();
				}, 800);
			}
		}
	};
	return smsCaptcha;
});