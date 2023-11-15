/** Capture visible tab
 * 
 * Originated by Stoneware, Inc.  http://www.stone-ware.com
 *
 * The enclosed material is Stoneware Confidential and is the sole
 * property of Stoneware, Inc.  Unauthorized disclosure, distribution
 * or other use of this material is expressly prohibited.
 *
 * (c) Copyright 1999-2014 Stoneware, Inc.  All rights reserved.
*/


var g_canvas = null;
var g_context = null;
var g_width = 0;
var g_height= 0;


function calculateScale( width, height, newWidth, newHeight )
{
//	console.log( "Scaling image from: (" + width + " x " + height + ") to (" + newWidth + " x " + newHeight + ")" );
	var imageData = null;
	var scale = 1;
	var x_offset = 0;
	var y_offset = 0;
	var scale_width = 0;
	var scale_height = 0;
	var xscale = newWidth / width;
	var yscale = newHeight / height;

	if ( xscale < yscale )
		scale = xscale;
	else
		scale = yscale;
//	console.log( "SCALE: " + scale );

//	var scale_width = Math.round(imageWidth * scale);
//	var scale_height = Math.round(imageHeight * scale);

	return scale;
}

function getFormatString(format)
{
    var str = "image/jpeg";
    if (format == "PNG") {
        str = "image/png";
    }

    return str;
}

function handleTabScreenRequest(sender, width, height, format, responseMsg, overlayMsg)
{
    var x_offset = 0;
    var y_offset = 0;
    var context = null;

    if ( !g_canvas )
        g_canvas = document.createElement('canvas');

    chrome.tabs.captureVisibleTab(  { format: "jpeg", quality: 100 }, function(url) {
        if ( chrome.runtime.lastError ||  ( typeof url === "undefined" ) )
        {
            chrome.runtime.sendMessage( sender, { message: responseMsg, width: 0, height: 0, requestedWidth: width, requestedHeight: height, base64: '', format: format  }	);
            return;
        }

        var a = new Image;
        a.src = url;

        a.onload = function() {

            if (width > 0)
                g_canvas.width = width;
            else {
                g_canvas.width = a.width;
                width = a.width;
            }

            if (height > 0)
                g_canvas.height = height;
            else {
                g_canvas.height = a.height;
                height = a.height;
            }

            context = g_canvas.getContext('2d');
            var scale = 1;
            var scale_width = g_canvas.width;
            var scale_height = g_canvas.height;

            if (g_canvas.width != a.width ||
                g_canvas.height != a.height) {
                scale = calculateScale(a.width, a.height, width, height);
                scale_width = Math.round(a.width * scale);
                scale_height = Math.round(a.height * scale);
            }

            // fill background
            context.fillStyle = "#000000";
            context.fillRect( 0, 0, width, height );

            if ( width > scale_width )
                x_offset = Math.round( ( width - scale_width) / 2 );
            if ( height > scale_height )
                y_offset = Math.round( ( height - scale_height) / 2 );

            context.drawImage( a, x_offset, y_offset, scale_width, scale_height );

            if (overlayMsg) {
                context = canvasTextOverlay({
                        imageWidth: scale_width, 
                        imageHeight: scale_height, 
                        message: overlayMsg, 
                        context: context
                    });
            }

            var imageData = context.getImageData( 0, 0, width, height );
            var base64 = g_canvas.toDataURL(getFormatString(format));

            chrome.runtime.sendMessage( sender, { message: responseMsg, width: imageData.width, height: imageData.height, base64: base64, format: format }	);

        }
    });

}

