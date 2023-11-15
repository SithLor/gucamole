window.dji=window.dji||{};
window.dji.topicHelper=function(){async function x(a,c,d,b){if(!h.activateTopicDelegate||!h.updateTopicDelegate)return b(m("missing_delegate"));const f={name:a.name,activate:!!a.activate};if(a.activate&&!(6>g.activeTopics.length||p(f.name)))return b(m("too_many_active_topics"));if(c)try{c(f)}catch(e){Logger.instance.error(e)}a=!1;c=void 0;try{let e=await h.activateTopicDelegate(f);e&&"ok"===e.status&&(a=!0,c=e.active,r(e.name,e.active))}catch(e){Logger.instance.error(e)}d({success:a,active:c})}async function y(a,
c,d,b){if(!h.activateTopicDelegate||!h.updateTopicDelegate)return b(m("missing_delegate"));var f=a.name,e=a.url;const l=a.data,k=a.local,n=a.extras;var t;a=u(f);const v=(t=-1!==g.topics.indexOf(a))&&p(f),w=!!(6>g.activeTopics.length||p(f));a=!(!k||v);if(k&&v)return d({success:!0,activate:!0});if(k&&!w)return b(m("too_many_active_topics"));b={name:f,url:e,data:l,local:k,userData:{action:null,activate:w,extras:n}};a?(b.activate=!0,b.provideTopicsData=!0,b.userData.action="activate"):b.userData.action=
t?"update":"create";if(c)try{c(b)}catch(q){Logger.instance.error(q)}c=!1;f=void 0;try{e=void 0,(e=a?await h.activateTopicDelegate(b):await h.updateTopicDelegate(b))&&"ok"===e.status&&(c=!0,f=e.active,r(e.name,e.active))}catch(q){Logger.instance.error(q)}d({success:c,active:f})}function r(a,c){a:{var d=g.displayTopics;for(var b=0;b<d.length;b++)if(d[b].name===a){d=d[b];break a}d=null}b=g.activeTopics.indexOf(a);(c=!!c)&&-1===b?g.activeTopics.push(a):c||-1===b||g.activeTopics.splice(b,1);d&&(d.active=
c)}function p(a){a=u(a);return-1!==g.activeTopics.indexOf(a)}function u(a){if(null===a||void 0===a)return null;a=a.replace("_"," ");a.endsWith(" TD")&&(a=a.slice(0,a.length-3));let c="";for(let d=0;d<a.length;d++){const b=a.charAt(d),f=b.toLowerCase(),e=b.toUpperCase();c+=a.charAt(d);if(d<a.length-1){const l=a.charAt(d+1),k=l.toLowerCase(),n=l.toUpperCase();f!==e&&k!==n&&b===f&&l===n&&(c+=" ")}}return c}function m(a,c){c=Error(c);c.code=a;return c}const h={activateTopicDelegate:void 0,updateTopicDelegate:void 0};
let g={topics:[],topicsUpperCase:[],activeTopics:[],displayTopics:[]};return{setActivateTopicDelegate:function(a){a instanceof Function&&(h.activateTopicDelegate=a)},setUpdateTopicDelegate:function(a){a instanceof Function&&(h.updateTopicDelegate=a)},setTopics:function(a,c,d){g.topics=a?[...a]:[];g.topicsUpperCase=g.topics.map(function(b){return b.toUpperCase()});g.displayTopics=d?[...d]:[];g.activeTopics=c?[...c]:g.displayTopics.reduce(function(b,f){b.push(f.name)},[])},activateTopicAsync:async function(a,
c){return new Promise(function(d,b){x(a,c,d,b)})},updateTopicAsync:async function(a,c){return new Promise(function(d,b){y(a,c,d,b)})}}}();