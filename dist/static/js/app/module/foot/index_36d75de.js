'use strict';

define('js/app/module/foot/index', ['js/lib/jquery-2.1.4'], function ($) {
    var tmpl = "<div style=\"height: 1.2rem;\"></div>\n<footer class=\"fixft global-footer bg_fff am-flexbox\">\n    <a href=\"../index.html\" class=\"wp25 tc\">\n        <img src=\"../../../../images/home.png\" />\n        <p>首页</p>\n    </a>\n    <a href=\"../mall/mall.html\" class=\"wp25 fl tc\">\n        <img src=\"../../../../images/mall.png\" />\n        <p>商城</p>\n    </a>\n    <a href=\"../lease/lease.html\" class=\"wp25 fl tc\">\n        <img src=\"../../../../images/lease.png\" />\n        <p>租赁</p>\n    </a>\n    <a href=\"../user/user.html\" class=\"wp25 fl tc\">\n        <img src=\"../../../../images/user.png\" />\n        <p>我的</p>\n    </a>\n</footer>\n";
    var activeImgs = ['../../../../images/home_on.png', '../../../../images/mall_on.png', '../../../../images/lease_on.png', '../../../../images/user_on.png'];

    return {
        addFoot: function addFoot(idx) {
            var temp = $(tmpl);
            idx == undefined ? temp.appendTo($("body")) : temp.find("a:eq(" + idx + ")").addClass("active").find("img").attr("src", activeImgs[idx]).end().end().appendTo($("body"));
        }
    };
});