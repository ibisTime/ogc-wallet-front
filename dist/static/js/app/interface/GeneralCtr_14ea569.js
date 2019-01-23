'use strict';

define('js/app/interface/GeneralCtr', ['js/app/controller/base', 'js/app/util/ajax'], function (base, Ajax) {
    return {
        //获取七牛Token
        getQiniuToken: function getQiniuToken() {
            return Ajax.get("805951", {}, true, true);
        },

        /*
         * 发送短信
         * @config: {bizType, mobile, interCode, sendCode}
         * */
        sendCaptcha: function sendCaptcha(sendCode, config) {
            if (sendCode == "630093") {
                config.email = config.mobile;
                delete config.mobile;
            } else {
                config.mobile = config.mobile;
            }
            return Ajax.post(sendCode, config, true, true);
        },

        // 查询系统参数 type
        getSysConfigType: function getSysConfigType(type) {
            return Ajax.get("660918", { type: type }, true, true);
        },

        // 查询系统参数 key
        getSysConfigKey: function getSysConfigKey(ckey) {
            return Ajax.get("660917", { ckey: ckey }, true, true);
        },

        // 查询数据字典 parentKey
        getDictList: function getDictList(parentKey) {
            return Ajax.get("630045", { parentKey: parentKey }, true, true);
        }
    };
});