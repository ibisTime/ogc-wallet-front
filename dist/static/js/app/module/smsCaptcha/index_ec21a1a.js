'use strict';

define('js/app/module/smsCaptcha/index', ['js/lib/jquery-2.1.4', 'js/app/controller/base', 'js/app/util/dialog', 'js/app/interface/GeneralCtr'], function ($, base, dialog, GeneralCtr) {
    var defaultOpt = {};
    var lang = base.getUrlParam('lang') || 'ZH_CN';
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
    function initSms(opt) {
        this.options = $.extend({}, this.defaultOptions, opt);
        defaultOpt = this.options;
        var _self = this;
        $("#" + this.options.id).off("click").on("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            _self.options.checkInfo() && _self.handleSendVerifiy();
        });
    }
    initSms.prototype.defaultOptions = {
        id: "getVerification",
        mobile: 'mobile',
        interCode: "interCode",
        checkInfo: function checkInfo() {
            return $("#" + this.mobile).valid();
        },
        sendCode: '805953'
    };
    initSms.prototype.handleSendVerifiy = function () {
        var _this = this;

        var verification = $("#" + this.options.id);
        verification.prop("disabled", true);
        base.showLoading();
        GeneralCtr.sendCaptcha(this.options.sendCode, {
            bizType: this.options.bizType,
            mobile: $("#" + this.options.mobile).val()
        }).then(function () {
            base.hideLoading();
            var i = 60;
            _this.timer = window.setInterval(function () {
                if (i > 0) {
                    verification.text(i-- + "s");
                } else {
                    verification.text(base.getText("获取验证码", lang)).prop("disabled", false);
                    clearInterval(_this.timer);
                }
            }, 1000);
        }, function () {
            base.hideLoading();
            _this.options.errorFn && _this.options.errorFn();
            verification.text(base.getText("获取验证码", lang)).prop("disabled", false);
        });
    };
    return {
        init: function init(options) {
            new initSms(options);
        }
    };
});