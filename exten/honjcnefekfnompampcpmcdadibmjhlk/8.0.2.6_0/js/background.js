/**
 * Originated by Stoneware, Inc.  http://www.stone-ware.com
 *
 * The enclosed material is Stoneware Confidential and is the sole
 * property of Stoneware, Inc.  Unauthorized disclosure, distribution
 * or other use of this material is expressly prohibited.
 *
 * (c) Copyright 1999-2014 Stoneware, Inc.  All rights reserved.
**/

"use strict";

var lastUrl = "";
var lastTitle = "";
var lastBlockedUrl = "";
var useXMLHttp = true;
var limitingFlags = 0;
var limitingState = 0;
var urlList = [];
var rawUrlList = [];
var urlListType = 0;

var blockIPAddresses = false;
var blockIncognito = false;
var tabWindowId = 0;
var lastLimitFlags = 0;
var limitTimeout = 30; // 20 seconds

var ALLOW_ALL = "0";
var BLOCK_ALL = "1";
var ALLOW_SPECIFIC = "2";
var BLOCK_SPECIFIC = "3";

// limiting flags (selected..)
var DISABLE_WEB_PORT80 =		0x800000E0;
var ALLOW_SPECIFIC_APPS =		0x000800E0;
var DISABLE_SPECIFIC_APPS =		0x001000E0;
var DISABLE_DOTTEDCECIMALS =	0x00400000;
var DISABLE_WEB_CHROME =		0x000001E0;
var ENABLE_TASKMANAGER =		0x000002E0;
var DISABLE_PRIVATE_BROWSE =	0x000004E0;
var DISABLE_TASKMANAGER =		0x000010E0;

var bannedWordList = [];
var keylogQueue = new Array(50);
var keylogQueueIndex = 0;
var bannedWordListSender = "";
var keystrokeInjectionActive = false;
var alreadyKLInjectedCurrentTabs = false;
var blockVideoPiP = false;

var ChromeAppsWhitelist = [ 
"cclepbmimdmoahcbccbpbnpfnaakheja", // LanSchool chrome student (unpacked)
"ifeifkfohlobcbhmlfkenopaimbmnahb", // LanSchool chrome student (release)
"hgdgmhjbhldlejgpjbphhoegapekcbcc", // LanSchool chrome student (beta channel)
"bkpmdfhpeipddklkilbhdbiondaopaan",	// LanSchool chrome student (beta 2)
"hkagldgmfcgclgpffbjplnppjmbgedig",	// LanSchool chrome student (beta 3)
"glifclcedbcpeplpmnplaekopdgjggcd", // LanSchool chrome student (redist crx)
"jhiggjblhjhknbhjffjpfoanbghcfmga", // Insight chrome student (release)
"cdjokdjlmmgodojedmlfppkfnnjnfigf",  // Insight chrome student (beta channel)
"kmklemnfjbnkliegakkhbbljlmhohcjf",  // Insight chrome student (redist crx)
"opadcoanknblmbjncakkcbbjhidklccc",   // LaaS chrome student
"jjjhhkfeklemiopigedfhfghahggcncl",	// LaaS chrome student (release)
"peaegoaiikfjfanoaencfglplalkcigk",	// LS Air Agent (release)
"kgimjgliaalpifohngdilpicocaopekp",	// LS Air Agent (beta)
"ojgagecakapdabjnbdeabelhfemaigng",	// LS Air Agent (beta 2)
"agbcjbbjakhhamobdooafdhofegcjhkc"	// LS Air Agent (beta 3)
];

var ChromeAppsBlacklist = [];

var currentStudent = "";
var portDead = false;
var portDeadCnt = 0;
var studentConfigData = null;
var last_blockedUrl = "";

var studentFullName = "";

var neverBlock = [
	"chrome-extension://",
	"chrome://",
	"chrome-devtools://",
	"file://"
];

var blockEventsList = [];

var blockPage = "";
var blockPageToIgnore = "";

var lsaApiServer = "";

var tabMuter = new TabMute();
var persistTabMuter = new PersistTabMuting(tabMuter);

function TrimTitle(title)
{
    if ( !title )
        return "";
        
    title = title.trim();
    
    if ( title.length > 256 )
    {
        title = title.substring(0, 255);
    }
    
    return title;
}

function TrimUrl(url)
{
    if ( !url )
        return "";
    
    if (url.length > 1024)
    {
        url = url.substring(0, 1023);
    }
    return url;
}

function SanitizeTab(tab, language) {
    if (!tab.active)
        return false;

    if (tab.url.valueOf() == lastBlockedUrl.valueOf())
        return false;

    var pageTitle = JSON.stringify(tab.title);
    pageTitle = TrimTitle( pageTitle );
	if (tab.url.valueOf() != lastUrl.valueOf() && lastTitle.valueOf() != pageTitle.valueOf()) {
		var urlStr = TrimUrl(tab.url);
		return { urlStr: urlStr, pageTitle: pageTitle };
	}

	return false;
}

function PostHistoryToChromeApp(tab, language) {
    if (!receivedHeartBeat)
        return;

	var sanitized = SanitizeTab(tab, language);
    if (sanitized != false) {
    	var data = {
            message: "WebURLChanged",
            url: sanitized.urlStr,
            title: sanitized.pageTitle,
            lang: language,
            windowId: tab.windowId
        };

            console.log("WebURLChanged (report_url_change) (**): " + JSON.stringify(data));
        if (currentStudent !== "") {
            // tell the chrome student we loaded a new url
            chrome.runtime.sendMessage( currentStudent, data, function (response) { } );
        }

		lastUrl = tab.url;
        lastTitle = sanitized.pageTitle;
	}
}

