window.dji=window.dji||{};window.dji.utils=window.dji.utils||{};
window.dji.utils.TextareaCaretHelper=function(){class m{constructor(a){a=a||document.documentElement;let e=a.ownerDocument;(this.m_window=e.querySelector("div#__DJI_CWE_MEASUREMENT_WINDOW_GENERIC"))?(this.m_windowDiv=e.querySelector("div#__DJI_CWE_MEASUREMENT_WINDOW_GENERIC_DIV"),this.m_windowCaret=e.querySelector("div#__DJI_CWE_MEASUREMENT_WINDOW_GENERIC_CARET")):(this.m_window=e.createElement("div"),this.m_window.id="__DJI_CWE_MEASUREMENT_WINDOW_GENERIC",this.m_windowDiv=e.createElement("div"),
this.m_windowDiv.id="__DJI_CWE_MEASUREMENT_WINDOW_GENERIC_DIV",this.m_window.appendChild(this.m_windowDiv),this.m_windowCaret=e.createElement("span"),this.m_windowCaret.id="__DJI_CWE_MEASUREMENT_WINDOW_GENERIC_CARET",a.appendChild(this.m_window));this.m_windowDivRect=null;this.m_range=document.createRange()}getCaretPosition(a){return a&&void 0!==a.selectionStart&&"TEXTAREA"===a.tagName.toUpperCase()?this.__getTextareaCaretPosition(a):a&&void 0!==a.selectionStart&&"INPUT"===a.tagName.toUpperCase()?
this.__getInputCaretPosition(a):null}__getTextareaCaretPosition(a){let e={left:0,top:0,right:0,bottom:0};for(;this.m_windowDiv.lastChild;)this.m_windowDiv.lastChild.remove();var b=a.ownerDocument.defaultView.getComputedStyle(a,null),c=b.length;for(var d=0;d<c;++d){var f=b[d],g=b.getPropertyValue(f),h=b.getPropertyPriority(f);this.m_windowDiv.style.setProperty(f,g,h)}this.m_windowDiv.style.height="auto";c=a.value+String.fromCharCode(160);d=document.createTextNode(c);this.m_windowDiv.appendChild(d);
b=a.selectionStart;f=b+(a.selectionEnd-b);this.m_range.setStart(d,f);this.m_range.setEnd(d,Math.min(f+1,c.length));b=this.m_range.getBoundingClientRect();g=Math.min(f+1,c.length);this.m_range.setStart(d,g);this.m_range.setEnd(d,Math.min(g+1,c.length));c=this.m_range.getBoundingClientRect();this.m_range.setStart(d,Math.max(f-1,0));this.m_range.setEnd(d,f);d=this.m_range.getBoundingClientRect();f=c.bottom>b.bottom;g=d.bottom<b.bottom;h=this.m_windowDiv.getBoundingClientRect();const k=a.getBoundingClientRect(),
l=a.__djiLastEvent;!g&&!f||window.dji.utils.isNullOrUndefined(l)||window.dji.utils.isNullOrUndefined(l.keyCode)&&(-a.scrollTop+k.top+b.bottom-h.top<l.clientY?b=c:-a.scrollTop+k.top+b.top-h.top>l.clientY&&(b=d));e.left=-a.scrollLeft+k.left+b.left-h.left;e.top=-a.scrollTop+k.top+b.top-h.top;e.right=Math.min(3,Math.abs(b.right-b.left));e.bottom=b.bottom-b.top;return e}__getInputCaretPosition(a){let e={left:0,top:0,right:0,bottom:0};var b=a.ownerDocument,c=a.selectionStart,d=a.selectionEnd-a.selectionStart;
let f=a.value;var g=f.slice(0,c+d);d=f.slice(c+d,f.length);c=document.createTextNode(g);d=document.createTextNode(d);b=b.defaultView.getComputedStyle(a,null);for(0<g.length&&g.replace(/ /g,".");this.m_windowDiv.lastChild;)this.m_windowDiv.lastChild.remove();this.m_windowDiv.style.cssText=b.cssText;this.m_windowDiv.appendChild(c);this.m_windowDiv.appendChild(this.m_windowCaret);this.m_windowDiv.appendChild(d);g=a.getBoundingClientRect();b=this.m_windowDiv.getBoundingClientRect();c=this.m_windowCaret.getBoundingClientRect();
e.left=-a.scrollLeft+g.left+c.left-b.left;e.top=-a.scrollTop+g.top+c.top-b.top;e.right=c.right-c.left;e.bottom=c.bottom-c.top;return e}}return m}();