import{MDCTextField}from"@material/textfield";import{MDCDialog}from"@material/dialog";import{MDCRipple}from"@material/ripple";let debounce=require("lodash.debounce");import{MDCMenu}from"@material/menu";const selector=".mdc-button, .mdc-icon-button, .mdc-card__primary-action",ripples=[].map.call(document.querySelectorAll(selector),(function(e){return new MDCRipple(e)})),buttonRipple=new MDCRipple(document.querySelector(".mdc-button")),dialog=new MDCDialog(document.querySelector(".mdc-dialog")),textField=new MDCTextField(document.querySelector(".mdc-text-field")),username=new MDCTextField(document.querySelector(".username")),password=new MDCTextField(document.querySelector(".password"));let shortCuts,btn_done=document.getElementById("nt_done_btn"),btn_cancel=document.getElementById("nt_cancel_btn"),shortcuts_wrapper=document.getElementById("shortcut_wrapper"),apps_wrapper=document.getElementById("apps_wrapper");dialog.listen("MDCDialog:opened",(()=>{buttonRipple.layout(),textField.layout()}));let searchTemplate="";$("#searchInput").keydown((function(e){13===e.keyCode&&(window.location=searchTemplate.replace("{KEYWORD}",encodeURIComponent($(this).val())))}));let documentWidth=31*document.documentElement.clientWidth/100+96+"px";function IsUrlExists(e){return new Promise((t=>{let o;chrome.storage.local.get((n=>{if(shortCuts=n.shortCuts,shortCuts){let i=n.shortCuts.filter((function(t){return t.url===e}));o=0!==i.length,t(o)}t(!1)}))}))}function addNewShortCut(){let e=document.getElementById("nt_input_url").value,t=document.getElementById("nt_input_name").value,o=Math.floor(1e3*Math.random());e.includes("https://")||(e="https://"+e),$("#addShortCut").remove(),renderShortCutView(t,e,o),renderAddShortCut();let n,i=countWrapperWidth();shortcuts_wrapper.style.width=i,chrome.storage.local.get((i=>{i.shortCuts?(n=i.shortCuts,n.push({name:t,url:e,id:o})):n=[{name:t,url:e,id:o}],chrome.storage.local.set({shortCuts:n},(()=>{}))})),document.getElementById("nt_input_url").value="",document.getElementById("nt_input_name").value=""}$(".search").css({width:documentWidth}),$("#searchBtn").on("click",(()=>{window.location=searchTemplate.replace("{KEYWORD}",encodeURIComponent($("#searchInput").val()))})),$("#google_apps").on("click",(e=>{if(e.stopPropagation(),$(".mdc-card").hasClass("show"))return $(".mdc-card").removeClass("show"),$(".mdc-card").hide(),void $("body").off("click",onBodyClick);$(".mdc-card").addClass("show"),$(".mdc-card").show(),$("body").on("click",(function(){$(".mdc-card").removeClass("show"),$(".mdc-card").hide()}))})),chrome.storage.local.get((e=>{let t=e.isSetAsBack,o=e.urlSetAsBack,n=e.IsShortCutsShow,i=e.IsAppsShow;if(n){shortCuts=e.shortCuts,shortCuts&&shortCuts.forEach((e=>renderShortCutView(e.name,e.url,e.id))),renderAddShortCut();let t=countWrapperWidth();shortcuts_wrapper.style.width=t}i?$("#google_apps").show():$("#google_apps").hide(),t&&o&&$("body.new_tab_search").css("background",`url(${o}) no-repeat center center`)})),document.getElementById("nt_input_url").oninput=function(){let e=document.getElementById("nt_input_url").value;e&&!e.includes("https://")&&(e="https://"+e),IsUrlExists(e).then((t=>{""===e&&(t=!0),""===e||t?(btn_done.setAttribute("disabled","disabled"),btn_done.style.background="rgb(241, 243, 244)",btn_done.style.color="rgb(128, 134, 139)"):(btn_done.style.background="rgb(26, 115, 232)",btn_done.style.color="white",btn_done.removeAttribute("disabled"))}))},document.getElementById("nt_input_name").oninput=function(){document.getElementById("nt_input_name").value},btn_cancel.onclick=function(){document.getElementById("nt_input_url").value="",document.getElementById("nt_input_name").value="",document.getElementById("my-dialog-content").innerText="Add shortcut",$(".search").css("z-index","9999999999"),$("#shortcut_wrapper").css("z-index","99999999999")},btn_done.onclick=function(){addNewShortCut()};let countWrapperWidth=function(){let e,t=$(".addShortCut").length;return 5!=t&&6!=t||(e=3),7!=t&&8!=t||(e=4),9!=t&&10!=t||(e=5),t>=11?(e=5,$("#addShortCut").hide()):$("#addShortCut").show(),112*e+17+"px"},renderShortCutView=function(e,t,o){let n=`\n    <a class="addShortCut_link" href="${t}" title="${e}" data-id="${o}">  \n      <div class="addShortCut_wrapper_icon">\n        <div id="addShortCut_icon">\n          <img src="https://www.google.com/s2/favicons?domain=${t}"/>\n        </div>\n      </div>\n      <div class="addShortCut_title">\n        <span>${e}</span>\n      </div>\n    </a>`;const i=document.createElement("div");i.className="addShortCut",i.innerHTML=n,shortcuts_wrapper.appendChild(i);const s=document.createElement("a");s.classList="addLink",i.appendChild(s)};function deleteShortCutItem(e){return new Promise((t=>{chrome.storage.local.get((o=>{let n=o.shortCuts.filter((function(t){return t.id!==e}));chrome.storage.local.set({shortCuts:n},(()=>{})),$(`a.addShortCut_link[data-id=${e}]`).parent().remove(),t()}))}))}$("body").on("click",".addLink",(function(e){0!==$(".editShortCut").length&&$(".mdc-menu").remove();let t=document.createElement("div");t.classList.add("mdc-menu","mdc-menu-surface"),t.innerHTML='\n  <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">\n    <li class="mdc-list-item editShortCut" role="menuitem">\n      <span class="mdc-list-item__ripple"></span>\n      <span class="mdc-list-item__text">Edit shortcut</span>\n    </li>\n    <li class="mdc-list-item deleteShortCut" role="menuitem">\n      <span class="mdc-list-item__ripple"></span>\n      <span class="mdc-list-item__text">Remove</span>\n    </li>\n  </ul>',$(this).parent().append($(t));new MDCMenu(document.querySelector(".mdc-menu")).open=!0})),$("body").on("click",".deleteShortCut",(function(){deleteShortCutItem($(this).parent().parent().parent().find("a.addShortCut_link").data("id")).then((()=>{10===$(".addShortCut").length&&$("#addShortCut").show()}))})),$("body").on("click",".editShortCut",(function(){$(".search").css("z-index","0"),$("#shortcut_wrapper").css("z-index","0"),$(".mdc-dialog").css("z-index","9999999999999"),$("#apps_wrapper").css("z-index","9999999999999"),dialog.open();const e=$(this).parent().parent().parent().find("a.addShortCut_link");document.getElementById("nt_input_url").value=e.prop("href"),document.getElementById("nt_input_name").value=e.prop("title"),document.getElementById("my-dialog-content").innerText="Edit shortcut",btn_done.removeAttribute("disabled"),btn_done.style.background="rgb(26, 115, 232)",btn_done.style.color="white",btn_done.onclick=function(){deleteShortCutItem(e.data("id")).then((()=>{addNewShortCut()})),$(".search").css("z-index","999999999999"),$("#shortcut_wrapper").css("z-index","99999999999"),document.getElementById("my-dialog-content").innerText="Add shortcut"}}));let renderAddShortCut=function(){const e=document.createElement("div");e.className="addShortCut",e.id="addShortCut",e.innerHTML='\n    <div class="addShortCut_wrapper_icon">\n      <div id="addShortCut_icon"></div>\n    </div>\n    <div class="addShortCut_title">\n      <span>Add shortcut</span>\n    </div>',shortcuts_wrapper.appendChild(e),$("#addShortCut").on("click",(function(){dialog.open(),$(".search").css("z-index","0"),$("#shortcut_wrapper").css("z-index","0"),$(".mdc-dialog").css("z-index","99999999"),$("#apps_wrapper").css("z-index","9999999999999")}))},renderAppsView=function(e,t,o){let n=`\n    <a class="addApp_link" href="${t}" title="${e}" target="_blank">  \n      <div class="addApp_wrapper_icon">\n        <div id="addApp_icon">\n          <img src="images/apps/${o}.png"/>\n        </div>\n      </div>\n      <div class="addApp_title">\n        <span>${e}</span>\n      </div>\n    </a>`;const i=document.createElement("div");i.className="addApp",i.innerHTML=n,apps_wrapper.appendChild(i)};const apps=[{type:"web",icon:"my-account",title:"Account",page:"https://myaccount.google.com/",visible:!0},{type:"web",icon:"google_search",title:"Search",page:"https://www.google.com.ua/webhp?tab=rw",visible:!0},{type:"web",icon:"busness",title:"Busness",page:"https://www.google.com/business/?ppsrc=GPDA2&gmbsrc=ww-ww-ot-gs-z-gmb-l-z-h~z-ogb-u",visible:!0},{type:"web",icon:"maps",title:"Maps",page:"https://www.google.com/maps",visible:!0},{type:"web",icon:"youtube",title:"YouTube",page:"http://www.youtube.com/",visible:!0},{type:"web",icon:"google_play",title:"Play",page:"https://play.google.com/store?hl=en-GB&tab=r8",visible:!0},{type:"web",icon:"gmail",title:"Gmail",page:"https://mail.google.com/mail/u/0/#inbox",visible:!0},{type:"web",icon:"meet",title:"Meet",page:"https://meet.google.com",visible:!0},{type:"web",icon:"contacts",title:"Contacts",page:"https://contacts.google.com",visible:!0},{type:"web",icon:"drive",title:"Drive",page:"https://drive.google.com/drive/my-drive",visible:!0},{type:"web",icon:"calendar",title:"Calendar",page:"https://calendar.google.com/calendar/render",visible:!0},{type:"web",icon:"translate",title:"Translator",page:"https://translate.google.com/",visible:!0},{type:"web",icon:"photos",title:"Photos",page:"https://photos.google.com/",visible:!0},{type:"web",icon:"duo",title:"Duo",page:"https://duo.google.com/",visible:!0},{type:"web",icon:"chat",title:"Chat",page:"https://chat.google.com",visible:!0},{type:"web",icon:"docs",title:"Docs",page:"https://docs.google.com/document/u/0/",visible:!0},{type:"web",icon:"sheets",title:"Sheets",page:"https://docs.google.com/spreadsheets/u/0/",visible:!0},{type:"web",icon:"hangouts",title:"Hangouts",page:"https://hangouts.google.com",visible:!0},{type:"web",icon:"keep",title:"Keep",page:"https://keep.google.com/",visible:!0},{type:"web",icon:"jamboard",title:"Jamboard",page:"https://jamboard.google.com/",visible:!0},{type:"web",icon:"admin",title:"Admin",page:"https://admin.google.com/AdminHome",visible:!0},{type:"web",icon:"analytics",title:"Analytics",page:"https://analytics.google.com/analytics/web",visible:!0},{type:"web",icon:"firebase",title:"Firebase",page:"https://console.firebase.google.com/",visible:!0},{type:"web",icon:"gallery",title:"Gallery.io",page:"https://gallery.io/",visible:!0},{type:"web",icon:"cloud-console",title:"Cloud Console",page:"https://console.cloud.google.com/",visible:!0},{type:"web",icon:"cloud",title:"Cloud Search",page:"https://cloudsearch.google.com/cloudsearch",visible:!0},{type:"web",icon:"groups",title:"Groups",page:"https://groups.google.com/",visible:!0},{type:"web",icon:"drawings",title:"Drawings",page:"https://docs.google.com/drawings/",visible:!0},{type:"web",icon:"forms",title:"Forms",page:"https://docs.google.com/forms/",visible:!0},{type:"web",icon:"play-console",title:"Play Console",page:"https://play.google.com/apps/publish",visible:!0}];apps.forEach((e=>renderAppsView(e.title,e.page,e.icon))),chrome.management.getAll((e=>{e.filter((e=>e.isApp))})),chrome.runtime.sendMessage({method:"getConfig"},(e=>{searchTemplate=e.searchTemplate}));