function PostHistory(tab, language)
{
	if ( useXMLHttp == false )
		return;
	
	if (portDead)
	{
//		console.log( "PostHistory - port is dead");
                portDeadCnt++;
		return;
	}
	
//	console.log( "PostHistory: " );
	try
	{
		if ( !tab.active )
		{
			//console.log ( "tab is not active: " + tab.url );
			return;
		}
		
		if (tab.url.valueOf() == lastBlockedUrl.valueOf())
		{
//			console.log ("not reporting history for blocked url " + tab.url);
			return;
		}
		
		var pageTitle = JSON.stringify(tab.title);
        pageTitle = TrimTitle( pageTitle );
		
		if (tab.url.valueOf() != lastUrl.valueOf() && lastTitle.valueOf() != pageTitle.valueOf())
		{
			if ( useXMLHttp == false )
			{
				return;
			}

			var xmlhttp = new XMLHttpRequest();
			
			if ( !language )
			{
				language = "en";
			}

			xmlhttp.open("POST","http://localhost:" + myPort + "/History", true);
            
            var urlStr = TrimUrl(tab.url);

			var body = JSON.stringify( { "url": urlStr, "title": pageTitle, "lang": language, "windowId": tab.windowId } );
			
			xmlhttp.setRequestHeader("Content-Type", "application/json");
			xmlhttp.send( body );
		
			lastUrl = tab.url;
			lastTitle = pageTitle;
		}
		else
		{
//			console.log ( "already posted history for " + lastUrl + "  title: " + lastTitle);
		}
	}
	catch (e)
	{
		console.log ( "exception in PostHistory: " + e.message + " code " + e.code);
		
		if (e .code == 19)
		{
			console.log ( "network error!");
			portDead = true;
		}
	}
	
}

function PostNewUrl(tab)
{
	if ( useXMLHttp == false )
		return;
	
	if (portDead)
	{
//		console.log( "PostNewUrl - port is dead: " + portDeadCnt);
                portDeadCnt++;
                
                if ( portDeadCnt > 10 ) // reset the port check just in case this was a re-connect
                {
                    portDeadCnt = 0;
                    portDead = false;
                    console.log( "Reset portDead" );
                }
		return;
	}
    
    if (tab && tab.url && tab.url.substring(0, 9) == "chrome://")
    {
        return;
    }

	try
	{
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open("POST","http://localhost:" + myPort + "/WebLimit", true );
        
        var urlStr = TrimUrl(tab.url);
        
		var body = JSON.stringify( { "url": urlStr  } );
		
		xmlhttp.setRequestHeader("Content-Type", "application/json");
                
                xmlhttp.onerror = function (e) {
                    console.log( "Caught request error: " + e.currentTarget.readyState );
                    portDead = true;
                }
                
                xmlhttp.onload = function( e ) 
                {
                    var response = xmlhttp.responseText;

                    response = response.trim();

                    if (xmlhttp.status == 200)
                    {
                            var responseObject = JSON.parse(response);
                            if (responseObject.block != null)
                            {
                                    if (responseObject.block == "true")
                                    {
                                            lastBlockedUrl = tab.url;

                                            if (tab.url.substring(0, 12) == "view-source:")
                                            {
                                                    chrome.tabs.remove(tab.id, null);
                                                    console.log ( "tried to remove the view-source tab!" );
                                            }
                                            else
                                            {
                                            
                                                    // case 19293: need to pause all video/audio tags before deleting them or caching trips us up
                                                    var stopMedia = function () {
                                                        var elements = document.getElementsByTagName('video');
                                                        var i;
                                                        for (i = 0; i < elements.length; i++) {
                                                            elements[i].pause();
                                                        }
                                                        elements = document.getElementsByTagName('audio');
                                                        for (i = 0; i < elements.length; i++) {
                                                            elements[i].pause();
                                                        }
                                                    }
                                                    stopMedia();
                                                
                                                if (responseObject.redirectUrl)
                                                {
                                                    // redirect to this url
                                                    chrome.tabs.update( tab.id, { url: responseObject.redirectUrl } );
                                                }
                                                else if (responseObject.redirect)
                                                {
                                                    var body =  JSON.stringify(responseObject.redirect);

                                                    var pattern = "&quot;";
                                                    var re = new RegExp(pattern, "g");
                                                    body = body.replace(re, "\\\"");

                                                    var script = "document.head.innerHTML = \"\"; document.body.innerHTML = " +  body + ";";
                                                    console.log ( "PostNewUrl: site is blocked: " + urlStr );
                                                
                                                    chrome.tabs.insertCSS( tab.id, { file: "style.css", runAt: "document_end" }, function onCSSInserted()
                                                    {
                                                        if (chrome.runtime.lastError)
                                                        {
                                                            // just have to check or Chrome might throw an exception
                                                        }
                                                    });
                                                
                                                    chrome.tabs.executeScript(tab.id , { code: script }, function onScriptExecuted(result)
                                                    {
                                                        if (chrome.runtime.lastError)
                                                        {
                                                            // just have to check or Chrome might throw an exception
                                                        }
                                                    });
                                                }
                                            }
                                    }
                                    else
                                    {
                                        console.log ( "PostNewUrl: site is allowed: " + urlStr );
                                        if (tab.url == lastBlockedUrl)
                                        {
                                            lastBlockedUrl = "";
                                        }
                                    }
                            }
                            else
                            {
                                    console.log("PostNewUrl failed to get response from sserver");
                            }
                    }
                    else
                    {
                            console.log("PostNewUrl bad response from sserver: " + xmlhttp.status);
                    }
            }
            
            xmlhttp.send( body );

	}
	catch (e)
	{
		console.log ( "exception in PostNewUrl: " + e.message + " code " + e.code);
		
		if (e .code == 19)
		{
			console.log ( "network error!");
			portDead = true;
		}
	}
}

function postURL_onLoad(e)
{
    
}

function discoverPort()
{
	
	chrome.runtime.getPlatformInfo(function(info)
	{
		console.log('operating system: ' + info.os);
										   
		if (info.os == "win")
		{
		   console.log("trying to load file");
		   try
		   {
			   var theIdent = chrome.extension.getURL("svrproc42");
			   
			   console.log( theIdent );
			   
			   var xhr = new XMLHttpRequest();
			   xhr.open('GET', theIdent, true);
			   xhr.onreadystatechange = function()
			   {
				   if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
				   {
					   console.log ( xhr.responseText );
					   myPort = xhr.responseText.toString().trim();
					   console.log ("myPort = " + myPort.toString() );
				   }
			   };
			   xhr.send(null);
		   }
		   catch (e)
		   {
				console.log ( "discoverPort exception: " + e.message);
		   }
		}
		else if ( info.os === "cros" )
		{
			// automatically disable xmlhttp if on chromebook
			console.log( "Chromebook, disabling XMLHttp!" );
			useXMLHttp = false;
			enableChromeStudentListeners();
			reEnableBrowsing();

		}
		else
		{
			console.log ( "not windows");
		}
	});

	
}

function injectKLCurrentTabs()
{
	if (!alreadyKLInjectedCurrentTabs) {
        alreadyKLInjectedCurrentTabs = true;
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                console.log("reloading tab " + tabs[i].url);
                if (tabs[i].url.indexOf("chrome-devtools://") == -1 && (tabs[i].url.indexOf("chrome://") == -1)) {
                    chrome.tabs.reload(tabs[i].id);
                }
            }
        });
    }
}

