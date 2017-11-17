
function insertSwf(swfFile, width, height, quality, winmode){  
      document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
      document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"');    
      document.write('width="'+width+'" height="'+height+'">\n');
      document.write(' <param name="movie" value="' + swfFile + '">\n');
      document.write('<param name="quality" value="'+quality+'">\n');
      document.write('<param name="wmode" value="'+winmode+'">\n<param name="BGCOLOR" value="#000000">');
      document.write('<embed src="../../../../../italian/1a/nav/' + swfFile + '" wmode="'+winmode+'" bgcolor="#000000" quality="'+quality+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'"></embed></object>    \n'); 
}
