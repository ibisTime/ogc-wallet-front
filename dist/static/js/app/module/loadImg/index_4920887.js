"use strict";define("js/app/module/loadImg/index",["js/lib/jquery-2.1.4"],function(e){return{loadImg:function(t){for(var s=e(t),a=s.find("img"),l=0;l<a.length;l++){var d=a.eq(l);if(d[0].complete){var i=d[0].width,n=d[0].height;d.addClass(i>n?"hp100":"wp100"),d.closest(".default-bg").removeClass("default-bg")}else!function(e){e[0].onload=function(){var t=this.width,s=this.height;e.addClass(t>s?"hp100":"wp100"),e.closest(".default-bg").removeClass("default-bg")}}(d)}return s}}});