function handleTabCloseRequest(tabsToClose, callback) {
	if (!tabsToClose)
		return;

	if (!Array.isArray(tabsToClose)) {
		let t = [];
		t.push(tabsToClose);
		tabsToClose = t;
	}

	console.log("Closing tabs: " + JSON.stringify(tabsToClose));

	chrome.tabs.remove(tabsToClose, callback);
}

function handleExternalMessageFromValidatedId(request, sender, sendResponse) {
//			console.log( "External message: " + request.message)
	var rv = false;
	switch ( request.message ) {
		case "BannedWordList":
		{
			bannedWordList = [];
	//                    console.log("Got BannedWordList message!");
			bannedWordList = request.data.bannedWords;
			console.log("Got " + request.data.bannedWords.length + " words.");
	//                    console.log("Got word list: " + JSON.stringify(request.data.bannedWords));
			if (bannedWordList.length > 0) {
				if (keystrokeInjectionActive == false)
					console.log("BannedWordList: Starting keystroke monitoring.");

				keystrokeInjectionActive = true;
			}
			else {
				if (keystrokeInjectionActive == true)
					console.log("BannedWordList: Suspending keystroke monitoring.");

				keystrokeInjectionActive = false;
			}

			injectKLCurrentTabs();
			bannedWordListSender = sender.id;
			break;
		}
		case "ExternalLogger":
		{
			logger.setExternalLogger(sender.id);
			break;
		}
		case "KeystrokeAlerting":
		{
			var obj = request.data;
			if (!obj.enabled) {
				if (keystrokeInjectionActive == true)
					console.log("KeystrokeAlerting: Suspending keystroke monitoring.");

				keystrokeInjectionActive = false;

			}
			else {
				if (keystrokeInjectionActive == false)
					console.log("KeystrokeAlerting: Starting keystroke monitoring.");

				keystrokeInjectionActive = true;
			}
			injectKLCurrentTabs();
			break;
		}
		case "ScrapeStudentName":
		{
			console.log("Got ScrapeStudentName message!");
			if (sendResponse)	// message requested a response?
			{
				sendResponse({"message": "ACK", "data": "pending"});
			}
			
			var studentLoginName = "";
			
			if (request.data) {
				console.log("Parsing " + request.data);
				studentLoginName = request.data.substring(0, request.data.lastIndexOf("@"));
			}

			if (studentLoginName.length == 0) {
				studentLoginName = "unknown";	
			}

			console.log("Sending student name as '" + studentLoginName + "'");
			chrome.runtime.sendMessage(sender.id, { message: "StudentNameReply", data: studentLoginName });
			break;
		}
		case "DisableXMLHttp":
		{
			// this is used by the Chrome Student plugin to disable the 
			// default posting of XML requests to the student
			// The Chrome student uses "postMessage()" instead.
			disableXMLHttp();
			if ( studentConfigData )
			{
	//						console.log( "Replying to DisableXMLHttp with AutoConf data: " + studentConfigData );
				if (request.params && request.params.includes("IncludeHost"))	// Flags new response format for LAN-541
					sendResponse( { message: "StudentConfigData", data: studentConfigData } );
				else
					sendResponse( { message: "StudentConfigData", data: studentConfigData.data } );

			}
			break;
		}
		case "WebLimitFlagsEx":
		{
			blockPage = (request.blockPage != null) ? request.blockPage : "";
			blockPageToIgnore = (request.blockPageToIgnore != null) ? request.blockPageToIgnore : "";
			console.log("Web limiting block page is now: '" + blockPage + "'");
			console.log("Web limiting block page to ignore is now: '" + blockPageToIgnore + "'");
		}
		// No break here. Allow fallthrough.
		case "WebLimitFlags":
		{
			var values = request.value.split("::");
			console.log( "WebLimiting flags: " + request.value.toString(16) );					
			limitingFlags = parseInt(values[0]);
			limitingState = parseInt(values[1]);
			lastLimitFlags = Math.round( new Date().getTime() / 1000 );
			if ( ( limitingFlags & DISABLE_DOTTEDCECIMALS ) == DISABLE_DOTTEDCECIMALS )
			{
				blockIPAddresses = true;
				console.log( "IP Browsing disabled" );
			}
			else
				blockIPAddresses = false;
			
			if ( ( limitingFlags & DISABLE_PRIVATE_BROWSE ) == DISABLE_PRIVATE_BROWSE )
			{
				blockIncognito = true;
				console.log( "Incognito Browsing disabled" );
			}
			else
				blockIncognito = false;
			disableXMLHttp();
			break;
		}
		case "WebLimitURLList":
		{
			//console.log( "WebLimiting URLS: " + request.value );
			disableXMLHttp();
			// the request.value should be json data
			handleURLList( request.value );					
			break;
		}
		case "RunURL":
		{
			console.log( "RunURL: " + request.value.url );
			console.log("New tab: " + request.value.newTab);
			
			handleRunURL( request.value, sendResponse );
			break;
		}
		case "HeartBeat":
		{
			currentStudent = sender.id;
			receivedHeartBeat = true;
			disableXMLHttp();
			if ( studentConfigData )
			{
	//						console.log("Replying to HeartBeat request.");
				if (request.params && request.params.includes("IncludeHost")) { // Flags new response format for LAN-541
	//							console.log("Replying to HeartBeat (IncludeHost) with AutoConf data: " + studentConfigData);
					sendResponse({message: "StudentConfigData", data: studentConfigData});
				}
				else {
	//							console.log("Replying to HeartBeat () with AutoConf data: " + studentConfigData.data);
					sendResponse({message: "StudentConfigData", data: studentConfigData.data});
				}

			}
			
			// TODO: we may need to set a status and timer so we can
			// notify the user that the student stopped talking.  
			// That is if we want to put notifications in the browser 
			// toolbar.
			// The heart beat is so that if the WebHelper extension 
			// starts after our main extension, or is re-started it
			// will re-initialize correctly.  -tyler
			break;
		}
		case "CurrentTabsRequest":
		{
			let senderId = sender.id;
			chrome.tabs.query({}, (tabs) => {
				chrome.runtime.sendMessage(senderId, {
					message: "CurrentTabsResponse",
					data: tabs
				});
			});
			break;
		}
		case "CloseTabsRequest":
		{
			handleTabCloseRequest(request.tabs, () => {
				chrome.runtime.sendMessage(sender.id, {
					message: "CloseTabsResponse",
					data: {
						status: "Complete"
					}
				});
			});
			break;
		}
		case "BlankScreenStatus":
		{
			if (request.blankScreenOn !== undefined) {
				console.log("Received BlankScreenStatus: " + request.blankScreenOn);
				handleBlankScreenNotification(request.blankScreenOn);
			}
			break;
		}
		case "get_screenthumbnail":
		{
	//					console.log( "Screenshot requested: (" + request.width + " x " + request.height + ") req #: " + request.reqNum );
			if ( sendResponse )	// message requested a response?
			{
				sendResponse( {"message": "ACK", "width": 0, "height": 0, "data": "pending" } );
				handleTabScreenRequest(sender.id, request.width, request.height, request.format, "thumbnail_response");
			}
			break;
		}
		case "get_screencapture":
		{
	//					console.log( "Screenshot requested: (" + request.width + " x " + request.height + ") req #: " + request.reqNum );
			if ( sendResponse )	// message requested a response?
			{
				sendResponse( {"message": "ACK", "width": 0, "height": 0, "data": "pending" } );
				handleTabScreenRequest(sender.id, 0, 0, request.format, "screencap_response", request.overlayMessage);
			}
			break;
		}
		case "get_screenshot":
		{
	//					console.log( "Screenshot requested: (" + request.width + " x " + request.height + ") req #: " + request.reqNum );
			if ( sendResponse )	// message requested a response?
			{
				sendResponse( {"message": "ACK", "width": 0, "height": 0, "data": "pending" } );
				var dictionary = {
					sender: sender.id,
					width: request.width,
					height: request.height,
					format: request.format,
					overlayMessage: request.overlayMessage
				};

				if (request.hasOwnProperty("webHelperReturnCookie"))
					dictionary.webHelperReturnCookie = request.webHelperReturnCookie;

				requestTabThumbnail(dictionary);
				/*function(image) {
					var data = 4; //"hello";
					var width = image.width;
					var height = image.height;

					console.log( "Sending get_screenshot response data (" + width + " x " + height + ")" );
					sendResponse( {"message": "ACK", "width": width, "height": height, "data": data } );
				});*/

			}
			break;
		}
		default:
		{
			
		}
	}
}

