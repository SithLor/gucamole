import CryptoJS from 'crypto-js';
const thinkTwicePassPhrase = "Th!nkTw!ce";
const iwfEncodeStep = 3;
function openDb() {
    return new Promise(function(e) {
        try {
            var t = indexedDB.open(DB_NAME, DB_VERSION);
            t.onsuccess = function(t) {
                return db = this.result, e();
            }, t.onerror = function(e) {
                console.log("IndexedDB open error:", e.target.errorCode);
            }, t.onupgradeneeded = function(e) {
                if (!e.currentTarget.result.objectStoreNames.contains("IWF")) {
                    e.currentTarget.result.createObjectStore("IWF", {
                        keyPath: "enc_url",
                        autoIncrement: !1
                    }).createIndex("enc_url", "enc_url", {
                        unique: !0
                    });
                }
                if (!e.currentTarget.result.objectStoreNames.contains("NonCIPA")) {
                    e.currentTarget.result.createObjectStore("NonCIPA", {
                        keyPath: "enc_url",
                        autoIncrement: !1
                    }).createIndex("enc_url", "enc_url", {
                        unique: !0
                    });
                }
                if (!e.currentTarget.result.objectStoreNames.contains("Broker")) {
                    e.currentTarget.result.createObjectStore("Broker", {
                        keyPath: "url",
                        autoIncrement: !1
                    }).createIndex("url", "url", {
                        unique: !0
                    });
                }
                if (!e.currentTarget.result.objectStoreNames.contains("Config")) {
                    e.currentTarget.result.createObjectStore("Config", {
                        keyPath: "name",
                        autoIncrement: !1
                    }).createIndex("name", "name", {
                        unique: !0
                    });
                }
            };
        } catch (t) {
            return e();
        }
    });
}
function addDataToObjectStore(e, t, r, o) {
    return new Promise(function(n) {
        try {
            var i1 = {
                [t]: r,
                value: o
            };
            return db.transaction([
                e
            ], "readwrite").objectStore(e).add(i1).onerror = function() {
                return this.error.message.indexOf("QUOTA_EXCEEDED_ERR") > -1 && clearObjectStore("Broker"), n();
            }, n();
        } catch (e) {}
    });
}
function updateDataInObjectStore(e, t, r, o) {
    return new Promise(function(n) {
        try {
            var i1 = {
                [t]: r,
                value: o
            };
            return db.transaction([
                e
            ], "readwrite").objectStore(e).put(i1).onerror = function() {
                return console.error("Put to object store error: ", this.error), this.error.message.indexOf("QUOTA_EXCEEDED_ERR") > -1 && clearObjectStore("Broker"), n();
            }, n();
        } catch (e) {}
    });
}
function clearObjectStore(e) {
    try {
        db.transaction([
            e
        ], "readwrite").objectStore(e).clear().onerror = function(e) {
            console.error("Clear Object Store error: ", e.target.errorCode);
        };
    } catch (e) {}
}
function fetchIWFItem(e) {
    return new Promise(function(t) {
        try {
            var r = db.transaction("IWF", "readonly").objectStore("IWF"), o = r.index("enc_url");
            const n = IDBKeyRange.only(e);
            o.openCursor(n).onsuccess = function(e) {
                const r = e.target.result;
                return t(!!r);
            };
        } catch (e) {
            return t(!1);
        }
    });
}
function fetchNonCIPAItem(e) {
    return new Promise(function(t) {
        try {
            var r = db.transaction("NonCIPA", "readonly").objectStore("NonCIPA"), o = r.index("enc_url");
            const n = IDBKeyRange.only(e);
            o.openCursor(n).onsuccess = function(e) {
                const r = e.target.result;
                return t(!!r && r.value.value);
            };
        } catch (e) {
            return t(!1);
        }
    });
}
function getStoreCount(e) {
    return new Promise(function(t) {
        try {
            let r = db.transaction([
                e
            ], "readonly").objectStore(e).count();
            r.onsuccess = ()=>t(r.result);
        } catch (e) {}
    });
}
function getDbStoreItem(e, t) {
    return new Promise(function(r) {
        try {
            let o = db.transaction([
                e
            ], "readonly").objectStore(e).get(t);
            o.onerror = function(e) {
                return console.error("Get Object Store error: ", e.target.errorCode), r(null);
            }, o.onsuccess = function(e) {
                return e.target.result && void 0 !== e.target.result.value ? r(e.target.result.value) : r(null);
            };
        } catch (e) {
            return r(null);
        }
    });
}
function getAllDbStoreItems(e) {
    return new Promise(function(t) {
        try {
            db.transaction([
                e
            ], "readonly").objectStore(e).getAll().onsuccess = function(e) {
                var r = e.target.result;
                return t(r || null);
            };
        } catch (e) {
            return t(null);
        }
    });
}
function deleteItemFromStore(e, t) {
    try {
        db.transaction([
            e
        ], "readwrite").objectStore(e).delete(t).onerror = function() {};
    } catch (e) {}
}
function valueExistsInStore(e, t) {
    return new Promise(function(r) {
        try {
            var o = !1;
            let n = db.transaction([
                e
            ], "readonly").objectStore(e).get(t);
            n.onerror = function() {
                return r(o = !1);
            }, n.onsuccess = function(e) {
                return e.target.result && void 0 !== e.target.result.value && (o = !0), r(o);
            };
        } catch (e) {
            return r(!1);
        }
    });
}
function downloadPhraseMatch() {
    createRequest("get", "http://cdn1.securly.com/pmatch.json").then((e)=>{
        if (e.ok) return e.text();
        console.error("download error for phrase match", e.status);
    }).then((e)=>{
        try {
            const t = CryptoJS.AES.decrypt(e, phraseMatchPassPhrase).toString(CryptoJS.enc.Utf8);
            t && t.length > 0 && (phraseMatchList = JSON.parse(t));
        } catch (e) {
            console.error("parse error for phrase match", e);
        }
    });
}
function downloadNonCIPA() {
    try {
        createRequest("get", "https://cdn1.securly.com/non-cipa-encode.txt").then(async (e)=>{
            if (e.ok) return !1 === await valueExistsInStore("Config", "NC_Headers") ? addDataToObjectStore("Config", "name", "NC_Headers", !0) : updateDataInObjectStore("Config", "name", "NC_Headers", !0), !1 === await valueExistsInStore("Config", "NC_Age") ? addDataToObjectStore("Config", "name", "NC_Age", e.headers.get("age")) : updateDataInObjectStore("Config", "name", "NC_Age", e.headers.get("age")), !1 === await valueExistsInStore("Config", "NC_Last_Modified") ? addDataToObjectStore("Config", "name", "NC_Last_Modified", e.headers.get("last-modified")) : updateDataInObjectStore("Config", "name", "NC_Last_Modified", e.headers.get("last-modified")), e.text();
        }).then((e)=>{
            String.prototype.replaceAll = function(e, t) {
                return this.split(e).join(t);
            };
            var t = e.replaceAll("\r", "").trim().split("\n");
            getAllDbStoreItems("NonCIPA").then((e)=>{
                for(n = 0; n < e.length; n++){
                    let r = e[n].enc_url.replace("NC:", "") + "," + e[n].value;
                    -1 === t.indexOf(r) && deleteItemFromStore("NonCIPA", e[n].enc_url);
                }
                var r = db.transaction("NonCIPA", "readwrite", {
                    durability: "relaxed"
                }), o = r.objectStore("NonCIPA");
                r.onerror = (e)=>{};
                for(var n = 0; n < t.length; n++){
                    var i1 = t[n].split(",");
                    let e = {
                        enc_url: "NC:" + i1[0],
                        value: i1[1]
                    };
                    o.put(e);
                }
                r.commit();
            });
        });
    } catch (e) {}
}
function checkIWFLatest() {
    return new Promise(async function(e) {
        if (await getStoreCount("IWF") > 0) {
            let t = await getDbStoreItem("Config", "IWF_Headers");
            if (null != t && t) {
                let t = await getDbStoreItem("Config", "IWF_Age"), r = await getDbStoreItem("Config", "IWF_Last_Modified");
                if (null != t && null != r) {
                    let t = new Date(r), o = new Date;
                    if (!(Math.abs(o - t) / 36e5 >= 24)) return e(!1);
                    getAllDbStoreItems("IWF").then(async (t)=>{
                        let r = "";
                        for(i = 0; i < t.length; i++)r += "" != r ? "\n" + t[i].enc_url : t[i].enc_url;
                        r += "\n";
                        let o = (new TextEncoder).encode(r).length;
                        if (r = null, o != await fetch("https://cdn1.securly.com/iwf-encode.txt", {
                            method: "HEAD",
                            cache: "no-cache",
                            mode: "no-cors"
                        }).then((e)=>e.headers.get("content-length"))) return e(!0);
                    }).catch((t)=>e(!0));
                } else if (null == t && null == r) return updateDataInObjectStore("Config", "name", "IWF_Headers", !1), e(!0);
                return e(!1);
            }
            return e(!0);
        }
        return e(!0);
    });
}
function checkNCLatest() {
    return new Promise(async function(e) {
        if (await getStoreCount("NonCIPA") > 0) {
            let t = await getDbStoreItem("Config", "NC_Headers");
            if (null != t && t) {
                let t = await getDbStoreItem("Config", "NC_Age"), r = await getDbStoreItem("Config", "NC_Last_Modified");
                if (null != t && null != r) {
                    let t = new Date(r), o = new Date;
                    if (!(Math.abs(o - t) / 36e5 >= 24)) return e(!1);
                    getAllDbStoreItems("NonCIPA").then(async (t)=>{
                        let r = "";
                        for(i = 0; i < t.length; i++)r += "" != r ? "\n" + t[i].enc_url.replace("NC:", "") + "," + t[i].value : t[i].enc_url.replace("NC:", "") + "," + t[i].value;
                        r += "\n";
                        let o = (new TextEncoder).encode(r).length;
                        if (r = null, o != await fetch("https://cdn1.securly.com/non-cipa-encode.txt", {
                            method: "HEAD",
                            cache: "no-cache",
                            mode: "no-cors"
                        }).then((e)=>e.headers.get("content-length"))) return e(!0);
                    }).catch((t)=>e(!0));
                } else if (null == t && null == r) return updateDataInObjectStore("Config", "name", "NC_Headers", !1), e(!0);
                return e(!1);
            }
            return e(!0);
        }
        return e(!0);
    });
}
function setupIWF() {
    try {
        processLists([
            checkIWFLatest(),
            checkNCLatest()
        ]);
    } catch (e) {}
    downloadPhraseMatch();
}
function downloadConfig() {
    createRequest("get", "http://cdn1.securly.com/config.json").then((e)=>{
        if (e.ok) return e.json();
    }).then((e)=>{
        if (null !== e) {
            var t = e;
            if (t.skiplist) {
                var r = [];
                t.skiplist.forEach(function(e) {
                    var t = Object.keys(e)[0];
                    if (void 0 !== t && t.trim().length > 0) {
                        if (r[t] = {
                            ttl: e[t],
                            last_broker_call: 0
                        }, -1 != t.indexOf("*")) {
                            var o = t.replaceAll(".", "\\.").replaceAll("*", ".*").replaceAll("/", "\\/"), n = new RegExp(o);
                            r[t].regx = n;
                        }
                        void 0 !== skipList[t] && (r[t].last_broker_call = skipList[t].last_broker_call);
                    }
                }), skipList = r;
            }
            selfharmlist = void 0 !== t.selfharmlist ? t.selfharmlist : [], vectorExpansionRules = void 0 !== t.vectorExpansionRules ? t.vectorExpansionRules : {}, bullyPhrases = void 0 !== t.bullyPhrases ? decryptPhrases(t.bullyPhrases) : [], wlBullyPhrases = void 0 !== t.wlBullyPhrases ? decryptPhrases(t.wlBullyPhrases) : [], void 0 !== t.thinkTwiceSites ? thinkTwiceSites = t.thinkTwiceSites : thinkTwiceSites = [];
        } else skipList = [];
    });
}

function createNonBlockingRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);  // true for asynchronous request
    return xhr;
}

function buff2StrWithEmoji(e) {
    return (new TextDecoder).decode(e);
}
function buff2Str(e) {
    return String.fromCharCode.apply(null, new Uint8Array(e));
}

