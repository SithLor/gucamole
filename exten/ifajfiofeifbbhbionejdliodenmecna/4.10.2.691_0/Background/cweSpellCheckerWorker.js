var Module={};
const WasmModuleWrapper=function(){var h=null;let m=!1,k=!1,e=void 0;Module.locateFile=function(a){return`${h}/${a}`};Module.setStatus=function(a){};Module.monitorRunDependencies=function(a){};Module.onRuntimeInitialized=function(){m=!0;k=!1;try{e&&e(!0)}catch(a){console.error(a)}e=void 0};return{loadAndInitializeAsync:async function(a){return new Promise(function(b,c){if(m||k)return c(Error("Loading in progress!"));k=!0;e=b;h=a;importScripts(`${h}/cowriter-spellchecker.js`);importScripts("/WebExtensions/filesystem/djiVFS.js");importScripts("/WebExtensions/filesystem/djiSyncFSDriver.js")})},
Module}}();
(function(){async function h(a,b){let c=null;try{await WasmModuleWrapper.loadAndInitializeAsync(a.appDir)}catch(d){c=d}self.postMessage({message:b,params:{error:c?c.message:null}})}async function m(a){if(!a.locale)throw"Missing locale parameter!";if(!a.resourceDirectory&&!a.commonDirectory)throw"Missing resource directory parameter!";let b=null;if(a.commonDirectory&&0<a.commonDirectory.length){try{FS.extensions.mapSyncFS(a.commonDirectory)}catch(c){if(!c.code||"EBUSY"!==c.code)throw c;}b=a.commonDirectory}if(a.resourceDirectory&&
0<a.resourceDirectory.length){try{FS.extensions.mapVfsContainer(a.resourceDirectory,a.resourceContainer)}catch(c){if(!c.code||"EBUSY"!==c.code)throw c;}b=a.resourceDirectory}e.initializeLocale(a.locale,b)}async function k(a,b){try{e=new Module.SpellcheckerModule;for(let c of a)try{await m(c)}catch(d){return e=null,self.postMessage({message:b,params:{initialized:!1,error:d}})}}catch(c){e=null,console.error(c)}self.postMessage({message:b,params:{initialized:null!==e,error:null!==e?null:"Worker could not be initialized!"}})}
let e=void 0;self.addEventListener("message",function(a){a=a.data;var b=a.message,c=a.params;a=(a.options||{}).callbackMessage;if("com.donjohnston.cowriter.worker.load"===b)h(c,a);else if("com.donjohnston.cowriter.worker.initialize"===b)k(c,a);else if("com.donjohnston.cowriter.worker.spellcheck"===b&&e){if(b=c.locales){var d=new Module.StringVector;for(var f=0;f<b.length;f++)d.push_back(b[f]);b=d}else b=null;b=e.spellcheckEx(c.word,b);c=[];d=[];if(null!==b)if(b.word)d.push(b);else if(b){d=[];f=b.size();
for(var l=0;l<f;l++)d.push(b.get(l))}else d=null;for(let g of d){b=c;d=b.push;f=g.word();l=g.locale();var r=g.misspelled(),p=g.suggestions();const q=[];for(let n=0;n<p.size();n++)q.push(p.get(n));d.call(b,{word:f,locale:l,misspelled:r,suggestions:q,matchWord:g.matchWord()||"",matchFound:g.matchFound()})}self.postMessage({message:a,params:c})}});self.postMessage({message:"com.donjohnston.cowriter.worker.ready",params:{error:null}})})();