ko.extenders.pluckable=function(e,n){e.pluck=ko.computed(function(){return _(e()).map(function(e){return e[n]()})})},ko.extenders.toggleable=function(n,e){n.toggle=function(e){_(n()).chain().filter(e).each(function(e){e.toggle()})},n.enable=function(e){_(n()).chain().filter(e).each(function(e){e.enable()})},n.disable=function(e){_(n()).chain().filter(e).each(function(e){e.disable()})}},ko.extenders.persistable=function(n,t){chrome.storage.sync.get(t,function(e){e[t]&&n(e[t]),n.subscribe(function(e){var n={};n[t]=e,chrome.storage.sync.set(n)})})},ko.extenders.countable=function(e,n){e.count=ko.computed(function(){return e().length}),e.any=ko.computed(function(){return 0<e().length}),e.many=ko.computed(function(){return 1<e().length}),e.none=ko.computed(function(){return 0==e().length})};var fadeOutMessage=function(e){el=document.getElementById(e),el.className="visible",_.delay(function(){el.className="fadeout"},2e3)},DismissalsCollection=function(){var n=this;n.dismissals=ko.observableArray(),n.dismiss=function(e){n.dismissals.push(e)},n.dismissed=function(e){return-1!==n.dismissals.indexOf(e)},chrome.storage.sync.get("dismissals",function(e){n.dismissals(e),n.dismissals.subscribe(function(e){chrome.storage.sync.set({dismissals:e})})})},OptionsCollection=function(){var t=this,n={showHeader:!0,groupApps:!0,appsFirst:!1,enabledFirst:!1,searchBox:!0,showOptions:!0,keepAlwaysOn:!1,showReserved:!1};_(n).each(function(e,n){t[n]=ko.observable(e)}),t.save=function(e){chrome.storage.sync.set(_(n).mapObject(function(e,n){return t[n]()}),e)},chrome.storage.sync.get(_(n).keys(),function(e){_(e).each(function(e,n){t[n](e)})})},ProfileModel=function(e,n){var t=this,o={__always_on:"Always On"};return t.name=ko.observable(e),t.items=ko.observableArray(n),t.reserved=ko.computed(function(){return t.name().startsWith("__")}),t.hasItems=ko.computed(function(){return 0<t.items().length}),t.short_name=ko.computed(function(){return o[t.name()]||_.str.prune(t.name(),30)}),this},ProfileCollectionModel=function(){var o=this;return o.items=ko.observableArray(),o.localProfiles=ko.observable(void 0).extend({persistable:"localProfiles"}),o.any=ko.computed(function(){return 0<o.items().length}),o.add=function(e,n){return n=n||[],o.items.push(new ProfileModel(e,n))},o.find=function(n){return _(o.items()).find(function(e){return e.name()==n})},o.find_or_create=function(e){return o.find(e)||new ProfileModel(e,[])},o.always_on=function(){return o.find_or_create("__always_on")},o.remove=function(e){o.items.remove(e)},o.exists=function(e){return!_(o.find(e)).isUndefined()},o.save=function(n){var t={};_(o.items()).each(function(e){e.name()&&(t[e.name()]=_(e.items()).uniq())}),chrome.storage.sync.set({profiles:t},function(e){chrome.runtime.lastError?(o.localProfiles(!0),chrome.storage.local.set({profiles:t},n)):(o.localProfiles(!1),n(e))})},chrome.storage.sync.get("localProfiles",function(e){function t(e){return(e.startsWith("__")?" ":"")+e.toUpperCase()}var n=e.localProfiles?chrome.storage.local:chrome.storage.sync;n.get("profiles",function(n){n=n.profiles||{};var e=_(n).chain().keys().sortBy(t).value();_(e).each(function(e){o.items.push(new ProfileModel(e,n[e]))})})}),this},ExtensionModel=function(e){var n,t,o,s=this,i=e;s.id=ko.observable(i.id),s.name=ko.observable(i.name),s.type=i.type,s.mayDisable=i.mayDisable,s.isApp=ko.observable(i.isApp),s.icon=(n=i.icons,t=_(n).chain().pluck("size").min().value(),(o=_(n).find({size:t}))&&o.url||""),s.status=ko.observable(i.enabled),s.optionsUrl=ko.observable(i.optionsUrl),s.installType=ko.observable(i.installType),s.disabled=ko.pureComputed(function(){return!s.status()}),s.is_development=ko.pureComputed(function(){return"development"==s.installType()}),s.short_name=ko.computed(function(){return _.str.prune(s.name(),40)}),s.toggle=function(){s.status(!s.status())},s.enable=function(){s.status(!0)},s.disable=function(){s.status(!1)},s.status.subscribe(function(e){chrome.management.setEnabled(s.id(),e)})},ExtensionCollectionModel=function(){var o=this;o.items=ko.observableArray();function e(e){var n=o.items();res=[];for(var t=0;t<n.length;t++)_(e).includes(n[t].type)&&res.push(n[t]);return res}o.extensions=ko.computed(function(){return _(e(["extension"])).filter(function(e){return e.mayDisable})}).extend({pluckable:"id",toggleable:null}),o.apps=ko.computed(function(){return e(["hosted_app","packaged_app","legacy_packaged_app"])}).extend({pluckable:"id",toggleable:null}),o.enabled=ko.pureComputed(function(){return _(o.extensions()).filter(function(e){return e.status()})}).extend({pluckable:"id",toggleable:null}),o.disabled=ko.pureComputed(function(){return _(o.extensions()).filter(function(e){return!e.status()})}).extend({pluckable:"id",toggleable:null}),o.find=function(n){return _(o.items()).find(function(e){return e.id()==n})},chrome.management.getAll(function(e){_(e).chain().sortBy(function(e){return e.name.toUpperCase()}).each(function(e){"Extensity"!=e.name&&"theme"!=e.type&&o.items.push(new ExtensionModel(e))})})};
