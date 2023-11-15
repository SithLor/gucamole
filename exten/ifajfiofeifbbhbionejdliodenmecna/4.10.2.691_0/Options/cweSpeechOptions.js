function CWESpeechOptions(b,a,c){this.m_cweSettings=b;this.m_ttsEngine=a;this.m_cweBackgroundManager=c;this.m_voice=$("#dji-cwu-prediction-voice");this.m_rate=$("#dji-cwu-speak-rate");this.m_pitch=$("#dji-cwu-speak-pitch");this.m_volume=$("#dji-cwu-speak-volume");this.m_letters=$("#dji-cwu-speak-letters");this.m_words=$("#dji-cwu-speak-words");this.m_sentences=$("#dji-cwu-speak-sentences");this.m_afterSTT=$("#dji-cwu-speak-after-speech-to-text");this.m_highlightTextColor=$("#dji-cwu-highlight-text-color");
this.m_highlightBackgroundColor=$("#dji-cwu-highlight-text-background-color");this.m_demoMap={en:"Welcome to the CoWriter extension. You can change the pitch, rate, and volume of speech using the sliders below.",es:"Bienvenido a la extensi\u00f3n Co Writer. Puede cambiar el tono, la frecuencia y el volumen del habla utilizando las diapositivas que aparecen a continuaci\u00f3n.",fr:"Bienvenue dans l'extension Co Writer. Vous pouvez modifier le pitch, le taux et le volume de la parole en utilisant les diapositives ci-dessous.",
de:"Willkommen bei der Co-Writer-Erweiterung. Sie k\u00f6nnen die Tonh\u00f6he, die Rate und die Lautst\u00e4rke der Sprache mit den Folien unten \u00e4ndern."};this.__initialize();return this}CWESpeechOptions.instance=null;
CWESpeechOptions.prototype.__initialize=function(){let b=this;this.m_voice.on("change",function(a){if(a.value!==b.m_cweSettings.speechVoice(a.value)){var c=$("[dji-cwu-template-id=dji-cwu-prediction-voice]");c.find("[dji-check]").removeAttr("dji-check");c.find("[dji-cwu-value='"+a.value+"']").attr("dji-check","");b.m_ttsEngine.stop();Logger.instance.log("change voice to:",a.value);a.noSave||b.m_cweSettings.speechVoice(a.value);b.__playDemo()}});this.m_rate.on("input change",function(a){b.m_ttsEngine.stop();
let c=Math.ceil(parseFloat(10*$(a.currentTarget).val()))-10;c=0===c?"default":0<c?"+"+c:""+c;$(a.currentTarget).closest(".dji-cwu-option-slider-item").find(".dji-cwu-slider-value").text(c);a.noSave||b.m_cweSettings.speechRate(parseFloat(b.m_rate.val()));a.hasOwnProperty("noSpeak")&&!1!==a.noSpeak||b.__playDemo()});this.m_pitch.on("input change",function(a){b.m_ttsEngine.stop();let c=Math.ceil(parseFloat(10*$(a.currentTarget).val()))-10;c=0===c?"default":0<c?"+"+c:""+c;$(a.currentTarget).closest(".dji-cwu-option-slider-item").find(".dji-cwu-slider-value").text(c);
a.noSave||b.m_cweSettings.speechPitch(parseFloat(b.m_pitch.val()));a.hasOwnProperty("noSpeak")&&!1!==a.noSpeak||b.__playDemo()});this.m_volume.on("input change",function(a){b.m_ttsEngine.stop();let c=parseFloat($(a.currentTarget).val());c=100*c+"%";$(a.currentTarget).closest(".dji-cwu-option-slider-item").find(".dji-cwu-slider-value").text(c);a.noSave||b.m_cweSettings.speechVolume(parseFloat(b.m_volume.val()));a.hasOwnProperty("noSpeak")&&!1!==a.noSpeak||b.__playDemo()});this.m_letters.on("change",
function(a){let c=a.checked;b.m_ttsEngine.stop();a.noSave||b.m_cweSettings.speechLetters(c?1:0)});this.m_words.on("change",function(a){let c=a.checked;b.m_ttsEngine.stop();a.noSave||b.m_cweSettings.speechWords(c?1:0)});this.m_sentences.on("change",function(a){let c=a.checked;b.m_ttsEngine.stop();a.noSave||b.m_cweSettings.speechSentences(c?1:0)});this.m_afterSTT.on("change",function(a){let c=a.checked;b.m_ttsEngine.stop();a.noSave||b.m_cweSettings.speechAfterSTT(c?1:0)});this.m_highlightTextColor.on("change",
function(a){b.m_highlightTextColor.css({"background-color":a.color});a.noSave||b.m_cweSettings.highlightTextColor(a.color)});this.m_highlightBackgroundColor.on("change",function(a){b.m_highlightBackgroundColor.css({"background-color":a.color});a.noSave||b.m_cweSettings.highlightBackgroundColor(a.color)});this.__load();this.__updateUI()};
CWESpeechOptions.prototype.__updateUI=function(){if(this.m_cweSettings){var b=this.m_cweSettings.features();b=!(b&&!(b.allowSettings&&b.allowChangeSettings&&b.allowSpeech));var a={disabled:!b,"dji-not-allowed":!b};this.m_volume.prop(a);this.m_rate.prop(a);this.m_pitch.prop(a);this.m_voice.attr("disabled",!b);this.m_letters.attr("disabled",!b);this.m_words.attr("disabled",!b);this.m_sentences.attr("disabled",!b);this.m_afterSTT.attr("disabled",!b);b?(this.m_letters.closest(".dji-cwu-option-switch-item").removeClass("dji-cwu-disable"),
this.m_words.closest(".dji-cwu-option-switch-item").removeClass("dji-cwu-disable"),this.m_sentences.closest(".dji-cwu-option-switch-item").removeClass("dji-cwu-disable"),this.m_afterSTT.closest(".dji-cwu-option-switch-item").removeClass("dji-cwu-disable"),this.m_highlightTextColor.closest(".dji-cwu-option-color-picker-item").removeClass("dji-cwu-disable"),this.m_highlightBackgroundColor.closest(".dji-cwu-option-color-picker-item").removeClass("dji-cwu-disable"),this.m_volume.closest(".dji-cwu-option-slider-item").removeClass("dji-cwu-disable"),
this.m_rate.closest(".dji-cwu-option-slider-item").removeClass("dji-cwu-disable"),this.m_pitch.closest(".dji-cwu-option-slider-item").removeClass("dji-cwu-disable")):(this.m_letters.closest(".dji-cwu-option-switch-item").addClass("dji-cwu-disable"),this.m_words.closest(".dji-cwu-option-switch-item").addClass("dji-cwu-disable"),this.m_sentences.closest(".dji-cwu-option-switch-item").addClass("dji-cwu-disable"),this.m_afterSTT.closest(".dji-cwu-option-switch-item").addClass("dji-cwu-disable"),this.m_highlightTextColor.closest(".dji-cwu-option-color-picker-item").addClass("dji-cwu-disable"),
this.m_highlightBackgroundColor.closest(".dji-cwu-option-color-picker-item").addClass("dji-cwu-disable"),this.m_volume.closest(".dji-cwu-option-slider-item").addClass("dji-cwu-disable"),this.m_rate.closest(".dji-cwu-option-slider-item").addClass("dji-cwu-disable"),this.m_pitch.closest(".dji-cwu-option-slider-item").addClass("dji-cwu-disable"))}};
CWESpeechOptions.prototype.__load=function(){if(this.m_cweSettings){var b=this.m_cweSettings.speechVoice();this.m_voice.innerHTML="";var a=!1,c=this.m_ttsEngine?this.m_ttsEngine.voicesForLanguage(this.m_cweBackgroundManager.localeLang()):[],h=this.m_ttsEngine.defaultVoiceForLanguage(this.m_cweBackgroundManager.localeLang(!0)),e=$("[dji-cwu-template-id=dji-cwu-prediction-voice]");e.empty();var k=$("[dji-cwu-template-id=dji-cwu-voice]");for(let d=0;d<c.length;d++){let f=dji.utils.escapeHtml(c[d].voiceName);
b===c[d].voiceName&&(b=f,a=!0);let g=k.clone(!0);$(g).attr("dji-cwu-value",f);$(g).find(".dji-cwu-menu-item-text").text(f);e.append(g)}a||(b=h,this.m_cweSettings.speechVoice(h),this.m_ttsEngine.settings(this.m_cweSettings.speech()));this.m_voice.find(".dji-cwu-option-item-value").text(b);e.find("[dji-cwu-value='"+b+"']").attr("dji-check","");this.m_rate.val(this.m_cweSettings.speechRate()).trigger({type:"change",noSpeak:!0,noSave:!0});this.m_pitch.val(this.m_cweSettings.speechPitch()).trigger({type:"change",
noSpeak:!0,noSave:!0});this.m_volume.val(this.m_cweSettings.speechVolume()).trigger({type:"change",noSpeak:!0,noSave:!0});this.m_cweSettings.speechLetters()&&$(this.m_letters).addClass("dji-cwu-on");this.m_cweSettings.speechWords()&&$(this.m_words).addClass("dji-cwu-on");this.m_cweSettings.speechSentences()&&$(this.m_sentences).addClass("dji-cwu-on");this.m_cweSettings.speechAfterSTT()&&$(this.m_afterSTT).addClass("dji-cwu-on");this.m_highlightTextColor.css({"background-color":this.m_cweSettings.highlightTextColor()});
this.m_highlightBackgroundColor.css({"background-color":this.m_cweSettings.highlightBackgroundColor()});Logger.instance.log(this.m_cweSettings)}};CWESpeechOptions.prototype.__playDemo=function(){this.m_ttsEngine.settings(this.m_cweSettings.speech());this.m_ttsEngine.scheduleSpeak(this.m_demoMap[this.m_cweBackgroundManager.localeLang()],!0,200)};
