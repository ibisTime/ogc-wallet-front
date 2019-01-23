'use strict';

define('js/app/interface/BizCtr', ['js/app/controller/base', 'js/app/util/ajax'], function (base, Ajax) {
    return {
        //抽奖
        luckDraw: function luckDraw(userId) {
            return Ajax.get("625440", { userId: userId }, true);
        },

        // 列表获取中奖名单
        getListPrizeWinner: function getListPrizeWinner() {
            return Ajax.get("625441", {}, true);
        }
    };
});