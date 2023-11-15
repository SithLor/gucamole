class DjiWasmWorkerProxy{constructor(a){this.m_options={url:a.url,appDir:a.appDir};this.m_worker=this.m_config=null;this.m_eventTarget=new EventTarget;this.__setup()}async initAsync(a,b){this.m_config=b?a:JSON.parse(JSON.stringify(a));return this.restartAsync()}async restartAsync(){const a=this;return new Promise(function(b,c){a.__restart(b,c)})}terminate(){this.m_worker&&(this.m_worker.removeEventListener("message",this.__onMessageProxy),this.m_worker.removeEventListener("error",this.__onMessageProxy),
this.m_worker.terminate(),this.m_worker=null)}isRunning(){return null!==this.m_worker}on(a,b){this.m_eventTarget.addEventListener(a,b)}__setup(){const a=this;this.__onMessageProxy=function(b){a.__onMessage(b)};this.__onErrorProxy=function(b){a.__onError(b)}}async __restart(a,b){try{let c=null;this.terminate();this.m_worker=new Worker(this.m_options.url);this.m_worker.__pending=!0;c=await this.__waitForCallbackAsync(null,"com.donjohnston.cowriter.worker.ready");if(c.error)throw Error(c.error);c=await this.__executeCommandAsync(null,
"com.donjohnston.cowriter.worker.load",{appDir:this.m_options.appDir});if(c.error)throw Error(c.error);if(this.m_config&&(c=await this.__executeCommandAsync(null,"com.donjohnston.cowriter.worker.initialize",this.m_config),c.error))throw Error(c.error);this.m_worker.addEventListener("message",this.__onMessageProxy);this.m_worker.addEventListener("error",this.__onMessageProxy);a("ready")}catch(c){this.terminate(),b(c)}}__onMessage(a){}__onError(a){}__executeCommandAsync(a,b,c,d){const e=this;return new Promise(function(f,
g){e.__executeCommand(a,b,c,d,f,g)})}__executeCommand(a,b,c,d,e,f){if(e&&!(e instanceof Function))throw Error("Invalid arguments: successCallback is not a function!");a=a||this.m_worker;d=d||{};if(!a)return f(Error("Worker not running!"));var g=this.__executeCommand.session=(this.__executeCommand.session||0)+1;g=e?`com.donjohnston.cwu.wasm.session.${g}`:void 0;b={message:b,params:c,options:{wantDefaultCallbackMessage:d.wantDefaultCallbackMessage?!0:void 0,callbackMessage:g}};this.__watchForCallback(a,
g,e,f);a.postMessage(b)}__sendCommand(a,b,c,d){a=a||this.m_worker;d=d||{};if(!a)throw Error("Worker not running!");a.postMessage({message:b,params:c,options:{wantDefaultCallbackMessage:d.wantDefaultCallbackMessage?!0:void 0,callbackMessage:d.callbackMessage||void 0}})}async __waitForCallbackAsync(a,b){const c=this;return new Promise(function(d,e){c.__watchForCallback(a,b,d,e)})}__watchForCallback(a,b,c,d){if(c&&!(c instanceof Function))throw Error("Invalid arguments: successCallback is not a function!");
let e=void 0,f=void 0;a=a||this.m_worker;c&&(e=function(g){let h=g.data;if(h&&h.message===b){g.preventDefault();g.stopPropagation();f&&(a.removeEventListener("error",f,!0),a.removeEventListener("crash",f,!0));a.removeEventListener("message",e,!0);try{c(h.params)}catch(k){Logger.instance.error(k)}}},a.addEventListener("message",e,!0));d&&(f=function(g){a.removeEventListener("error",f,!0);a.removeEventListener("crash",f,!0);c&&a.removeEventListener("message",e,!0);try{d(g)}catch(h){Logger.instance.error(h)}},
a.addEventListener("error",f,!0),a.addEventListener("crash",f,!0))}}class DjiSpellCheckerWorkerProxy extends DjiWasmWorkerProxy{constructor(a){super(a);this.m_messages={spellcheck:"com.donjohnston.cowriter.worker.spellcheck"}}async spellCheck(a,b){return this.__executeCommandAsync(null,this.m_messages.spellcheck,{word:a,locales:b},null)}}
class DjiPredictionWorkerProxy extends DjiWasmWorkerProxy{constructor(a){super(a);this.m_messages={sync:"com.donjohnston.cowriter.worker.sync",syncUserDirectory:"com.donjohnston.cowriter.worker.syncUserDirectory",options:"com.donjohnston.cowriter.worker.options",optionsMainDictionary:"com.donjohnston.cowriter.worker.options.mainDictionary",optionsMaxPredictedGuesses:"com.donjohnston.cowriter.worker.options.maxPredictedGuesses",optionsMomentaryTopic:"com.donjohnston.cowriter.worker.options.momentaryTopic",
optionsFlexibleSpelling:"com.donjohnston.cowriter.worker.options.flexibleSpelling",optionsGrammar:"com.donjohnston.cowriter.worker.options.grammar",optionsPredictAhead:"com.donjohnston.cowriter.worker.options.predictAhead",followTextChange:"com.donjohnston.cowriter.worker.followTextChange",acceptGuess:"com.donjohnston.cowriter.worker.acceptGuess",restartGuesses:"com.donjohnston.cowriter.worker.restartGuesses",resetState:"com.donjohnston.cowriter.worker.resetState",getTopicsState:"com.donjohnston.cowriter.worker.getTopicsState",
getTopics:"com.donjohnston.cowriter.worker.getTopics",getActiveTopics:"com.donjohnston.cowriter.worker.getActiveTopics",getRecentTopics:"com.donjohnston.cowriter.worker.getRecentTopics",activateTopic:"com.donjohnston.cowriter.worker.activateTopic",activateTopics:"com.donjohnston.cowriter.worker.activateTopics",setActiveTopics:"com.donjohnston.cowriter.worker.setActiveTopics",deactivateTopic:"com.donjohnston.cowriter.worker.deactivateTopic",deactivateTopics:"com.donjohnston.cowriter.worker.deactivateTopics",
deactivateActiveTopics:"com.donjohnston.cowriter.worker.deactivateActiveTopics",updateMomentaryTopic:"com.donjohnston.cowriter.worker.updateMomentaryTopic",createWikiTopic:"com.donjohnston.cowriter.worker.createWikiTopic",activatePersonalDictionary:"com.donjohnston.cowriter.worker.activatePersonalDictionary",addPersonalWords:"com.donjohnston.cowriter.worker.addPersonalWords",removePersonalWords:"com.donjohnston.cowriter.worker.removePersonalWords",reloadDictionaries:"com.donjohnston.cowriter.worker.reloadDictionaries",
reloadSensitiveWords:"com.donjohnston.cowriter.worker.reloadSensitiveWords",reloadSpecialPredictions:"com.donjohnston.cowriter.worker.reloadSpecialPredictions"}}__onMessage(a){(a=a.data)&&a.message===this.m_messages.followTextChange&&(a=new CustomEvent(this.m_messages.followTextChange,{detail:a.params}),this.m_eventTarget.dispatchEvent(a))}onFollowTextChange(a){this.on(this.m_messages.followTextChange,a)}async syncAsync(){return this.__executeCommandAsync(null,this.m_messages.sync,null,null)}async syncUserDirectoryAsync(){return this.__executeCommandAsync(null,
this.m_messages.syncUserDirectory,null,null)}async setOptionsAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.options,{mainDictionary:a.mainDictionary,enableMomentaryTopic:a.enableMomentaryTopic,enableFlexibleSpelling:a.enableFlexibleSpelling,enableGrammar:a.enableGrammar,enablePredictAhead:a.enablePredictAhead,enableAutoCapitalization:a.enableAutoCapitalization,maxPredictedGuesses:a.maxPredictedGuesses,activeTopics:a.activeTopics,userData:b},null)}async setMainDictionaryAsync(a,
b){return this.__executeCommandAsync(null,this.m_messages.optionsMainDictionary,{value:a,userData:b},null)}async setMaxPredictedGuessesAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.optionsMaxPredictedGuesses,{value:a,userData:b},null)}async enableMomentaryTopicAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.optionsMomentaryTopic,{flag:a,userData:b},null)}async enableFlexibleSpellingAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.optionsFlexibleSpelling,
{flag:a,userData:b},null)}async enableGrammarAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.optionsGrammar,{flag:a,userData:b},null)}async enablePredictAheadAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.optionsPredictAhead,{flag:a,userData:b},null)}followTextChange(a,b,c,d,e){return this.__sendCommand(null,this.m_messages.followTextChange,{contextChanged:a,text:b,rangeStart:c,rangeLength:d,userData:e},{callbackMessage:this.m_messages.followTextChange})}async acceptGuessAsync(a,
b){return this.__executeCommandAsync(null,this.m_messages.acceptGuess,{guess:a,userData:b},null)}async restartGuessesAsync(a){return this.__executeCommandAsync(null,this.m_messages.restartGuesses,{userData:a},null)}async resetStateAsync(a){return this.__executeCommandAsync(null,this.m_messages.resetState,{userData:a},null)}async getTopicsStateAsync(a){return this.__executeCommandAsync(null,this.m_messages.getTopicsState,{userData:a},null)}async getTopicsAsync(a){return this.__executeCommandAsync(null,
this.m_messages.getTopics,{userData:a},null)}async getActiveTopicsAsync(a){return this.__executeCommandAsync(null,this.m_messages.getActiveTopics,{userData:a},null)}async getRecentTopicsAsync(a){return this.__executeCommandAsync(null,this.m_messages.getRecentTopics,{userData:a},null)}async activateTopicAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.activateTopic,{topic:a,userData:b},null)}async activateTopicsAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.activateTopics,
{topics:a,userData:b},null)}async setActiveTopicsAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.setActiveTopics,{topics:a,userData:b},null)}async deactivateTopicAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.deactivateTopic,{topic:a,userData:b},null)}async deactivateTopicsAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.deactivateTopics,{topics:a,userData:b},null)}async deactivateActiveTopicsAsync(a){return this.__executeCommandAsync(null,this.m_messages.deactivateActiveTopics,
{userData:a},null)}async updateMomentaryTopicAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.updateMomentaryTopic,{text:a,userData:b},null)}async createWikiTopicAsync(a,b,c,d){return this.__executeCommandAsync(null,this.m_messages.createWikiTopic,{name:a,text:b,activate:c,userData:d},null)}async activatePersonalDictionaryAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.activatePersonalDictionary,{activate:a,userData:b},null)}async addPersonalWordsAsync(a,b){return this.__executeCommandAsync(null,
this.m_messages.addPersonalWords,{text:a,userData:b},null)}async removePersonalWordsAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.removePersonalWords,{text:a,userData:b},null)}async reloadDictionariesAsync(a,b,c){return this.__executeCommandAsync(null,this.m_messages.reloadDictionaries,{userDictionaries:a,topicsContent:b,userData:c},null)}async reloadSensitiveWordsAsync(a,b){return this.__executeCommandAsync(null,this.m_messages.reloadSensitiveWords,{directory:a,userData:b},null)}async reloadSpecialPredictionsAsync(a,
b){return this.__executeCommandAsync(null,this.m_messages.reloadSpecialPredictions,{directory:a,userData:b},null)}};