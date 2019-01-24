define([
    'jquery',
    'app/controller/base',
    'app/util/dialog',
    'app/interface/GeneralCtr'
], function ($, base, dialog, GeneralCtr) {
    var defaultOpt = {};
  var lang = base.getUrlParam('lang') || 'ZH_CN';
    function _showMsg(msg, time) {
        var d = dialog({
            content: msg,
            quickClose: true
        });
        d.show();
        setTimeout(function() {
            d.close().remove();
        }, time || 1500);
    }
    function initSms(opt){
        this.options = $.extend({}, this.defaultOptions, opt);
        defaultOpt = this.options;
        var _self = this;
        $("#" + this.options.id).off("click")
            .on("click", function(e) {
                e.stopPropagation();
                e.preventDefault();
                _self.options.checkInfo() && _self.handleSendVerifiy();
            });
    }
    initSms.prototype.defaultOptions = {
        id: "getVerification",
        mobile: 'mobile',
        interCode: "interCode",
        checkInfo: function () {
    		return $("#" + this.mobile).valid();
        },
        sendCode: '805953'
    };
    initSms.prototype.handleSendVerifiy = function() {
        var verification = $("#" + this.options.id);
        verification.prop("disabled", true);
        base.showLoading();
        GeneralCtr.sendCaptcha(this.options.sendCode, {
        	bizType: this.options.bizType,
        	mobile: $("#" + this.options.mobile).val()
        }).then(() => {
          base.hideLoading();
            var i = 60;
            this.timer = window.setInterval(() => {
                if(i > 0){
                    verification.text(i-- + "s");
                }else {
                    verification.text(base.getText("获取验证码", lang)).prop("disabled", false);
                    clearInterval(this.timer);
                }
            }, 1000);
        }, () => {
          base.hideLoading();
            this.options.errorFn && this.options.errorFn();
            verification.text(base.getText("获取验证码", lang)).prop("disabled", false);
        });
    };
    return {
        init: function (options) {
            new initSms(options);
        }
    }
});
