(function(z){function T(a,d){if(navigator.onLine&&(!a.dapiFile||a.checksum!==a.dapiFile.checksum||d===f.Download)&&L(null,v.UserSettings,d)){var b=new DjiStorageFile(a.uuid,"Globar User Settings",w.settingsUser);b.creationDate=a.creationDate;b.lastModifiedDate=a.modifiedDate;b.lastModifiedUuid=a.modifiedUuid;b.checksum=a.checksum;b.revision=a.dapiFile?a.dapiFile.version:0;b.__custom={language:D};M({id:a.uuid,type:v.UserSettings,action:d,file:b,settings:a,body:null,checksum:b.checksum,session:null})}}
function P(a,d,b){navigator.onLine&&L(null,v.TestingSettings,b)&&((new DjiStorageFile(null,"Testing Settings",w.settingsTesting)).__custom={language:D},M({type:v.TestingSettings,action:b,state:a,test:d,session:null}))}function Q(a,d){if(navigator.onLine&&L(a.uuid,v.Dictionary,d)){var b=new DjiStorageFile(a.uuid,a.title,w.userDictionaries);b.creationDate=a.creationDate;b.lastModifiedDate=a.modifiedDate;b.lastModifiedUuid=a.modifiedUuid;b.checksum=a.checksum;b.revision=a.dapiFile?a.dapiFile.version:
0;b.__custom={language:D,preview:a.preview};M({id:a.uuid,type:v.Dictionary,action:d,file:b,dictionary:a,checksum:b.checksum,session:null})}}function U(a,d){if(navigator.onLine&&L(a.uuid,v.Dictionary,d)){var b=new DjiStorageFile(a.uuid,a.title,w.userPersonalWords);b.creationDate=a.creationDate;b.lastModifiedDate=a.modifiedDate;b.lastModifiedUuid=a.modifiedUuid;b.checksum=a.checksum;b.revision=a.dapiFile?a.dapiFile.version:0;b.__custom={language:D,preview:a.preview};M({id:a.uuid,type:v.PersonalDictionary,
action:d,file:b,dictionary:a,checksum:b.checksum,session:null})}}function L(a,d,b){a:{for(var m=0;m<k.length;m++){var h=k[m];if((null===a||h.id===a)&&h.type===d&&h.action===b){a=m;break a}}a=-1}if(-1!==a){if(k[a].session)return!1;k.splice(a,1)}return!0}function M(a){if(a.action==f.Insert||a.action==f.Update||a.action==f.Delete){for(var d=0;d<k.length;d++){var b=k[d];if(b.action!=f.Insert&&b.action!=f.Update&&b.action!=f.Delete)break}k.splice(d,0,a)}else k.push(a);1!=k.length||B!=A.Idle||N||F()}function F(a){C&&
(I&&(clearTimeout(I),I=null),I=setTimeout(ba,a||!N&&0<k.length?10:1E4))}function ba(){B=A.Busy;I&&(clearTimeout(I),I=null);if(C){if(N||!navigator.onLine)B=A.Idle,F();var a=null;do a&&0<k.length&&k.splice(0,1),a=0<k.length?k[0]:null;while(a&&!0===O[a.type]);null===a?ca():a.type===v.DataWordList?da(a):a.type===v.MeasuredData?ea(a):a.type===v.PersonalDictionary?fa(a):a.type===v.Dictionary?ha(a):a.type===v.UserSettings?ia(a):a.type===v.TestingSettings?ja(a):(k.splice(k.indexOf(a),1),B=A.Idle,F())}else B=
A.Idle}function ca(){var a=l,d=null,b=null,m=null,h=null,q=null,e=!1,c=null,x=!0===O[v.UserSettings]||CWEBackgroundManager.instance.isInTestingMode(),r=[{type:w.userPersonalWords,language:D},{type:w.userDictionaries,language:D},{type:w.testingMode},{type:w.userLanguage},{type:w.privacyMode}];x||r.unshift({type:w.settingsUser,language:D});r.unshift({type:w.dataWordList});var E=function(p){var g=!0;if(e){if(navigator.onLine&&(g=f.Download,L(null,v.DataWordList,g))){var n=new DjiStorageFile(null,null,
w.dataWordList);n.__custom={language:D};M({type:v.DataWordList,action:g,file:n,body:null,session:null})}g=!1}if(c){n=c.data;var t=c.uuid;if(navigator.onLine){var R=f.Update;L(null,v.MeasuredData,R)&&M({type:v.MeasuredData,action:R,body:n,uuid:t,session:null})}}m&&(m.filesToDownload&&0<m.filesToDownload.length?(U(m.filesToDownload[0],f.Download),g=!1):m.filesToUpload&&0<m.filesToUpload.length&&(n=m.filesToUpload[0],U(n,n.dapiFile?f.Update:f.Insert),g=!1));if(h){if(h.filesToDownload){for(t=0;t<h.filesToDownload.length;t++)n=
h.filesToDownload[t],Q(n,f.Download);g=g&&0==h.filesToDownload.length}if(h.filesToUpload){for(t=0;t<h.filesToUpload.length;t++)n=h.filesToUpload[t],Q(n,n.dapiFile?f.Update:f.Insert);g=g&&0==h.filesToUpload.length}if(h.filesToDelete){for(t=0;t<h.filesToDelete.length;t++)n=h.filesToDelete[t],Q(n,f.Delete);g=g&&0==h.filesToDelete.length}}b&&(b.filesToDownload&&0<b.filesToDownload.length?(T(b.filesToDownload[0],f.Download),g=!1):b.filesToUpload&&0<b.filesToUpload.length&&(g=b.filesToUpload[0],T(g,g.dapiFile?
f.Update:f.Insert),g=!1));p&&CWEBackgroundManager.instance.tryEnterTestingMode(q)&&(P(null,q,f.Download),g=!1);J<=K?(J=Math.min(4,J+1),K=0):K++;p&&!g&&(K=J=0);B=A.Idle;F()},G=function(p){y.prepareMeasuredDataForSync(function(g,n){g&&n&&(c={data:g,uuid:n});E(p)})},ka=function(p){for(var g=p.files[w.userDictionaries],n={},t=0;t<g.length;t++)n[g[t].id]=g[t].__custom;y.updateDictionariesFromDapiFileMap(n,function(R,H){a===l&&(h=H,H=p.files[w.testingMode],q=(H=1===H.length?H[0].__custom:null)&&H.comment&&
0<H.comment.length?H.comment:null,G(!0),R&&V())})},Z=function(p){var g=p.files[w.userPersonalWords];y.updatePersonalDictionariesFromDapiFileMap(1===g.length?g[0].__custom:null,function(n,t){a===l&&(m=t,ka(p))})},la=function(p){var g=p.files[w.settingsUser];y.updateUserSettingsFromDapiFileMap(1===g.length?g[0].__custom:null,function(n,t){a===l&&(b=t,Z(p))})},ma=function(p){var g=p.files[w.privacyMode];d=(g=g&&1===g.length?g[0].__custom:null)?"on"===g.comment:!1;y.enablePrivacyMode(d,function(){var n=
p.files[w.dataWordList];y.checkDataWordListNeedsDownload(1===n.length?n[0].__custom:null)&&(e=!0);x?Z(p):la(p)});CWEBackgroundManager.instance.GoogleAnalytics.instance.setPrivacyMode(d)};J<=K?u.checkForUpdates(r,function(p){a===l&&(p&&0===p.errorCode&&p.files?ma(p):E())}):G(!1)}function da(a){a.session=l;var d=function(){if(a.session===l){var b=k.indexOf(a);-1!=b&&k.splice(b,1);B=A.Idle;F()}};u.getDataWordList(a.language,function(b){!b||b.error?d():y.updateDataWordList(b,d)})}function ea(a){a.session=
l;var d=function(){if(a.session===l){var b=k.indexOf(a);-1!=b&&k.splice(b,1);B=A.Idle;F()}};u.updateMeasurements(a.body.aggregateMeasurements,function(b){!b||b.error?y.measuredDataSyncDone(!1,a.uuid,d):y.measuredDataSyncDone(!0,a.uuid,d)})}function ia(a){a.session=l;var d=function(){if(a.session===l){var e=k.indexOf(a);-1!=e&&k.splice(e,1);B=A.Idle;F()}},b=function(e){a.session===l&&(e&&0===e.errorCode&&e.file&&e.file.__custom?(e=e.file.__custom,y.updateUserSettingsFromDapi(e,a.checksum!==e.checksum,
null,function(c){d()})):d())},m=function(e,c){a.session===l&&e&&c?y.updateUserSettingsFromDapi(e,!1,c,function(x){x&&aa();d()}):d(null)},h=function(e,c){a.session===l&&(a.action==f.Download?e&&c?m(e,c):d():(e&&(a.file.id=e.uuid,a.file.revision=e.version,a.action==f.Insert&&e&&(a.action=f.Update)),c=a.settings.createUploadData(c),a.file.checksum=c.checksum,a.body=c.data,a.action==f.Insert?u.insertFile(a.file,a.body,b):a.action==f.Update&&u.updateFile(a.file,a.body,b)))},q=function(e){u.getFiles(a.file.type,
D,function(c){if(a.session===l)if(c&&0===c.errorCode&&c.files&&1===c.files.length){var x=c.files[0];x.__responseType="json";u.downloadFile(x,function(r){h(x.__custom,r)})}else h(null,null)})};a.action==f.Insert||a.action==f.Update?q():a.action==f.Download?(a.file.__responseType="json",u.downloadFile(a.file,function(e,c){h(c?c.__custom:null,e)})):(Logger.instance.error("Sync Settings: unsupported action!!!!"),Logger.instance.error(a),d())}function ja(a){a.session=l;var d=S(a.state,a.test),b=S(a.state,
null),m=S(null,a.test),h=S(null,null),q=[d];-1==q.indexOf(b)&&q.push(b);-1==q.indexOf(m)&&q.push(m);-1==q.indexOf(h)&&q.push(h);d=[];for(b=0;b<q.length;b++)d.push({type:q[b],language:D});var e=function(r){r&&aa();r=k.indexOf(a);-1!=r&&k.splice(r,1);B=A.Idle;F()},c=function(r,E){a.session===l&&(E?CWEBackgroundManager.instance.enterTestingMode(a.test)?y.updateTestingSettingsFromDapi(r,E,function(G){a.session===l&&e(G)}):e():e())},x=function(r,E){r.__responseType="json";u.downloadFile(r,function(G){c(r.__custom,
G)})};u.checkForUpdates(d,function(r){var E=null;if(r&&0===r.errorCode&&r.files)for(var G=0;G<q.length&&(!r.files.hasOwnProperty(q[G])||!(E=(E=r.files[q[G]])&&1==E.length?E[0]:null));G++);E?x(E):e()})}function fa(a){a.session=l;var d=function(){if(a.session===l){var c=k.indexOf(a);-1!=c&&k.splice(c,1);B=A.Idle;F()}},b=function(c,x){a.session===l&&c&&x?y.updatePersonalDictionaryFromDapi(c,!1,x,function(){V(!0,!1);d()}):d(null)},m=function(c){a.session===l&&(c&&0===c.errorCode&&c.file&&c.file.__custom?
(c=c.file.__custom,y.updatePersonalDictionaryFromDapi(c,a.checksum!==c.checksum,null,function(){d()})):d())},h=function(c){c?a.action==f.Insert?u.insertFile(a.file,c,m):a.action==f.Update&&u.updateFile(a.file,c,m):d()},q=function(c){a.session===l&&(a.action==f.Delete?(a.file.revision=c.revision,u.deleteFile(a.file,!0,function(x){d()})):a.action==f.Download?u.downloadFile(a.file,function(x){b(c,x)}):(c&&(a.file.id=c.uuid,a.file.revision=c.version,a.action==f.Insert&&c&&(a.action=f.Update)),a.body?
h(a.body):y.readUserPersonalDictionaryFile(h)))},e=function(){u.getFiles(a.file.type,D,function(c){a.session===l&&(c&&0===c.errorCode&&c.files&&1===c.files.length?q(c.files[0].__custom):q(null))})};a.action==f.Insert||a.action==f.Update?e():a.action==f.Download?u.downloadFile(a.file,function(c,x){b(x?x.__custom:null,c)}):d()}function ha(a){a.session=l;var d=function(){if(a.session===l){var e=k.indexOf(a);-1!=e&&k.splice(e,1);B=A.Idle;F()}},b=function(e){a.session===l&&(e&&0===e.errorCode&&e.file&&
e.file.__custom?(e=e.file.__custom,y.updateDictionaryFromDapi(e,a.checksum!==e.checksum,null,d)):d())},m=function(e){e?a.action==f.Insert?u.insertFile(a.file,e,b):a.action==f.Update&&u.updateFile(a.file,e,b):d()},h=function(e,c){a.session===l&&e&&c?y.updateDictionaryFromDapi(e,!1,c,function(){V(!1,!0);d()}):d()},q=function(e){a.session===l&&(e&&0===e.errorCode&&e.file&&e.file.__custom?a.action==f.Delete?(a.file.revision=e.file.revision,u.deleteFile(a.file,!0,function(c){d()})):u.downloadFile(a.file,
function(c){h(e.file.__custom,c)}):d())};a.action==f.Insert||a.action==f.Update?a.body?m(a.body):y.readUserDictionaryFile(a.dictionary.uuid,m):a.action==f.Delete?u.getFile(a.file,q):a.action==f.Download&&u.downloadFile(a.file,function(e,c){h(c?c.__custom:null,e)})}function aa(){for(var a=0;a<W.length;a++)try{W[a]()}catch(d){Logger.instance.error(d)}}function V(a,d){for(var b=0;b<X.length;b++)try{X[b](a,d)}catch(m){Logger.instance.error(m)}}function Y(){return l=CWEChromeUtilities.generateUUID()}function S(a,
d){return w.settingsTesting.replace("[STATE]",a||"generic").replace("[TEST]",d||"generic")}var v={None:0,Writing:1,Image:2,PersonalDictionary:3,Dictionary:4,UserSettings:5,TestingSettings:6,DataWordList:7,MeasuredData:8},f={None:0,Insert:1,Update:2,Delete:3,Download:4},A={Idle:0,Busy:1},D=null,l=Y(),u=window.jsdapi.cow,y=null,W=[],X=[],k=[],I=null,K=0,J=0,B=A.Idle,C=!1,N=!1,O={},w={settingsUser:"settings/user",settingsTesting:"settings/testing/[STATE]/[TEST]",writings:"writing/*",userPersonalWords:"dictionary/user/personal",
userDictionaries:"dictionary/user",images:"image/*",testingMode:"settings/testing/mode",userLanguage:"settings/user/language",dataWordList:"data/word/list",privacyMode:"settings/privacy/mode"};z.ItemType=v;z.setDataManager=function(a){y=a};z.changeLanguage=function(a){a=a?a.toLowerCase():null;if(a!==D){var d=C;C&&z.stop();D=a;d&&z.start()}};z.start=function(){C||(Y(),C=!0,N=!1,B=A.Idle,O={},J=K=0,F(!0))};z.stop=function(){C&&(Y(),C=N=!1,B=A.Idle,k.splice(0,k.length),O={},J=K=0)};z.skipSync=function(a,
d){O[a]=!0===d};z.addUserSettingsUpdateListener=function(a){W.push(a)};z.addDictionariesUpdateListener=function(a){X.push(a)};z.enqueueUpdateUserSettings=function(a){C&&T(a,a.dapiFile?f.Update:f.Insert)};z.enqueueTestingSettingsPARCC=function(a){C&&P(a,"PARCC",f.Download)};z.enqueueTestingSettingsSmarterBalanced=function(a){C&&P(a,"SmarterBalanced",f.Download)};z.enqueueTestingSettings=function(a,d){C&&P(a,d,f.Download)};z.enqueueUpdateDictionary=function(a){C&&Q(a,a.dapiFile?f.Update:f.Insert)};
z.enqueueUpdatePersonalDictionary=function(a){C&&U(a,a.dapiFile?f.Update:f.Insert)}})(window.cwe.sync=window.cwe.sync||{});