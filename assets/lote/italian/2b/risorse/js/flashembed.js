
function insertSwf(swfFile, width, height, quality, bgcol){  
      document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
      document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0"');    
      document.write('width="'+width+'" height="'+height+'">\n');
    document.write('<param name="allowScriptAccess" value="always">\n');
	document.write('<param name="movie" value="'+swfFile+'">\n');
      document.write('<param name="quality" value="'+quality+'">\n');
      document.write('<param name="BGCOLOR" value="'+bgcol+'">');
      document.write('<embed src="../../../../../../italian/2b/risorse/js/' + swfFile + '" bgcolor="'+bgcol+'" quality="'+quality+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'" allowScriptAccess="always">\n</embed></object>\n'); 
}

// Open a Centred Window
// this includes 2 flavours: 1 where url is a URL and another where url is a string to be printed in the window.
// it looks for a <body tag so use lowercase tags!
function centredWindow(url, w, h, wN) {
	var f = "scrollbars,resizable,menubar"
	f += ",height=" + h + ",innerHeight=" + h + ",width=" + w + ",innerWidth=" + w;
	if(window.screen) {
		var aH = screen.availHeight;
		var aW = screen.availWidth;
		var cY = Math.round((aH - h)/2);
		var cX = Math.round((aW - w)/2);
		f += ",left=" + cX + ",screenX=" + cX + ",top=" + cY + ",screenY=" + cY;
	}
	// if the url string contains a <body tag then the url will be printed to the window.
	if (url.indexOf("<body") != -1) {
		var myWin = window.open('', wN, f)
		myWin.document.write(url)
		myWin.document.close()
	} else { var myWin = window.open(url, wN, f); }
}