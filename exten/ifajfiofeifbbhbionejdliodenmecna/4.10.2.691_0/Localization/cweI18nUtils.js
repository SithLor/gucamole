async function translateHtmlDocument(e){let d=$(e).find("[dji-i18n]");for(var b=0;b<d.length;b++){var c=$(d[b]),a=c.attr("dji-i18n");a&&""!==a&&(a=await window.dji.cwe.i18n.instance.getMessage(a))&&""!==a&&c.text(a)}d=$(e).find("[dji-i18n-html]");for(b=0;b<d.length;b++)c=$(d[b]),(a=c.attr("dji-i18n-html"))&&""!==a&&(a=await window.dji.cwe.i18n.instance.getMessage(a))&&""!==a&&c.html(a);d=$(e).find("[dji-i18n-placeholder]");for(b=0;b<d.length;b++)c=$(d[b]),(a=c.attr("dji-i18n-placeholder"))&&""!==
a&&(a=await window.dji.cwe.i18n.instance.getMessage(a))&&""!==a&&c.attr("placeholder",a);d=$(e).find("[dji-i18n-title]");for(e=0;e<d.length;e++)b=$(d[e]),(c=b.attr("dji-i18n-title"))&&""!==c&&(c=await window.dji.cwe.i18n.instance.getMessage(c))&&""!==c&&b.attr("title",c)}window.dji=window.dji||{};window.dji.cwe=window.dji.cwe||{};window.dji.cwe.i18n=window.dji.cwe.i18n||{};window.dji.cwe.i18n.translateHtmlDocument=translateHtmlDocument;
