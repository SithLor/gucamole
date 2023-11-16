var checkClusterURL = "https://www.securly.com", DEBUG_userEmail = "", forceUserEmail = !1, DEBUG_clusterUrl = "https://www.securly.com/crextn", forceClusterUrl = !1, iwfEncodeStep = 3, iframeResp = "", iframeBlockUrl = "", lastKnownState = "unknown";
const tabCheck = [
    "netflix.com",
    "spotify.com",
    "soundcloud.com",
    "disneyplus.com",
    "hulu.com",
    "soundtrap.com",
    "viewpure.com",
    "pandora.com",
    "dailymotion.com",
    "soap2day.is",
    "instagram.com",
    "pinterest.com",
    "vimeo.com",
    "tiktok.com",
    "reddit.com",
    "buzzfeed.com",
    "medium.com",
    "quotev.com",
    "weebly.com",
    "tumblr.com",
    "facebook.com",
    "twitter.com",
    "linkedin.com",
    "plus.google.com",
    "apps.facebook.com",
    "touch.facebook.com",
    "socialblade.com",
    "viki.com",
    "myanimelist.net",
    "mymodernmet.com",
    "coolmathgames.com",
    "scratch.mit.edu",
    "nitrotype.com",
    "roblox.com",
    "poki.com",
    "twitch.tv",
    "crazygames.com",
    "hoodamath.com",
    "krunker.io",
    "friv.com",
    "epicgames.com",
    "sites.google.com",
    "amazon.com/Amazon-Video",
    "amazon.com/gp/video/"
];
function ENCRYPT(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t;
    }
    function r(e) {
        var t, r = "";
        for(t = 7; t >= 0; t--)r += (e >>> 4 * t & 15).toString(16);
        return r;
    }
    var o, n, i1, a, s, c, l, u, d, h = new Array(80), f = 1732584193, m = 4023233417, g = 2562383102, p = 271733878, b = 3285377520, y = (e = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for(var t = "", r = 0; r < e.length; r++){
            var o = e.charCodeAt(r);
            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
        }
        return t;
    }(e)).length, w = new Array;
    for(n = 0; n < y - 3; n += 4)i1 = e.charCodeAt(n) << 24 | e.charCodeAt(n + 1) << 16 | e.charCodeAt(n + 2) << 8 | e.charCodeAt(n + 3), w.push(i1);
    switch(y % 4){
        case 0:
            n = 2147483648;
            break;
        case 1:
            n = e.charCodeAt(y - 1) << 24 | 8388608;
            break;
        case 2:
            n = e.charCodeAt(y - 2) << 24 | e.charCodeAt(y - 1) << 16 | 32768;
            break;
        case 3:
            n = e.charCodeAt(y - 3) << 24 | e.charCodeAt(y - 2) << 16 | e.charCodeAt(y - 1) << 8 | 128;
    }
    for(w.push(n); w.length % 16 != 14;)w.push(0);
    for(w.push(y >>> 29), w.push(y << 3 & 4294967295), o = 0; o < w.length; o += 16){
        for(n = 0; n < 16; n++)h[n] = w[o + n];
        for(n = 16; n <= 79; n++)h[n] = t(h[n - 3] ^ h[n - 8] ^ h[n - 14] ^ h[n - 16], 1);
        for(a = f, s = m, c = g, l = p, u = b, n = 0; n <= 19; n++)d = t(a, 5) + (s & c | ~s & l) + u + h[n] + 1518500249 & 4294967295, u = l, l = c, c = t(s, 30), s = a, a = d;
        for(n = 20; n <= 39; n++)d = t(a, 5) + (s ^ c ^ l) + u + h[n] + 1859775393 & 4294967295, u = l, l = c, c = t(s, 30), s = a, a = d;
        for(n = 40; n <= 59; n++)d = t(a, 5) + (s & c | s & l | c & l) + u + h[n] + 2400959708 & 4294967295, u = l, l = c, c = t(s, 30), s = a, a = d;
        for(n = 60; n <= 79; n++)d = t(a, 5) + (s ^ c ^ l) + u + h[n] + 3395469782 & 4294967295, u = l, l = c, c = t(s, 30), s = a, a = d;
        f = f + a & 4294967295, m = m + s & 4294967295, g = g + c & 4294967295, p = p + l & 4294967295, b = b + u & 4294967295;
    }
    return (d = r(f) + r(m) + r(g) + r(p) + r(b)).toLowerCase();
}
function createRequest(e, t, r = null, o = "low", n = 0) {
    if (null == r || -1 === t.indexOf("http://") && -1 === t.indexOf("https://")) {
        if (-1 !== t.indexOf("http://") || -1 !== t.indexOf("https://") || "manifest.json" === t) {
            let i1 = new Request(t, {
                method: e,
                priority: o
            });
            return fetch(i1).catch((i1)=>{
                n < 5 && createRequest(e, t, r, o, n++);
            });
        }
        return {
            ok: !1
        };
    }
    {
        let i1 = new Request(t, {
            method: e,
            body: r,
            priority: o
        });
        return fetch(i1).catch((i1)=>{
            n < 5 && createRequest(e, t, r, o, n++);
        });
    }
}
function fetchClusterUrl() {
    return new Promise(async function(e) {
        try {
            if (userEmail.indexOf("@") > -1) {
                var t = userEmail.split("@")[1], r = null;
                if (null != (r = await getDbStoreItem("Config", "cluster"))) {
                    let t = r.split(",");
                    if (2 == t.length) {
                        var o;
                        if ((o = (new Date).getTime() / 1e3 - t[1]) < 31536e3 && "UNKNOWN_SCHOOL" != t[0] && "unknown" != clusterUrl) return clusterUrl = t[0], clusterFound = clusterStatus.FOUND, "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl ? (clusterUrl = clusterUrl.replace("http://", "https://"), !1 === await valueExistsInStore("Config", "cluster") ? addDataToObjectStore("Config", "name", "cluster", clusterUrl) : updateDataInObjectStore("Config", "name", "cluster", clusterUrl), 1 == needToReloadTabs && (!1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 0) : updateDataInObjectStore("Config", "name", "reloadTabs", 0), needToReloadTabs = 0, checkAllLoadedTabs()), latencyCheck()) : "AVOID_OS" == clusterUrl && (clusterFound = clusterStatus.AVOID_OS), getGeolocationStatus(), getFeatureConfig(), e();
                        if (o < 3600 && ("UNKNOWN_SCHOOL" == t[0] || "unknown" == clusterUrl)) return "UNKNOWN_SCHOOL" == (clusterUrl = t[0]) && (clusterFound = clusterStatus.UNKNOWN_SCHOOL), !1 === await valueExistsInStore("Config", "cluster") ? addDataToObjectStore("Config", "name", "cluster", clusterUrl) : updateDataInObjectStore("Config", "name", "cluster", clusterUrl), e();
                    } else "UNKNOWN_SCHOOL" == (clusterUrl = r) ? clusterFound = clusterStatus.UNKNOWN_SCHOOL : "AVOID_OS" == clusterUrl ? clusterFound = clusterStatus.AVOID_OS : clusterUrl.indexOf("securly.com") > -1 && clusterUrl.indexOf("https://") > -1 ? (clusterFound = clusterStatus.FOUND, getGeolocationStatus(), getFeatureConfig(), 1 == needToReloadTabs && (!1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 0) : updateDataInObjectStore("Config", "name", "reloadTabs", 0), needToReloadTabs = 0, checkAllLoadedTabs()), latencyCheck()) : clusterFound = clusterStatus.NOTFOUND, setupOrReload();
                } else try {
                    var n, i1 = checkClusterURL + "/crextn/cluster?domain=" + t + "&reasonCode=" + clusterFound;
                    await createRequest("get", i1).then((e)=>e.ok ? e.text() : (clusterFound = clusterStatus.ERROR, !1)).then(async (e)=>{
                        if (0 != e) {
                            if (n = e.trim(), 1 == needToReloadTabs && (!1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 0) : updateDataInObjectStore("Config", "name", "reloadTabs", 0), needToReloadTabs = 0, checkAllLoadedTabs()), debugIWF = 0, -1 !== n.lastIndexOf("_disableIWF")) clusterUrl = (clusterUrl = n.slice(0, n.lastIndexOf("_disableIWF"))).replace("http://", "https://"), debugIWF = 1, clearObjectStore("IWF");
                            else if (-1 !== n.lastIndexOf("_updateIWF")) clusterUrl = (clusterUrl = n.slice(0, n.lastIndexOf("_updateIWF"))).replace("http://", "https://"), debugIWF = 2, downloadIWFList(), downloadNonCIPA();
                            else {
                                addDataToObjectStore("Config", "name", "cluster", (clusterUrl = (clusterUrl = n).replace("http://", "https://")) + "," + (new Date).getTime() / 1e3);
                            }
                            if (!1 === await valueExistsInStore("Config", "cluster") ? addDataToObjectStore("Config", "name", "cluster", clusterUrl) : updateDataInObjectStore("Config", "name", "cluster", clusterUrl), clusterFound = clusterStatus.FOUND, getGeolocationStatus(), getFeatureConfig(), "UNKNOWN_SCHOOL" == clusterUrl) return void (clusterFound = clusterStatus.UNKNOWN_SCHOOL);
                            if ("AVOID_OS" == clusterUrl) return void (clusterFound = clusterStatus.AVOID_OS);
                            "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl && latencyCheck(), setupOrReload();
                        }
                    });
                } catch (e) {
                    console.log("Send error uc4");
                }
                return !0 === forceClusterUrl && (clusterUrl = (clusterUrl = DEBUG_clusterUrl).replace("http://", "https://"), !1 === await valueExistsInStore("Config", "cluster") ? addDataToObjectStore("Config", "name", "cluster", clusterUrl) : updateDataInObjectStore("Config", "name", "cluster", clusterUrl), clusterFound = 1, getGeolocationStatus(), getFeatureConfig(), setupOrReload()), e();
            }
            return e();
        } catch (t) {
            return e();
        }
    });
}
function fetchUserAPI() {
    try {
        return new Promise(async function(e) {
            chrome.identity.getProfileUserInfo(async function(t) {
                var r = t.email;
                return !0 === forceUserEmail && (r = DEBUG_userEmail), "" !== r ? (userEmail = r, userFound = userStatus.FOUND, !1 === await valueExistsInStore("Config", "userEmail") ? addDataToObjectStore("Config", "name", "userEmail", userEmail) : updateDataInObjectStore("Config", "name", "userEmail", userEmail), await fetchClusterUrl(), e()) : (!1 === await valueExistsInStore("Config", "userEmail") ? addDataToObjectStore("Config", "name", "userEmail", "") : updateDataInObjectStore("Config", "name", "userEmail", ""), clusterFound = clusterStatus.AVOID_OS, clusterUrl = "AVOID_OS", e());
            });
        });
    } catch (e) {
        return;
    }
}
function skipCacheAndLogAlways(e, t) {
    return -1 != e.indexOf("twitter.com") ? 1 : -1 != e.indexOf("facebook.com") ? 1 : -1 != e.indexOf("google.co") && -1 == e.indexOf("mail.google.co") && -1 == e.indexOf("drive.google.co") ? 1 : -1 != e.indexOf("bing.co") ? 1 : -1 != e.indexOf("search.yahoo.co") ? 1 : -1 != e.indexOf("wikipedia.org") ? 1 : -1 != e.indexOf("youtube.co") ? 1 : 0;
}
function isBlockingInProgress(e, t) {
    return new Promise(function(r, o) {
        chrome.tabs.get(e, function(e) {
            if (e && "loading" == e.status) {
                var o = new URL(t).hostname;
                if (-1 != o.indexOf("securly.com") || selfInformation.hasOwnProperty("id") && -1 != o.indexOf(selfInformation.id)) return void r(!0);
                if (void 0 !== e.pendingUrl && (-1 != (o = new URL(e.pendingUrl).hostname).indexOf("securly.com") || selfInformation.hasOwnProperty("id") && -1 != o.indexOf(selfInformation.id))) return void r(!0);
            }
            r(!1);
        });
    });
}
function getLocation(e) {
    return new URL(e);
}
async function interceptOrNot(e) {
    var t = 0, r = e.type, o = e.url, n = getLocation(o).hostname, i1 = getLocation(o).pathname;
    if (clusterFound == clusterStatus.AVOID_OS || "AVOID_OS" == clusterUrl || "UNKNOWN_SCHOOL" == clusterUrl) return t = 0, Promise.resolve(t);
    if (0 === e.url.indexOf("file")) return Promise.resolve(0);
    var a = o.replace(/^https?\:\/\//i, ""), s = (a = a.replace(/^www\.\b/i, "")).length;
    if ("/" === a.charAt(s - 1) && (a = a.slice(0, -1)), fetchIWFItem(ENCRYPT(a)).then((r)=>{
        if (r) return takeDenyActionTabs("G", "BL", "", btoa(a), e.tabId), t = 0, Promise.resolve(t);
    }), failedOpenObj && failedOpenObj.isFailedOpen()) {
        if (failedOpenObj.isWideOpenMode()) t = 0;
        else {
            0 == n.indexOf("www.") && (n = n.substr(4)), fetchNonCIPAItem("NC:" + ENCRYPT(n)).then((t)=>{
                !1 === t || "main_frame" != r && "sub_frame" != r || takeToFailedOpenBlockedPage(e.tabId, n, t);
            });
        }
        return Promise.resolve(t);
    }
    return -1 == o.indexOf("youtube.com") && (o = o.toLowerCase()), -1 != n.indexOf("google.co") && -1 != i1.indexOf("/maps/") && -1 != i1.indexOf("/place/") ? (t = 1, Promise.resolve(t)) : "main_frame" !== r && "sub_frame" !== r && "xmlhttprequest" !== r ? (t = 0, Promise.resolve(t)) : -1 != n.indexOf("securly.com") ? (t = 0, -1 != i1.indexOf("crextn/debug") && "xmlhttprequest" != r && getDebugInfo().then((e)=>{
        e.sourceFunction = "interceptOrNot", sendDebugInfo(e);
    }), Promise.resolve(t)) : -1 != n.indexOf("twitter.com") && (-1 != i1.indexOf(twitterMessageURI) || -1 != i1.indexOf("api/graphql") && -1 != i1.indexOf("CreateTweet") || -1 != o.indexOf(twitterPrefetchTimestamp) && -1 == e.tabId) && "xmlhttprequest" == r ? (t = 1, Promise.resolve(t)) : !n.indexOf("facebook.com") || -1 == i1.indexOf("updatestatus") && -1 == i1.indexOf("webgraphql") && -1 == i1.indexOf("api/graphql") || "xmlhttprequest" != r ? -1 != n.indexOf("google.co") && -1 != i1.indexOf("/plusappui/mutate") && "xmlhttprequest" == r ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("google.co") ? (t = 0, "xmlhttprequest" != r && "main_frame" != r ? (t = 0, Promise.resolve(t)) : -1 != n.indexOf("accounts.google.co") || -1 != n.indexOf("docs.google.co") || -1 != i1.indexOf("/calendar/") || -1 != n.indexOf("code.google.co") || -1 != i1.indexOf("/cloudprint") || -1 != i1.indexOf("/_/chrome/newtab") || -1 != n.indexOf("appengine.google.com") || -1 != i1.indexOf("/complete/search") || -1 != i1.indexOf("/webhp") ? (t = 0, Promise.resolve(t)) : -1 != n.indexOf("meet.google.co") ? (t = 1, Promise.resolve(t)) : -1 != i1.indexOf("/search") || -1 != i1.indexOf("/#q") || -1 != n.indexOf("translate.google.co") || -1 != n.indexOf("remotedesktop.google.co") ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("mail.google.co") && "main_frame" == r ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("drive.google.co") && "main_frame" == r ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("sites.google.co") && "main_frame" == r ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("hangouts.google.co") && "main_frame" == r ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("plus.google.co") && "main_frame" == r ? (t = 1, Promise.resolve(t)) : Promise.resolve(0)) : -1 != n.indexOf("youtube.com") && "main_frame" == r ? (t = 1, Promise.resolve(t)) : -1 != n.indexOf("youtube.com") && "sub_frame" == r && -1 != i1.indexOf("embed") ? (t = 1, Promise.resolve(t)) : -1 == n.indexOf("youtube.com") || -1 == i1.indexOf("watch_fragments_ajax") && -1 == i1.indexOf("doubleclick/DARTIframe.html") && -1 == i1.indexOf("ad_data_204") && -1 == i1.indexOf("annotations_invideo") && -1 == i1.indexOf("api/stats/atr") && -1 == i1.indexOf("get_video_info") ? -1 != i1.indexOf("youtubei/v1/search") || -1 != i1.indexOf("youtube.com/results") ? Promise.resolve(1) : "main_frame" != r && "sub_frame" != r || -1 == n.indexOf("youtube.com") ? -1 != n.indexOf("facebook.com") && "sub_frame" == r ? (t = 0, Promise.resolve(t)) : -1 != n.indexOf("bing.com") && -1 != i1.indexOf("/fd/fb") || -1 != n.indexOf("ssl.bing.com") || -1 != i1.indexOf("/passport.aspx") ? (t = 0, Promise.resolve(t)) : -1 != n.indexOf("bing.com") && "sub_frame" === r ? (t = 1, Promise.resolve(t)) : "main_frame" == r || "sub_frame" == r && 1 == checkiFrames ? (t = 1, Promise.resolve(t)) : Promise.resolve(t) : -1 != i1.indexOf("youtubei/v1/search") ? Promise.resolve(1) : "/" == i1 ? Promise.resolve(1) : -1 == i1.indexOf("/results") && -1 == i1.indexOf("/watch") ? Promise.resolve(0) : -1 != o.indexOf("pbj=1") ? Promise.resolve(0) : (t = 1, Promise.resolve(t)) : (t = 0, Promise.resolve(t)) : (t = 1, Promise.resolve(t));
}
function getBlockUrl(e, t, r, o, n) {
    var i1 = "domainblockedforuser", a = "";
    "GL" == e && (i1 = "GEO"), "-1" != r && (i1 = "safesearch", a = btoa(r));
    var s = "";
    if ("BL" != t && "BL_SRCH" != t && "WL" != t && "WL_SRCH" != t || (s = t), "BL" != t && "BL_SRCH" != t || (i1 = "G" == e ? "globalblacklist" : "policyblacklist", t = "BL"), "WL" != t && "WL_SRCH" != t || (i1 = "whitelistonly", t = "WL"), "BANNED" == t && (i1 = "banned"), "unknown" != clusterUrl) {
        var c = atob(o), l = c.substr(c.indexOf("://") + 3);
        o = btoa(l);
        var u = "";
        return u = clusterUrl.replace("/crextn", "").replace("http://", "https://") + "/blocked?useremail=" + userEmail + "&reason=" + i1 + "&categoryid=" + t + "&policyid=" + e + "&keyword=" + a + "&url=" + o + "&ver=" + version + (1 == n ? "&subFrame=1" : ""), geoLat && geoLng && (u += "&lat=" + geoLat + "&lng=" + geoLng), s && (u += "&listType=" + s), u;
    }
}
function takeDenyActionTabs(e, t, r, o, n, i1, a) {
    invalidateSkipListCaching(o, !1), clearWebCache(o), brokredRequest = [];
    var s = "domainblockedforuser", c = "";
    "GL" == e && (s = "GEO"), "-1" != r && (s = "safesearch", c = btoa(r));
    var l = "";
    if ("BL" != t && "BL_SRCH" != t && "WL" != t && "WL_SRCH" != t || (l = t), "BL" != t && "BL_SRCH" != t || (s = "G" == e ? "globalblacklist" : "policyblacklist", t = "BL"), "BANNED" == t && (s = "banned"), "WL" != t && "WL_SRCH" != t || (s = "whitelistonly", t = "WL"), "unknown" != clusterUrl) {
        var u = atob(o), d = u.substr(u.indexOf("://") + 3);
        o = btoa(d);
        var h = clusterUrl.replace("/crextn", ""), f = "";
        return f = h + "/blocked?useremail=" + userEmail + "&reason=" + s + "&categoryid=" + t + "&policyid=" + e + "&keyword=" + c + "&url=" + o + "&ver=" + version + (1 == i1 ? "&subFrame=1" : ""), geoLat && geoLng && (f += "&lat=" + geoLat + "&lng=" + geoLng), l && (f += "&listType=" + l), void 0 !== a && a && (f += "&rebroker=1"), void isBlockingInProgress(n, "http://" + atob(o)).then(function(e) {
            e || setBlockedPage(n, f);
        }).catch(function(e) {
            console.log("exception in checking blocking progress", n), setBlockedPage(n, f);
        });
    }
}
function setBlockedPage(e, t) {
    -1 == e && (e = null), e > 0 && (tabsBeingBlocked[e] = t), chrome.tabs.update(e, {
        url: "chrome-extension://" + (selfInformation.hasOwnProperty("id") ? selfInformation.id : "iheobagjkfklnlikgihanlhcddjoihkg") + "/blocked.html"
    }, function() {
        chrome.runtime.lastError;
    }), chrome.tabs.update(e, {
        url: t
    }, function() {
        chrome.runtime.lastError && setTimeout(function() {
            chrome.tabs.update(null, {
                url: t
            }, function() {});
        }, 500);
    });
}
function takeDenyAction(e, t, r) {
    invalidateSkipListCaching(r, !1), clearWebCache(r);
    var o = "domainblockedforuser";
    if ("0" == e && "-1" == t) return {
        cancel: !0
    };
    var n = "";
    if ("BL" != t && "BL_SRCH" != t && "WL" != t && "WL_SRCH" != t || (n = t), "BL" != t && "BL_SRCH" != t || (o = "G" == e ? "globalblacklist" : "policyblacklist", t = "BL"), "BANNED" == t && (o = "banned"), "unknown" == clusterUrl) return {
        cancel: !0
    };
    var i1 = atob(r), a = i1.substr(i1.indexOf("://") + 3);
    r = btoa(a);
    var s = clusterUrl.replace("/crextn", "") + "/blocked?useremail=" + userEmail + "&reason=" + o + "&categoryid=" + t + "&policyid=" + e + "&url=" + r + "&ver=" + version + (1 == isSubFrame ? "&subFrame=1" : "");
    return geoLat && geoLng && (s += "&lat=" + geoLat + "&lng=" + geoLng), n && (s += "&listType=" + n), {
        url: s
    };
}
function takeSafeSearchAction(e, t) {
    if (-1 != e.indexOf("google.co") && /q=/.test(t)) return -1 === t.indexOf("safe=") && t + "&safe=strict";
    if (-1 != e.indexOf("bing.com") && -1 == t.indexOf("adlt=strict") || -1 != t.indexOf("format=snrjson") && -1 != t.indexOf("/search?")) {
        let e = new URL(t);
        return e.searchParams.set("adlt", "strict"), e.searchParams.delete("format"), e.href;
    }
    return -1 != e.indexOf("search.yahoo.com") && -1 == t.indexOf("vm=r") ? -1 != t.indexOf("?") ? t + "&vm=r" : t + "?vm=r" : t;
}
function takeCreativeCommonImageSearchAction(e) {
    if (-1 !== e.indexOf("google.") && -1 !== e.indexOf("tbm=isch")) return -1 === e.indexOf("tbs=il:cl") && -1 === e.indexOf("tbs=il%3acl") && e + "&tbs=il%3acl";
    if (-1 != e.indexOf("bing.com/images/search")) {
        var t = e.toLowerCase();
        if (-1 == t.indexOf("&qft=+filterui:licensetype-any") && -1 == t.indexOf("&qft=%2bfilterui%3alicensetype-any")) {
            let t = new URL(e);
            return t.searchParams.set("qft", "+filterui:licensetype-any"), t.searchParams.delete("format"), t.href;
        }
    }
    return -1 != e.indexOf("search.yahoo.com/search/images") && -1 == e.indexOf("&imgl=fmsuc") ? e + "&imgl=fmsuc" : e;
}
function getYtSSRequestHeaders(e, t) {
    if (-1 != e.indexOf("/results") || -1 != e.indexOf("/search") || -1 != e.indexOf("/watch")) {
        for(var r = "", o = 0; o < t.length; ++o)if ("Cookie" === t[o].name) {
            r = t[o].value, t.splice(o, 1);
            break;
        }
        if ("" == r) t.push({
            name: "Cookie",
            value: "PREF=f2=8000000"
        });
        else {
            var n = 0, i1 = r.split("; ");
            for(o = 0; o < i1.length; ++o)-1 != i1[o].indexOf("PREF") && (-1 == i1[o].indexOf("f2=8000000") && (i1[o] += "&f2=8000000"), n = 1), -1 != i1[o].indexOf("SID=") && (i1[o] = "");
            0 == n && i1.push("PREF=f2=8000000");
            var a = "";
            for(o = 0; o < i1.length; ++o)a += i1[o], a += "; ";
            a = a.substring(0, a.length - 2), t.push({
                name: "Cookie",
                value: a
            });
        }
    }
    return t;
}
function getPauseAction(e) {
    return invalidateSkipListCaching(e, !0), clearWebCache(e), brokredRequest = [], "unknown" == clusterUrl ? {
        cancel: !0
    } : {
        redirectUrl: clusterUrl.replace("/crextn", "") + "/paused"
    };
}
function takePauseActionTabs(e, t) {
    var r = getPauseAction(e);
    if (void 0 !== r.redirectUrl) {
        var o = r.redirectUrl;
        chrome.tabs.update(t, {
            url: "chrome-extension://" + (selfInformation.hasOwnProperty("id") ? selfInformation.id : "iheobagjkfklnlikgihanlhcddjoihkg") + "/blocked.html"
        }, n), chrome.tabs.update(t, {
            url: o
        }, n), setTimeout(function() {
            chrome.tabs.update(null, {
                url: o
            }, n);
        }, 500);
    }
    function n() {
        chrome.runtime.lastError;
    }
}
function takeToFailedOpenBlockedPage(e, t, r) {
    var o = btoa(t);
    n = [], 0 != (Math.pow(2, 3) & r) && n.push("Pornography"), 0 != (Math.pow(2, 4) & r) && n.push("Drugs"), 0 != (Math.pow(2, 5) & r) && n.push("Gambling");
    var n = btoa(n.join(", "));
    brokredRequest = [], chrome.tabs.update(e, {
        url: "chrome-extension://" + (selfInformation.hasOwnProperty("id") ? selfInformation.id : "iheobagjkfklnlikgihanlhcddjoihkg") + "/blocked.html?site=" + o + "&category=" + n
    }, function() {
        chrome.runtime.lastError;
    });
}
function checkSkipListCaching(e) {
    var t = "", r = cleanURL(new URL(e.url).hostname.toLowerCase()), o = Math.floor(Date.now() / 1e3), n = Object.keys(skipList);
    if (n && -1 != n.indexOf(r)) {
        if (t = r, ttlForDomain = skipList[r].ttl, lastBrokerCall = skipList[r].last_broker_call, -1 == ttlForDomain) return Promise.resolve(0);
        if (o - lastBrokerCall < ttlForDomain) return Promise.resolve(0);
    }
    for(var i1 = 0; i1 < n.length; i1++){
        if (-1 != n[i1].indexOf("*")) {
            if (skipList[n[i1]].regx.test(cleanURL(e.url))) {
                if (t = n[i1], ttlForDomain = skipList[n[i1]].ttl, lastBrokerCall = skipList[n[i1]].last_broker_call, -1 == ttlForDomain) return Promise.resolve(0);
                if (o - lastBrokerCall < ttlForDomain) return Promise.resolve(0);
            }
        }
    }
    return t.length > 0 && (skipList[t].last_broker_call = o), 1;
}
function invalidateSkipListCaching(e, t) {
    url = atob(e);
    var r = Object.keys(skipList);
    if (t) for(var o = 0; o < r.length; o++)skipList[r[o]].last_broker_call = 0;
    else {
        var n = cleanURL(new URL(url).hostname.toLowerCase());
        r && -1 != r.indexOf(n) && (skipList[n].last_broker_call = 0);
        for(o = 0; o < r.length; o++){
            if (-1 != r[o].indexOf("*")) skipList[r[o]].regx.test(cleanURL(url)) && (skipList[r[o]].last_broker_call = 0);
        }
    }
}
async function setupOrReload() {
    userFound == userStatus.FOUND && clusterFound == clusterStatus.FOUND ? ("UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl && 1 == needToReloadTabs && (!1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 0) : updateDataInObjectStore("Config", "name", "reloadTabs", 0), needToReloadTabs = 0, checkAllLoadedTabs()), chrome.alarms.get("fetchClusterUrl", function(e) {
        void 0 === e && chrome.alarms.create("fetchClusterUrl", {
            delayInMinutes: 30,
            periodInMinutes: 30
        });
    }), clearObjectStore("Broker")) : clusterFound == clusterStatus.AVOID_OS ? (!1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 1) : updateDataInObjectStore("Config", "name", "reloadTabs", 1), needToReloadTabs = 1, chrome.alarms.get("fetchClusterUrl", function(e) {
        void 0 === e && chrome.alarms.create("fetchClusterUrl", {
            delayInMinutes: 30,
            periodInMinutes: 30
        });
    }), clearObjectStore("Broker")) : (console.log("https://www.securly.com/crextn/blocked?useremail=" + userEmail + "&reason=notregistered&cu=" + clusterUrl + "&uf=" + userFound + "&cf=" + clusterFound + "&ver=" + version + "&url="), chrome.alarms.get("fetchClusterUrl", function(e) {
        void 0 === e && chrome.alarms.create("fetchClusterUrl", {
            delayInMinutes: 30,
            periodInMinutes: 30
        });
    }));
}
async function getGeolocationStatus() {
    if ("unknown" != clusterUrl && "AVOID_OS" != clusterUrl && "UNKNOWN_SCHOOL" != clusterUrl && null != clusterUrl) {
        var e = clusterUrl + "/getGeoStatus?userEmail=" + userEmail;
        await createRequest("get", e).then((e)=>{
            if (e.ok) return e.text();
        }).then(async (e)=>{
            geolocation = parseInt(e.trim()), !1 === await valueExistsInStore("Config", "geostatus") ? addDataToObjectStore("Config", "name", "geostatus", geolocation) : updateDataInObjectStore("Config", "name", "geostatus", geolocation), geolocation && (getGeolocation(), chrome.alarms.get("geolocationFetch", function(e) {
                void 0 !== e && chrome.alarms.clear("geolocationFetch");
            }), chrome.alarms.create("geolocationFetch", {
                delayInMinutes: 5,
                periodInMinutes: 5
            }));
        }).catch((e)=>{
            console.log("Geolocation request error.");
        });
    }
}
async function getGeolocation() {
    if ("unknown" != clusterUrl && "AVOID_OS" != clusterUrl && "UNKNOWN_SCHOOL" != clusterUrl) {
        var e = 0;
        await chrome.system.display.getInfo({}, function(t) {
            t.every((t)=>!t.isPrimary || (e = t.workArea.height, 0 == Object.keys(geoWindows).length && chrome.windows.create({
                    focused: !1,
                    type: "normal",
                    width: 1,
                    height: 1,
                    left: 0,
                    top: e,
                    url: clusterUrl + "/geoloc.html"
                }, function(e) {
                    void 0 != typeof e.id && (geoWindows[e.id] = e.id);
                }), !1));
        }), setTimeout(()=>{
            chrome.windows.getAll((e)=>{
                e.length > 1 && e.forEach((e)=>{
                    void 0 !== geoWindows[e.id] && (chrome.windows.remove(e.id).catch((e)=>{}), delete geoWindows[e.id]);
                });
            });
        }, 8e3);
    }
}
async function getRemoteIPGeo() {
    if ("unknown" == clusterUrl || !1 !== checkingGeoIP) ;
    else {
        checkingGeoIP = !0;
        let t = await getDbStoreItem("Config", "lastIPCheck");
        if (null != t) {
            let e = Math.abs(Date.now() - new Date(t));
            if (Math.floor(e / 1e3 / 60) < 10) return;
        }
        var e = clusterUrl + "/getGeoStatus?ip=1";
        await createRequest("get", e).then((e)=>{
            if (e.ok) return e.text();
        }).then(async (e)=>{
            0 != await valueExistsInStore("Config", "lastIPCheck") ? updateDataInObjectStore("Config", "name", "lastIPCheck", Date.now()) : addDataToObjectStore("Config", "name", "lastIPCheck", Date.now()), e.trim() != geoLastIP && (getGeolocation(), geoLastIP = e.trim()), checkingGeoIP = !1;
        }).catch((e)=>{
            checkingGeoIP = !1, console.log("Geolocation remote IP request error.");
        });
    }
}
function getVersion() {}
function getQueryVariable(e, t) {
    for(var r = new URL(e).search.replace(/\?/, "").split("&"), o = 0; o < r.length; o++){
        var n = r[o].split("=");
        if (decodeURIComponent(n[0]) == t) return decodeURIComponent(n[1]);
    }
    return "";
}
function normalizeHostname(e) {
    var t = e;
    return 0 == e.indexOf("www.") ? t = e.substr(4) : 0 == e.indexOf("m.") && (t = e.substr(2)), t;
}
function extractTranslateHostname(e) {
    var t = "translate.google.com", r = getQueryVariable(e, "u");
    if ("" != r) {
        var o = (r = (r = (r = (r = decodeURIComponent(r)).toLowerCase()).replace("http://", "")).replace("https://", "")).indexOf("/");
        t = -1 != o ? r.substr(0, o) : r;
    }
    return t;
}
async function sendDebugInfo(e) {
    var t = clusterUrl + "/debug";
    await fetch(t, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(e)
    }).catch((e)=>{
        console.log("Send error u3");
    });
}
async function checkAllLoadedTabs() {
    !1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 0) : updateDataInObjectStore("Config", "name", "reloadTabs", 0), needToReloadTabs = 0, chrome.tabs.query({}, function(e) {
        for(var t = 0; t < e.length; t++)-1 == e[t].url.indexOf("securly.com") && (-1 == e[t].url.indexOf("http://") && -1 == e[t].url.indexOf("https://") || chrome.tabs.reload(e[t].id));
    });
}
function clearWebCache(e) {
    var t = (new Date).getTime() - 3e5;
    chrome.browsingData.removeCache({
        since: t
    }, function() {
        chrome.runtime.lastError;
    });
    try {
        var r = atob(e), o = new URL(r).hostname.replace("www.", "");
        chrome.browsingData.remove({
            origins: [
                "https://" + o,
                "https://www." + o
            ]
        }, {
            cacheStorage: !0,
            fileSystems: !0,
            indexedDB: !0,
            localStorage: !0,
            pluginData: !0,
            serviceWorkers: !0,
            webSQL: !0
        }, function() {});
    } catch (t) {
        console.log("Clearing web cache failed. b64Url" + e);
    }
}
async function getDebugInfo() {
    var e = {
        clusterUrl: clusterUrl,
        userEmail: userEmail
    };
    if ("unknown" != clusterUrl && "AVOID_OS" != clusterUrl && "UNKNOWN_SCHOOL" != clusterUrl) {
        var t = clusterUrl.replace("crextn", "app/session"), r = await createRequest("get", t).then((e)=>{
            if (e.ok) return e.text();
        }).then((e)=>e).catch((e)=>"Network Error");
        e.sessionInfo = r;
        for(var o = [
            "http://www.maxim.com",
            "http://www.amazon.com",
            "http://www.google.com",
            "http://www.bing.com",
            "http://search.yahoo.com",
            "http://www.youtube.com",
            "http://mail.google.com",
            "http://plus.google.com",
            "http://www.facebook.com",
            "http://docs.google.com",
            "http://drive.google.com",
            "http://sites.google.com"
        ], n = 0; n < o.length; n++){
            var i1 = o[n];
            await getFilteringInfo(i1, e).then((t)=>{
                e = t;
            });
        }
        return e;
    }
}
async function getFilteringInfo(e, t) {
    var r = siteUrlToBrokerUrl(e);
    return await createRequest("get", r).then((e)=>{
        if (e.ok) return e.text();
    }).then((r)=>(t[e] = r.trim(), t)).catch((r)=>(t[e] = "Network Error", t));
}
function siteUrlToBrokerUrl(e) {
    var t = new URL(e).hostname.toLowerCase(), r = btoa(e);
    return geolocation ? clusterUrl + "/broker?useremail=" + userEmail + "&reason=crextn&host=" + t + "&url=" + r + "&msg=&ver=" + version + "&cu=" + clusterUrl + "&uf=" + userFound + "&cf=" + clusterFound + "&lat=" + geoLat + "&lng=" + geoLng : clusterUrl + "/broker?useremail=" + userEmail + "&reason=crextn&host=" + t + "&url=" + r + "&msg=&ver=" + version + "&cu=" + clusterUrl + "&uf=" + userFound + "&cf=" + clusterFound;
}
async function selfClusterCheckBeforeBroker() {
    ("unknown" === clusterUrl || clusterFound !== clusterStatus.FOUND && clusterFound !== clusterStatus.AVOID_OS) && (!1 === await valueExistsInStore("Config", "reloadTabs") ? addDataToObjectStore("Config", "name", "reloadTabs", 0) : updateDataInObjectStore("Config", "name", "reloadTabs", 0), needToReloadTabs = 0, fetchClusterUrl());
}
function downloadIWFList() {
    try {
        createRequest("get", "https://cdn1.securly.com/iwf-encode.txt").then(async (e)=>{
            if (e.ok) return !1 === await valueExistsInStore("Config", "IWF_Headers") ? addDataToObjectStore("Config", "name", "IWF_Headers", !0) : updateDataInObjectStore("Config", "name", "IWF_Headers", !0), !1 === await valueExistsInStore("Config", "IWF_Age") ? addDataToObjectStore("Config", "name", "IWF_Age", e.headers.get("age")) : updateDataInObjectStore("Config", "name", "IWF_Age", e.headers.get("age")), !1 === await valueExistsInStore("Config", "IWF_Last_Modified") ? addDataToObjectStore("Config", "name", "IWF_Last_Modified", e.headers.get("last-modified")) : updateDataInObjectStore("Config", "name", "IWF_Last_Modified", e.headers.get("last-modified")), e.text();
        }).then((e)=>{
            String.prototype.replaceAll = function(e, t) {
                return this.split(e).join(t);
            };
            var t = e.replaceAll("\r", "").trim().split("\n");
            getAllDbStoreItems("IWF").then((e)=>{
                for(n = 0; n < e.length; n++){
                    let r = e[n].enc_url;
                    -1 === t.indexOf(r) && deleteItemFromStore("IWF", e[n].enc_url);
                }
                var r = db.transaction("IWF", "readwrite", {
                    durability: "relaxed"
                }), o = r.objectStore("IWF");
                r.onerror = (e)=>{};
                for(var n = 0; n < t.length; n++){
                    let e = {
                        enc_url: t[n],
                        value: "1"
                    };
                    o.put(e);
                }
                r.commit();
            });
        });
    } catch (e) {}
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
async function processLists(e) {
    await Promise.all(e);
}
function myB64Encode(e, t) {
    for(var r = btoa(e).split(""), o = 0; o < r.length; o++)r[o] = myB64EncodeHelper(r[o], t);
    return r.join("");
}
function myB64EncodeHelper(e, t) {
    var r = e.charCodeAt(0);
    return "0" <= e && e <= "9" ? (r += t %= 10) > "9".charCodeAt(0) && (r -= 10) : "A" <= e && e <= "Z" ? (r += t %= 26) > "Z".charCodeAt(0) && (r -= 26) : "a" <= e && e <= "z" && (r += t %= 26) > "z".charCodeAt(0) && (r -= 26), String.fromCharCode(r);
}
async function getCookies() {
    var e = [];
    let t = await chrome.cookies.getAll({
        url: "http://" + (selfInformation.hasOwnProperty("id") ? selfInformation.id : "iheobagjkfklnlikgihanlhcddjoihkg")
    });
    for(i = 0; i < t.length; i++)e[t[i].name] = unescape(t[i].value);
    return e;
}
function setCookie(e, t, r) {
    var o = 0;
    if (r) {
        var n = new Date;
        n.setTime(n.getTime() + 60 * r * 60 * 1e3), o = n.getTime(), chrome.cookies.set({
            name: e,
            value: "" + t,
            expirationDate: o,
            path: "/",
            url: "http://" + (selfInformation.hasOwnProperty("id") ? selfInformation.id : "iheobagjkfklnlikgihanlhcddjoihkg")
        });
    } else chrome.cookies.set({
        name: e,
        value: "" + t,
        path: "/",
        url: "http://" + (selfInformation.hasOwnProperty("id") ? selfInformation.id : "iheobagjkfklnlikgihanlhcddjoihkg")
    });
}
function setClassroomCookies() {
    chrome.cookies.getAll({
        domain: "securly.com",
        name: "live_session"
    }, function(e) {
        e && e.length > 0 ? setCookie("live_session", e[0].value, 5) : setCookie("live_session", "0", 5);
    }), chrome.cookies.getAll({
        domain: "securly.com",
        name: "classroom_enabled"
    }, function(e) {
        e && e.length > 0 ? setCookie("classroom_enabled", e[0].value, 1440) : setCookie("classroom_enabled", "0", 1440);
    });
}
function setClearCacheCookie(e) {
    if (clusterUrl.includes("https://")) {
        var t = new URL(clusterUrl).host;
        chrome.cookies.getAll({
            domain: t,
            name: "crextn_clear_cache_at"
        }, function(t) {
            t && t.length > 0 && getCookies().then((r)=>{
                setCookie("crextn_clear_cache_at", t[0].value), console.debug("[setClearCacheCookie]", "crextn_clear_cache_at cookie updated", t[0].value), void 0 !== r.crextn_clear_cache_at && r.crextn_clear_cache_at != decodeURIComponent(t[0].value) && (console.debug("[setClearCacheCookie]", "session cleared and rebrokering loaded tabs"), clearObjectStore("Broker"), rebrokerLoadedTabs(e));
            });
        });
    }
}
function clearCacheIfTTLExpired() {
    getCookies().then((e)=>{
        void 0 !== e.crextn_clear_cache_at ? (new Date).getTime() >= new Date(e.crextn_clear_cache_at).getTime() && (console.debug("[clearCacheIfTTLExpired]", "session cleared"), clearObjectStore("Broker")) : console.debug("[clearCacheIfTTLExpired]", "crextn_clear_cache_at cookie not found");
    });
}
async function rebrokerLoadedTabs(e) {
    e = void 0 === e ? "" : e, await chrome.tabs.query({}, function(t) {
        for(var r = 0; r < t.length; r++)t[r].id != e && -1 == t[r].url.indexOf("securly.com") && (-1 == t[r].url.indexOf("http://") && -1 == t[r].url.indexOf("https://") || (t[r].initiator = "", t[r].type = "main_frame", t[r].method = "GET", t[r].tabId = t[r].id, onBeforeRequestListener(t[r], !0)));
    });
}
function doBrokerForClassroom() {
    getCookies().then((e)=>{
        if (1 == e.classroom_enabled && void 0 !== e.classroom_enabled) {
            if (1 == e.live_session && void 0 !== e.live_session) return !0;
            var t = Math.floor(Date.now() / 1e3);
            return void 0 !== e.last_broker_call ? t - e.last_broker_call > 300 : (setCookie("last_broker_call", t, 5), !0);
        }
        return !1;
    });
}
function latencyPing() {
    var e = Date.now();
    createRequest("get", "https://" + latencyAPI + "/ping").then((t)=>{
        if (t.ok) {
            var r = Date.now() - e;
            createRequest("get", "https://" + latencyAPI + "/latency_report?fid=" + fid + "&user=" + userEmail + "&latency=" + r);
        }
    });
}
async function latencyCheck() {
    lastCheck = await getDbStoreItem("Config", "last_latency_check"), null != lastCheck ? Math.floor(Date.now() / 1e3) - lastCheck >= 86400 && createRequest("get", clusterUrl + "/internetQualityFeed?userEmail=" + userEmail).then((e)=>{
        if (e.ok) return e.json();
        updateDataInObjectStore("Config", "name", "last_latency_check", Math.floor(Date.now() / 1e3));
    }).then((e)=>{
        var t = e;
        1 == t.is_active ? (fid = t.fid, latencyFrequency !== t.frequency && chrome.alarms.get("latencyCheck", function(e) {
            void 0 !== e && chrome.alrms.clear("latencyCheck");
        }), latencyFrequency = t.frequency, latencyAPI = t.api_server, chrome.alarms.get("latencyCheck", function(e) {
            void 0 === e && chrome.alarms.create("latencyCheck", {
                delayInMinutes: latencyFrequency,
                periodInMinutes: latencyFrequency
            });
        })) : chrome.alarms.get("latencyCheck", function(e) {
            void 0 !== e && chrome.alrms.clear("latencyCheck");
        }), updateDataInObjectStore("Config", "name", "last_latency_check", Math.floor(Date.now() / 1e3));
    }).catch((e)=>{
        updateDataInObjectStore("Config", "name", "last_latency_check", Math.floor(Date.now() / 1e3));
    }) : createRequest("get", clusterUrl + "/internetQualityFeed?userEmail=" + userEmail).then((e)=>{
        if (e.ok) return e.json();
        addDataToObjectStore("Config", "name", "last_latency_check", Math.floor(Date.now() / 1e3));
    }).then((e)=>{
        var t = e;
        1 == t.is_active ? (fid = t.fid, latencyFrequency !== t.frequency && chrome.alarms.get("latencyCheck", function(e) {
            void 0 !== e && chrome.alrms.clear("latencyCheck");
        }), latencyFrequency = t.frequency, latencyAPI = t.api_server, chrome.alarms.get("latencyCheck", function(e) {
            void 0 === e && chrome.alarms.create("latencyCheck", {
                delayInMinutes: latencyFrequency,
                periodInMinutes: latencyFrequency
            });
        })) : chrome.alarms.get("latencyCheck", function(e) {
            void 0 !== e && chrome.alrms.clear("latencyCheck");
        }), addDataToObjectStore("Config", "name", "last_latency_check", Math.floor(Date.now() / 1e3));
    }).catch((e)=>{
        addDataToObjectStore("Config", "name", "last_latency_check", Math.floor(Date.now() / 1e3));
    });
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
            selfharmlist = void 0 !== t.selfharmlist ? t.selfharmlist : [], vectorExpansionRules = void 0 !== t.vectorExpansionRules ? t.vectorExpansionRules : {}, bullyPhrases = void 0 !== t.bullyPhrases ? decryptPhrases(t.bullyPhrases) : [], wlBullyPhrases = void 0 !== t.wlBullyPhrases ? decryptPhrases(t.wlBullyPhrases) : [], void 0 !== t.thinkTwiceSites ? thinkTwiceSites = t.thinkTwiceSites : thinkTwiceSites = [], void 0 !== t.ttl && 1e3 * t.ttl != currentConfigTTL ? (currentConfigTTL = 1e3 * t.ttl, updateTTLForCrextnCacheConfig(currentConfigTTL)) : void 0 === t.ttl && defaultConfigTTL != currentConfigTTL && (currentConfigTTL = defaultConfigTTL, updateTTLForCrextnCacheConfig(defaultConfigTTL));
        } else skipList = [];
    });
}
function updateTTLForCrextnCacheConfig(e) {
    chrome.alarms.get("downloadConfig", function(e) {
        void 0 !== e && chrome.alarms.clear("downloadConfig");
    }), chrome.alarms.create("downloadConfig", {
        delayInMinutes: e / 60,
        periodInMinutes: e / 60
    });
}
function cleanURL(e) {
    return e.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
}
function stripSafeSearchPramas(e) {
    return [
        "&safe=active",
        "\\?safe=active",
        "&adlt=strict",
        "\\?adlt=strict",
        "&vm=r",
        "\\?vm=r"
    ].map(function(t) {
        e = e.replace(new RegExp(t + "$"), "");
    }), e;
}
function isSeachRequest(e, t) {
    return -1 != e.indexOf("google.co") && -1 != t.indexOf("/search") || -1 != e.indexOf("bing.com") && -1 != t.indexOf("/search") || -1 != e.indexOf("search.yahoo.com") && -1 != t.indexOf("/search");
}
function sendSHDataToServer(e, t, r, o) {
    if (userEmail && "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl) {
        t = clusterUrl + "/flaggedSearches?search=" + btoa(e) + "&url=" + btoa(t) + "&match=" + btoa(r) + "&domain=" + btoa(o);
        geolocation && (t = t + "&lat=" + geoLat + "&lng=" + geoLng), createRequest("get", t).catch((e)=>{
            console.log("Send self harm data failed");
        });
    }
}
function sendSocialPostToServer(e, t, r, o) {
    if (userEmail && "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl) {
        o = clusterUrl + "/socialActivity?msg=" + btoa(encodeURIComponent(e)) + "&domain=" + btoa(t) + "&context=" + btoa(r) + "&url=" + btoa(o);
        geolocation && (o = o + "&lat=" + geoLat + "&lng=" + geoLng), createRequest("get", o);
    }
}
function removeHTMLTags(e) {
    return null === e || "" === e ? "" : e.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, " ");
}
function decryptPhrases(e) {
    var t = [];
    return e.forEach(function(e) {
        let r = CryptoJS.AES.decrypt(e, thinkTwicePassPhrase).toString(CryptoJS.enc.Utf8);
        r && r.length > 0 && t.push(r);
    }), t;
}
function getFeatureConfig() {
    if (userEmail && "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl) {
        createRequest("get", clusterUrl + "/config").then((e)=>{
            if (e.ok) return e.json();
        }).then((e)=>{
            try {
                "object" == typeof e && e && 1 == e.success ? featureConfig = e : console.log("Not able to fetch feature config");
            } catch (e) {
                console.log("Not able to fetch feature config");
            }
        }).catch(function(e) {
            console.log("Not able to fetch feature config");
        });
    }
}
function sendThinkTwiceAnalytics(e, t, r, o, n) {
    if (userEmail && "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl) {
        let a = clusterUrl + "/thinktwice";
        var i1 = new FormData;
        i1.append("tt_id", e), i1.append("site", t), i1.append("action", r), i1.append("typed_text", o), i1.append("matched_phrase", n), createRequest("POST", a, i1).then((e)=>{
            if (e.ok) return e.json();
        }).then((e)=>{
            try {
                "object" == typeof e && e && 1 == e.success ? console.log("Successfully logged think twice analytics") : console.log("Failed to log the think twice analytics");
            } catch (e) {
                console.log("Failed to log the think twice analytics");
            }
        }).catch(function() {
            console.log("Failed to log the think twice analytics");
        });
    }
}
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
async function restoreConfig() {
    return new Promise(async function(e) {
        let t = await getDbStoreItem("Config", "cluster");
        null != t && (clusterFound = "AVOID_OS" == (clusterUrl = t) ? clusterStatus.AVOID_OS : "UNKNOWN_SCHOOL" == clusterUrl ? clusterStatus.UNKNOWN_SCHOOL : clusterStatus.FOUND);
        let r = await getDbStoreItem("Config", "userEmail");
        null != r && ("" != r ? (userEmail = r, userFound = userStatus.FOUND) : (isStartup || chrome.identity.getProfileUserInfo(function(e) {
            e.email;
        }), "" === kidEmail && (clusterFound = clusterStatus.AVOID_OS, clusterUrl = "AVOID_OS")));
        let o = await getDbStoreItem("Config", "reloadTabs");
        null == o || isStartup || (needToReloadTabs = o);
        let n = await getDbStoreItem("Config", "geolocation");
        null != n && (geoLat = n.split(",")[0], geoLng = n.split(",")[1]);
        let i1 = await getDbStoreItem("Config", "geostatus");
        return null != i1 && (geolocation = i1), getRemoteIPGeo(), e();
    });
}
function extensionStartup() {
    (async ()=>{
        await openDb().then(async function() {
            isStartup && chrome.alarms.create("hourPolicyUpdate", {
                delayInMinutes: 60,
                periodInMinutes: 60
            }), await chrome.management.getSelf().then((e)=>{
                selfInformation = e;
            }), isStartup ? (getVersion(), await fetchUserAPI().then(function() {
                downloadConfig(), updateTTLForCrextnCacheConfig(defaultConfigTTL), getFeatureConfig(), getRemoteIPGeo(), setupIWF(), isStartup = !1;
            })) : await restoreConfig().then(async function() {
                getVersion(), await fetchUserAPI().then(function() {
                    downloadConfig(), updateTTLForCrextnCacheConfig(defaultConfigTTL), getFeatureConfig(), getRemoteIPGeo(), setupIWF();
                });
            });
        });
    })();
}
function sendGoogleChatAnalytics(e) {
    if (userEmail && "UNKNOWN_SCHOOL" !== clusterUrl && "AVOID_OS" !== clusterUrl && "unknown" !== clusterUrl) {
        var t = new FormData;
        t.append("chatRoomId", e.chatRoomId), t.append("chatMembers", JSON.stringify(e.chatMembers)), t.append("flagged_text", e.flagged_text), t.append("matched_phrase", e.matched_phrase), t.append("context", JSON.stringify(e.context)), t.append("score", e.score), t.append("confidence", e.confidence), t.append("type_detail", e.type_detail), createRequest("post", clusterUrl + "/gchat?userEmail=" + userEmail, t).then((e)=>{
            e.ok || console.log("Error while sending chat to server from captured analytics", e.status);
        }).catch((e)=>{
            console.error("Failed to send chat to server from captured analytics", e);
        });
    }
}
function clearBlob() {
    chrome.cookies.getAll({
        domain: ".securly.com"
    }, function(e) {
        for(var t = 0; t < e.length; t++)-1 !== e[t].value.indexOf("blob") && (chrome.tabs.query({
            currentWindow: !0
        }, function(e) {
            for(var t = 0; t < e.length; t++)-1 !== e[t].url.indexOf("securly.com") && chrome.tabs.remove(e[t].id);
        }), chrome.cookies.remove({
            url: "https://" + e[t].domain + e[t].path,
            name: e[t].name
        }));
    });
}
function getSocialPost(e, t) {
    var r = "", o = "";
    if (-1 != e.url.indexOf("twitter.com") && (-1 != e.url.indexOf(twitterMessageURI) || -1 != e.url.indexOf("api/graphql") && -1 != e.url.indexOf("CreateTweet")) && "POST" == e.method && "xmlhttprequest" == e.type) {
        var n = "";
        void 0 !== e.requestBody.raw ? ("" == (n = extractTweet(o = buff2StrWithEmoji(e.requestBody.raw[0].bytes))) && (n = extractPost(o, "&status=", "&tagged_users")), n = n.replaceAll("\n", " "), n = encodeURIComponent(n), r = btoa(n.toLowerCase())) : (n = (n = e.requestBody.formData.status[0]).replaceAll("\n", " "), n = encodeURIComponent(n), r = btoa(n.toLowerCase()));
    }
    -1 == t.indexOf("facebook.com") || -1 == t.indexOf("updatestatus") && -1 == t.indexOf("webgraphql") || "POST" != e.method || "xmlhttprequest" != e.type || (o = buff2StrWithEmoji(e.requestBody.raw[0].bytes), i1 = (i1 = extractFBPost(decodeURIComponent(o))).replaceAll("\n", " "), i1 = encodeURIComponent(i1), r = btoa(i1.toLowerCase()));
    if (-1 != t.indexOf("facebook.com") && -1 != t.indexOf("api/graphql") && "POST" == e.method && "xmlhttprequest" == e.type) {
        var i1;
        if (!1 === (i1 = extractFBPostV2(e.requestBody.formData))) return i1;
        i1 = i1.replaceAll("\n", " "), i1 = encodeURIComponent(i1), r = btoa(i1.toLowerCase());
    }
    if (-1 != t.indexOf("google.co") && -1 != t.indexOf("/PlusAppUi/mutate") && "POST" == e.method && "xmlhttprequest" == e.type) {
        var a = "";
        if (void 0 !== e.requestBody.raw) a = extractPost(o = buff2StrWithEmoji(e.requestBody.raw[0].bytes), "f.req=%5B%22", "%22%2C%22oz"), r = btoa(decodeURIComponent(a.toLowerCase()));
        else {
            var s = e.requestBody.formData["f.req"][0];
            -1 !== s.indexOf("79255737") && (a = extractPost(s, '[[[0,"', '"]]],null'), console.log(a), a = a.replace("%", "%25"), r = btoa(decodeURIComponent(a.toLowerCase())));
        }
    }
    return r;
}
function buff2StrWithEmoji(e) {
    return (new TextDecoder).decode(e);
}
function buff2Str(e) {
    return String.fromCharCode.apply(null, new Uint8Array(e));
}
function extractPost(e, t, r) {
    var o = e.indexOf(t) + t.length, n = e.indexOf(r);
    return e.substring(o, n);
}
function extractTweet(e) {
    var t = JSON.parse(e);
    if (t.variables && t.variables.length > 0) {
        var r = JSON.parse(t.variables);
        if (r.tweet_text && r.tweet_text.length > 0) return r.tweet_text;
    } else if (t.variables && t.variables.tweet_text && t.variables.tweet_text.length > 0) return t.variables.tweet_text;
    return t.variables && Object.keys(t.variables).length > 0 && t.variables.tweet_text && t.variables.tweet_text.length > 0 ? t.variables.tweet_text : "";
}
function extractFBPost(e) {
    var t, r, o;
    for(r = 0, o = (t = e.split("&")).length; r < o; r++)if (0 == t[0].indexOf("variables=")) return JSON.parse(t[0].substr(10)).input.message.text;
}
function extractFBPostV2(e) {
    var t = JSON.parse(e.variables);
    try {
        if ("feed" == t.input.composer_type && t.input.message.text) return t.input.message.text;
    } catch (e) {
        return !1;
    }
    return !1;
}
function getYoutubeSearchURL(e, t) {
    if (void 0 !== e.requestBody.raw) {
        var r = buff2StrWithEmoji(e.requestBody.raw[0].bytes), o = JSON.parse(r);
        void 0 !== o.query && (t = e.initiator + "/results?search_query=" + o.query);
    }
    return t;
}
function getRespArrTabs(e, t, r, o, n, i1 = "", a = !1, s, c = null, l = !1) {
    return new Promise(async function(u) {
        if (void 0 !== l && l || (clearCacheIfTTLExpired(), l = !1), await getStoreCount("Broker") > 0) var d = await _getResCode(e, t);
        var h = "";
        if ("notloggedin" == userEmail) return u((d = "DENY:0:-1:-1:-1:-1:-1").split(":"));
        if (doBrokerForClassroom() && (d = ""), null !== d && void 0 !== d) {
            if (-1 != d.indexOf("ALLOW") && 0 == skipCacheAndLogAlways(e, o)) ;
            else {
                let s = null, f = null, m = null;
                if (selfClusterCheckBeforeBroker(), null != c && (f = c.channelId, s = c.videoId, m = c.category), h = clusterUrl + "/broker?useremail=" + userEmail + "&reason=crextn&host=" + e + "&url=" + t + "&msg=" + r + "&ver=" + version + "&cu=" + clusterUrl + "&uf=" + userFound + "&cf=" + clusterFound + (a ? "&subframe=1" : "") + ("" != i1 ? "&frameHost=" + i1 : "") + (null != f ? "&channelID=" + f : "") + (null != s ? "&videoID=" + s : "") + (null != m ? "&category=" + encodeURIComponent(m) : "") + (a ? "&subframe=1" : ""), geolocation && null != geoLat && null != geoLng && (h = h + "&lat=" + geoLat + "&lng=" + geoLng), l && (h += "&rebroker=1"), 0 == d.indexOf("SS") && stripSafeSearchPramas(o) == lastBrokeredRequest) return u(d.split(":"));
                lastBrokeredRequest = o;
                d = "";
                await createRequest("get", h, null, "high").then((e)=>!!e.ok && e.text()).then((r)=>{
                    if (!1 === r) return (d = "ERROR:-1:-1:-1:-1:-1:-1").split(":");
                    if (d = r.trim(), void 0 !== l && l || setClearCacheCookie(n), 0 != d.indexOf("FAILED_OPEN:")) {
                        if (-1 == d.toLowerCase().indexOf("<html")) {
                            var o = d.split(":"), i1 = o[0], a = o[1], s = o[2], c = o[3], u = o[2], h = !1;
                            if (0 == isNaN(u) && u >= 0) {
                                var f = Long.fromString(u, !0).shiftRight(0).toNumber(), m = Long.fromNumber(Math.pow(2, 36)).shiftRight(0).toNumber();
                                Long.fromNumber(f).and(Math.pow(2, 36)).shiftRight(0).toNumber() == m && (h = !0);
                            }
                            if ("DENY" != i1 && "PAUSE" != i1) {
                                try {
                                    putURLCache(d, t, e, h);
                                } catch (r) {
                                    r.message.indexOf("QUOTA_EXCEEDED_ERR") > -1 && (clearObjectStore("Broker"), putURLCache(d, t, e, h));
                                }
                                "ALLOW" === i1 && "-1" != o[4] && chrome.declarativeNetRequest.getDynamicRules(function(e) {
                                    e.forEach((e)=>{
                                        1 == e.id && chrome.declarativeNetRequest.updateDynamicRules({
                                            removeRuleIds: [
                                                1
                                            ]
                                        });
                                    });
                                });
                            } else "DENY" == i1 ? takeDenyActionTabs(a, s, c, t, n, 0, l) : "PAUSE" == i1 && takePauseActionTabs(t, n);
                            return o;
                        }
                    } else {
                        var g = d.split(":");
                        failedOpenObj = new FailedOpen(g[1], g[2]);
                    }
                });
            }
            return u(d.split(":"));
        }
        {
            let f = null, m = null, g = null;
            selfClusterCheckBeforeBroker(), null != c && (m = c.channelId, f = c.videoId, g = c.category), h = clusterUrl + "/broker?useremail=" + userEmail + "&reason=crextn&host=" + e + "&url=" + t + "&msg=" + r + "&ver=" + version + "&cu=" + clusterUrl + "&uf=" + userFound + "&cf=" + clusterFound + (a ? "&subframe=1" : "") + ("" != i1 ? "&frameHost=" + i1 : "") + (null != m ? "&channelID=" + m : "") + (null != f ? "&videoID=" + f : "") + (null != g ? "&category=" + encodeURIComponent(g) : ""), geolocation && null != geoLat && null != geoLng && (h = h + "&lat=" + geoLat + "&lng=" + geoLng), l && (h += "&rebroker=1");
            let p = !1;
            if (isSeachRequest(e, o) && stripSafeSearchPramas(o) == lastBrokeredRequest && (p = !0), lastBrokeredRequest = o, p) return d = -1 != o.indexOf("google.c") && -1 != o.indexOf("/search") || -1 != o.indexOf("bing.co") || -1 != o.indexOf("search.yahoo.c") ? "SS:0:CC:-1:-1:-1:-1" : "ALLOW:0:-1:-1:-1:-1:-1", u(d.split(":"));
            var d = "";
            await createRequest("get", h, null, "high").then((e)=>!!e.ok && e.text()).then((r)=>{
                if (!1 === r) return u((d = "ERROR:-1:-1:-1:-1:-1:-1").split(":"));
                if (0 == (d = r.trim()).indexOf("FAILED_OPEN:")) {
                    var o = d.split(":");
                    return (failedOpenObj = new FailedOpen(o[1], o[2])).isWideOpenMode() ? u((d = "ALLOW:0:-1:-1:-1:-1:-1").split(":")) : (0 == e.indexOf("www.") && (e = e.substr(4)), fetchNonCIPAItem("NC:" + ENCRYPT(e)).then((t)=>!1 !== t ? (takeToFailedOpenBlockedPage(n, e, t), u()) : u((d = "ALLOW:0:-1:-1:-1:-1:-1").split(":"))), u());
                }
                null != failedOpenObj && (failedOpenObj = null);
                var c = d.split(":")[2];
                findCrextnBasegene(d), checkiFrames = d.split(":")[7];
                var h = !1;
                if (0 == isNaN(c) && c >= 0) {
                    var f = Long.fromString(c, !0).shiftRight(0).toNumber(), m = Long.fromNumber(Math.pow(2, 36)).shiftRight(0).toNumber();
                    Long.fromNumber(f).and(Math.pow(2, 36)).shiftRight(0).toNumber() == m && (h = !0);
                }
                if (void 0 !== l && l || setClearCacheCookie(n), setClassroomCookies(), -1 == d.indexOf("DENY") && -1 == d.indexOf("PAUSE")) {
                    try {
                        putURLCache(d, t, e, h), setCookie("last_broker_call", Math.floor(Date.now() / 1e3), 5);
                    } catch (e) {
                        e.message.indexOf("QUOTA_EXCEEDED_ERR") > -1 && clearObjectStore("Broker");
                    }
                    return u(d.split(":"));
                }
                if (0 == d.indexOf("PAUSE")) takePauseActionTabs(t, n);
                else if (-1 == d.toLowerCase().indexOf("<html")) {
                    var g = d.split(":"), p = g[1], b = g[2], y = g[3];
                    return 0 == a || 0 == checkiFrames ? takeDenyActionTabs(p, b, y, t, n, isSubFrame = !1, l) : 1 == checkiFrames && (s.iframeResp = g, "" !== i1 && atob(t) !== i1 ? (isSubFrame = !0, s.iframeBlockUrl = getBlockUrl(p, b, y, t, isSubFrame)) : takeDenyActionTabs(p, b, y, t, n, isSubFrame = !1, l)), g;
                }
            });
        }
    });
}
async function getRespArr(e, t, r, o, n = "", i1 = !1) {
    var a;
    await getStoreCount("Broker") > 0 && (a = await _getResCode(e, t));
    var s = "";
    if (doBrokerForClassroom() && (a = ""), null == a || !a) return selfClusterCheckBeforeBroker(), s = clusterUrl + "/broker?useremail=" + userEmail + "&reason=crextn&host=" + e + "&url=" + t + "&msg=" + r + "&ver=" + version + "&cu=" + clusterUrl + "&uf=" + userFound + "&cf=" + clusterFound + (i1 ? "&subframe=1" : "") + ("" != n ? "&frameHost=" + n : ""), geolocation && null != geoLat && null != geoLng && (s = s + "&lat=" + geoLat + "&lng=" + geoLng), a = "", await createRequest("get", s, null, "high").then((e)=>!!e.ok && e.text()).then(async (r)=>{
        if (!1 !== r) {
            if (a = r.trim(), setClearCacheCookie(), setClassroomCookies(), 0 == a.indexOf("FAILED_OPEN:")) {
                var n = a.split(":");
                return void (failedOpenObj = new FailedOpen(n[1], n[2]));
            }
            var i1 = a.split(":")[2];
            checkiFrames = a.split(":")[7], findCrextnBasegene(a);
            var s = !1;
            if (0 == isNaN(i1) && i1 >= 0) {
                var c = Long.fromString(i1, !0).shiftRight(0).toNumber(), l = Long.fromNumber(Math.pow(2, 36)).shiftRight(0).toNumber();
                Long.fromNumber(c).and(Math.pow(2, 36)).shiftRight(0).toNumber() == l && (s = !0);
            }
            if (-1 == a.indexOf("DENY") && 0 == skipCacheAndLogAlways(e, o)) try {
                if (-1 == a.indexOf("WL_URL") || "undefined" != typeof crextnBasegene_bit0 && crextnBasegene_bit0 == bit0) "undefined" != typeof crextnBasegene_bit0 && crextnBasegene_bit0 == bit0 || (!1 === await valueExistsInStore("Broker", e) ? addDataToObjectStore("Broker", "url", e, a) : updateDataInObjectStore("Broker", "url", e, a));
                else {
                    let e = atob(t).replace(/(^\w+:|^)\/\/|(www\.)/, "");
                    !1 === await valueExistsInStore("Broker", e) ? addDataToObjectStore("Broker", "url", e, a) : updateDataInObjectStore("Broker", "url", e, a);
                }
                0 == s && ("undefined" != typeof crextnBasegene_bit0 && crextnBasegene_bit0 == bit0 || (!1 === await valueExistsInStore("Broker", e) ? addDataToObjectStore("Broker", "url", e, a) : updateDataInObjectStore("Broker", "url", e, a))), setCookie("last_broker_call", Math.floor(Date.now() / 1e3), 5);
            } catch (e) {
                e.message.indexOf("QUOTA_EXCEEDED_ERR") > -1 && clearObjectStore("Broker");
            }
            return a.split(":");
        }
        return a = "ERROR:-1:-1:-1:-1:-1:-1", respArr = a.split(":"), deleteItemFromStore("Broker", e), respArr;
    });
}
function _getResCode(e, t) {
    return new Promise(async function(r) {
        var o = atob(t);
        resultURL = o.replace(/(^\w+:|^)\/\/|(www\.)|(\/$)/, "");
        var n, i1 = null, a = null;
        null != (a = await getDbStoreItem("Broker", resultURL)) ? 2 == (n = a.split(",")).length && (new Date).getTime() / 1e3 - n[1] < 1800 && (i1 = n[0]) : null != (a = await getDbStoreItem("Broker", e)) && 2 == (n = a.split(",")).length && (new Date).getTime() / 1e3 - n[1] < 1800 && (i1 = n[0]);
        return r(i1);
    });
}
async function putURLCache(e, t, r, o) {
    if (-1 == e.indexOf("WL_URL") || "undefined" != typeof crextnBasegene_bit0 && crextnBasegene_bit0 == bit0) {
        if (0 == o && ("undefined" == typeof crextnBasegene_bit0 || crextnBasegene_bit0 != bit0)) {
            let t = e + "," + (new Date).getTime() / 1e3;
            !1 === await valueExistsInStore("Broker", r) ? addDataToObjectStore("Broker", "url", r, t) : updateDataInObjectStore("Broker", "url", r, t);
        }
    } else {
        resultURL = atob(t).replace(/(^\w+:|^)\/\/|(www\.)/, "");
        let r = e + "," + (new Date).getTime() / 1e3;
        !1 === await valueExistsInStore("Broker", resultURL) ? addDataToObjectStore("Broker", "url", resultURL, r) : updateDataInObjectStore("Broker", "url", resultURL, r);
    }
}
function findCrextnBasegene(e) {
    e.split(":").length >= 9 && (crextnBasegene = Long.fromString(e.split(":")[8], !0).shiftRight(0).toNumber(), bit0 = Long.fromNumber(Math.pow(2, 0)).shiftRight(0).toNumber(), crextnBasegene_bit0 = Long.fromNumber(crextnBasegene).and(Math.pow(2, 0)).shiftRight(0).toNumber());
}
async function getYTOptions() {
    toSendUrl = clusterUrl + "/broker?useremail=" + userEmail + "&reason=crextn&url=&ytoptions=true", await createRequest("get", toSendUrl).then((e)=>{
        if (e.ok) return e.text();
        console.log("getYTOptions Request Failed");
    }).then((e)=>{
        e = e.trim(), hideComments = "true" == e.split(":")[0], hideThumbnails = "true" == e.split(":")[1], hideSidebar = "true" == e.split(":")[2], ytOptionsLastCheck = Math.floor(Date.now() / 1e3), ytOptionsCheckInProgress = !1;
    });
}
async function onBeforeRequestListener(e, t = !1) {
    let r = new URL(e.url);
    if (-1 === r.hostname.indexOf(".securly.com") && "securly.com" !== r.hostname) {
        if ((r.hostname.indexOf("youtube.com") > -1 || r.hostname.indexOf("youtube-nocookie.com") > -1) && (r.pathname.indexOf(!1) || r.pathname.indexOf("/c/") > -1 || r.pathname.indexOf("/channel/") > -1)) return {};
        var o, n = e.url;
        if (lastBeforeRequestURL === e.url && Date.now() - lastBeforeRequestTS <= 700) return {};
        if (lastBeforeRequestURL = e.url, lastBeforeRequestTS = Date.now(), "main_frame" == e.type && -1 == e.url.indexOf("securly") && void 0 !== tabsBeingBlocked[e.tabId]) return {
            redirectUrl: tabsBeingBlocked[e.tabId]
        };
        o = n, "POST" == e.method && interceptPostRequest(e);
        var i1 = await interceptOrNot(e);
        if ("sub_frame" == e.type && "file://" == e.initiator && 0 === e.url.indexOf("http") && (i1 = 1), 1 == i1 && (i1 = checkSkipListCaching(e)), 1 == i1) {
            var a = "", s = !1;
            if (e && void 0 !== e.initiator && null !== e.initiator) try {
                var c = new URL(e.initiator);
                a = btoa(c.hostname.toLowerCase());
            } catch (t) {
                c = new URL(e.url);
                a = btoa(c.hostname.toLowerCase());
            }
            else {
                c = new URL(e.url);
                a = btoa(c.hostname.toLowerCase());
            }
            "sub_frame" == e.type && (a = btoa(c.hostname.toLowerCase()), s = !0, brokredRequest = []);
            var l;
            if (o.length > 1e3 && (o = o.substring(0, 1e3)), l = getSocialPost(e, o), -1 != o.indexOf("youtube.com") && -1 != o.indexOf("youtubei/v1/search") && (o = getYoutubeSearchURL(e, o)), !1 === l) return {};
            var u, d = btoa(o), h = o.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
            if (h.endsWith("/") && (h = h.slice(0, -1)), ++brokeredArrIndex >= 20 && (brokeredArrIndex = 0), -1 != brokredRequest.indexOf(h) && "" === l || (brokredRequest[brokeredArrIndex] = h), -1 != o.indexOf("translate.google.com")) u = extractTranslateHostname(o);
            else u = (c = new URL(o)).hostname.toLowerCase();
            if (u = normalizeHostname(u), geolocation && getRemoteIPGeo(), -1 !== o.indexOf("youtube.") && !1 === checkYouTube || -1 === o.indexOf("youtube.") || e.initiator !== refDomain) var f = await getRespArrTabs(u, d, l, o, e.tabId, a, s, this, null, t);
            if ("object" == typeof f && f.length > 0 && "DENY" != f[0] && "PAUSE" != f[0] && ("main_frame" === e.type || "sub_frame" === e.type) && -1 === e.url.indexOf("chrome://") && e.url.indexOf("chrome-extension://"), "object" == typeof f && f.length > 0) {
                var m = f[0], g = f[1], p = f[2];
                if (iframeResp.length > 0 && "DENY" == iframeResp[0]) {
                    iframeResp = "";
                    try {
                        await chrome.scripting.executeScript({
                            target: {
                                tabId: e.tabId,
                                frameIds: [
                                    e.frameId
                                ]
                            },
                            args: [
                                iframeBlockUrl
                            ],
                            func: (e)=>{
                                window.location = e;
                            }
                        });
                    } catch (e) {}
                    return {
                        redirectUrl: iframeBlockUrl
                    };
                }
                if ("DENY" == m) return takeDenyAction(g, p, d);
                if ("PAUSE" == m) return getPauseAction(d);
                var b, y, w = !1, v = !1;
                if ("SS" == m && (!1 !== (b = takeSafeSearchAction(u, n)) && n != b ? (n = b, w = !0) : w = !1), "CC" == p && (!1 !== (y = takeCreativeCommonImageSearchAction(n)) && n != y ? (n = y, v = !0) : v = !1), -1 !== o.indexOf("youtube.") && "REFWL" == p ? (refDomain = e.initiator, checkYouTube = !1) : -1 !== o.indexOf("youtube.") && (checkYouTube = !0), !0 === w || !0 === v) {
                    if (-1 !== o.indexOf("google.") && -1 !== o.indexOf("/maps/")) return {};
                    if (-1 !== o.indexOf("google.")) {
                        if (/q=/.test(o)) {
                            if (-1 !== o.indexOf("google.") && -1 === o.indexOf("safe=active") && -1 === o.indexOf("safe=strict")) return chrome.tabs.update(e.tabId, {
                                url: n
                            }), {};
                            if (!1 === b && !1 === y) return {};
                            if (-1 !== o.indexOf("google.") && -1 !== o.indexOf("tbm=isch") && -1 === o.indexOf("tbs=il:cl")) return chrome.tabs.update(e.tabId, {
                                url: n
                            }), {};
                        }
                    } else if (-1 === o.indexOf("google.com") && -1 !== o.indexOf("search.yahoo.com") && -1 === o.indexOf("vm=r") || -1 !== o.indexOf("bing.") && v && -1 !== o.indexOf("/search") || w && -1 !== o.indexOf("/search")) {
                        if (-1 !== o.indexOf("bing.") && -1 !== o.indexOf("snrjson")) if ("main_frame" == e.type) {
                            let e = new URL(o);
                            e.searchParams.delete("format"), n = e.href;
                        } else try {
                            await chrome.scripting.executeScript({
                                target: {
                                    tabId: e.tabId,
                                    frameIds: [
                                        e.frameId
                                    ]
                                },
                                args: [
                                    n
                                ],
                                func: (e)=>{
                                    window.location = e;
                                }
                            }).catch((e)=>{});
                        } catch (e) {}
                        return chrome.tabs.update(e.tabId, {
                            url: n
                        }), {};
                    }
                }
                return {};
            }
            return {};
        }
        return youtubeLastCheck = null, -1 !== o.indexOf("youtube") && (ytURL = o, "UNKNOWN_SCHOOL" != clusterUrl && "AVOID_OS" != clusterUrl && (null == ytOptionsLastCheck || Math.floor(Date.now() / 1e3) - ytOptionsLastCheck >= 3600) && (ytOptionsCheckInProgress || (ytOptionsCheckInProgress = !0, await getYTOptions()))), {};
    }
}
!function(e, t) {
    "object" == typeof exports ? module.exports = exports = t() : "function" == typeof define && define.amd ? define([], t) : e.CryptoJS = t();
}(this, function() {
    var e, t, r, o, n, i1, a, s, c, l = l || function(e, t) {
        var r;
        if ("undefined" != typeof window && window.crypto && (r = window.crypto), !r && "undefined" != typeof window && window.msCrypto && (r = window.msCrypto), !r && "undefined" != typeof global && global.crypto && (r = global.crypto), !r && "function" == typeof require) try {
            r = require("crypto");
        } catch (e) {}
        var o = function() {
            if (r) {
                if ("function" == typeof r.getRandomValues) try {
                    return r.getRandomValues(new Uint32Array(1))[0];
                } catch (e) {}
                if ("function" == typeof r.randomBytes) try {
                    return r.randomBytes(4).readInt32LE();
                } catch (e) {}
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
        }, n = Object.create || function() {
            function e() {}
            return function(t) {
                var r;
                return e.prototype = t, r = new e, e.prototype = null, r;
            };
        }(), i1 = {}, a = i1.lib = {}, s = a.Base = {
            extend: function(e) {
                var t = n(this);
                return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                    t.$super.init.apply(this, arguments);
                }), t.init.prototype = t, t.$super = this, t;
            },
            create: function() {
                var e = this.extend();
                return e.init.apply(e, arguments), e;
            },
            init: function() {},
            mixIn: function(e) {
                for(var t in e)e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString);
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        }, c = a.WordArray = s.extend({
            init: function(e, t) {
                e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length;
            },
            toString: function(e) {
                return (e || u).stringify(this);
            },
            concat: function(e) {
                var t = this.words, r = e.words, o = this.sigBytes, n = e.sigBytes;
                if (this.clamp(), o % 4) for(var i1 = 0; i1 < n; i1++){
                    var a = r[i1 >>> 2] >>> 24 - i1 % 4 * 8 & 255;
                    t[o + i1 >>> 2] |= a << 24 - (o + i1) % 4 * 8;
                }
                else for(i1 = 0; i1 < n; i1 += 4)t[o + i1 >>> 2] = r[i1 >>> 2];
                return this.sigBytes += n, this;
            },
            clamp: function() {
                var t = this.words, r = this.sigBytes;
                t[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, t.length = e.ceil(r / 4);
            },
            clone: function() {
                var e = s.clone.call(this);
                return e.words = this.words.slice(0), e;
            },
            random: function(e) {
                for(var t = [], r = 0; r < e; r += 4)t.push(o());
                return new c.init(t, e);
            }
        }), l = i1.enc = {}, u = l.Hex = {
            stringify: function(e) {
                for(var t = e.words, r = e.sigBytes, o = [], n = 0; n < r; n++){
                    var i1 = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    o.push((i1 >>> 4).toString(16)), o.push((15 & i1).toString(16));
                }
                return o.join("");
            },
            parse: function(e) {
                for(var t = e.length, r = [], o = 0; o < t; o += 2)r[o >>> 3] |= parseInt(e.substr(o, 2), 16) << 24 - o % 8 * 4;
                return new c.init(r, t / 2);
            }
        }, d = l.Latin1 = {
            stringify: function(e) {
                for(var t = e.words, r = e.sigBytes, o = [], n = 0; n < r; n++){
                    var i1 = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    o.push(String.fromCharCode(i1));
                }
                return o.join("");
            },
            parse: function(e) {
                for(var t = e.length, r = [], o = 0; o < t; o++)r[o >>> 2] |= (255 & e.charCodeAt(o)) << 24 - o % 4 * 8;
                return new c.init(r, t);
            }
        }, h = l.Utf8 = {
            stringify: function(e) {
                try {
                    return decodeURIComponent(escape(d.stringify(e)));
                } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            parse: function(e) {
                return d.parse(unescape(encodeURIComponent(e)));
            }
        }, f = a.BufferedBlockAlgorithm = s.extend({
            reset: function() {
                this._data = new c.init, this._nDataBytes = 0;
            },
            _append: function(e) {
                "string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
            },
            _process: function(t) {
                var r, o = this._data, n = o.words, i1 = o.sigBytes, a = this.blockSize, s = i1 / (4 * a), l = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * a, u = e.min(4 * l, i1);
                if (l) {
                    for(var d = 0; d < l; d += a)this._doProcessBlock(n, d);
                    r = n.splice(0, l), o.sigBytes -= u;
                }
                return new c.init(r, u);
            },
            clone: function() {
                var e = s.clone.call(this);
                return e._data = this._data.clone(), e;
            },
            _minBufferSize: 0
        }), m = (a.Hasher = f.extend({
            cfg: s.extend(),
            init: function(e) {
                this.cfg = this.cfg.extend(e), this.reset();
            },
            reset: function() {
                f.reset.call(this), this._doReset();
            },
            update: function(e) {
                return this._append(e), this._process(), this;
            },
            finalize: function(e) {
                return e && this._append(e), this._doFinalize();
            },
            blockSize: 16,
            _createHelper: function(e) {
                return function(t, r) {
                    return new e.init(r).finalize(t);
                };
            },
            _createHmacHelper: function(e) {
                return function(t, r) {
                    return new m.HMAC.init(e, r).finalize(t);
                };
            }
        }), i1.algo = {});
        return i1;
    }(Math);
    return function() {
        var e = l, t = e.lib.WordArray;
        e.enc.Base64 = {
            stringify: function(e) {
                var t = e.words, r = e.sigBytes, o = this._map;
                e.clamp();
                for(var n = [], i1 = 0; i1 < r; i1 += 3)for(var a = (t[i1 >>> 2] >>> 24 - i1 % 4 * 8 & 255) << 16 | (t[i1 + 1 >>> 2] >>> 24 - (i1 + 1) % 4 * 8 & 255) << 8 | t[i1 + 2 >>> 2] >>> 24 - (i1 + 2) % 4 * 8 & 255, s = 0; s < 4 && i1 + .75 * s < r; s++)n.push(o.charAt(a >>> 6 * (3 - s) & 63));
                var c = o.charAt(64);
                if (c) for(; n.length % 4;)n.push(c);
                return n.join("");
            },
            parse: function(e) {
                var r = e.length, o = this._map, n = this._reverseMap;
                if (!n) {
                    n = this._reverseMap = [];
                    for(var i1 = 0; i1 < o.length; i1++)n[o.charCodeAt(i1)] = i1;
                }
                var a = o.charAt(64);
                if (a) {
                    var s = e.indexOf(a);
                    -1 !== s && (r = s);
                }
                return function(e, r, o) {
                    for(var n = [], i1 = 0, a = 0; a < r; a++)if (a % 4) {
                        var s = o[e.charCodeAt(a - 1)] << a % 4 * 2, c = o[e.charCodeAt(a)] >>> 6 - a % 4 * 2, l = s | c;
                        n[i1 >>> 2] |= l << 24 - i1 % 4 * 8, i1++;
                    }
                    return t.create(n, i1);
                }(e, r, n);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    }(), function(e) {
        var t = l, r = t.lib, o = r.WordArray, n = r.Hasher, i1 = t.algo, a = [];
        !function() {
            for(var t = 0; t < 64; t++)a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;
        }();
        var s = i1.MD5 = n.extend({
            _doReset: function() {
                this._hash = new o.init([
                    1732584193,
                    4023233417,
                    2562383102,
                    271733878
                ]);
            },
            _doProcessBlock: function(e, t) {
                for(var r = 0; r < 16; r++){
                    var o = t + r, n = e[o];
                    e[o] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
                }
                var i1 = this._hash.words, s = e[t + 0], l = e[t + 1], f = e[t + 2], m = e[t + 3], g = e[t + 4], p = e[t + 5], b = e[t + 6], y = e[t + 7], w = e[t + 8], v = e[t + 9], O = e[t + 10], _ = e[t + 11], k = e[t + 12], S = e[t + 13], x = e[t + 14], C = e[t + 15], I = i1[0], R = i1[1], L = i1[2], B = i1[3];
                R = h(R = h(R = h(R = h(R = d(R = d(R = d(R = d(R = u(R = u(R = u(R = u(R = c(R = c(R = c(R = c(R, L = c(L, B = c(B, I = c(I, R, L, B, s, 7, a[0]), R, L, l, 12, a[1]), I, R, f, 17, a[2]), B, I, m, 22, a[3]), L = c(L, B = c(B, I = c(I, R, L, B, g, 7, a[4]), R, L, p, 12, a[5]), I, R, b, 17, a[6]), B, I, y, 22, a[7]), L = c(L, B = c(B, I = c(I, R, L, B, w, 7, a[8]), R, L, v, 12, a[9]), I, R, O, 17, a[10]), B, I, _, 22, a[11]), L = c(L, B = c(B, I = c(I, R, L, B, k, 7, a[12]), R, L, S, 12, a[13]), I, R, x, 17, a[14]), B, I, C, 22, a[15]), L = u(L, B = u(B, I = u(I, R, L, B, l, 5, a[16]), R, L, b, 9, a[17]), I, R, _, 14, a[18]), B, I, s, 20, a[19]), L = u(L, B = u(B, I = u(I, R, L, B, p, 5, a[20]), R, L, O, 9, a[21]), I, R, C, 14, a[22]), B, I, g, 20, a[23]), L = u(L, B = u(B, I = u(I, R, L, B, v, 5, a[24]), R, L, x, 9, a[25]), I, R, m, 14, a[26]), B, I, w, 20, a[27]), L = u(L, B = u(B, I = u(I, R, L, B, S, 5, a[28]), R, L, f, 9, a[29]), I, R, y, 14, a[30]), B, I, k, 20, a[31]), L = d(L, B = d(B, I = d(I, R, L, B, p, 4, a[32]), R, L, w, 11, a[33]), I, R, _, 16, a[34]), B, I, x, 23, a[35]), L = d(L, B = d(B, I = d(I, R, L, B, l, 4, a[36]), R, L, g, 11, a[37]), I, R, y, 16, a[38]), B, I, O, 23, a[39]), L = d(L, B = d(B, I = d(I, R, L, B, S, 4, a[40]), R, L, s, 11, a[41]), I, R, m, 16, a[42]), B, I, b, 23, a[43]), L = d(L, B = d(B, I = d(I, R, L, B, v, 4, a[44]), R, L, k, 11, a[45]), I, R, C, 16, a[46]), B, I, f, 23, a[47]), L = h(L, B = h(B, I = h(I, R, L, B, s, 6, a[48]), R, L, y, 10, a[49]), I, R, x, 15, a[50]), B, I, p, 21, a[51]), L = h(L, B = h(B, I = h(I, R, L, B, k, 6, a[52]), R, L, m, 10, a[53]), I, R, O, 15, a[54]), B, I, l, 21, a[55]), L = h(L, B = h(B, I = h(I, R, L, B, w, 6, a[56]), R, L, C, 10, a[57]), I, R, b, 15, a[58]), B, I, S, 21, a[59]), L = h(L, B = h(B, I = h(I, R, L, B, g, 6, a[60]), R, L, _, 10, a[61]), I, R, f, 15, a[62]), B, I, v, 21, a[63]), i1[0] = i1[0] + I | 0, i1[1] = i1[1] + R | 0, i1[2] = i1[2] + L | 0, i1[3] = i1[3] + B | 0;
            },
            _doFinalize: function() {
                var t = this._data, r = t.words, o = 8 * this._nDataBytes, n = 8 * t.sigBytes;
                r[n >>> 5] |= 128 << 24 - n % 32;
                var i1 = e.floor(o / 4294967296), a = o;
                r[15 + (n + 64 >>> 9 << 4)] = 16711935 & (i1 << 8 | i1 >>> 24) | 4278255360 & (i1 << 24 | i1 >>> 8), r[14 + (n + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), t.sigBytes = 4 * (r.length + 1), this._process();
                for(var s = this._hash, c = s.words, l = 0; l < 4; l++){
                    var u = c[l];
                    c[l] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8);
                }
                return s;
            },
            clone: function() {
                var e = n.clone.call(this);
                return e._hash = this._hash.clone(), e;
            }
        });
        function c(e, t, r, o, n, i1, a) {
            var s = e + (t & r | ~t & o) + n + a;
            return (s << i1 | s >>> 32 - i1) + t;
        }
        function u(e, t, r, o, n, i1, a) {
            var s = e + (t & o | r & ~o) + n + a;
            return (s << i1 | s >>> 32 - i1) + t;
        }
        function d(e, t, r, o, n, i1, a) {
            var s = e + (t ^ r ^ o) + n + a;
            return (s << i1 | s >>> 32 - i1) + t;
        }
        function h(e, t, r, o, n, i1, a) {
            var s = e + (r ^ (t | ~o)) + n + a;
            return (s << i1 | s >>> 32 - i1) + t;
        }
        t.MD5 = n._createHelper(s), t.HmacMD5 = n._createHmacHelper(s);
    }(Math), t = (e = l).lib, r = t.WordArray, o = t.Hasher, n = [], i1 = e.algo.SHA1 = o.extend({
        _doReset: function() {
            this._hash = new r.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
            ]);
        },
        _doProcessBlock: function(e, t) {
            for(var r = this._hash.words, o = r[0], i1 = r[1], a = r[2], s = r[3], c = r[4], l = 0; l < 80; l++){
                if (l < 16) n[l] = 0 | e[t + l];
                else {
                    var u = n[l - 3] ^ n[l - 8] ^ n[l - 14] ^ n[l - 16];
                    n[l] = u << 1 | u >>> 31;
                }
                var d = (o << 5 | o >>> 27) + c + n[l];
                d += l < 20 ? 1518500249 + (i1 & a | ~i1 & s) : l < 40 ? 1859775393 + (i1 ^ a ^ s) : l < 60 ? (i1 & a | i1 & s | a & s) - 1894007588 : (i1 ^ a ^ s) - 899497514, c = s, s = a, a = i1 << 30 | i1 >>> 2, i1 = o, o = d;
            }
            r[0] = r[0] + o | 0, r[1] = r[1] + i1 | 0, r[2] = r[2] + a | 0, r[3] = r[3] + s | 0, r[4] = r[4] + c | 0;
        },
        _doFinalize: function() {
            var e = this._data, t = e.words, r = 8 * this._nDataBytes, o = 8 * e.sigBytes;
            return t[o >>> 5] |= 128 << 24 - o % 32, t[14 + (o + 64 >>> 9 << 4)] = Math.floor(r / 4294967296), t[15 + (o + 64 >>> 9 << 4)] = r, e.sigBytes = 4 * t.length, this._process(), this._hash;
        },
        clone: function() {
            var e = o.clone.call(this);
            return e._hash = this._hash.clone(), e;
        }
    }), e.SHA1 = o._createHelper(i1), e.HmacSHA1 = o._createHmacHelper(i1), function(e) {
        var t = l, r = t.lib, o = r.WordArray, n = r.Hasher, i1 = t.algo, a = [], s = [];
        !function() {
            function t(t) {
                for(var r = e.sqrt(t), o = 2; o <= r; o++)if (!(t % o)) return !1;
                return !0;
            }
            function r(e) {
                return 4294967296 * (e - (0 | e)) | 0;
            }
            for(var o = 2, n = 0; n < 64;)t(o) && (n < 8 && (a[n] = r(e.pow(o, .5))), s[n] = r(e.pow(o, 1 / 3)), n++), o++;
        }();
        var c = [], u = i1.SHA256 = n.extend({
            _doReset: function() {
                this._hash = new o.init(a.slice(0));
            },
            _doProcessBlock: function(e, t) {
                for(var r = this._hash.words, o = r[0], n = r[1], i1 = r[2], a = r[3], l = r[4], u = r[5], d = r[6], h = r[7], f = 0; f < 64; f++){
                    if (f < 16) c[f] = 0 | e[t + f];
                    else {
                        var m = c[f - 15], g = (m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3, p = c[f - 2], b = (p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10;
                        c[f] = g + c[f - 7] + b + c[f - 16];
                    }
                    var y = o & n ^ o & i1 ^ n & i1, w = (o << 30 | o >>> 2) ^ (o << 19 | o >>> 13) ^ (o << 10 | o >>> 22), v = h + ((l << 26 | l >>> 6) ^ (l << 21 | l >>> 11) ^ (l << 7 | l >>> 25)) + (l & u ^ ~l & d) + s[f] + c[f];
                    h = d, d = u, u = l, l = a + v | 0, a = i1, i1 = n, n = o, o = v + (w + y) | 0;
                }
                r[0] = r[0] + o | 0, r[1] = r[1] + n | 0, r[2] = r[2] + i1 | 0, r[3] = r[3] + a | 0, r[4] = r[4] + l | 0, r[5] = r[5] + u | 0, r[6] = r[6] + d | 0, r[7] = r[7] + h | 0;
            },
            _doFinalize: function() {
                var t = this._data, r = t.words, o = 8 * this._nDataBytes, n = 8 * t.sigBytes;
                return r[n >>> 5] |= 128 << 24 - n % 32, r[14 + (n + 64 >>> 9 << 4)] = e.floor(o / 4294967296), r[15 + (n + 64 >>> 9 << 4)] = o, t.sigBytes = 4 * r.length, this._process(), this._hash;
            },
            clone: function() {
                var e = n.clone.call(this);
                return e._hash = this._hash.clone(), e;
            }
        });
        t.SHA256 = n._createHelper(u), t.HmacSHA256 = n._createHmacHelper(u);
    }(Math), function() {
        var e = l, t = e.lib.WordArray, r = e.enc;
        r.Utf16 = r.Utf16BE = {
            stringify: function(e) {
                for(var t = e.words, r = e.sigBytes, o = [], n = 0; n < r; n += 2){
                    var i1 = t[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                    o.push(String.fromCharCode(i1));
                }
                return o.join("");
            },
            parse: function(e) {
                for(var r = e.length, o = [], n = 0; n < r; n++)o[n >>> 1] |= e.charCodeAt(n) << 16 - n % 2 * 16;
                return t.create(o, 2 * r);
            }
        };
        function o(e) {
            return e << 8 & 4278255360 | e >>> 8 & 16711935;
        }
        r.Utf16LE = {
            stringify: function(e) {
                for(var t = e.words, r = e.sigBytes, n = [], i1 = 0; i1 < r; i1 += 2){
                    var a = o(t[i1 >>> 2] >>> 16 - i1 % 4 * 8 & 65535);
                    n.push(String.fromCharCode(a));
                }
                return n.join("");
            },
            parse: function(e) {
                for(var r = e.length, n = [], i1 = 0; i1 < r; i1++)n[i1 >>> 1] |= o(e.charCodeAt(i1) << 16 - i1 % 2 * 16);
                return t.create(n, 2 * r);
            }
        };
    }(), function() {
        if ("function" == typeof ArrayBuffer) {
            var e = l.lib.WordArray, t = e.init;
            (e.init = function(e) {
                if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), (e instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array) && (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)), e instanceof Uint8Array) {
                    for(var r = e.byteLength, o = [], n = 0; n < r; n++)o[n >>> 2] |= e[n] << 24 - n % 4 * 8;
                    t.call(this, o, r);
                } else t.apply(this, arguments);
            }).prototype = e;
        }
    }(), function(e) {
        var t = l, r = t.lib, o = r.WordArray, n = r.Hasher, i1 = t.algo, a = o.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
        ]), s = o.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
        ]), c = o.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
        ]), u = o.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
        ]), d = o.create([
            0,
            1518500249,
            1859775393,
            2400959708,
            2840853838
        ]), h = o.create([
            1352829926,
            1548603684,
            1836072691,
            2053994217,
            0
        ]), f = i1.RIPEMD160 = n.extend({
            _doReset: function() {
                this._hash = o.create([
                    1732584193,
                    4023233417,
                    2562383102,
                    271733878,
                    3285377520
                ]);
            },
            _doProcessBlock: function(e, t) {
                for(var r = 0; r < 16; r++){
                    var o = t + r, n = e[o];
                    e[o] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
                }
                var i1, l, f, v, O, _, k, S, x, C, I, R = this._hash.words, L = d.words, B = h.words, U = a.words, N = s.words, D = c.words, E = u.words;
                _ = i1 = R[0], k = l = R[1], S = f = R[2], x = v = R[3], C = O = R[4];
                for(r = 0; r < 80; r += 1)I = i1 + e[t + U[r]] | 0, I += r < 16 ? m(l, f, v) + L[0] : r < 32 ? g(l, f, v) + L[1] : r < 48 ? p(l, f, v) + L[2] : r < 64 ? b(l, f, v) + L[3] : y(l, f, v) + L[4], I = (I = w(I |= 0, D[r])) + O | 0, i1 = O, O = v, v = w(f, 10), f = l, l = I, I = _ + e[t + N[r]] | 0, I += r < 16 ? y(k, S, x) + B[0] : r < 32 ? b(k, S, x) + B[1] : r < 48 ? p(k, S, x) + B[2] : r < 64 ? g(k, S, x) + B[3] : m(k, S, x) + B[4], I = (I = w(I |= 0, E[r])) + C | 0, _ = C, C = x, x = w(S, 10), S = k, k = I;
                I = R[1] + f + x | 0, R[1] = R[2] + v + C | 0, R[2] = R[3] + O + _ | 0, R[3] = R[4] + i1 + k | 0, R[4] = R[0] + l + S | 0, R[0] = I;
            },
            _doFinalize: function() {
                var e = this._data, t = e.words, r = 8 * this._nDataBytes, o = 8 * e.sigBytes;
                t[o >>> 5] |= 128 << 24 - o % 32, t[14 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), e.sigBytes = 4 * (t.length + 1), this._process();
                for(var n = this._hash, i1 = n.words, a = 0; a < 5; a++){
                    var s = i1[a];
                    i1[a] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
                }
                return n;
            },
            clone: function() {
                var e = n.clone.call(this);
                return e._hash = this._hash.clone(), e;
            }
        });
        function m(e, t, r) {
            return e ^ t ^ r;
        }
        function g(e, t, r) {
            return e & t | ~e & r;
        }
        function p(e, t, r) {
            return (e | ~t) ^ r;
        }
        function b(e, t, r) {
            return e & r | t & ~r;
        }
        function y(e, t, r) {
            return e ^ (t | ~r);
        }
        function w(e, t) {
            return e << t | e >>> 32 - t;
        }
        t.RIPEMD160 = n._createHelper(f), t.HmacRIPEMD160 = n._createHmacHelper(f);
    }(Math), function() {
        var e = l, t = e.lib.Base, r = e.enc.Utf8;
        e.algo.HMAC = t.extend({
            init: function(e, t) {
                e = this._hasher = new e.init, "string" == typeof t && (t = r.parse(t));
                var o = e.blockSize, n = 4 * o;
                t.sigBytes > n && (t = e.finalize(t)), t.clamp();
                for(var i1 = this._oKey = t.clone(), a = this._iKey = t.clone(), s = i1.words, c = a.words, l = 0; l < o; l++)s[l] ^= 1549556828, c[l] ^= 909522486;
                i1.sigBytes = a.sigBytes = n, this.reset();
            },
            reset: function() {
                var e = this._hasher;
                e.reset(), e.update(this._iKey);
            },
            update: function(e) {
                return this._hasher.update(e), this;
            },
            finalize: function(e) {
                var t = this._hasher, r = t.finalize(e);
                return t.reset(), t.finalize(this._oKey.clone().concat(r));
            }
        });
    }(), function() {
        var e = l, t = e.lib, r = t.Base, o = t.WordArray, n = e.algo, i1 = n.SHA1, a = n.HMAC, s = n.PBKDF2 = r.extend({
            cfg: r.extend({
                keySize: 4,
                hasher: i1,
                iterations: 1
            }),
            init: function(e) {
                this.cfg = this.cfg.extend(e);
            },
            compute: function(e, t) {
                for(var r = this.cfg, n = a.create(r.hasher, e), i1 = o.create(), s = o.create([
                    1
                ]), c = i1.words, l = s.words, u = r.keySize, d = r.iterations; c.length < u;){
                    var h = n.update(t).finalize(s);
                    n.reset();
                    for(var f = h.words, m = f.length, g = h, p = 1; p < d; p++){
                        g = n.finalize(g), n.reset();
                        for(var b = g.words, y = 0; y < m; y++)f[y] ^= b[y];
                    }
                    i1.concat(h), l[0]++;
                }
                return i1.sigBytes = 4 * u, i1;
            }
        });
        e.PBKDF2 = function(e, t, r) {
            return s.create(r).compute(e, t);
        };
    }(), function() {
        var e = l, t = e.lib, r = t.Base, o = t.WordArray, n = e.algo, i1 = n.MD5, a = n.EvpKDF = r.extend({
            cfg: r.extend({
                keySize: 4,
                hasher: i1,
                iterations: 1
            }),
            init: function(e) {
                this.cfg = this.cfg.extend(e);
            },
            compute: function(e, t) {
                for(var r, n = this.cfg, i1 = n.hasher.create(), a = o.create(), s = a.words, c = n.keySize, l = n.iterations; s.length < c;){
                    r && i1.update(r), r = i1.update(e).finalize(t), i1.reset();
                    for(var u = 1; u < l; u++)r = i1.finalize(r), i1.reset();
                    a.concat(r);
                }
                return a.sigBytes = 4 * c, a;
            }
        });
        e.EvpKDF = function(e, t, r) {
            return a.create(r).compute(e, t);
        };
    }(), function() {
        var e = l, t = e.lib.WordArray, r = e.algo, o = r.SHA256, n = r.SHA224 = o.extend({
            _doReset: function() {
                this._hash = new t.init([
                    3238371032,
                    914150663,
                    812702999,
                    4144912697,
                    4290775857,
                    1750603025,
                    1694076839,
                    3204075428
                ]);
            },
            _doFinalize: function() {
                var e = o._doFinalize.call(this);
                return e.sigBytes -= 4, e;
            }
        });
        e.SHA224 = o._createHelper(n), e.HmacSHA224 = o._createHmacHelper(n);
    }(), function(e) {
        var t = l, r = t.lib, o = r.Base, n = r.WordArray, i1 = t.x64 = {};
        i1.Word = o.extend({
            init: function(e, t) {
                this.high = e, this.low = t;
            }
        }), i1.WordArray = o.extend({
            init: function(e, t) {
                e = this.words = e || [], this.sigBytes = void 0 != t ? t : 8 * e.length;
            },
            toX32: function() {
                for(var e = this.words, t = e.length, r = [], o = 0; o < t; o++){
                    var i1 = e[o];
                    r.push(i1.high), r.push(i1.low);
                }
                return n.create(r, this.sigBytes);
            },
            clone: function() {
                for(var e = o.clone.call(this), t = e.words = this.words.slice(0), r = t.length, n = 0; n < r; n++)t[n] = t[n].clone();
                return e;
            }
        });
    }(), function(e) {
        var t = l, r = t.lib, o = r.WordArray, n = r.Hasher, i1 = t.x64.Word, a = t.algo, s = [], c = [], u = [];
        !function() {
            for(var e = 1, t = 0, r = 0; r < 24; r++){
                s[e + 5 * t] = (r + 1) * (r + 2) / 2 % 64;
                var o = (2 * e + 3 * t) % 5;
                e = t % 5, t = o;
            }
            for(e = 0; e < 5; e++)for(t = 0; t < 5; t++)c[e + 5 * t] = t + (2 * e + 3 * t) % 5 * 5;
            for(var n = 1, a = 0; a < 24; a++){
                for(var l = 0, d = 0, h = 0; h < 7; h++){
                    if (1 & n) {
                        var f = (1 << h) - 1;
                        f < 32 ? d ^= 1 << f : l ^= 1 << f - 32;
                    }
                    128 & n ? n = n << 1 ^ 113 : n <<= 1;
                }
                u[a] = i1.create(l, d);
            }
        }();
        var d = [];
        !function() {
            for(var e = 0; e < 25; e++)d[e] = i1.create();
        }();
        var h = a.SHA3 = n.extend({
            cfg: n.cfg.extend({
                outputLength: 512
            }),
            _doReset: function() {
                for(var e = this._state = [], t = 0; t < 25; t++)e[t] = new i1.init;
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(e, t) {
                for(var r = this._state, o = this.blockSize / 2, n = 0; n < o; n++){
                    var i1 = e[t + 2 * n], a = e[t + 2 * n + 1];
                    i1 = 16711935 & (i1 << 8 | i1 >>> 24) | 4278255360 & (i1 << 24 | i1 >>> 8), a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), (R = r[n]).high ^= a, R.low ^= i1;
                }
                for(var l = 0; l < 24; l++){
                    for(var h = 0; h < 5; h++){
                        for(var f = 0, m = 0, g = 0; g < 5; g++){
                            f ^= (R = r[h + 5 * g]).high, m ^= R.low;
                        }
                        var p = d[h];
                        p.high = f, p.low = m;
                    }
                    for(h = 0; h < 5; h++){
                        var b = d[(h + 4) % 5], y = d[(h + 1) % 5], w = y.high, v = y.low;
                        for(f = b.high ^ (w << 1 | v >>> 31), m = b.low ^ (v << 1 | w >>> 31), g = 0; g < 5; g++){
                            (R = r[h + 5 * g]).high ^= f, R.low ^= m;
                        }
                    }
                    for(var O = 1; O < 25; O++){
                        var _ = (R = r[O]).high, k = R.low, S = s[O];
                        S < 32 ? (f = _ << S | k >>> 32 - S, m = k << S | _ >>> 32 - S) : (f = k << S - 32 | _ >>> 64 - S, m = _ << S - 32 | k >>> 64 - S);
                        var x = d[c[O]];
                        x.high = f, x.low = m;
                    }
                    var C = d[0], I = r[0];
                    C.high = I.high, C.low = I.low;
                    for(h = 0; h < 5; h++)for(g = 0; g < 5; g++){
                        var R = r[O = h + 5 * g], L = d[O], B = d[(h + 1) % 5 + 5 * g], U = d[(h + 2) % 5 + 5 * g];
                        R.high = L.high ^ ~B.high & U.high, R.low = L.low ^ ~B.low & U.low;
                    }
                    R = r[0];
                    var N = u[l];
                    R.high ^= N.high, R.low ^= N.low;
                }
            },
            _doFinalize: function() {
                var t = this._data, r = t.words, n = (this._nDataBytes, 8 * t.sigBytes), i1 = 32 * this.blockSize;
                r[n >>> 5] |= 1 << 24 - n % 32, r[(e.ceil((n + 1) / i1) * i1 >>> 5) - 1] |= 128, t.sigBytes = 4 * r.length, this._process();
                for(var a = this._state, s = this.cfg.outputLength / 8, c = s / 8, l = [], u = 0; u < c; u++){
                    var d = a[u], h = d.high, f = d.low;
                    h = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8), f = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), l.push(f), l.push(h);
                }
                return new o.init(l, s);
            },
            clone: function() {
                for(var e = n.clone.call(this), t = e._state = this._state.slice(0), r = 0; r < 25; r++)t[r] = t[r].clone();
                return e;
            }
        });
        t.SHA3 = n._createHelper(h), t.HmacSHA3 = n._createHmacHelper(h);
    }(Math), function() {
        var e = l, t = e.lib.Hasher, r = e.x64, o = r.Word, n = r.WordArray, i1 = e.algo;
        function a() {
            return o.create.apply(o, arguments);
        }
        var s = [
            a(1116352408, 3609767458),
            a(1899447441, 602891725),
            a(3049323471, 3964484399),
            a(3921009573, 2173295548),
            a(961987163, 4081628472),
            a(1508970993, 3053834265),
            a(2453635748, 2937671579),
            a(2870763221, 3664609560),
            a(3624381080, 2734883394),
            a(310598401, 1164996542),
            a(607225278, 1323610764),
            a(1426881987, 3590304994),
            a(1925078388, 4068182383),
            a(2162078206, 991336113),
            a(2614888103, 633803317),
            a(3248222580, 3479774868),
            a(3835390401, 2666613458),
            a(4022224774, 944711139),
            a(264347078, 2341262773),
            a(604807628, 2007800933),
            a(770255983, 1495990901),
            a(1249150122, 1856431235),
            a(1555081692, 3175218132),
            a(1996064986, 2198950837),
            a(2554220882, 3999719339),
            a(2821834349, 766784016),
            a(2952996808, 2566594879),
            a(3210313671, 3203337956),
            a(3336571891, 1034457026),
            a(3584528711, 2466948901),
            a(113926993, 3758326383),
            a(338241895, 168717936),
            a(666307205, 1188179964),
            a(773529912, 1546045734),
            a(1294757372, 1522805485),
            a(1396182291, 2643833823),
            a(1695183700, 2343527390),
            a(1986661051, 1014477480),
            a(2177026350, 1206759142),
            a(2456956037, 344077627),
            a(2730485921, 1290863460),
            a(2820302411, 3158454273),
            a(3259730800, 3505952657),
            a(3345764771, 106217008),
            a(3516065817, 3606008344),
            a(3600352804, 1432725776),
            a(4094571909, 1467031594),
            a(275423344, 851169720),
            a(430227734, 3100823752),
            a(506948616, 1363258195),
            a(659060556, 3750685593),
            a(883997877, 3785050280),
            a(958139571, 3318307427),
            a(1322822218, 3812723403),
            a(1537002063, 2003034995),
            a(1747873779, 3602036899),
            a(1955562222, 1575990012),
            a(2024104815, 1125592928),
            a(2227730452, 2716904306),
            a(2361852424, 442776044),
            a(2428436474, 593698344),
            a(2756734187, 3733110249),
            a(3204031479, 2999351573),
            a(3329325298, 3815920427),
            a(3391569614, 3928383900),
            a(3515267271, 566280711),
            a(3940187606, 3454069534),
            a(4118630271, 4000239992),
            a(116418474, 1914138554),
            a(174292421, 2731055270),
            a(289380356, 3203993006),
            a(460393269, 320620315),
            a(685471733, 587496836),
            a(852142971, 1086792851),
            a(1017036298, 365543100),
            a(1126000580, 2618297676),
            a(1288033470, 3409855158),
            a(1501505948, 4234509866),
            a(1607167915, 987167468),
            a(1816402316, 1246189591)
        ], c = [];
        !function() {
            for(var e = 0; e < 80; e++)c[e] = a();
        }();
        var u = i1.SHA512 = t.extend({
            _doReset: function() {
                this._hash = new n.init([
                    new o.init(1779033703, 4089235720),
                    new o.init(3144134277, 2227873595),
                    new o.init(1013904242, 4271175723),
                    new o.init(2773480762, 1595750129),
                    new o.init(1359893119, 2917565137),
                    new o.init(2600822924, 725511199),
                    new o.init(528734635, 4215389547),
                    new o.init(1541459225, 327033209)
                ]);
            },
            _doProcessBlock: function(e, t) {
                for(var r = this._hash.words, o = r[0], n = r[1], i1 = r[2], a = r[3], l = r[4], u = r[5], d = r[6], h = r[7], f = o.high, m = o.low, g = n.high, p = n.low, b = i1.high, y = i1.low, w = a.high, v = a.low, O = l.high, _ = l.low, k = u.high, S = u.low, x = d.high, C = d.low, I = h.high, R = h.low, L = f, B = m, U = g, N = p, D = b, E = y, T = w, A = v, P = O, F = _, H = k, q = S, M = x, j = C, W = I, z = R, V = 0; V < 80; V++){
                    var G, Y, K = c[V];
                    if (V < 16) Y = K.high = 0 | e[t + 2 * V], G = K.low = 0 | e[t + 2 * V + 1];
                    else {
                        var J = c[V - 15], X = J.high, Z = J.low, Q = (X >>> 1 | Z << 31) ^ (X >>> 8 | Z << 24) ^ X >>> 7, $ = (Z >>> 1 | X << 31) ^ (Z >>> 8 | X << 24) ^ (Z >>> 7 | X << 25), ee = c[V - 2], te = ee.high, re = ee.low, oe = (te >>> 19 | re << 13) ^ (te << 3 | re >>> 29) ^ te >>> 6, ne = (re >>> 19 | te << 13) ^ (re << 3 | te >>> 29) ^ (re >>> 6 | te << 26), ie = c[V - 7], ae = ie.high, se = ie.low, ce = c[V - 16], le = ce.high, ue = ce.low;
                        Y = (Y = (Y = Q + ae + ((G = $ + se) >>> 0 < $ >>> 0 ? 1 : 0)) + oe + ((G += ne) >>> 0 < ne >>> 0 ? 1 : 0)) + le + ((G += ue) >>> 0 < ue >>> 0 ? 1 : 0), K.high = Y, K.low = G;
                    }
                    var de, he = P & H ^ ~P & M, fe = F & q ^ ~F & j, me = L & U ^ L & D ^ U & D, ge = B & N ^ B & E ^ N & E, pe = (L >>> 28 | B << 4) ^ (L << 30 | B >>> 2) ^ (L << 25 | B >>> 7), be = (B >>> 28 | L << 4) ^ (B << 30 | L >>> 2) ^ (B << 25 | L >>> 7), ye = (P >>> 14 | F << 18) ^ (P >>> 18 | F << 14) ^ (P << 23 | F >>> 9), we = (F >>> 14 | P << 18) ^ (F >>> 18 | P << 14) ^ (F << 23 | P >>> 9), ve = s[V], Oe = ve.high, _e = ve.low, ke = W + ye + ((de = z + we) >>> 0 < z >>> 0 ? 1 : 0), Se = be + ge;
                    W = M, z = j, M = H, j = q, H = P, q = F, P = T + (ke = (ke = (ke = ke + he + ((de = de + fe) >>> 0 < fe >>> 0 ? 1 : 0)) + Oe + ((de = de + _e) >>> 0 < _e >>> 0 ? 1 : 0)) + Y + ((de = de + G) >>> 0 < G >>> 0 ? 1 : 0)) + ((F = A + de | 0) >>> 0 < A >>> 0 ? 1 : 0) | 0, T = D, A = E, D = U, E = N, U = L, N = B, L = ke + (pe + me + (Se >>> 0 < be >>> 0 ? 1 : 0)) + ((B = de + Se | 0) >>> 0 < de >>> 0 ? 1 : 0) | 0;
                }
                m = o.low = m + B, o.high = f + L + (m >>> 0 < B >>> 0 ? 1 : 0), p = n.low = p + N, n.high = g + U + (p >>> 0 < N >>> 0 ? 1 : 0), y = i1.low = y + E, i1.high = b + D + (y >>> 0 < E >>> 0 ? 1 : 0), v = a.low = v + A, a.high = w + T + (v >>> 0 < A >>> 0 ? 1 : 0), _ = l.low = _ + F, l.high = O + P + (_ >>> 0 < F >>> 0 ? 1 : 0), S = u.low = S + q, u.high = k + H + (S >>> 0 < q >>> 0 ? 1 : 0), C = d.low = C + j, d.high = x + M + (C >>> 0 < j >>> 0 ? 1 : 0), R = h.low = R + z, h.high = I + W + (R >>> 0 < z >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
                var e = this._data, t = e.words, r = 8 * this._nDataBytes, o = 8 * e.sigBytes;
                return t[o >>> 5] |= 128 << 24 - o % 32, t[30 + (o + 128 >>> 10 << 5)] = Math.floor(r / 4294967296), t[31 + (o + 128 >>> 10 << 5)] = r, e.sigBytes = 4 * t.length, this._process(), this._hash.toX32();
            },
            clone: function() {
                var e = t.clone.call(this);
                return e._hash = this._hash.clone(), e;
            },
            blockSize: 32
        });
        e.SHA512 = t._createHelper(u), e.HmacSHA512 = t._createHmacHelper(u);
    }(), function() {
        var e = l, t = e.x64, r = t.Word, o = t.WordArray, n = e.algo, i1 = n.SHA512, a = n.SHA384 = i1.extend({
            _doReset: function() {
                this._hash = new o.init([
                    new r.init(3418070365, 3238371032),
                    new r.init(1654270250, 914150663),
                    new r.init(2438529370, 812702999),
                    new r.init(355462360, 4144912697),
                    new r.init(1731405415, 4290775857),
                    new r.init(2394180231, 1750603025),
                    new r.init(3675008525, 1694076839),
                    new r.init(1203062813, 3204075428)
                ]);
            },
            _doFinalize: function() {
                var e = i1._doFinalize.call(this);
                return e.sigBytes -= 16, e;
            }
        });
        e.SHA384 = i1._createHelper(a), e.HmacSHA384 = i1._createHmacHelper(a);
    }(), l.lib.Cipher || function(e) {
        var t = l, r = t.lib, o = r.Base, n = r.WordArray, i1 = r.BufferedBlockAlgorithm, a = t.enc, s = (a.Utf8, a.Base64), c = t.algo.EvpKDF, u = r.Cipher = i1.extend({
            cfg: o.extend(),
            createEncryptor: function(e, t) {
                return this.create(this._ENC_XFORM_MODE, e, t);
            },
            createDecryptor: function(e, t) {
                return this.create(this._DEC_XFORM_MODE, e, t);
            },
            init: function(e, t, r) {
                this.cfg = this.cfg.extend(r), this._xformMode = e, this._key = t, this.reset();
            },
            reset: function() {
                i1.reset.call(this), this._doReset();
            },
            process: function(e) {
                return this._append(e), this._process();
            },
            finalize: function(e) {
                return e && this._append(e), this._doFinalize();
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function() {
                function e(e) {
                    return "string" == typeof e ? w : b;
                }
                return function(t) {
                    return {
                        encrypt: function(r, o, n) {
                            return e(o).encrypt(t, r, o, n);
                        },
                        decrypt: function(r, o, n) {
                            return e(o).decrypt(t, r, o, n);
                        }
                    };
                };
            }()
        }), d = (r.StreamCipher = u.extend({
            _doFinalize: function() {
                return this._process(!0);
            },
            blockSize: 1
        }), t.mode = {}), h = r.BlockCipherMode = o.extend({
            createEncryptor: function(e, t) {
                return this.Encryptor.create(e, t);
            },
            createDecryptor: function(e, t) {
                return this.Decryptor.create(e, t);
            },
            init: function(e, t) {
                this._cipher = e, this._iv = t;
            }
        }), f = d.CBC = function() {
            var t = h.extend();
            function r(t, r, o) {
                var n, i1 = this._iv;
                i1 ? (n = i1, this._iv = e) : n = this._prevBlock;
                for(var a = 0; a < o; a++)t[r + a] ^= n[a];
            }
            return t.Encryptor = t.extend({
                processBlock: function(e, t) {
                    var o = this._cipher, n = o.blockSize;
                    r.call(this, e, t, n), o.encryptBlock(e, t), this._prevBlock = e.slice(t, t + n);
                }
            }), t.Decryptor = t.extend({
                processBlock: function(e, t) {
                    var o = this._cipher, n = o.blockSize, i1 = e.slice(t, t + n);
                    o.decryptBlock(e, t), r.call(this, e, t, n), this._prevBlock = i1;
                }
            }), t;
        }(), m = (t.pad = {}).Pkcs7 = {
            pad: function(e, t) {
                for(var r = 4 * t, o = r - e.sigBytes % r, i1 = o << 24 | o << 16 | o << 8 | o, a = [], s = 0; s < o; s += 4)a.push(i1);
                var c = n.create(a, o);
                e.concat(c);
            },
            unpad: function(e) {
                var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                e.sigBytes -= t;
            }
        }, g = (r.BlockCipher = u.extend({
            cfg: u.cfg.extend({
                mode: f,
                padding: m
            }),
            reset: function() {
                var e;
                u.reset.call(this);
                var t = this.cfg, r = t.iv, o = t.mode;
                this._xformMode == this._ENC_XFORM_MODE ? e = o.createEncryptor : (e = o.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e ? this._mode.init(this, r && r.words) : (this._mode = e.call(o, this, r && r.words), this._mode.__creator = e);
            },
            _doProcessBlock: function(e, t) {
                this._mode.processBlock(e, t);
            },
            _doFinalize: function() {
                var e, t = this.cfg.padding;
                return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize), e = this._process(!0)) : (e = this._process(!0), t.unpad(e)), e;
            },
            blockSize: 4
        }), r.CipherParams = o.extend({
            init: function(e) {
                this.mixIn(e);
            },
            toString: function(e) {
                return (e || this.formatter).stringify(this);
            }
        })), p = (t.format = {}).OpenSSL = {
            stringify: function(e) {
                var t = e.ciphertext, r = e.salt;
                return (r ? n.create([
                    1398893684,
                    1701076831
                ]).concat(r).concat(t) : t).toString(s);
            },
            parse: function(e) {
                var t, r = s.parse(e), o = r.words;
                return 1398893684 == o[0] && 1701076831 == o[1] && (t = n.create(o.slice(2, 4)), o.splice(0, 4), r.sigBytes -= 16), g.create({
                    ciphertext: r,
                    salt: t
                });
            }
        }, b = r.SerializableCipher = o.extend({
            cfg: o.extend({
                format: p
            }),
            encrypt: function(e, t, r, o) {
                o = this.cfg.extend(o);
                var n = e.createEncryptor(r, o), i1 = n.finalize(t), a = n.cfg;
                return g.create({
                    ciphertext: i1,
                    key: r,
                    iv: a.iv,
                    algorithm: e,
                    mode: a.mode,
                    padding: a.padding,
                    blockSize: e.blockSize,
                    formatter: o.format
                });
            },
            decrypt: function(e, t, r, o) {
                return o = this.cfg.extend(o), t = this._parse(t, o.format), e.createDecryptor(r, o).finalize(t.ciphertext);
            },
            _parse: function(e, t) {
                return "string" == typeof e ? t.parse(e, this) : e;
            }
        }), y = (t.kdf = {}).OpenSSL = {
            execute: function(e, t, r, o) {
                o || (o = n.random(8));
                var i1 = c.create({
                    keySize: t + r
                }).compute(e, o), a = n.create(i1.words.slice(t), 4 * r);
                return i1.sigBytes = 4 * t, g.create({
                    key: i1,
                    iv: a,
                    salt: o
                });
            }
        }, w = r.PasswordBasedCipher = b.extend({
            cfg: b.cfg.extend({
                kdf: y
            }),
            encrypt: function(e, t, r, o) {
                var n = (o = this.cfg.extend(o)).kdf.execute(r, e.keySize, e.ivSize);
                o.iv = n.iv;
                var i1 = b.encrypt.call(this, e, t, n.key, o);
                return i1.mixIn(n), i1;
            },
            decrypt: function(e, t, r, o) {
                o = this.cfg.extend(o), t = this._parse(t, o.format);
                var n = o.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                return o.iv = n.iv, b.decrypt.call(this, e, t, n.key, o);
            }
        });
    }(), l.mode.CFB = function() {
        var e = l.lib.BlockCipherMode.extend();
        function t(e, t, r, o) {
            var n, i1 = this._iv;
            i1 ? (n = i1.slice(0), this._iv = void 0) : n = this._prevBlock, o.encryptBlock(n, 0);
            for(var a = 0; a < r; a++)e[t + a] ^= n[a];
        }
        return e.Encryptor = e.extend({
            processBlock: function(e, r) {
                var o = this._cipher, n = o.blockSize;
                t.call(this, e, r, n, o), this._prevBlock = e.slice(r, r + n);
            }
        }), e.Decryptor = e.extend({
            processBlock: function(e, r) {
                var o = this._cipher, n = o.blockSize, i1 = e.slice(r, r + n);
                t.call(this, e, r, n, o), this._prevBlock = i1;
            }
        }), e;
    }(), l.mode.ECB = ((a = l.lib.BlockCipherMode.extend()).Encryptor = a.extend({
        processBlock: function(e, t) {
            this._cipher.encryptBlock(e, t);
        }
    }), a.Decryptor = a.extend({
        processBlock: function(e, t) {
            this._cipher.decryptBlock(e, t);
        }
    }), a), l.pad.AnsiX923 = {
        pad: function(e, t) {
            var r = e.sigBytes, o = 4 * t, n = o - r % o, i1 = r + n - 1;
            e.clamp(), e.words[i1 >>> 2] |= n << 24 - i1 % 4 * 8, e.sigBytes += n;
        },
        unpad: function(e) {
            var t = 255 & e.words[e.sigBytes - 1 >>> 2];
            e.sigBytes -= t;
        }
    }, l.pad.Iso10126 = {
        pad: function(e, t) {
            var r = 4 * t, o = r - e.sigBytes % r;
            e.concat(l.lib.WordArray.random(o - 1)).concat(l.lib.WordArray.create([
                o << 24
            ], 1));
        },
        unpad: function(e) {
            var t = 255 & e.words[e.sigBytes - 1 >>> 2];
            e.sigBytes -= t;
        }
    }, l.pad.Iso97971 = {
        pad: function(e, t) {
            e.concat(l.lib.WordArray.create([
                2147483648
            ], 1)), l.pad.ZeroPadding.pad(e, t);
        },
        unpad: function(e) {
            l.pad.ZeroPadding.unpad(e), e.sigBytes--;
        }
    }, l.mode.OFB = (s = l.lib.BlockCipherMode.extend(), c = s.Encryptor = s.extend({
        processBlock: function(e, t) {
            var r = this._cipher, o = r.blockSize, n = this._iv, i1 = this._keystream;
            n && (i1 = this._keystream = n.slice(0), this._iv = void 0), r.encryptBlock(i1, 0);
            for(var a = 0; a < o; a++)e[t + a] ^= i1[a];
        }
    }), s.Decryptor = c, s), l.pad.NoPadding = {
        pad: function() {},
        unpad: function() {}
    }, function(e) {
        var t = l, r = t.lib.CipherParams, o = t.enc.Hex;
        t.format.Hex = {
            stringify: function(e) {
                return e.ciphertext.toString(o);
            },
            parse: function(e) {
                var t = o.parse(e);
                return r.create({
                    ciphertext: t
                });
            }
        };
    }(), function() {
        var e = l, t = e.lib.BlockCipher, r = e.algo, o = [], n = [], i1 = [], a = [], s = [], c = [], u = [], d = [], h = [], f = [];
        !function() {
            for(var e = [], t = 0; t < 256; t++)e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
            var r = 0, l = 0;
            for(t = 0; t < 256; t++){
                var m = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4;
                m = m >>> 8 ^ 255 & m ^ 99, o[r] = m, n[m] = r;
                var g = e[r], p = e[g], b = e[p], y = 257 * e[m] ^ 16843008 * m;
                i1[r] = y << 24 | y >>> 8, a[r] = y << 16 | y >>> 16, s[r] = y << 8 | y >>> 24, c[r] = y;
                y = 16843009 * b ^ 65537 * p ^ 257 * g ^ 16843008 * r;
                u[m] = y << 24 | y >>> 8, d[m] = y << 16 | y >>> 16, h[m] = y << 8 | y >>> 24, f[m] = y, r ? (r = g ^ e[e[e[b ^ g]]], l ^= e[e[l]]) : r = l = 1;
            }
        }();
        var m = [
            0,
            1,
            2,
            4,
            8,
            16,
            32,
            64,
            128,
            27,
            54
        ], g = r.AES = t.extend({
            _doReset: function() {
                if (!this._nRounds || this._keyPriorReset !== this._key) {
                    for(var e = this._keyPriorReset = this._key, t = e.words, r = e.sigBytes / 4, n = 4 * ((this._nRounds = r + 6) + 1), i1 = this._keySchedule = [], a = 0; a < n; a++)a < r ? i1[a] = t[a] : (l = i1[a - 1], a % r ? r > 6 && a % r == 4 && (l = o[l >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[255 & l]) : (l = o[(l = l << 8 | l >>> 24) >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[255 & l], l ^= m[a / r | 0] << 24), i1[a] = i1[a - r] ^ l);
                    for(var s = this._invKeySchedule = [], c = 0; c < n; c++){
                        a = n - c;
                        if (c % 4) var l = i1[a];
                        else l = i1[a - 4];
                        s[c] = c < 4 || a <= 4 ? l : u[o[l >>> 24]] ^ d[o[l >>> 16 & 255]] ^ h[o[l >>> 8 & 255]] ^ f[o[255 & l]];
                    }
                }
            },
            encryptBlock: function(e, t) {
                this._doCryptBlock(e, t, this._keySchedule, i1, a, s, c, o);
            },
            decryptBlock: function(e, t) {
                var r = e[t + 1];
                e[t + 1] = e[t + 3], e[t + 3] = r, this._doCryptBlock(e, t, this._invKeySchedule, u, d, h, f, n);
                r = e[t + 1];
                e[t + 1] = e[t + 3], e[t + 3] = r;
            },
            _doCryptBlock: function(e, t, r, o, n, i1, a, s) {
                for(var c = this._nRounds, l = e[t] ^ r[0], u = e[t + 1] ^ r[1], d = e[t + 2] ^ r[2], h = e[t + 3] ^ r[3], f = 4, m = 1; m < c; m++){
                    var g = o[l >>> 24] ^ n[u >>> 16 & 255] ^ i1[d >>> 8 & 255] ^ a[255 & h] ^ r[f++], p = o[u >>> 24] ^ n[d >>> 16 & 255] ^ i1[h >>> 8 & 255] ^ a[255 & l] ^ r[f++], b = o[d >>> 24] ^ n[h >>> 16 & 255] ^ i1[l >>> 8 & 255] ^ a[255 & u] ^ r[f++], y = o[h >>> 24] ^ n[l >>> 16 & 255] ^ i1[u >>> 8 & 255] ^ a[255 & d] ^ r[f++];
                    l = g, u = p, d = b, h = y;
                }
                g = (s[l >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[d >>> 8 & 255] << 8 | s[255 & h]) ^ r[f++], p = (s[u >>> 24] << 24 | s[d >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & l]) ^ r[f++], b = (s[d >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & u]) ^ r[f++], y = (s[h >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & d]) ^ r[f++];
                e[t] = g, e[t + 1] = p, e[t + 2] = b, e[t + 3] = y;
            },
            keySize: 8
        });
        e.AES = t._createHelper(g);
    }(), function() {
        var e = l, t = e.lib, r = t.WordArray, o = t.BlockCipher, n = e.algo, i1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
        ], a = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
        ], s = [
            1,
            2,
            4,
            6,
            8,
            10,
            12,
            14,
            15,
            17,
            19,
            21,
            23,
            25,
            27,
            28
        ], c = [
            {
                0: 8421888,
                268435456: 32768,
                536870912: 8421378,
                805306368: 2,
                1073741824: 512,
                1342177280: 8421890,
                1610612736: 8389122,
                1879048192: 8388608,
                2147483648: 514,
                2415919104: 8389120,
                2684354560: 33280,
                2952790016: 8421376,
                3221225472: 32770,
                3489660928: 8388610,
                3758096384: 0,
                4026531840: 33282,
                134217728: 0,
                402653184: 8421890,
                671088640: 33282,
                939524096: 32768,
                1207959552: 8421888,
                1476395008: 512,
                1744830464: 8421378,
                2013265920: 2,
                2281701376: 8389120,
                2550136832: 33280,
                2818572288: 8421376,
                3087007744: 8389122,
                3355443200: 8388610,
                3623878656: 32770,
                3892314112: 514,
                4160749568: 8388608,
                1: 32768,
                268435457: 2,
                536870913: 8421888,
                805306369: 8388608,
                1073741825: 8421378,
                1342177281: 33280,
                1610612737: 512,
                1879048193: 8389122,
                2147483649: 8421890,
                2415919105: 8421376,
                2684354561: 8388610,
                2952790017: 33282,
                3221225473: 514,
                3489660929: 8389120,
                3758096385: 32770,
                4026531841: 0,
                134217729: 8421890,
                402653185: 8421376,
                671088641: 8388608,
                939524097: 512,
                1207959553: 32768,
                1476395009: 8388610,
                1744830465: 2,
                2013265921: 33282,
                2281701377: 32770,
                2550136833: 8389122,
                2818572289: 514,
                3087007745: 8421888,
                3355443201: 8389120,
                3623878657: 0,
                3892314113: 33280,
                4160749569: 8421378
            },
            {
                0: 1074282512,
                16777216: 16384,
                33554432: 524288,
                50331648: 1074266128,
                67108864: 1073741840,
                83886080: 1074282496,
                100663296: 1073758208,
                117440512: 16,
                134217728: 540672,
                150994944: 1073758224,
                167772160: 1073741824,
                184549376: 540688,
                201326592: 524304,
                218103808: 0,
                234881024: 16400,
                251658240: 1074266112,
                8388608: 1073758208,
                25165824: 540688,
                41943040: 16,
                58720256: 1073758224,
                75497472: 1074282512,
                92274688: 1073741824,
                109051904: 524288,
                125829120: 1074266128,
                142606336: 524304,
                159383552: 0,
                176160768: 16384,
                192937984: 1074266112,
                209715200: 1073741840,
                226492416: 540672,
                243269632: 1074282496,
                260046848: 16400,
                268435456: 0,
                285212672: 1074266128,
                301989888: 1073758224,
                318767104: 1074282496,
                335544320: 1074266112,
                352321536: 16,
                369098752: 540688,
                385875968: 16384,
                402653184: 16400,
                419430400: 524288,
                436207616: 524304,
                452984832: 1073741840,
                469762048: 540672,
                486539264: 1073758208,
                503316480: 1073741824,
                520093696: 1074282512,
                276824064: 540688,
                293601280: 524288,
                310378496: 1074266112,
                327155712: 16384,
                343932928: 1073758208,
                360710144: 1074282512,
                377487360: 16,
                394264576: 1073741824,
                411041792: 1074282496,
                427819008: 1073741840,
                444596224: 1073758224,
                461373440: 524304,
                478150656: 0,
                494927872: 16400,
                511705088: 1074266128,
                528482304: 540672
            },
            {
                0: 260,
                1048576: 0,
                2097152: 67109120,
                3145728: 65796,
                4194304: 65540,
                5242880: 67108868,
                6291456: 67174660,
                7340032: 67174400,
                8388608: 67108864,
                9437184: 67174656,
                10485760: 65792,
                11534336: 67174404,
                12582912: 67109124,
                13631488: 65536,
                14680064: 4,
                15728640: 256,
                524288: 67174656,
                1572864: 67174404,
                2621440: 0,
                3670016: 67109120,
                4718592: 67108868,
                5767168: 65536,
                6815744: 65540,
                7864320: 260,
                8912896: 4,
                9961472: 256,
                11010048: 67174400,
                12058624: 65796,
                13107200: 65792,
                14155776: 67109124,
                15204352: 67174660,
                16252928: 67108864,
                16777216: 67174656,
                17825792: 65540,
                18874368: 65536,
                19922944: 67109120,
                20971520: 256,
                22020096: 67174660,
                23068672: 67108868,
                24117248: 0,
                25165824: 67109124,
                26214400: 67108864,
                27262976: 4,
                28311552: 65792,
                29360128: 67174400,
                30408704: 260,
                31457280: 65796,
                32505856: 67174404,
                17301504: 67108864,
                18350080: 260,
                19398656: 67174656,
                20447232: 0,
                21495808: 65540,
                22544384: 67109120,
                23592960: 256,
                24641536: 67174404,
                25690112: 65536,
                26738688: 67174660,
                27787264: 65796,
                28835840: 67108868,
                29884416: 67109124,
                30932992: 67174400,
                31981568: 4,
                33030144: 65792
            },
            {
                0: 2151682048,
                65536: 2147487808,
                131072: 4198464,
                196608: 2151677952,
                262144: 0,
                327680: 4198400,
                393216: 2147483712,
                458752: 4194368,
                524288: 2147483648,
                589824: 4194304,
                655360: 64,
                720896: 2147487744,
                786432: 2151678016,
                851968: 4160,
                917504: 4096,
                983040: 2151682112,
                32768: 2147487808,
                98304: 64,
                163840: 2151678016,
                229376: 2147487744,
                294912: 4198400,
                360448: 2151682112,
                425984: 0,
                491520: 2151677952,
                557056: 4096,
                622592: 2151682048,
                688128: 4194304,
                753664: 4160,
                819200: 2147483648,
                884736: 4194368,
                950272: 4198464,
                1015808: 2147483712,
                1048576: 4194368,
                1114112: 4198400,
                1179648: 2147483712,
                1245184: 0,
                1310720: 4160,
                1376256: 2151678016,
                1441792: 2151682048,
                1507328: 2147487808,
                1572864: 2151682112,
                1638400: 2147483648,
                1703936: 2151677952,
                1769472: 4198464,
                1835008: 2147487744,
                1900544: 4194304,
                1966080: 64,
                2031616: 4096,
                1081344: 2151677952,
                1146880: 2151682112,
                1212416: 0,
                1277952: 4198400,
                1343488: 4194368,
                1409024: 2147483648,
                1474560: 2147487808,
                1540096: 64,
                1605632: 2147483712,
                1671168: 4096,
                1736704: 2147487744,
                1802240: 2151678016,
                1867776: 4160,
                1933312: 2151682048,
                1998848: 4194304,
                2064384: 4198464
            },
            {
                0: 128,
                4096: 17039360,
                8192: 262144,
                12288: 536870912,
                16384: 537133184,
                20480: 16777344,
                24576: 553648256,
                28672: 262272,
                32768: 16777216,
                36864: 537133056,
                40960: 536871040,
                45056: 553910400,
                49152: 553910272,
                53248: 0,
                57344: 17039488,
                61440: 553648128,
                2048: 17039488,
                6144: 553648256,
                10240: 128,
                14336: 17039360,
                18432: 262144,
                22528: 537133184,
                26624: 553910272,
                30720: 536870912,
                34816: 537133056,
                38912: 0,
                43008: 553910400,
                47104: 16777344,
                51200: 536871040,
                55296: 553648128,
                59392: 16777216,
                63488: 262272,
                65536: 262144,
                69632: 128,
                73728: 536870912,
                77824: 553648256,
                81920: 16777344,
                86016: 553910272,
                90112: 537133184,
                94208: 16777216,
                98304: 553910400,
                102400: 553648128,
                106496: 17039360,
                110592: 537133056,
                114688: 262272,
                118784: 536871040,
                122880: 0,
                126976: 17039488,
                67584: 553648256,
                71680: 16777216,
                75776: 17039360,
                79872: 537133184,
                83968: 536870912,
                88064: 17039488,
                92160: 128,
                96256: 553910272,
                100352: 262272,
                104448: 553910400,
                108544: 0,
                112640: 553648128,
                116736: 16777344,
                120832: 262144,
                124928: 537133056,
                129024: 536871040
            },
            {
                0: 268435464,
                256: 8192,
                512: 270532608,
                768: 270540808,
                1024: 268443648,
                1280: 2097152,
                1536: 2097160,
                1792: 268435456,
                2048: 0,
                2304: 268443656,
                2560: 2105344,
                2816: 8,
                3072: 270532616,
                3328: 2105352,
                3584: 8200,
                3840: 270540800,
                128: 270532608,
                384: 270540808,
                640: 8,
                896: 2097152,
                1152: 2105352,
                1408: 268435464,
                1664: 268443648,
                1920: 8200,
                2176: 2097160,
                2432: 8192,
                2688: 268443656,
                2944: 270532616,
                3200: 0,
                3456: 270540800,
                3712: 2105344,
                3968: 268435456,
                4096: 268443648,
                4352: 270532616,
                4608: 270540808,
                4864: 8200,
                5120: 2097152,
                5376: 268435456,
                5632: 268435464,
                5888: 2105344,
                6144: 2105352,
                6400: 0,
                6656: 8,
                6912: 270532608,
                7168: 8192,
                7424: 268443656,
                7680: 270540800,
                7936: 2097160,
                4224: 8,
                4480: 2105344,
                4736: 2097152,
                4992: 268435464,
                5248: 268443648,
                5504: 8200,
                5760: 270540808,
                6016: 270532608,
                6272: 270540800,
                6528: 270532616,
                6784: 8192,
                7040: 2105352,
                7296: 2097160,
                7552: 0,
                7808: 268435456,
                8064: 268443656
            },
            {
                0: 1048576,
                16: 33555457,
                32: 1024,
                48: 1049601,
                64: 34604033,
                80: 0,
                96: 1,
                112: 34603009,
                128: 33555456,
                144: 1048577,
                160: 33554433,
                176: 34604032,
                192: 34603008,
                208: 1025,
                224: 1049600,
                240: 33554432,
                8: 34603009,
                24: 0,
                40: 33555457,
                56: 34604032,
                72: 1048576,
                88: 33554433,
                104: 33554432,
                120: 1025,
                136: 1049601,
                152: 33555456,
                168: 34603008,
                184: 1048577,
                200: 1024,
                216: 34604033,
                232: 1,
                248: 1049600,
                256: 33554432,
                272: 1048576,
                288: 33555457,
                304: 34603009,
                320: 1048577,
                336: 33555456,
                352: 34604032,
                368: 1049601,
                384: 1025,
                400: 34604033,
                416: 1049600,
                432: 1,
                448: 0,
                464: 34603008,
                480: 33554433,
                496: 1024,
                264: 1049600,
                280: 33555457,
                296: 34603009,
                312: 1,
                328: 33554432,
                344: 1048576,
                360: 1025,
                376: 34604032,
                392: 33554433,
                408: 34603008,
                424: 0,
                440: 34604033,
                456: 1049601,
                472: 1024,
                488: 33555456,
                504: 1048577
            },
            {
                0: 134219808,
                1: 131072,
                2: 134217728,
                3: 32,
                4: 131104,
                5: 134350880,
                6: 134350848,
                7: 2048,
                8: 134348800,
                9: 134219776,
                10: 133120,
                11: 134348832,
                12: 2080,
                13: 0,
                14: 134217760,
                15: 133152,
                2147483648: 2048,
                2147483649: 134350880,
                2147483650: 134219808,
                2147483651: 134217728,
                2147483652: 134348800,
                2147483653: 133120,
                2147483654: 133152,
                2147483655: 32,
                2147483656: 134217760,
                2147483657: 2080,
                2147483658: 131104,
                2147483659: 134350848,
                2147483660: 0,
                2147483661: 134348832,
                2147483662: 134219776,
                2147483663: 131072,
                16: 133152,
                17: 134350848,
                18: 32,
                19: 2048,
                20: 134219776,
                21: 134217760,
                22: 134348832,
                23: 131072,
                24: 0,
                25: 131104,
                26: 134348800,
                27: 134219808,
                28: 134350880,
                29: 133120,
                30: 2080,
                31: 134217728,
                2147483664: 131072,
                2147483665: 2048,
                2147483666: 134348832,
                2147483667: 133152,
                2147483668: 32,
                2147483669: 134348800,
                2147483670: 134217728,
                2147483671: 134219808,
                2147483672: 134350880,
                2147483673: 134217760,
                2147483674: 134219776,
                2147483675: 0,
                2147483676: 133120,
                2147483677: 2080,
                2147483678: 131104,
                2147483679: 134350848
            }
        ], u = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
        ], d = n.DES = o.extend({
            _doReset: function() {
                for(var e = this._key.words, t = [], r = 0; r < 56; r++){
                    var o = i1[r] - 1;
                    t[r] = e[o >>> 5] >>> 31 - o % 32 & 1;
                }
                for(var n = this._subKeys = [], c = 0; c < 16; c++){
                    var l = n[c] = [], u = s[c];
                    for(r = 0; r < 24; r++)l[r / 6 | 0] |= t[(a[r] - 1 + u) % 28] << 31 - r % 6, l[4 + (r / 6 | 0)] |= t[28 + (a[r + 24] - 1 + u) % 28] << 31 - r % 6;
                    l[0] = l[0] << 1 | l[0] >>> 31;
                    for(r = 1; r < 7; r++)l[r] = l[r] >>> 4 * (r - 1) + 3;
                    l[7] = l[7] << 5 | l[7] >>> 27;
                }
                var d = this._invSubKeys = [];
                for(r = 0; r < 16; r++)d[r] = n[15 - r];
            },
            encryptBlock: function(e, t) {
                this._doCryptBlock(e, t, this._subKeys);
            },
            decryptBlock: function(e, t) {
                this._doCryptBlock(e, t, this._invSubKeys);
            },
            _doCryptBlock: function(e, t, r) {
                this._lBlock = e[t], this._rBlock = e[t + 1], h.call(this, 4, 252645135), h.call(this, 16, 65535), f.call(this, 2, 858993459), f.call(this, 8, 16711935), h.call(this, 1, 1431655765);
                for(var o = 0; o < 16; o++){
                    for(var n = r[o], i1 = this._lBlock, a = this._rBlock, s = 0, l = 0; l < 8; l++)s |= c[l][((a ^ n[l]) & u[l]) >>> 0];
                    this._lBlock = a, this._rBlock = i1 ^ s;
                }
                var d = this._lBlock;
                this._lBlock = this._rBlock, this._rBlock = d, h.call(this, 1, 1431655765), f.call(this, 8, 16711935), f.call(this, 2, 858993459), h.call(this, 16, 65535), h.call(this, 4, 252645135), e[t] = this._lBlock, e[t + 1] = this._rBlock;
            },
            keySize: 2,
            ivSize: 2,
            blockSize: 2
        });
        function h(e, t) {
            var r = (this._lBlock >>> e ^ this._rBlock) & t;
            this._rBlock ^= r, this._lBlock ^= r << e;
        }
        function f(e, t) {
            var r = (this._rBlock >>> e ^ this._lBlock) & t;
            this._lBlock ^= r, this._rBlock ^= r << e;
        }
        e.DES = o._createHelper(d);
        var m = n.TripleDES = o.extend({
            _doReset: function() {
                var e = this._key.words;
                if (2 !== e.length && 4 !== e.length && e.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
                var t = e.slice(0, 2), o = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4), n = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
                this._des1 = d.createEncryptor(r.create(t)), this._des2 = d.createEncryptor(r.create(o)), this._des3 = d.createEncryptor(r.create(n));
            },
            encryptBlock: function(e, t) {
                this._des1.encryptBlock(e, t), this._des2.decryptBlock(e, t), this._des3.encryptBlock(e, t);
            },
            decryptBlock: function(e, t) {
                this._des3.decryptBlock(e, t), this._des2.encryptBlock(e, t), this._des1.decryptBlock(e, t);
            },
            keySize: 6,
            ivSize: 2,
            blockSize: 2
        });
        e.TripleDES = o._createHelper(m);
    }(), function() {
        var e = l, t = e.lib.StreamCipher, r = e.algo, o = r.RC4 = t.extend({
            _doReset: function() {
                for(var e = this._key, t = e.words, r = e.sigBytes, o = this._S = [], n = 0; n < 256; n++)o[n] = n;
                n = 0;
                for(var i1 = 0; n < 256; n++){
                    var a = n % r, s = t[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                    i1 = (i1 + o[n] + s) % 256;
                    var c = o[n];
                    o[n] = o[i1], o[i1] = c;
                }
                this._i = this._j = 0;
            },
            _doProcessBlock: function(e, t) {
                e[t] ^= n.call(this);
            },
            keySize: 8,
            ivSize: 0
        });
        function n() {
            for(var e = this._S, t = this._i, r = this._j, o = 0, n = 0; n < 4; n++){
                r = (r + e[t = (t + 1) % 256]) % 256;
                var i1 = e[t];
                e[t] = e[r], e[r] = i1, o |= e[(e[t] + e[r]) % 256] << 24 - 8 * n;
            }
            return this._i = t, this._j = r, o;
        }
        e.RC4 = t._createHelper(o);
        var i1 = r.RC4Drop = o.extend({
            cfg: o.cfg.extend({
                drop: 192
            }),
            _doReset: function() {
                o._doReset.call(this);
                for(var e = this.cfg.drop; e > 0; e--)n.call(this);
            }
        });
        e.RC4Drop = t._createHelper(i1);
    }(), l.mode.CTRGladman = function() {
        var e = l.lib.BlockCipherMode.extend();
        function t(e) {
            if (255 == (e >> 24 & 255)) {
                var t = e >> 16 & 255, r = e >> 8 & 255, o = 255 & e;
                255 === t ? (t = 0, 255 === r ? (r = 0, 255 === o ? o = 0 : ++o) : ++r) : ++t, e = 0, e += t << 16, e += r << 8, e += o;
            } else e += 1 << 24;
            return e;
        }
        var r = e.Encryptor = e.extend({
            processBlock: function(e, r) {
                var o = this._cipher, n = o.blockSize, i1 = this._iv, a = this._counter;
                i1 && (a = this._counter = i1.slice(0), this._iv = void 0), function(e) {
                    0 === (e[0] = t(e[0])) && (e[1] = t(e[1]));
                }(a);
                var s = a.slice(0);
                o.encryptBlock(s, 0);
                for(var c = 0; c < n; c++)e[r + c] ^= s[c];
            }
        });
        return e.Decryptor = r, e;
    }(), function() {
        var e = l, t = e.lib.StreamCipher, r = [], o = [], n = [], i1 = e.algo.Rabbit = t.extend({
            _doReset: function() {
                for(var e = this._key.words, t = this.cfg.iv, r = 0; r < 4; r++)e[r] = 16711935 & (e[r] << 8 | e[r] >>> 24) | 4278255360 & (e[r] << 24 | e[r] >>> 8);
                var o = this._X = [
                    e[0],
                    e[3] << 16 | e[2] >>> 16,
                    e[1],
                    e[0] << 16 | e[3] >>> 16,
                    e[2],
                    e[1] << 16 | e[0] >>> 16,
                    e[3],
                    e[2] << 16 | e[1] >>> 16
                ], n = this._C = [
                    e[2] << 16 | e[2] >>> 16,
                    4294901760 & e[0] | 65535 & e[1],
                    e[3] << 16 | e[3] >>> 16,
                    4294901760 & e[1] | 65535 & e[2],
                    e[0] << 16 | e[0] >>> 16,
                    4294901760 & e[2] | 65535 & e[3],
                    e[1] << 16 | e[1] >>> 16,
                    4294901760 & e[3] | 65535 & e[0]
                ];
                this._b = 0;
                for(r = 0; r < 4; r++)a.call(this);
                for(r = 0; r < 8; r++)n[r] ^= o[r + 4 & 7];
                if (t) {
                    var i1 = t.words, s = i1[0], c = i1[1], l = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), u = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), d = l >>> 16 | 4294901760 & u, h = u << 16 | 65535 & l;
                    n[0] ^= l, n[1] ^= d, n[2] ^= u, n[3] ^= h, n[4] ^= l, n[5] ^= d, n[6] ^= u, n[7] ^= h;
                    for(r = 0; r < 4; r++)a.call(this);
                }
            },
            _doProcessBlock: function(e, t) {
                var o = this._X;
                a.call(this), r[0] = o[0] ^ o[5] >>> 16 ^ o[3] << 16, r[1] = o[2] ^ o[7] >>> 16 ^ o[5] << 16, r[2] = o[4] ^ o[1] >>> 16 ^ o[7] << 16, r[3] = o[6] ^ o[3] >>> 16 ^ o[1] << 16;
                for(var n = 0; n < 4; n++)r[n] = 16711935 & (r[n] << 8 | r[n] >>> 24) | 4278255360 & (r[n] << 24 | r[n] >>> 8), e[t + n] ^= r[n];
            },
            blockSize: 4,
            ivSize: 2
        });
        function a() {
            for(var e = this._X, t = this._C, r = 0; r < 8; r++)o[r] = t[r];
            t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < o[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < o[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < o[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < o[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < o[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < o[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < o[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < o[7] >>> 0 ? 1 : 0;
            for(r = 0; r < 8; r++){
                var i1 = e[r] + t[r], a = 65535 & i1, s = i1 >>> 16, c = ((a * a >>> 17) + a * s >>> 15) + s * s, l = ((4294901760 & i1) * i1 | 0) + ((65535 & i1) * i1 | 0);
                n[r] = c ^ l;
            }
            e[0] = n[0] + (n[7] << 16 | n[7] >>> 16) + (n[6] << 16 | n[6] >>> 16) | 0, e[1] = n[1] + (n[0] << 8 | n[0] >>> 24) + n[7] | 0, e[2] = n[2] + (n[1] << 16 | n[1] >>> 16) + (n[0] << 16 | n[0] >>> 16) | 0, e[3] = n[3] + (n[2] << 8 | n[2] >>> 24) + n[1] | 0, e[4] = n[4] + (n[3] << 16 | n[3] >>> 16) + (n[2] << 16 | n[2] >>> 16) | 0, e[5] = n[5] + (n[4] << 8 | n[4] >>> 24) + n[3] | 0, e[6] = n[6] + (n[5] << 16 | n[5] >>> 16) + (n[4] << 16 | n[4] >>> 16) | 0, e[7] = n[7] + (n[6] << 8 | n[6] >>> 24) + n[5] | 0;
        }
        e.Rabbit = t._createHelper(i1);
    }(), l.mode.CTR = function() {
        var e = l.lib.BlockCipherMode.extend(), t = e.Encryptor = e.extend({
            processBlock: function(e, t) {
                var r = this._cipher, o = r.blockSize, n = this._iv, i1 = this._counter;
                n && (i1 = this._counter = n.slice(0), this._iv = void 0);
                var a = i1.slice(0);
                r.encryptBlock(a, 0), i1[o - 1] = i1[o - 1] + 1 | 0;
                for(var s = 0; s < o; s++)e[t + s] ^= a[s];
            }
        });
        return e.Decryptor = t, e;
    }(), function() {
        var e = l, t = e.lib.StreamCipher, r = [], o = [], n = [], i1 = e.algo.RabbitLegacy = t.extend({
            _doReset: function() {
                var e = this._key.words, t = this.cfg.iv, r = this._X = [
                    e[0],
                    e[3] << 16 | e[2] >>> 16,
                    e[1],
                    e[0] << 16 | e[3] >>> 16,
                    e[2],
                    e[1] << 16 | e[0] >>> 16,
                    e[3],
                    e[2] << 16 | e[1] >>> 16
                ], o = this._C = [
                    e[2] << 16 | e[2] >>> 16,
                    4294901760 & e[0] | 65535 & e[1],
                    e[3] << 16 | e[3] >>> 16,
                    4294901760 & e[1] | 65535 & e[2],
                    e[0] << 16 | e[0] >>> 16,
                    4294901760 & e[2] | 65535 & e[3],
                    e[1] << 16 | e[1] >>> 16,
                    4294901760 & e[3] | 65535 & e[0]
                ];
                this._b = 0;
                for(var n = 0; n < 4; n++)a.call(this);
                for(n = 0; n < 8; n++)o[n] ^= r[n + 4 & 7];
                if (t) {
                    var i1 = t.words, s = i1[0], c = i1[1], l = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), u = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), d = l >>> 16 | 4294901760 & u, h = u << 16 | 65535 & l;
                    o[0] ^= l, o[1] ^= d, o[2] ^= u, o[3] ^= h, o[4] ^= l, o[5] ^= d, o[6] ^= u, o[7] ^= h;
                    for(n = 0; n < 4; n++)a.call(this);
                }
            },
            _doProcessBlock: function(e, t) {
                var o = this._X;
                a.call(this), r[0] = o[0] ^ o[5] >>> 16 ^ o[3] << 16, r[1] = o[2] ^ o[7] >>> 16 ^ o[5] << 16, r[2] = o[4] ^ o[1] >>> 16 ^ o[7] << 16, r[3] = o[6] ^ o[3] >>> 16 ^ o[1] << 16;
                for(var n = 0; n < 4; n++)r[n] = 16711935 & (r[n] << 8 | r[n] >>> 24) | 4278255360 & (r[n] << 24 | r[n] >>> 8), e[t + n] ^= r[n];
            },
            blockSize: 4,
            ivSize: 2
        });
        function a() {
            for(var e = this._X, t = this._C, r = 0; r < 8; r++)o[r] = t[r];
            t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < o[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < o[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < o[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < o[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < o[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < o[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < o[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < o[7] >>> 0 ? 1 : 0;
            for(r = 0; r < 8; r++){
                var i1 = e[r] + t[r], a = 65535 & i1, s = i1 >>> 16, c = ((a * a >>> 17) + a * s >>> 15) + s * s, l = ((4294901760 & i1) * i1 | 0) + ((65535 & i1) * i1 | 0);
                n[r] = c ^ l;
            }
            e[0] = n[0] + (n[7] << 16 | n[7] >>> 16) + (n[6] << 16 | n[6] >>> 16) | 0, e[1] = n[1] + (n[0] << 8 | n[0] >>> 24) + n[7] | 0, e[2] = n[2] + (n[1] << 16 | n[1] >>> 16) + (n[0] << 16 | n[0] >>> 16) | 0, e[3] = n[3] + (n[2] << 8 | n[2] >>> 24) + n[1] | 0, e[4] = n[4] + (n[3] << 16 | n[3] >>> 16) + (n[2] << 16 | n[2] >>> 16) | 0, e[5] = n[5] + (n[4] << 8 | n[4] >>> 24) + n[3] | 0, e[6] = n[6] + (n[5] << 16 | n[5] >>> 16) + (n[4] << 16 | n[4] >>> 16) | 0, e[7] = n[7] + (n[6] << 8 | n[6] >>> 24) + n[5] | 0;
        }
        e.RabbitLegacy = t._createHelper(i1);
    }(), l.pad.ZeroPadding = {
        pad: function(e, t) {
            var r = 4 * t;
            e.clamp(), e.sigBytes += r - (e.sigBytes % r || r);
        },
        unpad: function(e) {
            var t = e.words, r = e.sigBytes - 1;
            for(r = e.sigBytes - 1; r >= 0; r--)if (t[r >>> 2] >>> 24 - r % 4 * 8 & 255) {
                e.sigBytes = r + 1;
                break;
            }
        }
    }, l;
}), function e(t, r, o) {
    function n(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var c = "function" == typeof require && require;
                if (!s && c) return c(a, !0);
                if (i1) return i1(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l;
            }
            var u = r[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                return n(t[a][1][e] || e);
            }, u, u.exports, e, t, r, o);
        }
        return r[a].exports;
    }
    for(var i1 = "function" == typeof require && require, a = 0; a < o.length; a++)n(o[a]);
    return n;
}({
    1: [
        function(e, t, r) {
            !function(o) {
                "use strict";
                var n = function(e, t, r) {
                    this.low = 0 | e, this.high = 0 | t, this.unsigned = !!r;
                };
                n.isLong = function(e) {
                    return !0 === (e && e instanceof n);
                };
                var i1 = {}, a = {};
                n.fromInt = function(e, t) {
                    var r, o;
                    return t ? 0 <= (e >>>= 0) && e < 256 && (o = a[e]) ? o : (r = new n(e, (0 | e) < 0 ? -1 : 0, !0), 0 <= e && e < 256 && (a[e] = r), r) : -128 <= (e |= 0) && e < 128 && (o = i1[e]) ? o : (r = new n(e, e < 0 ? -1 : 0, !1), -128 <= e && e < 128 && (i1[e] = r), r);
                }, n.fromNumber = function(e, t) {
                    return t = !!t, isNaN(e) || !isFinite(e) ? n.ZERO : !t && e <= -l ? n.MIN_VALUE : !t && l <= e + 1 ? n.MAX_VALUE : t && c <= e ? n.MAX_UNSIGNED_VALUE : e < 0 ? n.fromNumber(-e, t).negate() : new n(e % s | 0, e / s | 0, t);
                }, n.fromBits = function(e, t, r) {
                    return new n(e, t, r);
                }, n.fromString = function(e, t, r) {
                    if (0 === e.length) throw Error("number format error: empty string");
                    if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return n.ZERO;
                    if ("number" == typeof t && (r = t, t = !1), (r = r || 10) < 2 || 36 < r) throw Error("radix out of range: " + r);
                    var o;
                    if (0 < (o = e.indexOf("-"))) throw Error('number format error: interior "-" character: ' + e);
                    if (0 === o) return n.fromString(e.substring(1), t, r).negate();
                    for(var i1 = n.fromNumber(Math.pow(r, 8)), a = n.ZERO, s = 0; s < e.length; s += 8){
                        var c = Math.min(8, e.length - s), l = parseInt(e.substring(s, s + c), r);
                        if (c < 8) {
                            var u = n.fromNumber(Math.pow(r, c));
                            a = a.multiply(u).add(n.fromNumber(l));
                        } else a = (a = a.multiply(i1)).add(n.fromNumber(l));
                    }
                    return a.unsigned = t, a;
                }, n.fromValue = function(e) {
                    return "number" == typeof e ? n.fromNumber(e) : "string" == typeof e ? n.fromString(e) : n.isLong(e) ? e : new n(e.low, e.high, e.unsigned);
                };
                var s = 4294967296, c = s * s, l = c / 2, u = n.fromInt(1 << 24);
                n.ZERO = n.fromInt(0), n.UZERO = n.fromInt(0, !0), n.ONE = n.fromInt(1), n.UONE = n.fromInt(1, !0), n.NEG_ONE = n.fromInt(-1), n.MAX_VALUE = n.fromBits(-1, 2147483647, !1), n.MAX_UNSIGNED_VALUE = n.fromBits(-1, -1, !0), n.MIN_VALUE = n.fromBits(0, -2147483648, !1), n.prototype.toInt = function() {
                    return this.unsigned ? this.low >>> 0 : this.low;
                }, n.prototype.toNumber = function() {
                    return this.unsigned ? (this.high >>> 0) * s + (this.low >>> 0) : this.high * s + (this.low >>> 0);
                }, n.prototype.toString = function(e) {
                    if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix out of range: " + e);
                    if (this.isZero()) return "0";
                    var t;
                    if (this.isNegative()) {
                        if (this.equals(n.MIN_VALUE)) {
                            var r = n.fromNumber(e), o = this.div(r);
                            return t = o.multiply(r).subtract(this), o.toString(e) + t.toInt().toString(e);
                        }
                        return "-" + this.negate().toString(e);
                    }
                    var i1 = n.fromNumber(Math.pow(e, 6), this.unsigned);
                    t = this;
                    for(var a = "";;){
                        var s = t.div(i1), c = (t.subtract(s.multiply(i1)).toInt() >>> 0).toString(e);
                        if ((t = s).isZero()) return c + a;
                        for(; c.length < 6;)c = "0" + c;
                        a = "" + c + a;
                    }
                }, n.prototype.getHighBits = function() {
                    return this.high;
                }, n.prototype.getHighBitsUnsigned = function() {
                    return this.high >>> 0;
                }, n.prototype.getLowBits = function() {
                    return this.low;
                }, n.prototype.getLowBitsUnsigned = function() {
                    return this.low >>> 0;
                }, n.prototype.getNumBitsAbs = function() {
                    if (this.isNegative()) return this.equals(n.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
                    for(var e = 0 != this.high ? this.high : this.low, t = 31; 0 < t && 0 == (e & 1 << t); t--);
                    return 0 != this.high ? t + 33 : t + 1;
                }, n.prototype.isZero = function() {
                    return 0 === this.high && 0 === this.low;
                }, n.prototype.isNegative = function() {
                    return !this.unsigned && this.high < 0;
                }, n.prototype.isPositive = function() {
                    return this.unsigned || 0 <= this.high;
                }, n.prototype.isOdd = function() {
                    return 1 == (1 & this.low);
                }, n.prototype.isEven = function() {
                    return 0 == (1 & this.low);
                }, n.prototype.equals = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && this.high === e.high && this.low === e.low;
                }, n.prototype.notEquals = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), !this.equals(e);
                }, n.prototype.lessThan = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), this.compare(e) < 0;
                }, n.prototype.lessThanOrEqual = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), this.compare(e) <= 0;
                }, n.prototype.greaterThan = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), 0 < this.compare(e);
                }, n.prototype.greaterThanOrEqual = function(e) {
                    return 0 <= this.compare(e);
                }, n.prototype.compare = function(e) {
                    if (this.equals(e)) return 0;
                    var t = this.isNegative(), r = e.isNegative();
                    return t && !r ? -1 : !t && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.subtract(e).isNegative() ? -1 : 1;
                }, n.prototype.negate = function() {
                    return !this.unsigned && this.equals(n.MIN_VALUE) ? n.MIN_VALUE : this.not().add(n.ONE);
                }, n.prototype.add = function(e) {
                    n.isLong(e) || (e = n.fromValue(e));
                    var t = this.high >>> 16, r = 65535 & this.high, o = this.low >>> 16, i1 = 65535 & this.low, a = e.high >>> 16, s = 65535 & e.high, c = e.low >>> 16, l = 0, u = 0, d = 0, h = 0;
                    return d += (h += i1 + (65535 & e.low)) >>> 16, u += (d += o + c) >>> 16, l += (u += r + s) >>> 16, l += t + a, n.fromBits((d &= 65535) << 16 | (h &= 65535), (l &= 65535) << 16 | (u &= 65535), this.unsigned);
                }, n.prototype.subtract = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), this.add(e.negate());
                }, n.prototype.multiply = function(e) {
                    if (this.isZero()) return n.ZERO;
                    if (n.isLong(e) || (e = n.fromValue(e)), e.isZero()) return n.ZERO;
                    if (this.equals(n.MIN_VALUE)) return e.isOdd() ? n.MIN_VALUE : n.ZERO;
                    if (e.equals(n.MIN_VALUE)) return this.isOdd() ? n.MIN_VALUE : n.ZERO;
                    if (this.isNegative()) return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
                    if (e.isNegative()) return this.multiply(e.negate()).negate();
                    if (this.lessThan(u) && e.lessThan(u)) return n.fromNumber(this.toNumber() * e.toNumber(), this.unsigned);
                    var t = this.high >>> 16, r = 65535 & this.high, o = this.low >>> 16, i1 = 65535 & this.low, a = e.high >>> 16, s = 65535 & e.high, c = e.low >>> 16, l = 65535 & e.low, d = 0, h = 0, f = 0, m = 0;
                    return f += (m += i1 * l) >>> 16, h += (f += o * l) >>> 16, f &= 65535, h += (f += i1 * c) >>> 16, d += (h += r * l) >>> 16, h &= 65535, d += (h += o * c) >>> 16, h &= 65535, d += (h += i1 * s) >>> 16, d += t * l + r * c + o * s + i1 * a, n.fromBits((f &= 65535) << 16 | (m &= 65535), (d &= 65535) << 16 | (h &= 65535), this.unsigned);
                }, n.prototype.div = function(e) {
                    if (n.isLong(e) || (e = n.fromValue(e)), e.isZero()) throw new Error("division by zero");
                    if (this.isZero()) return this.unsigned ? n.UZERO : n.ZERO;
                    var t, r, o;
                    if (this.equals(n.MIN_VALUE)) return e.equals(n.ONE) || e.equals(n.NEG_ONE) ? n.MIN_VALUE : e.equals(n.MIN_VALUE) ? n.ONE : (t = this.shiftRight(1).div(e).shiftLeft(1)).equals(n.ZERO) ? e.isNegative() ? n.ONE : n.NEG_ONE : (r = this.subtract(e.multiply(t)), o = t.add(r.div(e)));
                    if (e.equals(n.MIN_VALUE)) return this.unsigned ? n.UZERO : n.ZERO;
                    if (this.isNegative()) return e.isNegative() ? this.negate().div(e.negate()) : this.negate().div(e).negate();
                    if (e.isNegative()) return this.div(e.negate()).negate();
                    for(o = n.ZERO, r = this; r.greaterThanOrEqual(e);){
                        t = Math.max(1, Math.floor(r.toNumber() / e.toNumber()));
                        for(var i1 = Math.ceil(Math.log(t) / Math.LN2), a = i1 <= 48 ? 1 : Math.pow(2, i1 - 48), s = n.fromNumber(t), c = s.multiply(e); c.isNegative() || c.greaterThan(r);)c = (s = n.fromNumber(t -= a, this.unsigned)).multiply(e);
                        s.isZero() && (s = n.ONE), o = o.add(s), r = r.subtract(c);
                    }
                    return o;
                }, n.prototype.modulo = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), this.subtract(this.div(e).multiply(e));
                }, n.prototype.not = function() {
                    return n.fromBits(~this.low, ~this.high, this.unsigned);
                }, n.prototype.and = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), n.fromBits(this.low & e.low, this.high & e.high, this.unsigned);
                }, n.prototype.or = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), n.fromBits(this.low | e.low, this.high | e.high, this.unsigned);
                }, n.prototype.xor = function(e) {
                    return n.isLong(e) || (e = n.fromValue(e)), n.fromBits(this.low ^ e.low, this.high ^ e.high, this.unsigned);
                }, n.prototype.shiftLeft = function(e) {
                    return n.isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? n.fromBits(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : n.fromBits(0, this.low << e - 32, this.unsigned);
                }, n.prototype.shiftRight = function(e) {
                    return n.isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? n.fromBits(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : n.fromBits(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned);
                }, n.prototype.shiftRightUnsigned = function(e) {
                    if (n.isLong(e) && (e = e.toInt()), 0 == (e &= 63)) return this;
                    var t = this.high;
                    if (e < 32) {
                        var r = this.low;
                        return n.fromBits(r >>> e | t << 32 - e, t >>> e, this.unsigned);
                    }
                    return n.fromBits(32 === e ? t : t >>> e - 32, 0, this.unsigned);
                }, n.prototype.toSigned = function() {
                    return this.unsigned ? new n(this.low, this.high, !1) : this;
                }, n.prototype.toUnsigned = function() {
                    return this.unsigned ? this : new n(this.low, this.high, !0);
                }, "function" == typeof e && "object" == typeof t && t && "object" == typeof r && r ? t.exports = n : "function" == typeof define && define.amd ? define(function() {
                    return n;
                }) : (o.dcodeIO = o.dcodeIO || {}).Long = n;
            }(this);
        },
        {}
    ],
    2: [
        function(e, t, r) {
            t.exports = e("./dist/Long.js");
        },
        {
            "./dist/Long.js": 1
        }
    ],
    3: [
        function(e, t, r) {
            Long = e("long");
        },
        {
            long: 2
        }
    ]
}, {}, [
    3
]), chrome.tabs.onUpdated.addListener(function(e, t, r) {
    void 0 !== t.status && -1 != r.url.indexOf("blocked") ? "complete" != t.status ? -1 != r.url.indexOf("blocked") && (-1 != r.url.indexOf("securly.com") || selfInformation.hasOwnProperty("id") && -1 != r.url.indexOf(selfInformation.id)) && (tabsBeingBlocked[e] = r.url) : delete tabsBeingBlocked[e] : void 0 !== t.status && "complete" == t.status && void 0 !== tabsBeingBlocked[e] && chrome.tabs.update(e, {
        url: tabsBeingBlocked[e]
    }, function() {});
}), chrome.webRequest.onErrorOccurred.addListener(function(e) {
    "net::ERR_ABORTED" == e.error && "main_frame" == e.type && -1 != e.url.indexOf("blocked") && void 0 != typeof tabsBeingBlocked[e.tabId] && chrome.tabs.update(e.tabId, {
        url: tabsBeingBlocked[e.tabId]
    }, function(e) {});
}, {
    urls: [
        "*://*.securly.com/*"
    ]
}), chrome.webRequest.onBeforeSendHeaders.addListener(async function(e) {
    isBrokered = !1;
    var t = !1;
    if (e.requestHeaders.forEach(function(e) {
        "Purpose" == e.name && "prefetch" == e.value && (t = !0);
    }), !t) {
        var r = e.url, o = await interceptOrNot(e);
        1 == o && (o = checkSkipListCaching(e));
        r.length > 1e3 && (r = r.substring(0, 1e3));
        var n = btoa(r), i1 = new URL(r).hostname.toLowerCase();
        if (-1 != (i1 = normalizeHostname(i1)).indexOf("google.co") && -1 != i1.indexOf("mail.google.co")) {
            let e = await _getResCode(i1, n);
            if (null != e) {
                if ("GM" == (c = e.split(":"))[0]) return void chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "X-GoogApps-Allowed-Domains",
                                        operation: "set",
                                        value: c[4]
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*google\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 1,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        1
                    ]
                });
                chrome.declarativeNetRequest.getDynamicRules(function(e) {
                    e.forEach((e)=>{
                        1 == e.id && chrome.declarativeNetRequest.updateDynamicRules({
                            removeRuleIds: [
                                1
                            ]
                        });
                    });
                });
            }
        }
        if (1 == o) {
            var a = "", s = !1, c = null;
            if (e && void 0 !== e.initiator && null !== e.initiator) try {
                var l = new URL(e.initiator);
                a = btoa(l.hostname.toLowerCase());
            } catch (e) {}
            if ("sub_frame" == e.type ? (s = !0, s = !0, brokredRequest = []) : (s = !1, s = !1, youtubeFrames = []), (-1 !== r.indexOf("youtube.") && !1 === checkYouTube || -1 === r.indexOf("youtube.") || e.initiator !== refDomain) && (c = await getRespArr(i1, n, "", r, a, s)), null != c) {
                var u = c[0], d = c[2], h = c[4];
                return this.iframeResp.length > 0 && "DENY" == this.iframeResp[0] ? (this.iframeResp = "", {
                    cancel: !0
                }) : (-1 !== r.indexOf("youtube.") && "REFWL" == d ? (refDomain = e.initiator, checkYouTube = !1) : -1 !== r.indexOf("youtube.") && (checkYouTube = !0), "GM" == u ? chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "X-GoogApps-Allowed-Domains",
                                        operation: "set",
                                        value: c[4]
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*google\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 1,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        1
                    ]
                }) : chrome.declarativeNetRequest.getDynamicRules(function(e) {
                    e.forEach((e)=>{
                        1 == e.id && chrome.declarativeNetRequest.updateDynamicRules({
                            removeRuleIds: [
                                1
                            ]
                        });
                    });
                }), "YT" == u ? void (2 == h ? chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "YouTube-Restrict",
                                        operation: "set",
                                        value: "Strict"
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*youtube(-nocookies)?\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 2,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        2
                    ]
                }) : 1 == h && chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "YouTube-Restrict",
                                        operation: "set",
                                        value: "Moderate"
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*youtube(-nocookies)?\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 2,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        2
                    ]
                })) : void 0);
            }
        }
    }
}, {
    urls: [
        "*://*.youtube.com/*",
        "*://accounts.google.com/*",
        "*://mail.google.com/*",
        "*://drive.google.com/*"
    ]
}, [
    "requestHeaders"
]), chrome.webRequest.onCompleted.addListener(function(e) {
    chrome.scripting.executeScript({
        target: {
            tabId: e.tabId,
            allFrames: !0
        },
        injectImmediately: !0,
        world: "MAIN",
        func: ()=>{
            var e = document.createElement("script");
            e.innerHTML = "\n\t\t\t\tif (typeof fetchPatch == 'undefined') {\n\t\t\t\t\tconst fetchPatch = () => {\n\t\t\t\t\t\tconst {fetch: origFetch} = window;\n\t\t\t\t\t\twindow.fetch = async (...args) => {\n\t\t\t\t\t\t\tconst response = await origFetch(...args);\n\t\t\t\t\t\t\tresponse\n\t\t\t\t\t\t\t\t.clone()\n\t\t\t\t\t\t\t\t.text()\n\t\t\t\t\t\t\t\t.then(body => {\n\t\t\t\t\t\t\t\t\tif (args[0].url.indexOf('/youtubei/v1/player?') > -1) {\n\t\t\t\t\t\t\t\t\t\tconst domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;\n\t\t\t\t\t\t\t\t\t\twindow.postMessage({ type: 'YOUTUBE_PLAYER_CALL', payload: {responsebody: body, url: window.location.href }}, domain);\n\t\t\t\t\t\t\t\t\t\tlastVideoUrl = window.location.href;\n\t\t\t\t\t\t\t\t\t} else if (args[0].url.indexOf('/youtubei/v1/next?') > -1) {\n\t\t\t\t\t\t\t\t\t\tconst domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;\n\t\t\t\t\t\t\t\t\t\twindow.postMessage({ type: 'YOUTUBE_NEXT_CALL', payload: {responsebody: body, url: window.location.href }}, domain);\n\t\t\t\t\t\t\t\t\t\tlastVideoNextUrl = window.location.href;\n\t\t\t\t\t\t\t\t\t} else if (args[0].url.indexOf('/youtubei/v1/browse?') > -1) {\n\t\t\t\t\t\t\t\t\t\tconst domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;\n\t\t\t\t\t\t\t\t\t\twindow.postMessage({ type: 'YOUTUBE_BROWSE_CALL', payload: {responsebody: body, url: window.location.href }}, domain);\n\t\t\t\t\t\t\t\t\t\tlastChannelUrl = window.location.href;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.catch(err => {});\n\t\t\t\t\t\t\treturn response;\n\t\t\t\t\t\t};\n\t\t\t\t\t};\n\t\t\t\t\tfetchPatch();\n\t\t\t\t}", e.onload = function() {
                this.remove();
            }, (document.head || document.documentElement).appendChild(e);
        }
    }).catch((e)=>{});
}, {
    urls: [
        "https://www.youtube.com/*",
        "https://www.youtube-nocookie.com/*"
    ]
}), chrome.webRequest.onBeforeRequest.addListener(function(e) {
    if (host = new URL(e.url).host, "securly.com" != host && host.indexOf(".securly.com") < 0) try {
        var t;
        for(onBeforeRequestListener(e).then((e)=>{
            t = e;
        }).catch((e)=>{
            t = {};
        }); void 0 == typeof t;);
        return t;
    } catch (e) {
        return {};
    }
}, {
    urls: [
        "<all_urls>"
    ],
    types: [
        "main_frame",
        "sub_frame",
        "xmlhttprequest"
    ]
}, [
    "blocking",
    "requestBody"
]), chrome.webRequest.onErrorOccurred.addListener(function(e) {
    "net::ERR_ABORTED" == e.error && "main_frame" == e.type && -1 != e.url.indexOf("blocked") && void 0 != typeof tabsBeingBlocked[e.tabId] && chrome.tabs.update(e.tabId, {
        url: tabsBeingBlocked[e.tabId]
    }, function(e) {});
}, {
    urls: [
        "*://*.securly.com/*"
    ]
}), chrome.webRequest.onBeforeSendHeaders.addListener(async function(e) {
    isBrokered = !1;
    var t = !1;
    if (e.requestHeaders.forEach(function(e) {
        "Purpose" == e.name && "prefetch" == e.value && (t = !0);
    }), !t) {
        var r = e.url, o = await interceptOrNot(e);
        1 == o && (o = checkSkipListCaching(e));
        r.length > 1e3 && (r = r.substring(0, 1e3));
        var n = btoa(r), i1 = new URL(r).hostname.toLowerCase();
        if (-1 != (i1 = normalizeHostname(i1)).indexOf("google.co") && -1 != i1.indexOf("mail.google.co")) {
            let e = await _getResCode(i1, n);
            if (null != e) {
                if ("GM" == (c = e.split(":"))[0]) return void chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "X-GoogApps-Allowed-Domains",
                                        operation: "set",
                                        value: c[4]
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*google\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 1,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        1
                    ]
                });
                chrome.declarativeNetRequest.getDynamicRules(function(e) {
                    e.forEach((e)=>{
                        1 == e.id && chrome.declarativeNetRequest.updateDynamicRules({
                            removeRuleIds: [
                                1
                            ]
                        });
                    });
                });
            }
        }
        if (1 == o) {
            var a = "", s = !1, c = null;
            if (e && void 0 !== e.initiator && null !== e.initiator) try {
                var l = new URL(e.initiator);
                a = btoa(l.hostname.toLowerCase());
            } catch (e) {}
            if ("sub_frame" == e.type ? (s = !0, s = !0, brokredRequest = []) : (s = !1, s = !1, youtubeFrames = []), (-1 !== r.indexOf("youtube.") && !1 === checkYouTube || -1 === r.indexOf("youtube.") || e.initiator !== refDomain) && (c = await getRespArr(i1, n, "", r, a, s)), null != c) {
                var u = c[0], d = c[2], h = c[4];
                return this.iframeResp.length > 0 && "DENY" == this.iframeResp[0] ? (this.iframeResp = "", {
                    cancel: !0
                }) : (-1 !== r.indexOf("youtube.") && "REFWL" == d ? (refDomain = e.initiator, checkYouTube = !1) : -1 !== r.indexOf("youtube.") && (checkYouTube = !0), "GM" == u ? chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "X-GoogApps-Allowed-Domains",
                                        operation: "set",
                                        value: c[4]
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*google\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 1,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        1
                    ]
                }) : chrome.declarativeNetRequest.getDynamicRules(function(e) {
                    e.forEach((e)=>{
                        1 == e.id && chrome.declarativeNetRequest.updateDynamicRules({
                            removeRuleIds: [
                                1
                            ]
                        });
                    });
                }), "YT" == u ? void (2 == h ? chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "YouTube-Restrict",
                                        operation: "set",
                                        value: "Strict"
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*youtube(-nocookies)?\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 2,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        2
                    ]
                }) : 1 == h && chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            action: {
                                type: "modifyHeaders",
                                requestHeaders: [
                                    {
                                        header: "YouTube-Restrict",
                                        operation: "set",
                                        value: "Moderate"
                                    }
                                ]
                            },
                            condition: {
                                regexFilter: "^https://([a-z0-9]+\\.)*youtube(-nocookies)?\\.com(.*)",
                                resourceTypes: [
                                    "main_frame",
                                    "sub_frame",
                                    "xmlhttprequest",
                                    "websocket"
                                ]
                            },
                            id: 2,
                            priority: 1
                        }
                    ],
                    removeRuleIds: [
                        2
                    ]
                })) : void 0);
            }
        }
    }
}, {
    urls: [
        "*://*.youtube.com/*",
        "*://accounts.google.com/*",
        "*://mail.google.com/*",
        "*://drive.google.com/*"
    ]
}, [
    "requestHeaders"
]), chrome.identity.onSignInChanged.addListener(function(e, t) {
    !0 === t && fetchUserAPI();
}), chrome.idle.onStateChanged.addListener(function(e) {
    lastKnownState != e && ("active" == e && "idle" != lastKnownState && (clearObjectStore("Broker"), featureConfig && 1 == featureConfig.reload_tabs ? rebrokerLoadedTabs() : chrome.windows.getAll({
        populate: !0
    }, function(e) {
        for(var t = 0; t < e.length; t++)for(var r = 0; r < e[t].tabs.length; r++)"chrome://" != e[t].tabs[r].url.substring(0, 9) && tabCheck.forEach(function(o) {
            -1 !== e[t].tabs[r].url.indexOf(o) && chrome.tabs.reload(e[t].tabs[r].id, {
                bypassCache: !0
            });
        });
    })), lastKnownState = e);
}), chrome.runtime.onConnect.addListener(function(e) {
    "yt" == e.name ? e.onMessage.addListener(async function(t, r) {
        if (checkYouTube && "getYoutubeOptions" != t.action && "getYoutubeJson" != t.action) {
            if (youtubeLastCheck = Date.now(), "unknown" != clusterUrl && "AVOID_OS" != clusterUrl && "UNKNOWN_SCHOOL" != clusterUrl && -1 === youtubeFrames.indexOf(e.sender.frameId) && (null != t.channelId || null != t.videoId || null != t.category)) {
                youtubeFrames[youtubeFrames.length] = e.sender.frameId;
                let n = {
                    channelId: t.channelId,
                    videoId: t.videoId,
                    category: t.category
                }, i1 = btoa(r.sender.url), a = new URL(r.sender.url);
                lHostName = a.hostname.toLowerCase();
                let s = lHostName;
                lHostName = normalizeHostname(s);
                let c = "", l = "";
                var o = new URL(r.sender.url);
                l = btoa(o.hostname.toLowerCase());
                let u = await getRespArrTabs(lHostName, i1, c, r.sender.url, r.sender.tab.id, l, t.embedded, this, n), d = u[0], h = u[1];
                "DENY" == d ? 0 == t.embedded && chrome.tabs.update(r.sender.tab.id, takeDenyAction(h, 2, i1)) : this.iframeResp.length > 0 && "DENY" == this.iframeResp[0] && (this.iframeResp = "", e.postMessage({
                    hideRecommended: hideRecommended,
                    hideComments: hideComments,
                    hideSidebar: hideSidebar,
                    hideThumbnails: hideThumbnails,
                    checkEmbed: !0,
                    action: "deny",
                    url: this.iframeBlockUrl
                }));
            }
        } else if ("getYoutubeJson" === t.action) {
            if (youtubeLastCheck = Date.now(), "unknown" != clusterUrl && "AVOID_OS" != clusterUrl && "UNKNOWN_SCHOOL" != clusterUrl) {
                if (void 0 === t.data.responsebody) return;
                var n = JSON.parse(t.data.responsebody);
                if ("undefined" != t.data.url && (t.data.url.indexOf("watch?") > -1 || t.data.url.indexOf("/c/") > -1 || t.data.url.indexOf("/channel/") > -1) && t.url !== lastVideoUrl) {
                    lastVideoUrl = t.data.url;
                    let i1 = t.data.customChannelName, a = {
                        channelId: "" != i1 ? i1 : n.videoDetails.channelId,
                        videoId: n.hasOwnProperty("videoDetails") ? n.videoDetails.videoId : "",
                        category: n.microformat.hasOwnProperty("playerMicroformatRenderer") ? n.microformat.playerMicroformatRenderer.category : ""
                    }, s = btoa(t.data.url), c = new URL(t.data.url);
                    lHostName = c.hostname.toLowerCase();
                    let l = lHostName;
                    lHostName = normalizeHostname(l);
                    let u = "", d = "";
                    o = new URL(t.data.url);
                    d = btoa(o.hostname.toLowerCase());
                    let h = await getRespArrTabs(lHostName, s, u, t.data.url, r.sender.tab.id, d, t.embedded, this, a), f = h[0], m = h[1];
                    "DENY" == f ? 0 == t.embedded && chrome.tabs.update(r.sender.tab, takeDenyAction(m, 2, s)) : this.iframeResp.length > 0 && "DENY" == this.iframeResp[0] && (this.iframeResp = "", e.postMessage({
                        hideRecommended: hideRecommended,
                        hideComments: hideComments,
                        hideSidebar: hideSidebar,
                        hideThumbnails: hideThumbnails,
                        checkEmbed: !0,
                        action: "deny",
                        url: this.iframeBlockUrl
                    }));
                }
            }
        } else "getYoutubeOptions" === t.action && e.postMessage({
            hideRecommended: hideRecommended,
            hideComments: hideComments,
            hideSidebar: hideSidebar,
            hideThumbnails: hideThumbnails
        });
    }) : "search_engine_parser" == e.name ? e.onMessage.addListener(function(t, r) {
        if ("fetchResult" == t.action && selfharmlist.length > 0) e.postMessage(selfharmlist);
        else if ("sendSHResult" == t.action) {
            if (0 == t.msg.length || t.domain + t.msg == lastSearch) return;
            lastSearch = t.domain + t.msg, sendSHDataToServer(t.msg, t.url, t.matchedTerm, t.domain);
        }
    }) : "think_twice" == e.name ? e.onMessage.addListener(function(t, r) {
        "fetchThinkTwice" == t.action ? e.postMessage({
            ...featureConfig,
            ...{
                bullyPhrases: bullyPhrases,
                wlBullyPhrases: wlBullyPhrases,
                thinkTwiceSites: thinkTwiceSites
            }
        }) : "sendThinkTwiceAnalytics" == t.action && sendThinkTwiceAnalytics(t.tt_id, t.site, t.tt_action, t.typedText, t.matchedPhrase);
    }) : "gchat-widget" == e.name ? e.onMessage.addListener(function(t, r) {
        "fetchInitialConfiguration" == t.action ? e.postMessage({
            action: "initConfig",
            phraseMatchList: phraseMatchList,
            featureConfig: featureConfig
        }) : "sendGoogleChatAnaltics" == t.action && sendGoogleChatAnalytics(JSON.parse(t.data));
    }) : "gmaps" == e.name ? e.onMessage.addListener(function(e, t) {
        if (e.url != lastMapsUrl) {
            lastMapsUrl = e.url;
            let r = btoa(e.url), o = new URL(e.url);
            lHostName = o.hostname.toLowerCase();
            let n = lHostName;
            lHostName = normalizeHostname(n);
            let i1 = getRespArrTabs(lHostName, r, "", e.url, t.sender.tab.id, "", !1, this), a = i1[0], s = i1[1];
            "DENY" == a && chrome.tabs.update(t.sender.tab, takeDenyAction(s, 2, r));
        }
    }) : "gmeet" == e.name ? e.onMessage.addListener(function(e, t) {
        if (e.url != previousMeetUrl) {
            previousMeetUrl = e.url;
            let r = btoa(e.url), o = new URL(e.url);
            lHostName = o.hostname.toLowerCase();
            let n = lHostName;
            lHostName = normalizeHostname(n);
            let i1 = getRespArrTabs(lHostName, r, "", e.url, t.sender.tab.id, "", !1, this), a = i1[0], s = i1[1];
            "DENY" == a && chrome.tabs.update(t.sender.tab, takeDenyAction(s, 2, r));
        }
    }) : "geoloc" == e.name && e.onMessage.addListener(function(e, t) {
        if ("location" == e.action) {
            let r = String(e.coordinates).split(",");
            geoLat = r[0], geoLng = r[1], null != geoLat && null != geoLng && (0 == valueExistsInStore("Config", "geolocation") ? addDataToObjectStore("Config", "name", "geolocation", geoLat + "," + geoLng) : updateDataInObjectStore("Config", "name", "geolocation", geoLat + "," + geoLng)), chrome.windows.getAll((e)=>{
                e.length > 1 && (chrome.windows.remove(t.sender.tab.windowId).catch((e)=>{}), void 0 !== geoWindows[t.sender.tab.windowId] && delete geoWindows[t.sender.tab.windowId]);
            });
        } else "locationError" == e.action && chrome.windows.getAll((e)=>{
            e.length > 1 && (chrome.windows.remove(t.sender.tab.windowId).catch((e)=>{}), void 0 !== geoWindows[t.sender.tab.windowId] && delete geoWindows[t.sender.tab.windowId]);
        });
    });
}), chrome.downloads.onCreated.addListener(function(e) {
    var t = e.url;
    if ("text/html" == e.mime) {
        t.length > 1e3 && (t = t.substring(0, 1e3));
        var r = btoa(t), o = new URL(t).hostname.toLowerCase();
        if ("DENY" == getRespArr(o = normalizeHostname(o), r, "", t)[0]) return chrome.downloads.cancel(e.id), void chrome.downloads.removeFile(e.id);
    }
}), chrome.alarms.onAlarm.addListener(function(e) {
    "hourPolicyUpdate" == e.name ? (getGeolocationStatus(), getFeatureConfig(), brokredRequest = []) : "geolocationFetch" == e.name ? getGeolocation() : "latencyCheck" == e.name ? latencyPing() : "downloadConfig" == e.name ? downloadConfig() : "fetchClusterUrl" == e.name && fetchClusterUrl();
}), chrome.windows.onCreated.addListener(function() {
    chrome.windows.getCurrent({}, async (e)=>{
        await chrome.system.display.getInfo({}, function(t) {
            let r = !1;
            t.forEach((t)=>{
                if (!r && t.isPrimary && (r = !0, t.workArea.hasOwnProperty("width") && e.hasOwnProperty("width"))) {
                    let r = t.workArea.width / 2 / 2, o = t.workArea.height / 2 / 2, n = t.workArea.height / 2, i1 = t.workArea.width / 2;
                    e.width < i1 && e.height < n && "maximized" != e.state && "fullscreen" != e.state && "locked-fullscreen" != e.state && chrome.windows.update(e.id, {
                        width: i1,
                        height: n,
                        top: o,
                        left: r
                    });
                }
            });
        });
    });
}), chrome.windows.onRemoved.addListener(function() {
    chrome.windows.getCurrent({}, async (e)=>{
        await chrome.system.display.getInfo({}, function(t) {
            let r = !1;
            t.length < 1 || t.forEach((t)=>{
                if (!r && t.isPrimary && (r = !0, "object" == typeof t.workArea && t.workArea.hasOwnProperty("width") && e.hasOwnProperty("width"))) {
                    let r = t.workArea.width / 2 / 2, o = t.workArea.height / 2 / 2, n = t.workArea.height / 2, i1 = t.workArea.width / 2;
                    e.width < i1 && e.height < n && "maximized" != e.state && "fullscreen" != e.state && "locked-fullscreen" != e.state && chrome.windows.update(e.id, {
                        width: i1,
                        height: n,
                        top: o,
                        left: r
                    });
                }
            });
        });
    });
});
class FailedOpen {
    constructor(e, t){
        this.wideOpenMode = 0, this.cipaMode = 1, this.mode = e, this.duration = t, void 0 !== this.mode && null != this.mode && -1 != this.mode || (this.mode = 1), void 0 !== this.duration && null != this.duration && -1 != this.duration || (this.duration = 300), this.timeStamp = Math.floor(Date.now() / 1e3);
    }
    isFailedOpen() {
        return Math.floor(Date.now() / 1e3) - this.timeStamp < this.duration;
    }
    isWideOpenMode() {
        return this.mode == this.wideOpenMode;
    }
}
const wellPathWidgBg = function() {
    var e = null, t = 0, r = (r)=>{
        if (clusterUrl.includes("https://")) {
            var o = new URL(clusterUrl).host;
            chrome.cookies.getAll({
                domain: o,
                name: "wellness_widget_status"
            }, async (o)=>{
                if (o && 0 == o.length) return;
                const n = decodeURIComponent(o[0].value).split(":");
                if (!n.length || "show" == n[1]) try {
                    const o = {
                        source: "well-path-widget",
                        action: "display",
                        data: await (async ()=>new Promise((r, o)=>{
                                "notloggedin" == userEmail && o();
                                try {
                                    var n = (new Date).getTime() / 1e3;
                                    if (n - t <= 5 && o("response was saved in last 5 seconds"), null != e && e.userEmail == userEmail && n - e.timestamp <= 1800) return void r(e.content);
                                    createRequest("get", clusterUrl + "/wellnessPathwaysWidgets?action=getWidget").then((e)=>e.ok ? e.json() : (console.log("Error in fetching wellness pathways widget"), void o())).then((t)=>{
                                        n, void 0 !== t && "" != t && t.widget ? (e = {
                                            userEmail: userEmail,
                                            id: t.widget.id,
                                            content: t.widget.content,
                                            timestamp: (new Date).getTime()
                                        }, r(responseJSON.widget.content)) : o();
                                    });
                                } catch (e) {
                                    console.error("Error in fetching widget data", e), o();
                                }
                            }))()
                    };
                    void 0 !== r && r ? chrome.tabs.sendMessage(r, o) : chrome.tabs.query({}, (e)=>{
                        e.forEach((e, t)=>{
                            chrome.tabs.sendMessage(e.id, o);
                        });
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        }
    };
    return chrome.runtime.onMessage.addListener((e, o)=>{
        console.debug("wpw msg received", e, o), "object" == typeof e && void 0 !== e.action && void 0 !== e.source && void 0 !== o.tab.id && -1 != o.tab.id && o.tab.id && "well-path-widget" == e.source && ("ready" == e.action && r(o.tab.id), "ctaClicked" != e.action && "closed" != e.action || (function(e) {
            try {
                t = (new Date).getTime() / 1e3;
                var r = {
                    action: "saveResponse",
                    ctaLabel: "close",
                    ctaLink: "NULL"
                };
                "ctaClicked" == e.action && (r.ctaLabel = e.label, r.ctaLink = e.link), fetch(clusterUrl + "/wellnessPathwaysWidgets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(r)
                }).then((e)=>{
                    if (e.ok) return e.json();
                    console.error("Error in saving widget response", e.status);
                }).then((e)=>{
                    e.success && console.log("wpw response saved");
                }).catch((e)=>{
                    console.error("Error in saving widget response", e);
                });
            } catch (e) {
                console.error("Error in saving widget response", e);
            }
        }(e), chrome.tabs.query({}, function(e) {
            e.forEach(function(e) {
                chrome.tabs.sendMessage(e.id, {
                    source: "well-path-widget",
                    action: "remove"
                });
            });
        })));
    }), {
        triggerWidgetDisplay: r
    };
}();
function interceptPostRequest(e) {
    if (vectorExpansionRules) {
        var t = Object.keys(vectorExpansionRules);
        if (0 != t.length && (mainHost = cleanURL(new URL(e.initiator).hostname.toLowerCase()), t && -1 != t.indexOf(mainHost))) for(let t = 0; t < vectorExpansionRules[mainHost].length; t += 1)try {
            let o = vectorExpansionRules[mainHost][t].pattern, n = vectorExpansionRules[mainHost][t].context, i1 = vectorExpansionRules[mainHost][t].field, a = vectorExpansionRules[mainHost][t].content, s = o.replaceAll(".", "\\.").replaceAll("*", ".*").replaceAll("/", "\\/"), c = new RegExp(s), l = "";
            if (c.test(e.url)) {
                if ("JSON_STR" == a) {
                    let r = vectorExpansionRules[mainHost][t].data.split("|").reduce((e, t)=>e[t], e);
                    if (jsonInfo = JSON.parse(r), Array.isArray(i1)) for(let e = 0; e < i1.length; e += 1)tempText = removeHTMLTags(i1[e].split("|").reduce((e, t)=>e[t], jsonInfo)), l = l.length > 0 ? l + " " + tempText : tempText;
                    else l = removeHTMLTags(i1.split("|").reduce((e, t)=>e[t], jsonInfo));
                } else if ("ENCODED_STR" == a) {
                    if (buff = e.requestBody.raw[0].bytes, postContent = buff2StrWithEmoji(buff), Array.isArray(i1)) for(let e = 0; e < i1.length; e += 1)tempText = i1[e].split("|").reduce((e, t)=>new URLSearchParams(e).get(t), postContent), l = l.length > 0 ? l + " " + tempText : tempText;
                    else l = i1.split("|").reduce((e, t)=>new URLSearchParams(e).get(t), postContent);
                    l = "reddit.com" == mainHost ? removeHTMLTags(fetchStringFromJSONObj(JSON.parse(l), "t")) : removeHTMLTags(l);
                } else if ("ENCODED" == a) {
                    buff = e.requestBody.raw[0].bytes, a = buff2StrWithEmoji(buff);
                    let t = JSON.parse(a);
                    if (Array.isArray(i1)) for(let e = 0; e < i1.length; e += 1)"tumblr.com" == mainHost && "content" == i1[e] ? tempText = removeHTMLTags(fetchStringFromJSONObj(t, "text")) : tempText = removeHTMLTags(i1[e].split("|").reduce((e, t)=>e[t], t)), l = l.length > 0 ? l + " " + tempText : tempText;
                    else l = removeHTMLTags(i1.split("|").reduce((e, t)=>e[t], t));
                } else if ("DOUBLE_ENCODED" == a) {
                    buff = e.requestBody.raw[0].bytes, a = buff2StrWithEmoji(buff);
                    let t = JSON.parse(a), o = i1.split("||");
                    if ("quora.com" == mainHost && (t && t.queryName && -1 != t.queryName.indexOf("answerCreate") && (n = "ANSWER"), t && t.queryName && -1 != t.queryName.toLowerCase().indexOf("draft"))) continue;
                    if (o.length > 0) {
                        var r = o[0].split("|").reduce((e, t)=>e[t], t);
                        l = removeHTMLTags(l = fetchStringFromJSONObj(JSON.parse(r), "text"));
                    }
                } else if ("QUERY_PARAM" == a) {
                    l = new Proxy(new URLSearchParams(e.url), {
                        get: (e, t)=>e.get(t)
                    })[i1];
                } else if (Array.isArray(i1)) for(let t = 0; t < i1.length; t += 1)tempText = removeHTMLTags(i1[t].split("|").reduce((e, t)=>{
                    try {
                        return -1 == t.indexOf("!") ? e[t] : e[t.split("!")[0]][t.split("!")[1]];
                    } catch (e) {
                        return "";
                    }
                }, e)), "reddit.com" == mainHost && -1 != i1[t].indexOf("richtext_json") && tempText.length > 0 && (textStr = removeHTMLTags(fetchStringFromJSONObj(JSON.parse(tempText), "t")), captionStr = removeHTMLTags(fetchStringFromJSONObj(JSON.parse(tempText), "c")), tempText = textStr + " " + captionStr), l = l.length > 0 ? l + " " + tempText : tempText;
                else l = removeHTMLTags(i1.split("|").reduce((e, t)=>-1 == t.indexOf("!") ? e[t] : e[t.split("!")[0]][t.split("!")[1]], e));
                l && -1 != l.trim().indexOf(" ") && sendSocialPostToServer(l, mainHost, n, e.url);
            }
        } catch (e) {}
    }
}
function fetchStringFromJSONObj(e, t) {
    let r = "";
    for(let o in e)"object" == typeof e[o] ? r = r + " " + fetchStringFromJSONObj(e[o], t).trim() : o == t && (r = r + " " + e[o]);
    return r.trim();
}
var userStatus = {
    NOTFOUND: -1,
    FOUND: 1
}, clusterStatus = {
    ERROR: -2,
    NOTFOUND: -1,
    FOUND: 1,
    AVOID_OS: 2,
    UNKNOWN_SCHOOL: 3
}, version = "-", userFound = userStatus.NOTFOUND, clusterFound = clusterStatus.NOTFOUND, userEmail = "notloggedin", clusterUrl = "unknown", ytpref = "prefnotchecked", ytprefnewvalue = "notset", selfInformation = {}, hideComments = !1, hideRecommended = !1, hideThumbnails = !1, hideSidebar = !1, ytOptionsLastCheck = null, youtubeFrames = [], checkYouTube = !0, refDomain = "", ytOptionsCheckInProgress = !1, lastVideoUrl = "", lastMapsUrl = "", geolocation = !1, geoLat = null, geoLng = null, geoIntervalId = null, geoLastIP = null, geoWindows = {}, checkingGeoIP = !1, needToReloadTabs = 1, isBlockedYTVideo = !1, debugIWF = 0, isSubFrame = !1, checkiFrames = 0, failedOpenObj = null, twitterMessageURI = "/statuses/update.json", twitterPrefetchTimestamp = "prefetchtimestamp", tabsBeingBlocked = {}, brokredRequest = [], brokeredArrIndex = 0, lastBrokeredRequest = "", lastBeforeRequestURL = "", lastBeforeRequestTS = 0, isRebrokerRequest = !1, lastSearch = "", fid = null, latencyFrequency = 6e5, latencyAPI = null, latencyInterval = null, defaultConfigTTL = currentConfigTTL = 36e5, skipList = [], selfharmlist = [], bullyPhrases = [], wlBullyPhrases = [], thinkTwicePassPhrase = "Th!nkTw!ce";
const phraseMatchPassPhrase = "SeCuRlY@321$";
var db, featureConfig = {}, phraseMatchList = {
    Bully: [],
    Grief: [],
    Violence: []
}, vectorExpansionRules = {};
const DB_NAME = "securly", DB_VERSION = 1;
var isStartup = !1, previousMeetUrl = "";
function restoreData() {
    isStartup || extensionStartup();
}
setInterval(clearBlob, 3e3), chrome.runtime.onStartup.addListener(function() {
    isStartup = !0, extensionStartup();
}), chrome.runtime.onInstalled.addListener(function() {
    isStartup = !0, extensionStartup();
}), setTimeout(restoreData, 20);
