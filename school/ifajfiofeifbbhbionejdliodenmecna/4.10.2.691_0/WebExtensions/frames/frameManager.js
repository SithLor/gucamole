(function(){})(window.dji=window.dji||{});
(function(g){class f{constructor(a){this.m_mainMessageProxy=a.messageProxy}init(){}}class h extends f{constructor(a){super(a)}init(){this.m_mainMessageProxy.on("com.donjohnston.sru.tts.activation.change",(a,b)=>{this.m_speechActive=b;this.__applySelectionState();b?sru.speech.start(!0):sru.speech.stop()});this.m_mainMessageProxy.on(window.dji.messages.sru.tts.START,function(a){sru.speech.speakStart()});this.m_mainMessageProxy.on(window.dji.messages.sru.tts.WAIT,function(a){sru.speech.speakWait()});
this.m_mainMessageProxy.on(window.dji.messages.sru.tts.PROGRESS,function(a,b){sru.speech.speakProgress(b)});this.m_mainMessageProxy.on(window.dji.messages.sru.tts.STOP,function(a){sru.speech.speakStop()});this.m_mainMessageProxy.on(window.dji.messages.sru.tts.ERROR,function(a,b){sru.speech.speakError(b)});this.m_mainMessageProxy.on("com.donjohnston.sru.rewordify.getcontext",a=>{this.m_mainMessageProxy.respond("com.donjohnston.sru.rewordify.getcontext",a,this.__pageContext("rewordify"))});this.m_mainMessageProxy.on("com.donjohnston.sru.rewordify.changeselectionstate",
(a,b)=>{this.m_rewordifyActiveState=b;this.__applySelectionState();this.m_mainMessageProxy.respond("com.donjohnston.sru.rewordify.changeselectionstate",a,b)});this.m_mainMessageProxy.on("com.donjohnston.sru.translate.getcontext",a=>{this.m_mainMessageProxy.respond("com.donjohnston.sru.translate.getcontext",a,this.__pageContext("translate"))});this.m_mainMessageProxy.on("com.donjohnston.sru.translate.activation.change",(a,b)=>{this.m_translateActiveState=b;this.__applySelectionState()});this.m_mainMessageProxy.on("com.donjohnston.sru.translate.cursor.change",
function(a,b){b?dji.utils.addClassToHtmlElements("dji-sru-translate-from-cursor"):(dji.utils.removeClassFromHtmlElements("dji-sru-translate-from-cursor"),dji.utils.removeClassFromHtmlElements("dji-sru-rewordify-active"))});this.m_mainMessageProxy.on("com.donjohnston.sru.overlay.activation.change",(a,b)=>{sru.overlay.activate(b);this.__applySelectionState()});this.m_mainMessageProxy.on("com.donjohnston.sru.outlines.getcontext",a=>{this.m_mainMessageProxy.respond("com.donjohnston.sru.outlines.getcontext",
a,this.__pageContext("outlines"))});this.m_mainMessageProxy.on("com.donjohnston.sru.outlines.highlight.activation.change",(a,b)=>{this.m_outlinesHighlightActiveState=b;this.__applySelectionState();b?dji.utils.addClassToHtmlElements("dji-sru-outline-highlight-active"):dji.utils.removeClassFromHtmlElements("dji-sru-outline-highlight-active")});this.m_mainMessageProxy.on(window.dji.messages.sru.SETTINGS,(a,b)=>{this.__applySettings()});this.__requestSettings()}__finishInitialize(){this.__applySettings();
sru.speech.addEventListener("start",a=>{this.__onSpeechStart(a)});sru.speech.addEventListener("stop",()=>{this.__onSpeechStop()});dji.pageObserver.initialize();sru.overlay.initialize();dji.selectionMapper.addSelectionEventListener("selectionDone",()=>{this.__onSelectionDone()});this.m_mainMessageProxy.enable(!0);this.m_mainMessageProxy.ping()}__requestSettings(){chrome.runtime.sendMessage({message:"com.donjohnston.sru.settings.request",params:{url:window.location}},a=>{dji.utils.ignoreLastError();
this.m_settings=a.params.settings;sru.mainContainer.initialize(()=>{this.__finishInitialize()})})}__applySettings(){window.dji.selectionMapper&&window.dji.selectionMapper.setColors(this.m_settings.colors.text,this.m_settings.colors.wordHighlight);window.dji.textHighlighter&&window.dji.textHighlighter.setColors(this.m_settings.colors.text,this.m_settings.colors.wordHighlight);window.sru.overlay&&window.sru.overlay.setColors(this.m_settings.readingGuide)}__applySelectionState(){const a=this.m_rewordifyActiveState||
this.m_speechActive||this.m_translateActiveState||this.m_outlinesHighlightActiveState,b=a||sru.overlay.isActive();dji.selectionMapper.enableOverlays(b);dji.selectionMapper.enableSelection(a)}__onSpeechStart(a){this.m_mainMessageProxy.send(window.dji.messages.sru.tts.START,void 0,a)}__onSpeechStop(){this.m_mainMessageProxy.send(window.dji.messages.sru.tts.STOP,void 0)}__pageContext(a){if("rewordify"===a)return this.__pageContextForRewordify();a=dji.selectionMapper.mapSelection({fromCaretToEnd:!1,clearSelection:!0,
requestFor:a});return this.__simplifyContext(a)}__pageContextForRewordify(){let a=dji.selectionMapper.mapSelection({clearSelection:!0,requestFor:"rewordify"});a&&a.text&&0<a.text.length&&0<a.text.trim().length||(a=dji.selectionMapper.mapSelection({entireDocument:!0,clearSelection:!1,requestFor:"rewordify"}));return this.__simplifyContext(a)}__simplifyContext(a){a&&(delete a.custom.map,delete a.custom.matrix,delete a.element,delete a.activeElementInfo,delete a.originalSelection,delete a.source);return a}__onSelectionDone(){this.m_translateActiveState?
this.m_mainMessageProxy.send("com.donjohnston.sru.translate.selectiondone",void 0):this.m_outlinesHighlightActiveState&&this.m_mainMessageProxy.send("com.donjohnston.sru.outlines.selectiondone",void 0)}}class k extends h{constructor(a){super(a)}}class l extends f{constructor(a){super(a);this.mImpl=window.sru?new h(a):new f(a)}init(){this.mImpl.init()}}class m extends f{constructor(a){super(a);this.m_TTSTextHighlighters=new Map;this.m_nextHighlighterID=0;let b=this;g.resetHighlighter=function(c,d){b.__internalResetHighlighter(c,
()=>{window.dji.utils.callMethod(d)})};g.resetHighlighterAsync=async function(c){return new Promise(d=>this.resetHighlighter(c,d))}}init(){this.__initTTSTextHighlighterHandlers()}__initTTSTextHighlighterHandlers(){let a=this;this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.INIT,function(b){const c=a.__getNextHighlighterID();a.m_TTSTextHighlighters.set(c,new window.dji.highlighting.TTSTextHighlighter(null));a.m_mainMessageProxy.respond(window.dji.messages.cwe.highlighting.INIT,b,c)});
this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.SET_GRANULARITY,function(b,c,d,e){(b=a.__getHighlighter(e))&&b.setGranularity(c,d)});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.REPLACE_LAST_WORD,function(b,c,d){let e=a.__getHighlighter(d);e&&(e.replaceLastWord(c),a.m_mainMessageProxy.respond(window.dji.messages.cwe.highlighting.REPLACE_LAST_WORD,b,d))});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.RESET,function(b,c){a.__internalResetHighlighter(c)});
this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.SET_OPTIONS,function(b,c,d){(b=a.__getHighlighter(d))&&b.setOptions(c)});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.ENABLE_HIGHLIGHTING,function(b,c){let d=a.__getHighlighter(c);d&&(d.enableHighlighting(),a.m_mainMessageProxy.respond(window.dji.messages.cwe.highlighting.ENABLE_HIGHLIGHTING,b,c))});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.DISABLE_HIGHLIGHTING,function(b,c){let d=a.__getHighlighter(c);
d&&(d.disableHighlighting(),a.m_mainMessageProxy.respond(window.dji.messages.cwe.highlighting.DISABLE_HIGHLIGHTING,b,c))});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.HIGHLIGHT,function(b,c,d,e){(e=a.__getHighlighter(e))&&e.highlight(c,d,n=>{a.m_mainMessageProxy.respond(window.dji.messages.cwe.highlighting.HIGHLIGHT,b,n)})});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.MAP_TEXT_FOR_HIGHLIGHTING,function(b,c,d){(d=a.__getHighlighter(d))&&d.mapTextForHighlighting(c,
e=>{a.m_mainMessageProxy.respond(window.dji.messages.cwe.highlighting.MAP_TEXT_FOR_HIGHLIGHTING,b,e)})});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.CANCEL,function(b,c){(b=a.__getHighlighter(c))&&b.cancel()});this.m_mainMessageProxy.on(window.dji.messages.cwe.highlighting.DESTROY,function(b,c){a.m_TTSTextHighlighters.delete(c)});this.m_mainMessageProxy.enable(!0)}__getNextHighlighterID(){++this.m_nextHighlighterID===Number.MAX_SAFE_INTEGER&&(this.m_nextHighlighterID=0);return this.m_nextHighlighterID}__getHighlighter(a){return this.m_TTSTextHighlighters.get(a)}__internalResetHighlighter(a,
b){(a=this.__getHighlighter(a))&&a.reset(b)}}dji.utils.registerService(window.dji.framePreloader.serviceName(),function(){if(window.cwe)return"cwe-frame-manager";if(window.sru)return"sru-frame-manager";dji.logger.warn("Using default frame manager registration key!");return"frame-manager"}(),!0,function(a){if(a.success){var b=window.dji.framePreloader.serviceName();(b="over-drive-reader"===b?new k(a):"ms-office-word-editor"===b?new m(a):"canvas-lms"===b?new l(a):null)?b.init():a.messageProxy.disconnect()}})})(window.dji.frameManager=
window.dji.frameManager||{});