function handleBlankScreenNotification(screenBlanked) {
	blockVideoPiP = screenBlanked;

	if (screenBlanked) {
		tabMuter.muteTabs();
		persistTabMuter.persistTabMuting();
	}
	else {
		persistTabMuter.stopPersistTabMuting();
		tabMuter.unMuteTabs();
	}
}

function connectListeners()
{
	
    enableIcon( false );
// NOTE: THE FOLLOWING LISTENERS ARE USED IN THE WINDOWS AND MAC STUDENTS TO CATCH 
// CHANGES IN THE URL OF AN ACTIVE TAB.  THEY ARE TRIGGERED AFTER THE URL HAS LOADED.
// TO CONTINUE TO SUPPORT THE CURRENT IMPLEMENTATIONS FOR WINDOWS AND MAC THEY NEED 
// TO BE HERE BUT BECOME DISABLED WHEN THIS PLUGIN RECEIVES DisableXMLHttp FROM THE
// STUDENT CHROME PLUGIN.
//
//
	discoverPort();

	chrome.tabs.onActivated.addListener( ontabactivated );

	chrome.webNavigation.onCompleted.addListener( navigationOnCompleted );

	chrome.tabs.onUpdated.addListener( tabOnUpdated );
    
    chrome.windows.onFocusChanged.addListener( onWindowActivated );

	  // Handle messages comeing from other plugins (ie: Chrome Student)
  	chrome.runtime.onMessageExternal.addListener(
		function( request, sender, sendResponse )
		{
			if (request.message === "LSAEnvironment") {
				recordLsaApiServer(request, sender, sendResponse);
			}
			else if (request.message === "LSAEnvironmentExt") {
				handleLSAEnvironment(request, sender, sendResponse);
			}
			else {
				isAppInWhitelist(sender.id, (validId) => {
				
					if (validId) {
						handleExternalMessageFromValidatedId(request, sender, sendResponse);
					}
					else {
						console.log( "Rejecting message from " + sender.id + ". (not in whitelist)" );					
					}
				});
			}
		}
	);
		
	chrome.runtime.onMessage.addListener(
		function (request, sender, sendRequest )
		{
//			console.log( "Got message: " + request.message );
			if ( request.message === "student_config" )
			{				
				console.log( "CONFIG: " + request.data );
				console.log( "HOSTNAME: " + request.hostname);

				studentConfigData = request;
				console.log("currentStudent = '" + currentStudent + "'");
				if ( currentStudent != "" )
				{
					chrome.runtime.sendMessage( currentStudent, {
						message: "StudentConfigData",
						data: request.data,
						hostname: request.hostname},
						function (response) { } );
				}


			}
			else if (request.message === "student_name") {
				console.log("Student name: " + request.data.name + ", sender id: " + request.data.sender);
				if (request.data != null && request.data.sender != null && request.data.name != null) {
					studentFullName = request.data.name;
					chrome.runtime.sendMessage(request.data.sender, { message: "StudentNameReply", data: studentFullName });
				}
				
			}
			else if (request.message === "kl") {
				//console.log("Keylog: " + request.data);
				toKeylogQueue(request.data);
			}
			else if ( request.message === "limiting_list" )
			{
				console.log( "Got limiting_info message. Looking for event index " + request.index );
				var blockEvent = {};
				for ( var x = 0; x < blockEventsList.length; x ++ )
				{
					if ( blockEventsList[x].id === request.index )
					{
						blockEvent = blockEventsList[x];
					}
				}

				sendRequest( {
					limitingState: limitingState,
					UrlList: rawUrlList,
					urlListType: parseInt(urlListType),
					blockedUrl: blockEvent.url
				} );
			}
			else if (request.message === "isBlankScreenEnabled") {
				sendRequest(blockVideoPiP);
			}
			else if (request.message === "log_this_from_content_script") {
				if (request.log)
					console.log(request.log);
			}
		}
	);

        chrome.tabs.onUpdated.addListener( 
            function ( tab )
            {
//                console.log( "Tab updated: " + tab.id );
                chrome.browserAction.disable( tab.id );
            }
        );


} // end connectListeners()

