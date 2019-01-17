'use strict';

define('js/app/controller/base', ['js/app/util/dialog', 'js/app/util/cookie', 'js/app/module/loading/index', 'js/app/util/ajax'], function (dialog, CookieUtil, loading, Ajax) {
    $("body").on("click", ".goHref", function () {
        var thishref = $(this).attr("data-href");
        if (thishref != "" && thishref) {
            if (Base.isLogin()) {
                Base.updateLoginTime();
            }
            Base.gohref(thishref);
        }
    });

    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    $.prototype.serializeObject = function () {
        var a, o, h, i, e;
        a = this.serializeArray();
        o = {};
        h = o.hasOwnProperty;
        for (i = 0; i < a.length; i++) {
            e = a[i];
            if (!h.call(o, e.name)) {
                o[e.name] = e.value;
            }
        }
        return o;
    };

    //给form表单赋值
    $.fn.setForm = function (jsonValue) {
        var obj = this;
        $.each(jsonValue, function (name, ival) {
            if (obj.find("#" + name).length) {
                var $oinput = obj.find("#" + name);
                if ($oinput.attr("type") == "radio" || $oinput.attr("type") == "checkbox") {
                    $oinput.each(function () {
                        if (Object.prototype.toString.apply(ival) == '[object Array]') {
                            //是复选框，并且是数组  
                            for (var i = 0; i < ival.length; i++) {
                                if ($(this).val() == ival[i]) $(this).attr("checked", "checked");
                            }
                        } else {
                            if ($(this).val() == ival) {
                                $(this).attr("checked", "checked");
                            };
                        }
                    });
                } else if ($oinput.attr("type") == "textarea") {
                    //多行文本框  
                    obj.find("[name=" + name + "]").html(ival);
                } else {
                    if ($oinput.attr("data-format")) {
                        //需要格式化的日期 如:data-format="yyyy-MM-dd"
                        obj.find("[name=" + name + "]").val(Base.formatDate(ival, $oinput.attr("data-format")));
                    } else if ($oinput.attr("data-amount")) {
                        //需要格式化的日期 如:data-format="yyyy-MM-dd"
                        obj.find("[name=" + name + "]").val(Base.formatMoney(ival));
                    } else {
                        obj.find("[name=" + name + "]").val(ival);
                    }
                }
            }
        });
    };

    var Base = {
        // simple encrypt information with ***
        encodeInfo: function encodeInfo(info, headCount, tailCount, space) {
            headCount = headCount || 0;
            tailCount = tailCount || 0;
            info = info.trim();
            var header = info.slice(0, headCount),
                len = info.length,
                tailer = info.slice(len - tailCount),
                mask = '**************************************************',
                // allow this length
            maskLen = len - headCount - tailCount;
            if (space) {
                mask = '**** **** **** **** **** **** **** **** **** **** **** ****';
            }
            return maskLen > 0 ? header + mask.substring(0, maskLen + (space ? maskLen / 4 : 0)) + (space ? ' ' : '') + tailer : info;
        },
        formatDate: function formatDate(date, format) {
            if (!date) return "--";

            return new Date(date).format(format || 'yyyy-dd-MM');
        },
        getUrlParam: function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return '';
        },
        findObj: function findObj(array, key, value, key2, value2) {
            var i = 0,
                len = array.length,
                res;
            for (i; i < len; i++) {
                if (array[i][key] == value && !key2) {
                    return array[i];
                } else if (key2 && array[i][key] == value && array[i][key2] == value2) {
                    return array[i];
                }
            }
        },
        showMsg: function showMsg(msg, time) {
            var d = dialog({ content: msg, quickClose: true });
            d.show();
            setTimeout(function () {
                d.close().remove();
            }, time || 1500);
        },

        //判断密码强度
        calculateSecurityLevel: function calculateSecurityLevel(password) {
            var strength_L = 0;
            var strength_M = 0;
            var strength_H = 0;

            for (var i = 0; i < password.length; i++) {
                var code = password.charCodeAt(i);
                // 数字
                if (code >= 48 && code <= 57) {
                    strength_L++;
                    // 小写字母 大写字母
                } else if (code >= 65 && code <= 90 || code >= 97 && code <= 122) {
                    strength_M++;
                    // 特殊符号
                } else if (code >= 32 && code <= 47 || code >= 58 && code <= 64 || code >= 94 && code <= 96 || code >= 123 && code <= 126) {
                    strength_H++;
                }
            }
            // 弱
            if (strength_L == 0 && strength_M == 0 || strength_L == 0 && strength_H == 0 || strength_M == 0 && strength_H == 0) {
                return "1";
            }
            // 强
            if (0 != strength_L && 0 != strength_M && 0 != strength_H) {
                return "3";
            }
            // 中
            return "2";
        },
        getUserId: function getUserId() {
            return sessionStorage.getItem("userId") || "";
        },
        setSessionUser: function setSessionUser(data) {
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("token", data.token);
        },
        setSessionQiniuUrl: function setSessionQiniuUrl(data) {
            CookieUtil.set("qiniuUrl", data);
        },
        clearSessionUser: function clearSessionUser() {
            sessionStorage.removeItem("userId"); //userId
            sessionStorage.removeItem("token"); //token
            sessionStorage.removeItem("qiniuUrl"); //qiniuUrl
        },
        isLogin: function isLogin() {
            return !!Base.getUserId();
        },
        getDomain: function getDomain() {
            return location.origin;
        },
        goLogin: function goLogin() {
            sessionStorage.setItem("l-return", location.pathname + location.search);
            Base.gohref("../user/login.html");
        },
        throttle: function throttle(method, context, t) {
            var tt = t || 100;
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.call(context);
            }, tt);
        },
        // 获取图片
        getImg: function getImg(pic, suffix) {
            if (!pic) {
                return "";
            }
            if (pic) {
                pic = pic.split(/\|\|/)[0];
            }
            if (!/^http/i.test(pic)) {
                suffix = suffix || '?imageMogr2/auto-orient/interlace/1';
                pic = PIC_PREFIX + pic + suffix;
            }
            return pic;
        },
        getAvatar: function getAvatar(pic) {
            var defaultAvatar = "data:image/png;base64,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";
            if (!pic) {
                pic = defaultAvatar;
            } else {
                pic = Base.getImg(pic, "?imageMogr2/auto-orient/thumbnail/!200x200r");
            }
            return pic;
        },
        // 获取分享的图片
        getShareImg: function getShareImg(pic) {
            if (!pic) {
                return location.origin + '/static/images/share.png';
            }
            return Base.getImg(pic);
        },
        formatMoney: function formatMoney(s) {
            if (!$.isNumeric(s)) return "--";
            s = (+s / 1000).toString();
            s = s.replace(/(\.\d\d)\d+/ig, "$1");
            return parseFloat(s).toFixed(2);
        },
        // 模糊银行卡
        getBankCard: function getBankCard(card) {
            if (!card) return "";
            if (card.length == 16) {
                card = "**** **** **** " + card.substr(12);
            } else if (card.length == 19) {
                card = "**** **** **** **** " + card.substr(16);
            }
            return card;
        },
        //判断终端
        getUserBrowser: function getUserBrowser() {
            var browser = {
                versions: function () {
                    var u = navigator.userAgent,
                        app = navigator.appVersion;
                    return { //移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            };

            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                //ios
                return 'ios';
            } else {
                //android
                return 'android';
            }
        },
        //判断是否是微信
        is_weixn: function is_weixn() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        //判断是否是qq内置浏览器
        is_mqqbrowser: function is_mqqbrowser() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/\sQQ/i) !== null) {
                return true;
            } else {
                return false;
            }
        },
        // 确认框
        confirm: function confirm(msg, cancelValue, okValue) {
            return new Promise(function (resolve, reject) {
                var d = dialog({
                    content: msg,
                    ok: function ok() {
                        var that = this;
                        setTimeout(function () {
                            that.close().remove();
                        }, 1000);
                        resolve();
                        return true;
                    },
                    cancel: function cancel() {
                        reject();
                        return true;
                    },
                    cancelValue: cancelValue || Base.getText("取消"),
                    okValue: okValue || Base.getText("确定")
                });
                d.showModal();
            });
        },
        // 显示loading
        showLoading: function showLoading(msg, hasBottom) {
            loading.createLoading(msg, hasBottom);
        },
        // 隐藏loading
        hideLoading: function hideLoading() {
            loading.hideLoading();
        },
        // 清除内容里的标签
        clearTag: function clearTag(content) {
            return content.replace(/<[^>]+>|<\/[^>]+>|<[^>]+\/>|&nbsp;/ig, "");
        },
        encode: function encode(str) {
            if (!str || str.length === 0) {
                return '';
            }
            var s = '';
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/<(?=[^o][^)])/g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br>");
            return s;
        },
        /* 
         * url 目标url 
         * arg 需要替换的参数名称 
         * arg_val 替换后的参数的值 
         * return url 参数替换后的url 
         */
        changeURLArg: function changeURLArg(url, arg, arg_val) {
            var pattern = arg + '=([^&]*)';
            var replaceText = arg + '=' + arg_val;
            if (url.match(pattern)) {
                var tmp = '/(' + arg + '=)([^&]*)/gi';
                tmp = url.replace(eval(tmp), replaceText);
                return tmp;
            } else {
                if (url.match('[\?]')) {
                    return url + '&' + replaceText;
                } else {
                    return url + '?' + replaceText;
                }
            }
            return url + '\n' + arg + '\n' + arg_val;
        },
        //跳转 location.href
        gohref: function gohref(href) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOWLANG;

            var timestamp = new Date().getTime();
            //判断链接后是否有带参数
            if (href.split("?")[1]) {
                //判断是否有带v的参数，有则替换v的参数
                if (Base.getUrlParam("v", href) != "" && Base.getUrlParam("v", href)) {
                    location.href = Base.changeURLArg(href, "v", timestamp);
                } else {
                    location.href = href + "&v=" + timestamp + '&lang=' + lang;
                }
            } else {
                location.href = href + "?v=" + timestamp + '&lang=' + lang;
            }
        },
        //跳转 location.replace
        gohrefReplace: function gohrefReplace(href) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOWLANG;

            var timestamp = new Date().getTime();
            //判断链接后是否有带参数
            if (href.split("?")[1]) {
                //判断是否有带v的参数，有则替换v的参数
                if (Base.getUrlParam("v", href) != "" && Base.getUrlParam("v", href)) {
                    location.replace(Base.changeURLArg(href, "v", timestamp));
                } else {
                    location.replace(href + "&v=" + timestamp + '&lang=' + lang);
                }
            } else {
                location.replace(href + "?v=" + timestamp + '&lang=' + lang);
            }
        },
        // 根据语言获取文本
        getText: function getText(text, lang) {
            if (lang == '' || !lang) {
                lang = NOWLANG;
            }
            var t = LANGUAGE[text] && LANGUAGE[text][lang] ? LANGUAGE[text][lang] : '';
            if (!LANGUAGE[text] || t == '') {
                if (!LANGUAGE[text]) {
                    t = text;
                    console.log('[' + text + ']没有翻译配置');
                } else {
                    if (!LANGUAGE[text]['EN']) {
                        t = LANGUAGE[text]['ZH_CN'];
                    } else {
                        t = LANGUAGE[text]['EN'];
                    }
                    console.log(lang + ': [' + text + ']没有翻译配置');
                }
            }
            return t;
        },
        // 获取时间差
        getTimeDifference: function getTimeDifference(date1, date2) {
            var difference = '';

            var date3 = new Date(date2).getTime() - new Date(date1).getTime(); //时间差的毫秒数

            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000));

            //计算出小时数

            var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));

            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000));

            //计算相差秒数
            var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            if (days != '0') {
                difference += days + "天";
            }
            if (hours != '0') {
                difference += hours + "小时";
            }
            if (minutes != '0') {
                difference += minutes + "分钟";
            }

            difference += seconds + "秒";
            return difference;
        }

    };
    return Base;
});