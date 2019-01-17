"use strict";

define('js/app/module/loading/index', ['js/lib/jquery-2.1.4'], function ($) {
    var tmpl = "<div class=\"loading-module-wrap\">\n    <div class=\"loading-module-cont\">\n        <div class=\"global-loading-icon\"></div>\n        <span class=\"loading-module-text\"></span>\n    </div>\n</div>\n";
    var css = ".loading-module-wrap{\n\tposition: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    z-index: 9999;\n    bottom: 0;\n}\n.loading-module-wrap.loading-has-bottom{\n\tbottom: 49px;\n}\n.loading-module-wrap .loading-module-cont{\n\tmin-width: 60px;\n    -webkit-border-radius: 4px;\n            border-radius: 4px;\n    color: #fff;\n    background-color: rgba(58,58,58,.9);\n    line-height: 1.5;\n    padding: 9px 15px;\n\ttop: 40%;\n\tleft: 50%;\n\t-webkit-transform: translate(-50%, -50%);\n\t   -moz-transform: translate(-50%, -50%);\n\t    -ms-transform: translate(-50%, -50%);\n\t        transform: translate(-50%, -50%);\n\tposition: absolute;\n    max-width: 50%;\n}\n.loading-module-wrap .loading-module-cont .loading-module-text{\n\tfont-size: .28rem;\n}\n";

    $("head").append('<style>' + css + '</style>');
    function _hasLoading() {
        return !!$(".loading-module-wrap").length;
    }
    return {
        createLoading: function createLoading(msg, hasBottom) {
            msg = msg || "Loading...";
            if (_hasLoading()) {
                $(".loading-module-wrap").find(".loading-module-text").text(msg).end().show();
            } else {
                var cont = $(tmpl);
                cont.find(".loading-module-text").text(msg);
                $("body").append(cont);
            }
            if (hasBottom) {
                $(".loading-module-wrap").addClass("loading-has-bottom");
            }
            return this;
        },
        showLoading: function showLoading() {
            if (_hasLoading()) {
                $(".loading-module-wrap").show();
            }
            return this;
        },
        hideLoading: function hideLoading() {
            $(".loading-module-wrap").hide();
            return this;
        }
    };
});