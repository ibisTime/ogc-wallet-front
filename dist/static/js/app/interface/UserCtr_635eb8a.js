'use strict';

define('js/app/interface/UserCtr', ['js/app/controller/base', 'js/app/util/ajax'], function (base, Ajax) {
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
    },

    // 列表查询国家
    getListCountry: function getListCountry() {
      return Ajax.get("801120", { status: 1 }, true, true);
    },

    // 短信注册
    mobileRegister: function mobileRegister(config) {
      return Ajax.get("805041", config, true, true);
    },

    // 邮箱注册
    emailRegister: function emailRegister(config) {
      return Ajax.get("805046", config, true, true);
    },

    // 登录
    login: function login(config) {
      return Ajax.get("805051", config, true, true);
    },

    // 获取用户信息
    getUserInfo: function getUserInfo(userId) {
      return Ajax.get("805121", {
        userId: userId
      }, true);
    },

    // 找回密码
    getUserPass: function getUserPass(config) {
      return Ajax.get("805076", config, true, true);
    },

    // 获取攻略详情
    getStrategy: function getStrategy(config) {
      return Ajax.get("625468", config, true, true);
    },

    // 攻略点赞
    getLink: function getLink(config) {
      return Ajax.get("625464", config, true, true);
    }
  };
});