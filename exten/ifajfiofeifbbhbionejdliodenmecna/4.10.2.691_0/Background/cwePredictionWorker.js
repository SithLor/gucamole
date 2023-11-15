var Module={};
const WasmModuleWrapper=function(){var n=null;let l=!1,h=!1,f=void 0;Module.locateFile=function(k){return`${n}/${k}`};Module.setStatus=function(k){};Module.monitorRunDependencies=function(k){};Module.onRuntimeInitialized=function(){l=!0;h=!1;try{f&&f(!0)}catch(k){console.error(k)}f=void 0};return{loadAndInitializeAsync:async function(k){return new Promise(function(m,e){if(l||h)return e(Error("Loading in progress!"));h=!0;f=m;n=k;importScripts(`${n}/cowriter-prediction.js`);importScripts("/WebExtensions/filesystem/djiVFS.js");importScripts("/WebExtensions/filesystem/djiSyncFSDriver.js")})},
Module}}();
(function(){async function n(a,d){let c=null;try{await WasmModuleWrapper.loadAndInitializeAsync(a.appDir)}catch(b){c=b}self.postMessage({message:d,params:{error:c?c.message:null}})}function l(a,d,c,b){c(a[b]);self.postMessage({message:d,params:{userData:a.userData}})}function h(a,d,c,b){self.postMessage({message:d,params:{topic:b,allTopics:f(a.allTopics()),activeTopics:f(a.activeTopics()),recentTopics:f(a.recentTopics()),userData:c}})}function f(a){if(!a)return null;let d=[],c=a.size();for(let b=
0;b<c;b++)d.push(a.get(b));return d}function k(a){let d=[];if(!a)return d;let c=a.size();for(let b=0;b<c;b++){const g=a.get(b);d.push({filePath:g.filePath(),name:g.name(),type:g.type(),language:g.language()})}return d}function m(a,d){if(!a)return null;d=new d;for(let c=0;c<a.length;c++)d.push_back(a[c]);return d}let e=null;var p=null;self.addEventListener("message",function(a){var d=a.data,c=d.message;a=d.params;d=(d.options||{}).callbackMessage;if("com.donjohnston.cowriter.worker.load"===c)n(a,d);
else if("com.donjohnston.cowriter.worker.initialize"===c)if(a.locale)if(a.resourceDirectory&&a.resourceContainer)if(a.userDirectory){c=!1;try{a.commonDirectory&&0<a.commonDirectory.length&&FS.extensions.mapSyncFS(a.commonDirectory);if(a.sensitiveWordsDirectory&&0<a.sensitiveWordsDirectory.length)try{FS.extensions.mapSyncFS(a.sensitiveWordsDirectory)}catch(g){console.error(g),a.sensitiveWordsDirectory=null}if(a.specialPredictionsDirectory&&0<a.specialPredictionsDirectory.length)try{FS.extensions.mapSyncFS(a.specialPredictionsDirectory)}catch(g){console.error(g),
a.specialPredictionsDirectory=null}FS.extensions.mapVfsContainer(a.resourceDirectory,a.resourceContainer);FS.extensions.mapSyncFS(a.userDirectory);var b=new Module.PredictionInitOptions;b.setDefaultPredictionDir(a.resourceDirectory);b.setMorePredictionDir(a.commonDirectory);b.setUserDir(a.userDirectory);b.setLocaleDir(a.locale);b.setCompatility_4_3_4(!0);a.sensitiveWordsDirectory&&b.setSensitiveWordsDir instanceof Function&&b.setSensitiveWordsDir(a.sensitiveWordsDirectory);a.specialPredictionsDirectory&&
b.setSpecialPredictionsDir instanceof Function&&b.setSpecialPredictionsDir(a.specialPredictionsDirectory);e=new Module.PredictionModule(b);(c=e.initialize())&&(p=a)}catch(g){console.error(g)}self.postMessage({message:d,params:{initialized:c,error:c?null:"Worker could not be initialized!"}})}else self.postMessage({message:d,params:{initialized:!1,error:"Missing user directory parameter!"}});else self.postMessage({message:d,params:{initialized:!1,error:"Missing resource directory (or container) parameter!"}});
else self.postMessage({message:d,params:{initialized:!1,error:"Missing locale parameter!"}});else if("com.donjohnston.cowriter.worker.sync"===c)self.postMessage({message:d,params:{userData:a?a.userData:null}});else if("com.donjohnston.cowriter.worker.syncUserDirectory"===c)FS.extensions.syncAsyncFS(p.userDirectory),e.rebuildUserDataCache(),e.reloadDictionaries(!0,!0),self.postMessage({message:d,params:{userDirectory:p.userDirectory,userData:a?a.userData:null}});else if("com.donjohnston.cowriter.worker.options"===
c)b=new Module.PredictionOptions,b.setMainDictionary(a.mainDictionary),b.setEnableFlexibleSpelling(a.enableFlexibleSpelling),b.setEnableGrammar(a.enableGrammar),b.setEnablePredictAhead(a.enablePredictAhead),b.setEnableMomentaryTopic(a.enableMomentaryTopic),b.setEnableAutoCapitalization(a.enableAutoCapitalization),b.setMaxPredictedGuesses(a.maxPredictedGuesses),b.setActiveTopics(m(a.activeTopics,Module.StringVector)),e.setOptions(b),self.postMessage({message:d,params:{userData:a.userData}});else if("com.donjohnston.cowriter.worker.options.mainDictionary"===
c)l(a,d,e.setMainDictionary,"value");else if("com.donjohnston.cowriter.worker.options.maxPredictedGuesses"===c)l(a,d,e.setMaxPredictedGuesses,"value");else if("com.donjohnston.cowriter.worker.options.flexibleSpelling"===c)l(a,d,e.enableFlexibleSpelling,"flag");else if("com.donjohnston.cowriter.worker.options.grammar"===c)l(a,d,e.enableGrammar,"flag");else if("com.donjohnston.cowriter.worker.options.predictAhead"===c)l(a,d,e.enablePredictAhead,"flag");else if("com.donjohnston.cowriter.worker.options.momentaryTopic"===
c)l(a,d,e.enableMomentaryTopic,"flag");else if("com.donjohnston.cowriter.worker.followTextChange"===c)b=e.followTextChange(a.contextChanged,a.text,a.rangeStart,a.rangeLength),self.postMessage({message:d,params:{guesses:f(b.guesses()),replacements:f(b.replacements()),userData:a.userData}});else if("com.donjohnston.cowriter.worker.acceptGuess"===c)b=e.acceptGuess(a.guess),self.postMessage({message:d,params:{replacement:b.replacement(),rangeStart:b.rangeStart(),rangeLength:b.rangeLength(),userData:a.userData}});
else if("com.donjohnston.cowriter.worker.restartGuesses"===c)e.restartGuesses(),self.postMessage({message:d,params:{userData:a.userData}});else if("com.donjohnston.cowriter.worker.resetState"===c)e.resetState(),self.postMessage({message:d,params:{userData:a.userData}});else if("com.donjohnston.cowriter.worker.getTopicsState"===c)b=new Module.TopicsState,e.getTopicsState(b),h(b,d,a.userData,null);else if("com.donjohnston.cowriter.worker.getTopics"===c)b=e.getTopics(),self.postMessage({message:d,params:{topics:f(b),
userData:a.userData}});else if("com.donjohnston.cowriter.worker.getActiveTopics"===c)b=e.getActiveTopics(),self.postMessage({message:d,params:{activeTopics:f(b),userData:a.userData}});else if("com.donjohnston.cowriter.worker.getRecentTopics"===c)b=e.getRecentTopics(),self.postMessage({message:d,params:{recentTopics:f(b),userData:a.userData}});else if("com.donjohnston.cowriter.worker.activateTopic"===c)b=e.activateTopic(a.topic),h(b,d,a.userData,a.topic);else if("com.donjohnston.cowriter.worker.activateTopics"===
c)b=m(a.topics,Module.StringVector),b=e.activateTopics(b),h(b,d,a.userData,null);else if("com.donjohnston.cowriter.worker.setActiveTopics"===c)b=m(a.topics,Module.StringVector),b=e.setActiveTopics(b),h(b,d,a.userData,null);else if("com.donjohnston.cowriter.worker.deactivateTopic"===c)b=e.deactivateTopic(a.topic),h(b,d,a.userData,a.topic);else if("com.donjohnston.cowriter.worker.deactivateTopics"===c)b=m(a.topics,Module.StringVector),b=e.deactivateTopics(b),h(b,d,a.userData,null);else if("com.donjohnston.cowriter.worker.deactivateActiveTopics"===
c)b=e.deactivateActiveTopics(),h(b,d,a.userData,null);else if("com.donjohnston.cowriter.worker.updateMomentaryTopic"===c)e.updateMomentaryTopic(a.text),self.postMessage({message:d,params:{userData:a.userData}});else if("com.donjohnston.cowriter.worker.createWikiTopic"===c)b=e.createWikiTopic(a.name,a.text,a.activate),c=b.topicsState(),self.postMessage({message:d,params:{topic:b.topic(),filesUpdateInfo:{files:k(b.filesUpdateInfo().files())},topicsState:{allTopics:f(c.allTopics()),activeTopics:f(c.activeTopics()),
recentTopics:f(c.recentTopics())},userData:a.userData}});else if("com.donjohnston.cowriter.worker.activatePersonalDictionary"===c)e.activatePersonalDictionary(a.activate),self.postMessage({message:d,params:{userData:a.userData}});else if("com.donjohnston.cowriter.worker.addPersonalWords"===c)b=e.addPersonalWords(a.text),self.postMessage({message:d,params:{filesUpdateInfo:{files:k(b.files())},userData:a.userData}});else if("com.donjohnston.cowriter.worker.removePersonalWords"===c)b=e.removePersonalWords(a.text),
self.postMessage({message:d,params:{filesUpdateInfo:{files:k(b.files())},userData:a.userData}});else if("com.donjohnston.cowriter.worker.reloadDictionaries"===c)e.reloadDictionaries(a.userDictionaries,a.topicsContent),self.postMessage({message:d,params:{userData:a.userData}});else if("com.donjohnston.cowriter.worker.reloadSensitiveWords"===c){if(e.setSensitiveWordsDirectory instanceof Function){b=a.directory&&0<a.directory.length?a.directory:"";if(0<b.length){c=!1;try{c=!!FS.lookupPath(b)}catch(g){}c?
FS.extensions.syncAsyncFS(b):FS.extensions.mapSyncFS(b)}e.setSensitiveWordsDirectory(b)}self.postMessage({message:d,params:{userData:a.userData}})}else if("com.donjohnston.cowriter.worker.reloadSpecialPredictions"===c){if(e.setSpecialPredictionsDirectory instanceof Function){b=a.directory&&0<a.directory.length?a.directory:"";if(0<b.length){c=!1;try{c=!!FS.lookupPath(b)}catch(g){}c?FS.extensions.syncAsyncFS(b):FS.extensions.mapSyncFS(b)}e.setSpecialPredictionsDirectory(b)}self.postMessage({message:d,
params:{userData:a.userData}})}});self.postMessage({message:"com.donjohnston.cowriter.worker.ready",params:{error:null}})})();