function toKeylogQueue(data) {
    if (!keystrokeInjectionActive || data.alt || data.ctrl || data.shift)	// ignore
        return;

    if (data.length > 1) {
		if (data == "Backspace")
            keylogQueueIndex--;

        return;
    }

    data = data.toLowerCase();

    if (keylogQueueIndex < 0)
    	keylogQueueIndex = keylogQueue.length + keylogQueueIndex;

    if (keylogQueueIndex >= keylogQueue.length)
        keylogQueueIndex = 0;

    keylogQueue[keylogQueueIndex] = data;
    //console.log(JSON.stringify(keylogQueue));
    for (var i = 0; i < bannedWordList.length; i++) {
        var checkWord = bannedWordList[i];

        var checkIndex = 0;
        var startCheck = keylogQueueIndex - checkWord.length + 1;
        if (startCheck < 0)
            startCheck += keylogQueue.length;

        var checkStop = (startCheck + checkWord.length) % keylogQueue.length;

        var found = true;
        //console.log("starting check against '" + checkWord + "'");
        for (var j = startCheck; j % keylogQueue.length != checkStop && keylogQueue; j++) {
        	//console.log("j = " + j + ", keylogQueue.length = " + keylogQueue.length);
        	//console.log("Checking '" + keylogQueue[j % keylogQueue.length] + "' against '" + checkWord.charAt(checkIndex) + "'");
            if (keylogQueue[j % keylogQueue.length] != checkWord.charAt(checkIndex++)) {
                found = false;
                break;
            }
        }

        if (found) {
            console.log("Found a word: " + checkWord);
            chrome.runtime.sendMessage(bannedWordListSender, { message: "BannedWordTyped", data: checkWord });
        }
    }

    keylogQueueIndex++;
}

function buildUrlFromUrlObjectAndSearchParams(urlObj, searchParams) {
	let retString = urlObj.protocol + "//" + urlObj.hostname;
	if (urlObj.port) {
		retString += ":" + urlObj.port;
	}
	
	retString += urlObj.pathname;
	if (searchParams) {
		retString += "?" + searchParams.toString();
	}

	return retString;
}

function addAttemptedPageToBlockPage(attempted, blockPage) {
	let url = new URL(blockPage);
	let searchParams = url.searchParams;
	if (searchParams) {
		searchParams.append("attempted", attempted);
	}

	return buildUrlFromUrlObjectAndSearchParams(url, searchParams);
}

function enableChromeStudentListeners()
{
	console.log( "Enabling Chrome student listener" );
	/** 
	 * This listener is different than those above, instead of operating on the 
	 * chagnes in a tab, this affects any request before it is sent.  This *should* 
	 * be more efficient for filtering.  -tyler
	 * 
	 * NOTE: this filter is only activated after the plugin receives a "heartbeat" message
	 * from the Chrome student.
	 **/
	
	chrome.webRequest.onBeforeRequest.addListener(
	  function(info) {
		  
		// if no messages from a chrome student, don't bother filtering here
		if ( ! receivedHeartBeat )
			return;
		
		// never block certain urls
		if ( isNeverBlocked(info.url) )
			return;
		  		  
		var blocked = false;
		//console.log( "Caught web request for: " + info.url + "(" + info.type + ")" );
	
		switch( info.type )
		{
			case "sub_frame":
			case "main_frame":
			//case "xmlhttprequest":
			{				
				// here we'll only handle requests for the main frame and/or 
				// sub-frames.  We really don't need to filter out page objects
				// like style sheets, scripts etc.
				
				// This gets the URL of the "blocked.html" page fromt the extension 
				// instead of passing it in.
                var blockedUrl = "";
                if (blockPage && blockPage.length > 0)
                    blockedUrl = blockPage;
                else
                    blockedUrl = chrome.extension.getURL( "blocked.html" );

				if ( info.url.indexOf(blockedUrl) > -1 )  // ignore our own "blocked" url
					break;

				if ( urlListType != 0 )
				{
					var safe_url = escape(info.url);
					var safe_sites = "";
					var action = "blocked";
					var u = parseURLex( info.url );
					var reason = "";
                                        
                                        last_blockedUrl = info.url;

//					console.log( "Filtering request for: (" +info.type + "): [" + u.url + "]");
					if ( blockIPAddresses && u.isIP )
					{
						blocked = true;
						action = "noip";
					}
					else
					{

						switch ( urlListType )
						{
							case BLOCK_ALL:
							{
								blocked = true;
								reason = "Web disabled";
								break;
							}
							case ALLOW_SPECIFIC:
							{							
								blocked = ! isURLInBlockedList( info.url );
								action = "allowed";
								if ( blocked )
								{
//									console.log( "Allowing specific web sites" );
									for ( var x = 0; x < urlList.length; x ++ )
									{
										if ( x > 0 )
											safe_sites += ",";
										safe_sites += rawUrlList[x];
									}
									lastBlockedUrl = info.url;
									reason = "Page not in allowed list";
	//								return { redirectUrl: chrome.extension.getURL( "blocked.html?action=blocked&url=" + safe_url + "&sites=" + escape(safe_sites) ) }
								}
								break;
							}
							case BLOCK_SPECIFIC:
							{
								blocked = isURLInBlockedList( info.url );
								if ( blocked )
								{
									lastBlockedUrl = info.url;
									reason = "Page in blocked list";
								}
	//							return { redirectUrl: chrome.extension.getURL( "blocked.html?action=blocked&url=" + safe_url + "&sites=" ) }
								break;
							}

						}
					}					
					if ( blocked )
					{
						console.log( "Blocking page: [" + info.url + "] (" + reason + ")");
						var timestamp = timeStamp();
						blockEventsList[ blockEventsList.length ] = {
							id: timestamp,
							url: info.url
						};

                        if (blockPage && blockPage.length > 0) {
							let redirectPage = addAttemptedPageToBlockPage(info.url, blockPage);
							return { redirectUrl: redirectPage };
						}

						return { redirectUrl: chrome.extension.getURL( "blocked.html?index=" + timestamp ) }
					}
				}
			  break;
			}
			case "stylesheet":
			case "script":
			case "image":
			case "object":
			case "other":
			{
				// warning: this can get pretty noisy
				// console.log( "Ignored request for: (" +info.type + ") :" + info.url );
				break;
			}

		}	

	  },
	  {urls: ["<all_urls>"]},
	  ["blocking"]);
  
  	
	window.setInterval( checkLimitingTimeout , 20000 );
	
	
}