function drawRoundedRect(x, y, width, height, radius, fill, stroke, context) {
    radius = {
        tl: radius,
        tr: radius,
        br: radius,
        bl: radius
    };

    context.beginPath();
    context.moveTo(x + radius.tl, y);
    context.lineTo(x + width - radius.tr, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    context.lineTo(x + width, y + height - radius.br);
    context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    context.lineTo(x + radius.bl, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    context.lineTo(x, y + radius.tl);
    context.quadraticCurveTo(x, y, x + radius.tl, y);
    context.closePath();

    if (fill) {
        context.fill();
    }
    if (stroke) {
        context.stroke();
    }

    return context;
};

function getTruncatedTextForWidth(textToShorten, context, fitWidth) {
    let finalText = textToShorten;
    let textWidth = context.measureText(finalText).width * window.devicePixelRatio + 10;
    let n = textToShorten.length;

    while (textWidth > fitWidth && n > 0) {
        finalText = textToShorten.substr(0, --n) + "...";
        textWidth = context.measureText(finalText).width * window.devicePixelRatio + 10;
    }

    return finalText;
};

function canvasTextOverlay(params) {

    let imageWidth = params.imageWidth;
    let imageHeight = params.imageHeight;
    let message = params.message;
    let context = params.context;
    let fontSizeStart = params.fontSizeStart || 12;
    let orientation = params.orientation;
    let fontWidthPercentageLimit = params.fontWidthPercentageLimit || 0.33;
    let fontCheckIncreaseAmount = params.fontCheckIncreaseAmount || 12;

    var metrics = null;
    var boxWidth = 0;
    var boxHeight = 0;
    var offsetFontVertical = 10;

    for (var font = fontSizeStart; font < 144; font += fontCheckIncreaseAmount) {
        context.font = font + "px Arial";
        metrics = context.measureText(message);
        boxWidth = metrics.width * window.devicePixelRatio + 20;
        boxHeight = font + 12;
        if (boxWidth / imageWidth > fontWidthPercentageLimit)
            break;
    }

    var centerline = imageWidth / 2;
    var boxStartX = centerline - boxWidth / 2;
    var boxStartY = 10;
    if (orientation === "bottom") {
        boxStartY = imageHeight - boxHeight;
    }
    else if (orientation === "center") {
        boxStartY = (imageHeight - boxHeight) / 2;
    }
    
    if (boxStartX < 0)
        boxStartX = 0;

    if (boxWidth > imageWidth)
        boxWidth = imageWidth;

    let formattedMessage = getTruncatedTextForWidth(message, context, boxWidth);
    if (formattedMessage === "...")
        return context;

    context.globalAlpha = 0.5;
    context.fillStyle = "black";
    context.strokeStyle = "white";

    context = drawRoundedRect(boxStartX, boxStartY, boxWidth, boxHeight, 5, true, true, context);

    context.globalAlpha = 1;
    context.fillStyle = "white";

    if (font < 30)
        offsetFontVertical = 6;
    
    context.fillText(formattedMessage, boxStartX + 10, offsetFontVertical + boxHeight - (0.25 * font) + boxStartY - 10, boxWidth);

    return context;
};

function requestTabThumbnail(params)
{
//	console.log( "Capturing visible tab: (" + width + " x " + height + ")" );
	var scale_width = 0;
	var scale_height = 0;
	var x_offset = 0;
	var y_offset = 0;
	var context = null;
	
	if ( !g_canvas )
		g_canvas = document.createElement('canvas');

	chrome.tabs.captureVisibleTab(  { format: "jpeg", quality: 100 }, function(url) {
		if ( chrome.runtime.lastError ||  ( typeof url === "undefined" ) )
		{
            console.log("Error retrieving visible tab: " + JSON.stringify(chrome.runtime.lastError));
            console.log("url == " + url);
			chrome.runtime.sendMessage( params.sender, { message: "thumbnail_response", width: 0, height: 0, base64: '', format: params.format  }	);
			return;
		}
		
//		console.log( "Tab captured: " + url );
		var a = new Image;
		a.src = url;
                g_canvas.width = params.width;
                g_canvas.height = params.height;
		a.onload = function() {
//			console.log( "image loaded: " );			
		
			context = g_canvas.getContext('2d');
			scale = calculateScale( a.width, a.height, params.width, params.height );
			var scale_width = Math.round(a.width * scale);
			var scale_height = Math.round(a.height * scale);
//			console.log( "SCALE: " + scale + " (" + scale_width + " x " + scale_height + ")" );
			
			// fill background
			context.fillStyle = "#000000";
			context.fillRect( 0, 0, params.width, params.height );

			if ( params.width > scale_width )
				x_offset = Math.round( ( params.width - scale_width) / 2 );
			if ( params.height > scale_height )
				y_offset = Math.round( ( params.height - scale_height) / 2 );
//			console.log( "Offset (" + x_offset + " x " + y_offset + ")");
            context.drawImage( a, x_offset, y_offset, scale_width, scale_height );
            
            if (params.overlayMessage) {
                context = canvasTextOverlay({
                    imageWidth: params.width, 
                    imageHeight: params.height, 
                    message: params.overlayMessage, 
                    context: context,
                    orientation: "center",
                    fontWidthPercentageLimit: 0.65,
                    fontCheckIncreaseAmount: 3
                });
            }
			
            var jpegBase64 = g_canvas.toDataURL('image/jpeg');

			var imageData = context.getImageData( 0, 0, params.width, params.height );
//			console.log( "posting tab thumbnail: " + imageData.data.length + " bytes" );
			var base64 = ArrayBufferToBase64(imageData.data) ;
			chrome.runtime.sendMessage( params.sender, {
			    message: "thumbnail_response",
                width: imageData.width,
                height: imageData.height,
                base64: (params.format === "jpeg") ? jpegBase64 : base64, format: params.format,
                webHelperReturnCookie: params.webHelperReturnCookie
			});

		}
	});

}

