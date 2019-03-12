define("js/app/util/handlebarsHelpers",["js/lib/handlebars.runtime-v3.0.3"],function(e){return e.registerHelper("formatMoney",function(e){return e||0===e?(e=+e/1e3,e=(e+"").replace(/^(\d+\.\d\d)\d*/i,"$1"),(+e).toFixed(2)):"--"}),e.registerHelper("formatImage",function(e){return e?(e=e.split(/\|\|/)[0],/^http/.test(e)?e:PIC_PREFIX+e):""}),e.registerHelper("formatSquareImage",function(e){return e?(e=e.split(/\|\|/)[0],/^http/.test(e)?e:PIC_PREFIX+e+"?imageMogr2/auto-orient/thumbnail/!200x200r"):""}),e.registerHelper("formatRectImage",function(e){return e?(e=e.split(/\|\|/)[0],/^http/.test(e)?e:PIC_PREFIX+e+"?imageMogr2/auto-orient/thumbnail/!150x113r"):""}),e.registerHelper("formatBigRectImage",function(e){return e?(e=e.split(/\|\|/)[0],/^http/.test(e)?e:PIC_PREFIX+e+"?imageMogr2/auto-orient/interlace/1"):""}),e.registerHelper("formatAvatar",function(e){return e?(e=e.split(/\|\|/)[0],/^http/.test(e)?e:PIC_PREFIX+e+"?imageMogr2/auto-orient/thumbnail/!200x200r"):"/static/images/avatar.png"}),e.registerHelper("formatDateTime",function(e){return e?new Date(e).format("yyyy-MM-dd hh:mm:ss"):"--"}),e.registerHelper("formatDateTime1",function(e){return e?new Date(e).format("yyyy-MM-dd hh:mm"):"--"}),e.registerHelper("formatDate",function(e){return e?new Date(e).format("yyyy-MM-dd"):"--"}),e.registerHelper("formateTime",function(e){return e?new Date(e).format("hh:mm"):"--"}),e.registerHelper("clearTag",function(e){return e&&e.replace(/<[^>]+>|<\/[^>]+>|<[^>]+\/>|&nbsp;/gi,"")||""}),e.registerHelper("safeString",function(t){return new e.SafeString(t)}),e.registerHelper("formatAddress",function(e,t){var r=t.data.root.items[t.data.index];return r.city==r.province&&(r.city=""),(r.province||"")+(r.city||"")+(r.area||"")+r.address}),e.registerHelper("defaultProductPrice",function(e){var t=e.data.root.items[e.data.index],r="";return r=t.category==JFPRODUCTTYPE?(e.data.root.items[e.data.index].productSpecsList[0].price2/1e3).toFixed(2)+"积分":"￥"+(e.data.root.items[e.data.index].productSpecsList[0].price1/1e3).toFixed(2)}),e.registerHelper("defaultLeaseProductOPrice",function(e){var t=+e.data.root.items[e.data.index].originalPrice;return(t/1e3).toFixed(2)}),e.registerHelper("formatLocation",function(e){var t=e.data.root.items[e.data.index],r="";return"0"==t.location&&(r="hidden"),r}),e.registerHelper("formatCommentStar",function(e,t){var r=t.data.root.items[t.data.index],a="";return e<=r.score&&(a="active"),a}),e.registerHelper("defaultLeaseProductPrice",function(e){var t=e.data.root.items[e.data.index],r="";return r=t.type==JFLEASEPRODUCTTYPE?(e.data.root.items[e.data.index].price2/1e3).toFixed(2)+"积分":"￥"+(e.data.root.items[e.data.index].price1/1e3).toFixed(2)}),e.registerHelper("defaultProductOPrice",function(e){var t=+e.data.root.items[e.data.index].productSpecsList[0].originalPrice;return(t/1e3).toFixed(2)}),e.registerHelper("formatLeaseIsCollect",function(e){var t="";return"1"==e&&(t="active"),t}),e});