/** 
 * Check to see if we're in web limiting mode.  If so, and the last time we received
 * a web limiting flags message was more than 20 seconds ago, disable our web limiting
 * 
 **/
function checkLimitingTimeout()
{
	if ( lastLimitFlags === 0 || ( urlListType === 0 ) )
		return;
	
	var tm_now = Math.round( new Date().getTime() / 1000 );
	var  timeoutAt = lastLimitFlags + limitTimeout;
	//console.log( "Web limiting timeout in: " + (limitTimeout - ( tm_now - lastLimitFlags )) + " seconds" );
	if ( tm_now > (lastLimitFlags + limitTimeout) )
	{
		console.log( "It's been a while since we've recived a status from the teacher.  Disabling web limiting." );
		reEnableBrowsing();
	}
	
}


/**
 * Disables the XMLHTTP post methods and listeners attached.
 * Those methods are typically used by external services from the 
 * Windows and Mac students.  If we recieve a message through the plugin
 * we're most likely running a chrome student so those other listeners are
 * just noise.
 **/
function disableXMLHttp()
{
	if ( useXMLHttp == true )
	{
		console.log( "Disabling XMLHttp methods and listeners" );
		useXMLHttp = false;

		// also disable the listeners for the tab change events
		chrome.tabs.onActivated.removeListener(ontabactivated);
		//chrome.webNavigation.onCompleted.removeListener(navigationOnCompleted);
		chrome.tabs.onUpdated.removeListener(tabOnUpdated);
        
        chrome.windows.onFocusChanged.removeListener( onWindowActivated );
		
		reEnableBrowsing();
		enableChromeStudentListeners();
	}
}

function checkTabs(tabs)
{
    for (let tab of tabs)
    {
        if (tab && tab.url)
        {
            console.log( "checking " + tab.url );
            PostNewUrl( tab );
        }
    }
}

function onWindowActivated(windowId)
{
    console.log("Newly focused window: " + windowId);
    chrome.tabs.query({currentWindow: true, active:true}, checkTabs);
}

function ontabactivated(activeInfo)
{
	if ( activeInfo && activeInfo.tabId && activeInfo.tabId > 0 )
	{
		chrome.tabs.get(activeInfo.tabId, function (tab)
		{
			if ( chrome.runtime.lastError || !tab )
				return;
			
			if ( tab.url )
			{
//				console.log("onActivated: " + tab.url);
				PostNewUrl(tab);
				if(portDead) {
					console.log("RETRY " + myPort);
					discoverPort();
					console.log("RETRY " + myPort);
					portDead = false;
					PostNewUrl(tab);
				}
			}
		});
	}
}

/**
 * Called when a window or tab completes a navigation task
 **/
function navigationOnCompleted(details)
{
	 if ( details && details.tabId && details.url && details.tabId > 0 )
	 {
		chrome.tabs.get(details.tabId, function (tab)
		{
			if ( chrome.runtime.lastError )
			{
				console.log( "chrome.tabs.get() error: " + chrome.runtime.lastError.message );
				return;
			}
			if ( tab && tab.url )
			{
//				if ( useXMLHttp == false )
//				{
//					detectStudentConfig();
//				}
				
				chrome.tabs.detectLanguage(tab.tabId, function (language)
				{
//				   	console.log("webNavigation.onCompleted: " + tab.url);
//                     if (currentStudent !== "") {
//                         chrome.runtime.sendMessage( currentStudent, {
//                                 message: "WebURLChanged",
//                                 url: tab.url,
//                                 title: tab.title,
//                                 lang: language,
//                                 windowId: tab.tabId },
//                             function (response) { } );
//                     }
					PostHistory(tab, language);
					PostHistoryToChromeApp(tab, language);
				});
			}
		});
	}
}

/** 
 * Called when a tab is updated 
 **/
function tabOnUpdated(tabId, changeInfo, tab)
{
	if ( tabId && tabId > 0 )
	{
		chrome.tabs.get(tabId, function (tab)
		{
			if ( tab && tab.url )
			{
//				console.log("onUpdated: " + tab.url);
				PostNewUrl(tab);
				if(portDead) {
					console.log("RETRY " + myPort);
					discoverPort();
					console.log("RETRY " + myPort);
					portDead = false;
					PostNewUrl(tab);
				}
			}
		});
	}
}

function detectStudentConfig()
{
	console.log( "Detecting Student configuration data" );
	 
}

function reEnableBrowsing()
{
	urlListType = 0;
	blockIPAddresses = false;
	blockIncognito = false;
	updateWebLimitingIcon( false );	
}

/**
 *  build the list of URL's to be blocked or permitted depending on the 
 *  list type.
 *  @Param list - expects a string list of urls in json format.
 **/
