window.dji=window.dji||{};window.dji.ui=window.dji.ui||{};
(function(d){function e(){a&&(clearTimeout(a),a=null);c.removeClass("dji-cwu-visible")}let c=null,a=null;d.init=function(){c=$("#dji-cwu-toast");c.find(".dji-cwu-toast-close-button").on("click",e)};d.show=function(b){b=b||{};b.showTime=b.showTime||5E3;b.message=b.message||"";c.find(".dji-cwu-toast-message").text(b.message);a&&(clearTimeout(a),a=null);a=setTimeout(function(){c.removeClass("dji-cwu-visible");a=null},b.showTime);c.addClass("dji-cwu-visible")}})(window.dji.ui.toast=window.dji.ui.toast||
{});
