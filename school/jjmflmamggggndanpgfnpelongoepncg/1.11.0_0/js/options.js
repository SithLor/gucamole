document.addEventListener("DOMContentLoaded",function(){vm=new function(){var n=this;n.options=new OptionsCollection,n.save=function(){n.options.save(function(){fadeOutMessage("save-result")})},n.close=function(){window.close()}},ko.bindingProvider.instance=new ko.secureBindingsProvider({}),ko.applyBindings(vm,document.getElementById("options"))});