function handleURLList( list )
{
	var urls = JSON.parse( list );
	
	// clear the current list
	urlList.length = 0;
	rawUrlList.length = 0;
	
	// List type should have been already set but check it here
	urlListType = urls.listType;
	
	if ( urlListType == 0 )
	{
		reEnableBrowsing();
	}
	else
	{
		updateWebLimitingIcon( true );
	}
	
//	console.log( "Updating URL List with " + urls.entries.length );
	if ( urls.entries && urls.entries.length > 0 )
	{
		// convert wildcard syntax to regex
		for( var x = 0; x < urls.entries.length; x ++ )
		{
			var indx = 0;
			rawUrlList[x] = urls.entries[x];
			var entry = urls.entries[x];
			entry = entry.replace( /[.]/g, "[.]" );
			entry = entry.replace( /\*/g, ".*" );
			entry = entry.replace( /\?/g, "." );
			entry = entry.replace( /\//g, "[/]" );
			indx = entry.search(/\.\*/);
			
			if ( indx === 0 )
				urlList[x] = new RegExp( entry, "i" );
			else
				urlList[x] = new RegExp(urlRegexPrefix + entry, "i");	// prepend wildcard for subdomains like "www" that may have been stripped by the teacher
			
//			console.log( "REGEX: [" + entry + "]" );
		}
		//urlList = urls.entries;
	}
	
	// Now that the URL list is ready, scan the current open tabs for anything that needs to be blocked
	validateCurrentTabs();
	
}

function updateWebLimitingIcon( bLimiting )
{
    if ( useXMLHttp == false )
    {
	if ( bLimiting )
	{
		// show the web limiting icon and message
		chrome.browserAction.setIcon( {path: "./disableweb.png"} );
		chrome.browserAction.setTitle( {title: chrome.i18n.getMessage("web_limited") } );
	}
	else
	{
		// reset the normal icon
		chrome.browserAction.setIcon( {path: "./icon16.png"} );
		chrome.browserAction.setPopup( {popup: ""} );
		chrome.browserAction.setTitle( {title: ""} );
	}
    }

}

/**
 * Loop through every available tab to see if the url for that tab needs to be blocked.
 * If it does, reset it's url.  If it's incognito, and that's been blocked, close it.
 **/
function validateCurrentTabs()
{
	var tabArray = new Array();
	var blocked = false;
	var safe_sites = "";
	
	chrome.tabs.query( {}, function(tabs) {
		for ( var i = 0; i < tabs.length; i ++ )
		{
			safe_sites = "";
//			console.log( "TAB: " + tabs[i].url );
			if ( isNeverBlocked(tabs[i].url) )
				continue;

			var u = parseURLex( tabs[i].url );
			var safe_url = escape(tabs[i].url);
			
                        var timestamp = timeStamp();
                        blockEventsList[ blockEventsList.length ] = {
                            id: timestamp,
                            url: tabs[i].url
                        };

                        
			if ( blockIPAddresses && u.isIP )
			{
                if (blockPage && blockPage.length > 0) {
					let redirectPage = addAttemptedPageToBlockPage(tabs[i].url, blockPage)
					chrome.tabs.update( tabs[i].id, { url: redirectPage } );
				}
                else
                    chrome.tabs.update( tabs[i].id, { url: chrome.extension.getURL( "blocked.html?index=" + timestamp /*?action=blocked&url=" + safe_url + "&sites="*/ ) } );

                continue;
			}
			
			if( tabs[i].incognito && blockIncognito )
			{
				chrome.tabs.remove( tabs[i].id );
				continue;
			}
			
			switch ( urlListType )
			{
				case BLOCK_ALL:
				{
                    blocked = true;
                    if (blockPage && blockPage.length > 0) {
						let redirectPage = addAttemptedPageToBlockPage(tabs[i].url, blockPage)
						chrome.tabs.update( tabs[i].id, { url: redirectPage } );
					}
                    else
                        chrome.tabs.update( tabs[i].id, { url: chrome.extension.getURL( "blocked.html?index=" + timestamp /* ?action=blocked&url=" + safe_url + "&sites="*/ ) } );

                    break;
				}
				case ALLOW_SPECIFIC:
				{							
					blocked = ! isURLInBlockedList( tabs[i].url );

					if ( blocked )
					{
//						for ( var x = 0; x < urlList.length; x ++ )
//						{
//							if ( x > 0 )
//								safe_sites += ",";
//							safe_sites += rawUrlList[x];
//						}
//						lastBlockedUrl = tabs[i].url;
						if (blockPage && blockPage.length > 0) {
							let redirectPage = addAttemptedPageToBlockPage(tabs[i].url, blockPage)
							chrome.tabs.update( tabs[i].id, { url: redirectPage } );
						}
                        else
                            chrome.tabs.update( tabs[i].id, { url: chrome.extension.getURL( "blocked.html?index=" + timestamp /*?action=allowed&url=" + safe_url + "&sites=" + escape(safe_sites) */ ) } );
					}
					break;
				}
				case BLOCK_SPECIFIC:
				{
					blocked = isURLInBlockedList( tabs[i].url );
					if ( blocked )
					{
						lastBlockedUrl = tabs[i].url;
                        if (blockPage && blockPage.length > 0) {
							let redirectPage = addAttemptedPageToBlockPage(tabs[i].url, blockPage)
							chrome.tabs.update( tabs[i].id, { url: redirectPage } );
						}
                        else
                            chrome.tabs.update( tabs[i].id, { url: chrome.extension.getURL( "blocked.html?index=" + timestamp /*?action=blocked&url=" + safe_url + "&sites="*/ ) } );
					}
					break;
				}

			}			
			
			
		}
	});
	
	
}

function enableIcon( bEnable )
{
    console.log( "Setting icon to: " + bEnable );
    chrome.tabs.query( {}, function (tabs)  {
        
        for ( var x = 0; x < tabs.length; x ++ )
        {
            chrome.browserAction.disable( tabs[x].id );
        }
        
    });
}

function timeStamp()
{
    return new Date().getTime();
}

function getAppValidationUrlFromManifest() {
	let manifestObj = chrome.runtime.getManifest();
	let validationUrl = "";
	if (manifestObj &&
		manifestObj.hasOwnProperty("app_validate_url") &&
		manifestObj.app_validate_url.length > 0) {
		validationUrl = manifestObj.app_validate_url;
	}

	return validationUrl;
}

function getValidationFromServer(apiServer, appId, callback) {
	let validationUrl = getAppValidationUrlFromManifest();

	if (apiServer.length > 0 || validationUrl.length > 0) {
		console.log("getValidationFromServer(): Validating app. apiServer = " + apiServer + ", validationUrl = " + validationUrl);
		let v = new ValidateAppFromServer({
			"apiServer": apiServer,
			"appId": appId,
			"validationUrl": validationUrl
		});

		console.log("getValidationFromServer(): Checking appId '" + appId + "'...");
		v.checkApp()
		.then((retObj) => {
			if (retObj &&
				retObj.hasOwnProperty("valid") &&
				retObj.valid) {
				console.log("getValidationFromServer(): appId '" + appId + "' checks out!");
				callback(true);
			}
		})
		.catch((err) => {
			console.log("getValidationFromServer(): Error checking appId '" + appId + "': " + JSON.stringify(err));
			callback(false);
		});
	}
	else {
		console.log("getValidationFromServer: No apiServer passed in.");
		callback("not ready");
	}
}

function lsaApiServerDomainCheck(apiServerUrl) {
	// If we have an app_validate_url which matches the domain, it's OK.
	let validationUrl = getAppValidationUrlFromManifest();
	if (validationUrl.length > 0) {
		let u = new URL(validationUrl);
		if (u.host === apiServerUrl.host) {
			console.log("lsaApiServerDomainCheck(): validationUrl matches apiServerUrl.");
			return true;
		}
		else {
			console.log("lsaApiServerDomainCheck(): validationUrl doesn't match: validation host: " + u.host + ", apiServerUrl host: " + apiServerUrl.host);
		}
	}

	let domains = apiServerUrl.host.split(".");
	if (domains.length < 2
		|| domains[domains.length-1] !== "com" 
		|| domains[domains.length-2] !== "lenovosoftware") {
		console.log("lsaApiServerDomainCheck(): Malformed host '" + apiServerUrl + "'");
		return false;
	}
	else {
		console.log("lsaApiServerDomainCheck(): domain + " + apiServerUrl.host + " seems legit.");
	}

	return true;
}

function handleLSAEnvironment(request, sender, sendResponse) {
	for (let x = 0; x < ChromeAppsWhitelist.length; x++) {		
		if (ChromeAppsWhitelist[x] === sender.id) {
			if (sendResponse) {
				sendResponse({ 
					"id": chrome.runtime.id, 
					"data": "success" 
				});
			}
			return;
		}
	}

	recordLsaApiServer(request, sender, sendResponse);
}

function recordLsaApiServer(request, sender, sendResponse) {
	if (!request.data || !request.data.apiServer) {
		return;
	}

	console.log("Received LSAEnvironment request.")

	// Make sure it fits our domain
	let u = new URL(request.data.apiServer);
	if (!lsaApiServerDomainCheck(u)) {
		console.log("recordLsaApiServer(): Malformed host '" + request.data.apiServer + "'");
		return;
	} 

	// Make sure the API server recognizes the sender
	getValidationFromServer(u.origin, sender.id, (valid) => {
		if (valid === true) {
			lsaApiServer = u.origin;
			console.log("recordLsaApiServer(): Set lsaApiServer = " + lsaApiServer);
			ChromeAppsWhitelist.push(sender.id);
			if (sendResponse) {
				sendResponse({ 
					"id": chrome.runtime.id,
					"data": "success" 
				});
			}
		}
		else {
			console.log("recordLsaApiServer(): API server " + u.host + " appears invalid for sender '" + sender.id + "'");
		}
	});
}

function isAppInWhitelist(app, callback)
{ 
	var cnt = ChromeAppsWhitelist.length;
	
	for ( var x = 0; x < cnt; x ++ )
	{		
		if ( ChromeAppsWhitelist[x] === app ) {
			callback(true);
			return;
		}
	}

	for (let i = 0; i < ChromeAppsBlacklist.length; i++) {
		if (ChromeAppsBlacklist[i] === app) {
			callback(false);
			return;
		}
	}

	getValidationFromServer(lsaApiServer, app, (valid) => {
		if (valid === true) {
			console.log("isAppInWhitelist(): adding appId to whitelist...");
			ChromeAppsWhitelist.push(app);
			callback(valid);
		}
		else if (valid === false) {
			console.log("isAppInWhitelist(): adding appId to blacklist...");
			ChromeAppsBlacklist.push(app);
			callback(valid);
		}
		else {
			console.log("isAppInWhitelist(): appId " + app + " not ready to be validated.");
		}
	});
}

/**
 * receives a URL request from the teacher (via the student plugin) and
 * opens that URL in the current tab.
 **/
function handleRunURL( urlinfo, sendResponse )
{
	var new_url = urlinfo.url;
	var spawnNewTab = urlinfo.newTab;
	var teacher = urlinfo.teacher;
	var flags = urlinfo.flags;
	if (typeof spawnNewTab === 'undefined' ||
		spawnNewTab === null)
		spawnNewTab = true;
	
	console.log( "Received RunURL from teacher: " + teacher + " URL: [" + new_url + "]" );

	chrome.tabs.query( {}, function ( tabs ) {
//				console.log("Listing available tabs:");

		if (spawnNewTab && tabs.length > 0) {
			chrome.tabs.create({ url: new_url });
			sendResponse({message: "OK", data: ""});
			return true;
		}
		else if (!spawnNewTab) {
			for (var x = 0; x < tabs.length; x++) {
//					console.log("Tab id: " + tabs[x].id);
				if (tabs[x].selected) {
					chrome.tabs.update(tabs[x].id, {url: new_url});
//						console.log("URL handled");
					sendResponse({message: "OK", data: ""});
					return true;
				}
			}
		}
		// if we get here, we were unable to open a tab
		if ( window.open( new_url ) != null )
			sendResponse( { message: "OK", data: ""} );
		else
			sendResponse( { message: "no_tab", data: "unable to open tab"} );

		//console.log( "URL not handled" );
	});


	return false;
}

/**
 * takes a url and returns true if it is matched in the list of blocked URLs
 **/
function isURLInBlockedList( url )
{
	var rv = false;
//	console.log( "Testing for blocked url [" + url + "]" );
	var cnt = urlList.length;
	
	for (var x = 0; x < cnt; x ++ )
	{
//		console.log( "comparing to: [" + urlList[x] + "]" );
		if ( url.match( urlList[x] ) )
		{
//			console.log( "MATCH" );
			rv = true;
		}
	}
	
	return rv;
}

/**
 * See if the given URL is in the list of URLS NEVER to be blocked
 **/
function isNeverBlocked(url)
{
	var cnt = neverBlock.length;
	
	for (var x = 0; x < cnt; x ++ )
	{
		if ( url.match( neverBlock[x] ) )
		{
			return true;
		}
	}

    if (blockPageToIgnore &&
        blockPageToIgnore.length > 0 &&
        url.match(blockPageToIgnore))
        return true;

	return false;
}

/** 
 * Check existing tabs for the autoconfig meta data
 * (sometimes, "home" pages will load before our extension is loaded, 
 * this will allow us to handle autoconfig data even it it's loaded before we are)
 **/
function checkCurrentTabsForConfig()
{
	chrome.tabs.query( {}, function(tabs) {
		for ( var i = 0; i < tabs.length; i ++ )
		{
			if ( 
				( tabs[i].url.indexOf("chrome-devtools://") == -1 ) &&
				( tabs[i].url.indexOf("chrome://") == -1 )
			)
			{
				console.log( "Inspecting tab for autoconf metatag: " + tabs[i].url );
				chrome.tabs.executeScript( tabs[i].id, { file: "js/configstudent.js" }, function(data) {
					if ( chrome.runtime.lastError )
						console.log( "Script not executed: " + chrome.runtime.lastError.message );
//					console.log( "Script executed on tab: " );
				}  );
			}
		}
	} );
}
                                  
                                  
                                  
                                  
chrome.commands.onCommand.addListener(function(command)
{
    chrome.runtime.getPlatformInfo(function(info)
    {
        if (info.os != "cros" && command == "check-state")
        {
            console.log("check-state received");

            chrome.tabs.query( {}, function(tabs)
            {
                checkTabs(tabs);
            });
        }
    });
});


/** MAIN **/
logger.logMessage("Starting...");
connectListeners();

checkCurrentTabsForConfig();
