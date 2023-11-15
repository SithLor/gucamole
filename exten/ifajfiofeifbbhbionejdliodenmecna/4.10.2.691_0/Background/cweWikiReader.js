function CWEWikiReader(b,a){const c=this;this.m_listener=a;this.m_wikiSearchUrl={uk:"https://en.wikipedia.org/w/api.php?action=opensearch&search=",us:"https://en.wikipedia.org/w/api.php?action=opensearch&search=",be:"https://en.wikipedia.org/w/api.php?action=opensearch&search=",can:"https://en.wikipedia.org/w/api.php?action=opensearch&search=",fr:"https://fr.wikipedia.org/w/api.php?action=opensearch&search=",ger:"https://de.wikipedia.org/w/api.php?action=opensearch&search=",spa:"https://es.wikipedia.org/w/api.php?action=opensearch&search="};
this.m_wikiLoadUrl={uk:"https://en.wikipedia.org/w/index.php?printable=yes&title=",us:"https://en.wikipedia.org/w/index.php?printable=yes&title=",be:"https://en.wikipedia.org/w/index.php?printable=yes&title=",can:"https://en.wikipedia.org/w/index.php?printable=yes&title=",fr:"https://fr.wikipedia.org/w/index.php?printable=yes&title=",ger:"https://de.wikipedia.org/w/index.php?printable=yes&title=",spa:"https://es.wikipedia.org/w/index.php?printable=yes&title="};this.m_searchXHR=this.m_searchTimer=
null;this.m_sensitiveWordsMap=b||{};this.m_excludeWordsList="References;See also;External links;Notes;Rate this page;Notes and references;Footnotes;Bibliography;Further reading;Some references".split(";");this.__doSearchWrapper=function(d,e){c.__doSearch(d,e)}}CWEWikiReader.prototype.setOptions=function(b){b&&b.hasOwnProperty("sensitiveWords")&&(this.m_sensitiveWordsMap=b.sensitiveWords)};
CWEWikiReader.prototype.search=function(b,a){if(!this.m_listener)throw Error("Invalid parameters: callback is missing!");a=a.toLowerCase();null!==this.m_searchTimer&&clearTimeout(this.m_searchTimer);this.m_searchTimer=setTimeout(this.__doSearchWrapper,0,{text:b,locale:a,enhanced:!1})};
CWEWikiReader.prototype.searchAsync=function(b,a){a=a.toLowerCase();const c=this;null!==c.m_searchTimer&&clearTimeout(this.m_searchTimer);return new Promise(function(d){c.m_searchTimer=setTimeout(c.__doSearchWrapper,0,{text:b,locale:a,enhanced:!0},d)})};
CWEWikiReader.prototype.__doSearch=function(b,a){const c=this.__filter(b.text),d=b.locale;this.m_searchTimer=null;this.m_searchXHR&&(this.m_searchXHR.abort(),this.m_searchXHR=null);if(!navigator.onLine||void 0===c||null===c||0>=c.length)a instanceof Function?a([]):this.m_listener.wikiReaderSearchFinished([]);else{var e=this;this.m_searchXHR=$.ajax(this.m_wikiSearchUrl[d]+encodeURIComponent(c)).done(function(f){e.m_searchXHR=null;const k=f&&1<=f.length?f[1]:[];let g=b.enhanced?[]:k;b.enhanced?(f=f&&
3<=f.length?f[3]:[],k.forEach(function(h){g.push({name:h})}),f.forEach(function(h,l){g[l].url=h}),g=g.filter(h=>e.__validate(h.name))):g=g.filter(h=>e.__validate(h));a instanceof Function?a(g):e.m_listener.wikiReaderSearchFinished(g)}).fail(function(){e.m_searchXHR=null;a instanceof Function?a([]):e.m_listener.wikiReaderSearchFinished([])})}};
CWEWikiReader.prototype.__filter=function(b){b=b.split(/\b/);let a=[];for(let c=0;c<b.length;c++){let d=b[c].trim(),e=d.toUpperCase();0<e.length&&!this.m_sensitiveWordsMap.hasOwnProperty(e)&&a.push(d)}return a.join(" ")};CWEWikiReader.prototype.__validate=function(b){b=b.split(/\b/);for(let a=0;a<b.length;a++){let c=b[a].trim().toUpperCase();if(0<c.length&&this.m_sensitiveWordsMap.hasOwnProperty(c))return!1}return!0};CWEWikiReader.prototype.load=function(b,a){navigator.onLine?this.__load(b,a):this.m_listener.wikiReaderLoadFinished(null)};
CWEWikiReader.prototype.loadAsync=async function(b,a){if(!navigator.onLine)return null;const c=this;return new Promise(function(d){c.__load(b,a,d)})};
CWEWikiReader.prototype.__load=function(b,a,c){const d=this;a=a?a.toLowerCase():"us";$.get(d.m_wikiLoadUrl[a]+encodeURIComponent(b)).done(function(e){e=e.replace(/<script>/g,"\x3c!-- ").replace(/<script /g,"\x3c!-- ").replace(/<\/script>/g,"< --!>").replace(/<noscript>/g,"\x3c!-- ").replace(/<\/noscript>/g,"< --!>").replace(/<link /g,"\x3c!-- ").replace(/<\/link>/g,"< --!>").replace(/<meta /g,"\x3c!-- ").replace(/<\/meta>/g,"< --!>").replace(/<style>/g,"\x3c!-- ").replace(/<style /g,"\x3c!-- ").replace(/<\/style>/g,
"< --!>").replace(/<img /g,"\x3c!-- ").replace(/<\/img>/g,"< --!>").replace(/<a /g,"\x3c!-- ").replace(/<\/a>/g,"< --!>").replace(/http/g,"xxx");e=document.createRange().createContextualFragment(e);let f=e.getElementById("content");f||(f=e.getElementById("bodyContent"));(e=f?f.textContent:null)&&(e=d.__processWikiContent(e,a));c?c(e||null):d.m_listener.wikiReaderLoadFinished(d.__processWikiContent(e||null,a))}).fail(function(){c?c(null):d.m_listener.wikiReaderLoadFinished(null,a)})};
CWEWikiReader.prototype.__processWikiContent=function(b,a){a=a.toLowerCase();b="fr"==a||"spa"==a||"ger"==a?window.dji.utils.htmlToUnicode(b):CWEChromeUtilities.wikiHtmlToAscii(b);if(!b)return"";b=b.replace(/\r\r/g,"\r");a=b.length/4;for(var c=0;c<this.m_excludeWordsList.length;c++){var d=this.m_excludeWordsList[c];d="\r"+d+"\r";d=b.lastIndexOf(d);-1!=d&&d>a&&(b=b.slice(0,d))}return b};
