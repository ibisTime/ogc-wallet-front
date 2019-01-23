'use strict';

define('js/app/interface/RedPacketCtr', ['js/app/controller/base', 'js/app/util/ajax'], function (base, Ajax) {
    return {
        // 获取红包详情
        getRedPacketDetail: function getRedPacketDetail(config) {
            return Ajax.get("623006", config);
        },

        // 领取红包
        receiveRedPacket: function receiveRedPacket(redPacketCode) {
            return Ajax.get("623001", {
                redPacketCode: redPacketCode,
                userId: base.getUserId()
            });
        }
    };
});