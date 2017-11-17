/* check.js

Copyright  2007 WestOne Services All WestOne materials, regardless of format are protected by copyright law. No part may be reproduced or re-used for any commercial purposes whatsoever without written permission from WestOne Services (IPUnit@westone.wa.gov.au)

@author Benjamin Kroll (ben.kroll@westone.wa.gov.au), WestOne Services
@author Paul Haimes (paul.haimes@westone.wa.gov.au), WestOne Services

$CreatedDate: 2007/07/04 $

$LastChangedDate: yyyy/mm/dd $

@modified [Date], [Name], [Reason] $Rev: 01 $
============================================
REQUIRES:
	* jQuery 1.1.3+

DESCRIPTION:
JS functions that test the user's OS and browser 
for compatible plug-ins/versions

jQuery Licensing: http://docs.jquery.com/Licensing (MIT || GPL)
=============================================
*/

$(document).ready(function(){ // Crossbrowser onload function

		// Hide stuff
		// List of IDs/Classes in checker.html to hide on startup
		var aElemToHide = new Array ('#no_js','#system_test','#os_test','#bw_test','#fl_test','#ar_test','#qt_test','#wm_test');
		var aElemToHideLen = aElemToHide.length;
		
		for (var i=0; i<aElemToHideLen; i++){
			$(aElemToHide[i]).hide(); // hide the element
		}
		// Hide stuff ends
	
// START editing after this line ****************

		var nFLVersCur	= 9.0; // Current Adobe Flash Player plugin available
		// --- OS / Browser stuff
		var bOSCheck	= true;	// Enable Operation System check; [true|false]
		var bBWCheck	= true;	// Enable Browser check; [true|false]
		// --- Plugins stuff
		var nFLVersReq	= 7.0;	// Required Adobe Flash Player plugin version; [float|false] (float = 1.3 etc.)
		var nARVersReq	= 6.0; 	// Required Adobe Acrobat Reader plugin version; [float|false]
		var nQTVersReq	= 6.0; 	// Required Apple QuickTime version; [float|false]
		var bWMReq		= true;	// Requires Windows Media Player; [true|false]

// STOP editing after this line ****************
		
		if (bOSCheck || bBWCheck || nFLVersReq || nARVersReq || nQTVersReq || bWMReq){	
			
			// Show the system test area
			$("#system_test").show();
			
			// OS and Browser check
			if (bOSCheck || bBWCheck){
				// show the system test area
				if (bOSCheck){
					$("#os_details").append(checkOSVersion());
					showCheck('#os');
					
				}
				if (bBWCheck){
					$("#bw_details").append(checkBWVersion());
					showCheck('#bw');
				}
			}
			
			// Check which sections to show / tests to perfom
			if (nFLVersReq !== false){ // Adobe Flash Player plugin check
				doCheck('#fl',checkFLVersion(),nFLVersReq);
				showCheck('#fl');
			}
			if (nARVersReq !== false){ // Adobe Acrobat Reader plugin check
				doCheck('#ar',checkARVersion(),nARVersReq);
				showCheck('#ar');
			}
			if (nQTVersReq !== false){ // Apple QuickTime check
				doCheck('#qt',checkQTVersion(),nQTVersReq)
				showCheck('#qt');
			}
			if (bWMReq !== false){ // Windows Media Player check
				doCheck('#wm',checkWMVersion(),bWMReq)
				showCheck('#wm');
			}
		}
		
		// popup event handlers
		$('.popup').click(function(){
			$(this)[0].blur();
			popup($(this).attr("href"),450,500);
			return false;
		});
		$('.popup_sm').click(function(){
			$(this)[0].blur();
			popup($(this).attr("href"),520,380);
			return false;
		});
		
	// **************  Utility functions **************
		
		// once a check has been done, show the div with the message, and hide the upgrade icon
		function doCheck(sElemName,nVerCur,nVerReq){
			
			var sImgSource = "images/cross.jpg";
			var sImgAlt = "Version unacceptable";

			if (nVerCur){
				
				if (nVerCur !== 'installed' && nVerCur !== "installed (unknown)") {
					nVerCur = nVerCur.toString();
					nVerCur = nVerCur.substring(0,nVerCur.indexOf('.')+2);
					nVerCur = parseFloat(nVerCur);
					nVerReq = parseFloat(nVerReq);				

					if (nVerCur >= nVerReq) {
						sImgSource = "images/tick.jpg";
						sImgAlt = "Version acceptable";
						$(sElemName + "_upgrade").hide();
					}
				}
				else { // exception for WM and QT Safari Mac check, also Acrobat 7 on Netscape (version number has been remove from plugins desc it seems)
					sImgSource = "images/tick.jpg";
					sImgAlt = "Version acceptable";
					nVerCur = (nVerCur == "installed")? 'installed' : 'installed (unknown)';
					$(sElemName + "_upgrade").hide();
				}

			}
			else {
				nVerCur = 'n/a';
			}
			
			// Set the image source
			$(sElemName + "_icon").attr({src : sImgSource, alt: sImgAlt});
			$(sElemName + "_req").append(nVerReq);
			$(sElemName + "_cur").append(nVerCur);
		}
		
		function showCheck(sElemName){
			$(sElemName + "_test").show();
		}
		
		function popup(sLoc,nWSize,nHSize){
			var newwin;
			newwin = window.open (sLoc,'pwin','width=' + nWSize + ',height=' + nHSize + ',scrollbars=yes,resizable=yes');			
			newwin.focus();	
			return false;
		}
		
	// ************** Testing UDF's below **************
	
		function checkFLVersion(){
			
			var nVersionIs = 0;
			var objFLPlugin = navigator.plugins["Shockwave Flash"];
			
			if (navigator.plugins && navigator.plugins.length && objFLPlugin){
				if (objFLPlugin){	
					if (objFLPlugin.description){
						sFLPluginDesc = objFLPlugin.description;
						nVersionIs = sFLPluginDesc.charAt(sFLPluginDesc.indexOf('.')-1);
					}
				}
				else {
					if (objPlugins["Shockwave Flash 2.0"]){
						nVersionIs = 2;
					}
				}
			}
			else if (navigator.mimeTypes && navigator.mimeTypes.length){
				
				objFLPlugin = navigator.mimeTypes['application/x-shockwave-flash'];
				if (objFLPlugin && objFLPlugin.enabledPlugin)
					nVersionIs = -1;
				else
					nVersionIs = 0;
			}
			else if (window.ActiveXObject){
				var objFL = null;
				for(var i=nFLVersCur; i>3; i--){
					try {
						var objFL = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
							objFL.AllowScriptAccess = "always";
						nVersionIs = i;
						break;
					}
					catch(e){
					}
				}
			}
			
			nVersionIs = (nVersionIs !== 0)? nVersionIs : false;
			
			return nVersionIs;
		}
		
		function checkARVersion(){
			
			var sVersionIs = '';
			var objPlugins = navigator.plugins;
			var objPluginsLen = objPlugins.length;
			
			if (objPlugins && objPluginsLen){	
				for (var i=0; i<objPluginsLen; i++){
					if (objPlugins[i].name.toLowerCase().indexOf("adobe acrobat") != -1){
						sVersionIs = objPlugins[i].description.match(/\b[\d\.]+\b/);
						
						if (sVersionIs == null || sVersionIs == ''){
							sVersionIs = 'installed (unknown)';
						}
						break;
					}
				}
			}
			else if (window.ActiveXObject){
				var objAR = null;
				
				for (var i=2; i<10; i++){
					try	{
						objAR = new ActiveXObject("PDF.PdfCtrl." + i);
						if (objAR){ sVersionIs = (i) + ".0"; }
					}
					catch (e) {}
				}
				
				try	{
					objAR = new ActiveXObject("PDF.PdfCtrl.1");
					if (objAR){	sVersionIs = "4.0"; }
				}
				catch (e) {}
				
				try	{
					objAR = new ActiveXObject("AcroPDF.PDF.1");
					if (objAR) { sVersionIs = "7.0"; }
				}
				catch (e) {}
			}
			
			sVersionIs = (sVersionIs !== "")? sVersionIs : false;
			
			return sVersionIs;		
		}
		
		function checkQTVersion() {

			var sVersionIs = "";
			var objPlugins = navigator.plugins;
			var objPluginsLen = objPlugins.length;
			
			if (objPlugins && objPluginsLen){
				for (var i=0; i<objPluginsLen; i++){
				
					if (objPlugins[i].name.toLowerCase().indexOf("quicktime") != -1){
						
						sVersionIs = objPlugins[i].name.match(/\b[\d\.]+\b/);
						
						if (sVersionIs == null || sVersionIs == undefined){
							sVersionIs = "installed (unknown)";
						}
						break;
					}
				}
			}
			else if (window.ActiveXObject) {
				try {
					var objQT = new ActiveXObject("QuickTimeCheckObject.QuickTimeCheck.1");
					var sQTVers = objQT.QuickTimeVersion;
					var nPart1 = sQTVers >> 24;
					var nPart2 = (sQTVers >> 20) & 0x0F;
					var nPart3 = (sQTVers >> 16) & 0x0F
				
					sVersionIs = nPart1 + "." + nPart2 + "." + nPart3;
				}
				catch (e) {}
			}
					
			sVersionIs = (sVersionIs !== ".." && sVersionIs !== "")? sVersionIs : false;
			
			return sVersionIs;
		}
		
		function checkWMVersion(){
			
			var sVersionIs = '';
			
			if (navigator.plugins && navigator.plugins.length){
				for (var i=0; i < navigator.plugins.length; i++){
					if (navigator.plugins[i].name.toLowerCase().indexOf("windows media player") >= 0) {
						sVersionIs = true;
						break;
					}
				}
			}
			else if (navigator.mimeTypes && navigator.mimeTypes.length){
				
				// 5.2 or higher
				var bWMP52 = navigator.mimeTypes && navigator.mimeTypes["application/x-mplayer2"] && navigator.mimeTypes["application/x-mplayer2"].enabledPlugin;	
				
				// 6.2 or higher
				var bWMP62_1 = navigator.mimeTypes && navigator.mimeTypes["video/x-ms-wm"] && navigator.mimeTypes["video/x-ms-wm"].enabledPlugin;
				if (typeof(WMPlay) != "undefined") { 
					var bWMP62_2 = (WMPlay.FileName == "");
				}
				
				// 6.4 or higher
				var bWMP64 = navigator.mimeTypes && navigator.mimeTypes["video/x-ms-wm"] && navigator.mimeTypes["video/x-ms-wm"].enabledPlugin && navigator.mimeTypes["video/x-ms-wmv"] && navigator.mimeTypes["video/x-ms-wmv"].enabledPlugin;
				
				// 7.0 or higher (judging from DRM module and new mime type in the Mac version)
				var bWM7 = navigator.mimeTypes && navigator.mimeTypes["application/x-drm-v2"] && navigator.mimeTypes["application/x-drm-v2"].enabledPlugin;
				// macies ahoy !
				var bWM7_2 = navigator.mimeTypes && navigator.mimeTypes["application/x-ms-wmd"] && navigator.mimeTypes["application/x-ms-wmd"].enabledPlugin;
				
				var bWMP =  bWM7 || bWM7_2 || bWMP64 || bWMP62_1 || bWMP62_2 || bWMP52;
				
				if (bWMP){ // Media Player is installed
					sVersionIs = true;
				}
			}
			else if (window.ActiveXObject){			
				try {
					var objWM = new ActiveXObject("MediaPlayer.MediaPlayer.1");
					sVersionIs = true;
				}
				catch (e) {}
			}
		
			sVersionIs = (sVersionIs)? "installed" : false;
			
			return sVersionIs;
		}
		
		function checkOSVersion() {
			
			var sNUA = navigator.userAgent.toLowerCase();
			var sOSName = "";
			var sOSVers = "";
			if (sNUA.search(/win(dows)?/) != -1){
				
				sOSName = "Microsoft&reg; Windows&reg;";
				switch (sNUA.match(/win(dows)?\s?(nt\s?)?([\d\.]+)/)[3]){
					case "5.0"	:
						sOSVers = "2000";
						break;
					case "5.1"	:
						sOSVers = "XP";
						break;
					case "5.2"	:
						sOSVers = "2003";
						break;
					case "6.0"	:
						sOSVers = "Vista";
						break;	
					default			:
						var temp = sNUA.match(/win(dows)?\s?(nt\s?)?([\d\.]+)/);
						sOSVers = (typeof temp[2] != "undefined") ? temp[2] : "";
						sOSVers += (typeof temp[3] != "undefined") ? temp[3] : "";
						sOSVers = sOSVers.toUpperCase ();
				}
			}
			else if (sNUA.search(/mac(intosh)?/) != -1){
				
				sOSName = "Macintosh";
				
				if (sNUA.search(/os\s?x/) != -1){
					sOSVers = "OS X";
				}
				else if (sNUA.search(/powerpc|ppc/) != -1){
					sOSVers = "OS 9";
				}
			}
			else {
				sOSName = "Unknown";
			}
			
			return sOSName + " " + sOSVers;
		}		
		
		
		function checkBWVersion(){
			
			var sNUA = navigator.userAgent.toLowerCase();
			var sBrowserName = "";
			var sBrowserVers = "";
			var sBrowserBuild = "";
			
			if (sNUA.search(/msie/) != -1) {
				sBrowserName = "Microsoft&reg; Internet Explorer&reg;";
				sBrowserVers = sNUA.match(/msie ([\d\.]+)/)[1];
			}
			else if (sNUA.search(/netscape/) != -1) {
				sBrowserName = "Netscape&reg; Navigator&reg;";
				sBrowserVers = sNUA.match(/netscape\d?\/([\d\.]+)/)[1];
			}
			else if (sNUA.search(/firefox/) != -1) {
				sBrowserName = "Firefox&reg;";
				sBrowserVers = sNUA.match(/firefox\/([\d\.]+)/)[1];
			}
			else if (sNUA.search(/opera/) != -1) {
				sBrowserName = "Opera&trade;";
				sBrowserVers = sNUA.match(/opera\/([\d\.]+)/)[1];
			}
			else if (sNUA.search(/safari/) != -1) {
				sBrowserName = "Safari";
				sBrowserBuild = sNUA.match(/safari\/([\d\.]+)/)[1];
				sBrowserBuild = sBrowserBuild.substring(0,(sBrowserBuild.indexOf(".")+2));
				
				sBrowserVers = "Build " + sBrowserBuild; // default
				if (sBrowserBuild >= 85){ sBrowserVers = "1.0+"; }
				if (sBrowserBuild >= 412){ sBrowserVers = "2.0+"; }
				if (sBrowserBuild >= 522){ sBrowserVers = "3.0+"; }
			}
			else {
				sBrowserName = "Unknown";
			}
			
			return sBrowserName + " " + sBrowserVers;
		}
		
});