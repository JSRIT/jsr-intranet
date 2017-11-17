
/*********************************************************************************************************************
	Analyser Flash / JavaScript Application
	
	$Id$
	
	File:	lib/prototypes.js
	
	Date:	20th June 2005
	Written by:
		Philip Brown
		philipbrown@globalvision.com.au

		Global Vision Productions
		371 George Street
		Fitzroy Victoria 3065
		Phone: (03) 9412 7600
		Fax:   (03) 9417 7853
		Email: info@globalvision.ocm.au
		WWW:    http://www.globalvision.com.au
*********************************************************************************************************************/

/*********************************************************************************************************************
	Function prototypes
	
		getAcrobatVersion
			Description
				Returns the version of Adobe Acrobat plugin if it is installed, zero (0) otherwise.
			Usage
				string getAcrobatVersion ()
			Parameters
				None
				 
		isAcrobatInstalled
			Description
				Returns 1 if the Adobe Acrobat plugin is installed, 0 otherwise.
			Usage
				boolean isAcrobatInstalled ()
			Parameters
				None
		
		getQuickTimeVersion
			Description
				Returns the version of the QuickTime plugin if it is installed, zero (0) otherwise.
			Usage
				string getQuickTimeVersion ()
			Parameters
				None
				
		isQuickTimeInstalled
			Description
				Returns 1 if the QuickTime plugin is installed, 0 otherwise.
			Usage
				boolean isQuickTimeInstalled ()
			Parameters
				None
		
		createShockwaveObject
			Description
				Creates a Shockwave Director object to insert into the page via the DOM
			Usage
				object createShockwaveObject (string source, int width, int height)
			Parameters
				source
					The source Shockwave movie
				width
					The desired display width
				height
					The desired display height
					
		getShockwaveDirectorVersion
			Description
				Returns the version of the Shockwave for Director version if it is installed, zero (0) otherwise.
			Usage
				string getShockwaveDirectorVersion ()
			Parameters
				None
				
		isShockwaveDirectorInstalled
			Description
				Returns 1 if the Shockwave for Director plugin is installed, 0 otherwise.
			Usage
				boolean isShockwaveDirectorInstalled ()
			Parameters
				None
		
		returnVersionData
			Description
				Callback function for Shockwave Director movies
			Usage
				void returnVersionData (string data)
			Parameters
				data
					The string of data sent from the movie
		
		createJavaObject
			Description
				Creates a Java applet object to insert into the page via the DOM
			Usage
				object createJavaObject (string code, int width, int height)
			Parameters
				code
					The class file for the Java applet
				width
					The desired display width
				height
					The desired display height
					
		returnJavaVersionData
			Description
				Callback function for Java applets
			Usage
				void returnJavaVersionData (string data)
			Parameters
				data
					The string of data sent from the applet
		
		getJavaVersion
			Description
				Returns the currently installed version of Java
			Usage
				int getJavaVersion ()
			Parameters
				None
				
		getScreenResolution
			Description
				Returns the client screen resolution in pixels formatted as a cartesian value (x,y).
			Usage
				string getScreenResolution ()
			Parameters
				None
				 
		getHorizontalScreenResolution
			Description
				Returns the horizontal pixel value of the client's screen resolution.
			Usage
				int getHorizontalScreenResolution ()
			Parameters
				None

		getVerticalScreenResolution
			Description
				Returns the vertical pixel value of the client's screen resolution.
			Usage
				int getVerticalScreenResolution ()
			Parameters
				None.
						
		include
			Description
				Include an external script via document.write ()
			Usage
				void include (string filename [, string type])
			Parameters
				filename
					The absolute or relative path to the script file.
				type
					The mime type of the script. Defaults to "text/javascript".
		
		includeDOM
			Description
				Include an external script via the Document Object Model method.
			Usage
				void includeDOM (string filename [, string type])
			Parameters
				filename
					The absolute or relative path to the script file.
				type
					The mime type of the script. Defaults to "text/javascript".
		
		encodeVersionNumber
			Description
				Encode a dotted decimal version number to a single integer.
			Usage
				int encodeVersionNumber (string version)
			Parameters
				version
					A dotted decimal version number with up to 4 dotted places
		
		decodeVersionNumber
			Description
				Decode a previously encoded dotted decimal version number.
			Usage
				string decodeVersionNumber (int version)
			Parameters
				version
					An encoded dotted decimal version number.
		
		getOperatingSystem
			Description
				Get's the client operating system name and version
			Usage
				string getOperatingSystem ()
			Parameters
				None
				
		getBrowser
			Description
				Get's the client browser name and version
			Usage
				string getBrowser ()
			Parameters
				None
		
		isPopupBlockerInstalled
			Description
				Returns 1 if a pop-up blocker is installed and active, 0 otherwise.
			Usage
				boolean isPopupBlockerInstalled ()
			Parameters
				None
*********************************************************************************************************************/

/*********************************************************************************************************************
	Globals
*********************************************************************************************************************/

var SW_RETURN_POINT = "";
var JAVA_RETURN_POINT = "";
var WORD_LENGTH = 32;
var BIT_FIELD_LENGTH = 8;
var BIT_MASK = 0xFF;

var latestFlashVersion = 9;

var dateTimeNow = new Date ();

/*********************************************************************************************************************
	Adobe Acrobat
*********************************************************************************************************************/
function getAcrobatVersion ()
{
	var version = 0;

	if (navigator.plugins && navigator.plugins.length)
	{
		for (i = 0; i < navigator.plugins.length; i++)
		{
			if (navigator.plugins[i].name.toLowerCase ().indexOf ("adobe acrobat") != -1)
			{
				version = navigator.plugins[i].description.match (/\b[\d\.]+\b/);
				break;
			}
		}
	}
	else if (window.ActiveXObject)
	{
		var aa = null;
		for (i = 2; i < 10; i++)
		{
			try
			{
				aa = new ActiveXObject ("PDF.PdfCtrl." + i);
				if (aa)
				{
					
					version = (i) + ".0";
				}
			}
			catch (e) {}
		}
		
		try
		{
			aa = new ActiveXObject ("PDF.PdfCtrl.1");
			if (aa)
			{
				version = "4.0";
			}
		}
		catch (e) {}
		
		try
		{
			aa = new ActiveXObject ("AcroPDF.PDF.1");
			if (aa)
			{
				version = "7.0";
			}
		}
		catch (e) {}
	}
	
//	return encodeVersionNumber (version);
	return version;
}

function isAcrobatInstalled ()
{
	return (Boolean (getAcrobatVersion ())) ? 1 : 0;
}

/*********************************************************************************************************************
	Quicktime
*********************************************************************************************************************/
function getQuickTimeVersion ()
{
	var version = 0;
	
	if (navigator.plugins && navigator.plugins.length)
	{
		for (i = 0; i < navigator.plugins.length; i++)
		{
			if (navigator.plugins[i].name.toLowerCase ().indexOf ("quicktime") != -1)
			{
				version = navigator.plugins[i].name.match (/\b[\d\.]+\b/);
				break;
			}
		}
	}
	else if (window.ActiveXObject)
	{
		try
		{
			var qt = new ActiveXObject ("QuickTimeCheckObject.QuickTimeCheck.1");
			var qtv = qt.QuickTimeVersion;
			var v1 = qtv >> 24 
			var v2 = (qtv >> 20) & 0x0F
			var v3 = (qtv >> 16) & 0x0F
		
			version = v1 + "." + v2 + "." + v3;
		}
		catch (e) {}
	}

//	return encodeVersionNumber (version);
	return version;
}

function isQuickTimeInstalled ()
{
	return (Boolean (getQuickTimeVersion ())) ? 1 : 0;
}

/*********************************************************************************************************************
	Shockwave for Director
*********************************************************************************************************************/
function createShockwaveObject (strSrc, intWidth, intHeight)
{
	var theDiv = document.createElement("div");
	theDiv.setAttribute("id", "swDiv");
	theDiv.innerHTML = "<object	id='swObject' classid='clsid:166B1BCA-3F9C-11CF-8075-444553540000' " +
					   "codebase='http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=7,0,0,0' " +
					   "width='" + intWidth + "' height='" + intHeight + "'>" +
					   "<param name='src' value='" + strSrc + "' /> " +
					   "<embed id='swEmbed' src='" + strSrc + "' type='application/x-director' " +
					   "pluginspage='http://www.macromedia.com/shockwave/download/' " +
					   "width='" + intWidth + "' height='" + intHeight + "' /></object>"
					   
	return theDiv;
}

function getShockwaveDirectorVersion (returnPoint)
{
	var version = 0;
	
	if (navigator.plugins && navigator.plugins.length)
	{
		for (i = 0; i < navigator.plugins.length; i++)
		{
			if (navigator.plugins[i].name.toLowerCase ().indexOf ("shockwave for director") != -1)
			{
				version = navigator.plugins[i].description.match (/\b[\d\.]+\b/);
				break;
			}
		}
	}
	else if (window.ActiveXObject)
	{
		try
		{
			var sw = new ActiveXObject ("SWCtl.SWCtl");
			alert(sw);
			version = sw.ShockwaveVersion ("").match (/^[\d\.]+/);
			return version
		}
		catch (e)
		{
			version = 0;
		}
	}

//	version = encodeVersionNumber (version);
//	version = version;

	/* Lite or full version */
	return version;
//	if (version > 0){
//		return version;
//	}
}

function isShockwaveDirectorInstalled ()
{
	return (Boolean (getShockwaveDirectorVersion ())) ? 1 : 0;
}

function returnVersionData (theData)
{
	var arrData = theData.split (",");
	var version = encodeVersionNumber (arrData[0].match (/^[\d\.]+/));
	var xtras = arrData[1];

	//alert("SWCALLBACK")
	// We need to do some cleanup in IE, otherwise IE will use as much
	// CPU as poss
	
	if (getBrowser().toUpperCase().indexOf("MICROSOFT") != -1) {
		
		//var swEmbed = document.getElementById("swEmbed");
		//swEmbed.parentNode.removeChild(swEmbed);
	
		var swObj = document.getElementById("swObject");
		swObj.parentNode.removeChild(swObj);
		
		var swDiv = document.getElementById("swDiv");
		swDiv.parentNode.removeChild(swDiv);
	}
	setFlashVariable(SW_RETURN_POINT, version + "," + xtras);
}

/*********************************************************************************************************************
	Java
*********************************************************************************************************************/
function createJavaObject (strCode, intWidth, intHeight)
{
	var objJava = null;
	
	objJava = document.createElement ("APPLET");
	with (objJava)
	{
		setAttribute ("id", "javaApplet");
		setAttribute ("MAYSCRIPT", "true");
		setAttribute ("code", strCode);
		setAttribute ("width", intWidth);
		setAttribute ("height", intHeight);
	}
	
	return objJava;
}

function returnJavaVersionData (strVersion)
{
	var version = encodeVersionNumber (strVersion.match (/^[\d\.]+/));
	setFlashVariable (JAVA_RETURN_POINT, version);
}

function getJavaVersion (returnPoint)
{
	var version = 0;
	
	if (navigator.plugins && navigator.plugins.length)
	{
		for (var i = 0; i < navigator.plugins.length; i++)
		{
			if (navigator.plugins[i].name.search (/^java/i) != -1)
			{
				version = navigator.plugins[i].description.match (/[\d\.]+/);
				break;
			}
		}

		return encodeVersionNumber (version);
	}
	else if (navigator.javaEnabled ())
	{
		JAVA_RETURN_POINT = returnPoint;
		var eltContainer = getPluginsDiv();
		var objJava = createJavaObject ("DetectJavaVersion.class", 1, 1);
		eltContainer.appendChild (objJava);
		return JSAPI_WAIT;
	}
	else
	{
		return 0;
	}
}

/*********************************************************************************************************************
	Screen resolution
*********************************************************************************************************************/
function getHorizontalScreenResolution ()
{
	return screen.width;
}

function getVerticalScreenResolution ()
{
	return screen.height;
}

function getScreenResolution ()
{
	return getHorizontalScreenResolution () + "," + getVerticalScreenResolution ();
}

/*********************************************************************************************************************
	Script including
*********************************************************************************************************************/
function include (strFileName, strType)
{
	if (!strType) strType = "text/javascript";
	
	document.write ("<scr" + "ipt type=\"" + strType + "\" src=\"" + strFileName + "\"></scr" + "ipt>");
	document.close ();
}

function includeDOM (strFileName, strType)
{
	if (!strType) strType = "text/javascript";
	
	var eltInc = document.createElement ("SCRIPT");
	eltInc.type = strType;
	eltInc.src = strFileName;
	
	var eltHead = document.getElementsByTagName ("head")[0];
	eltHead.appendChild (eltInc);
}

/*********************************************************************************************************************
	Version number encoding
*********************************************************************************************************************/
function encodeVersionNumber (strVersion)
{
	var intEncoded = 0x00000000;
	var arrTokens = strVersion.toString ().split (".");
	
	var intShift = WORD_LENGTH - BIT_FIELD_LENGTH;
	var intToken;
	
	for (var i = 0; i < arrTokens.length; i++)
	{
		intToken = parseInt (arrTokens[i]) << intShift;
		intEncoded |= intToken;
		intShift -= BIT_FIELD_LENGTH;
	}
	
	return intEncoded;
}

function decodeVersionNumber (intVersion)
{
	var arrDecoded = new Array();
	
	for (var intShift = WORD_LENGTH - BIT_FIELD_LENGTH; intShift >= 0; intShift -= BIT_FIELD_LENGTH)
	{
		arrDecoded[arrDecoded.length] = (intVersion >> intShift) & BIT_MASK;
	}
	return arrDecoded.join (".");
}

/*********************************************************************************************************************
	Platforms
*********************************************************************************************************************/
function getOperatingSystem ()
{
	var ua = navigator.userAgent.toLowerCase ();
	var osname = "";
	var osver = "";
	if (ua.search (/win(dows)?/) != -1)
	{
		osname = "Microsoft Windows";
		switch (ua.match (/win(dows)?\s?(nt\s?)?([\d\.]+)/)[3])
		{
			case "5.0"	:
				osver = "2000";
				break;
			case "5.1"	:
				osver = "XP";
				break;
			case "5.2"	:
				osver = "2003";
				break;
			default			:
				var temp = ua.match (/win(dows)?\s?(nt\s?)?([\d\.]+)/);
				osver = (typeof temp[2] != "undefined") ? temp[2] : "";
				osver += (typeof temp[3] != "undefined") ? temp[3] : "";
				osver = osver.toUpperCase ();
		}
	}
	else if (ua.search (/mac(intosh)?/) != -1)
	{
		osname = "Macintosh";
		if (ua.search (/os\s?x/) != -1)
		{
			osver = "OS X";
		}
		else if (ua.search (/powerpc|ppc/) != -1)
		{
			osver = "OS 9";
		}
	}
	else
	{
		osname = "Undefined";
	}
	
	return osname + " " + osver;
}

function getBrowser ()
{
	var ua = navigator.userAgent.toLowerCase ();
	var browsername = "";
	var browserver = "";
	
	if (ua.search (/msie/) != -1)
	{
		browsername = "Microsoft Internet Explorer";
		browserver = ua.match (/msie ([\d\.]+)/)[1];
	}
	else if (ua.search (/netscape/) != -1)
	{
		browsername = "Netscape Navigator";
		browserver = ua.match (/netscape\d?\/([\d\.]+)/)[1];
	}
	else if (ua.search (/firefox/) != -1)
	{
		browsername = "Firefox";
		browserver = ua.match (/firefox\/([\d\.]+)/)[1];
	}
	else if (ua.search (/opera/) != -1)
	{
		browsername = "Opera";
		browserver = ua.match (/opera\/([\d\.]+)/)[1];
	}
	else if (ua.search (/safari/) != -1)
	{
		browsername = "Safari";
		
		switch (ua.match (/safari\/([\d\.]+)/)[1])
		{
			case "85"		:	// 1.0
			case "85.5"		:	// 1.0
				browserver = "1.0";
				break;
			case "85.6"		:	// 1.0.1
				browserver = "1.0.1";
				break;
			case "85.7"		:	// 1.0.2
				browserver = "1.0.2";
				break;
			case "85.8"		:	// 1.0.3
			case "85.8.1"	:	// 1.0.3
				browserver = "1.0.3";
				break;
			case "100"		:	// 1.1
				browserver = "1.1";
				break;
			case "100.1"	:	// 1.1.1
				browserver = "1.1.1";
				break;
			case "125"		:	// 1.2
				browserver = "1.2";
				break;
			case "125.1"	:	// 1.2.1
				browserver = "1.2.1";
				break;
			case "125.7"	:	// 1.2.2
			case "125.8"	:	// 1.2.2
				browserver = "1.2.2";
				break;
			case "125.11"	:	// 1.2.4
			case "125.12"	:	// 1.2.4
				browserver = "1.2.4";
				break;
			case "312"		:	// 1.3
				browserver = "1.3";
				break;
			default			:
				browserver = "Build " + ua.match (/safari\/([\d\.]+)/)[1];
		}
	}
	else
	{
		browsername = "Undefined";
	}
	
	return browsername + " " + browserver;
}

/*********************************************************************************************************************
	Pop-up blockers
*********************************************************************************************************************/
function isPopupBlockerInstalled ()
{
	var objWin = window.open ("popped.html", "popped", "width=10, height=10, location=no, menubar=no, status=no, toolbar=no, scrollbars=no, resizable=no");
	try
	{
		var eltName = objWin.name;
		objWin.close ();
		return "Inactive / Popups enabled";
	}
	catch (e)
	{
		return "Active / Popups blocked";
	}
}


function getPluginsDiv()
{
	if (!document.getElementById ("plugins")) {
		var div = document.createElement("div");
		div.setAttribute("id", "plugins");
		div.setAttribute("name", "plugins");
		document.body.appendChild(div);
	}
	return document.getElementById("plugins");
}


var pendingResults     = new Array();
var isInternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
var JSAPI_WAIT         = -1;

//------------------------------------------------------------------------------
// Handle all the FSCommand messages in a Flash movie.
//------------------------------------------------------------------------------
function example_DoFSCommand(command, args) 
{
	//alert("command = " + command)
	var exampleObj = isInternetExplorer ? document.all.example : document.example;
	
	// Create arguments array
	var args = args.split(",");
	
	// Catch Errors
    if (this[command] == undefined) {
		alert("The requested Javascript method, " + command + "(), does not exist.")
		setFlashError(args.pop(), "The requested JavaScript method, " + command + "(), does not exist.")
		return;
	}
		
	var val  = this[command].apply(this, args);	

	// Return the value to flash. Some methods may need to wait for a callback
	// to be fired in order to gather all the required info (ie. shockwave) In
	// such instances the functions should return JSAPI_WAIT, and the callbacks
	// should manually set the flash variables themselves...
	if (val != JSAPI_WAIT && val != null) {
		setFlashVariable(args.pop(), String(val))
	} 
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function useFsCommand()
{
	//alert("get fscommand???")
	if(navigator.appName.indexOf("Microsoft") != -1){
		var theDiv = document.createElement("div");
		theDiv.id  = "afdsads";
		theDiv.innerHTML = "<embed src='../../../../../../italian/1b/before/js/gateway.swf' FlashVars='name=_level0.useFsCommand&value=true' width='0' height='0' type='application/x-shockwave-flash'></embed>";
		document.body.appendChild(theDiv)
	} else {	
		var theDiv = document.createElement("div");
		theDiv.id  = "afdsads";
		theDiv.innerHTML = "<embed src='../../../../../../italian/1b/before/js/gateway.swf' FlashVars='name=_level0.useFsCommand&value=false' width='0' height='0' type='application/x-shockwave-flash'></embed>";
		document.body.appendChild(theDiv)
	}	
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
var resultCount = 0;
function confirmResult(id)
{
	resultCount--;
	if ((navigator.appName.indexOf("Microsoft") != -1)) {
		return;
	}
	var d = document.getElementById(id)
	d.parentNode.removeChild(d);
	setTimeout("processPendingResults()", 5)	
	return JSAPI_WAIT;
}

function processPendingResults()
{
	//alert("process")
	if (pendingResults.length > 0) {		
		sendResult(pendingResults.shift());
	}
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function setFlashVariable(name, value)
{
	//alert("Setting " + name + " to " + value);
	if(navigator.appName.indexOf("Microsoft") != -1){
		document.all.example.SetVariable(name + ".result", value);
	} else {	
		var resultsContainer = getResultsDiv();		
		var resultDiv 		 = createResultDiv(name.split(".")[2]);		

		var divinfo          = "<embed src='../../../../../../italian/1b/before/js/gateway.swf?r=" + new Date().getTime() + "' FlashVars='name=" + name + 
		                       ".result&value=" + value + "' width='0' " +
							   "height='0' type='application/x-shockwave-flash'></embed>";		
		
		//alert("DIV id = " + name.split(".")[2])
		resultDiv.innerHTML  = divinfo;
		sendResult(resultDiv);
	}
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function setFlashError(name, value)
{
	if(navigator.appName.indexOf("Microsoft") != -1){
		document.all.example.SetVariable(name + ".error", value);
	} else {	
		var resultsContainer = getResultsDiv();		
		var resultDiv 		 = createResultDiv(name.split(".")[2]);		
		var divinfo          = "<embed src='../../../../../../italian/1b/before/js/gateway.swf?r=" + new Date().getTime() + "' FlashVars='name=" + name + 
		                       ".error&value=" + value + "' width='0' " +
							   "height='0' type='application/x-shockwave-flash'></embed>";
		
		resultDiv.innerHTML  = divinfo;
		sendResult(resultDiv);
	}
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------

function sendResult(resultDiv)
{	
	
	//alert("sendResult()")
	var resultsContainer = getResultsDiv();	
	//alert(resultCount);
	if (resultCount < 1) {
		resultCount++;
		//alert("sending " + resultDiv.innerHTML + " to flash " + resultsContainer);
		//alert("process now " + resultsContainer.childNodes.length)
		//setTimeout(function(){ resultsContainer.appendChild(resultDiv); }, 2000)		
		resultsContainer.appendChild(resultDiv);
	} else {
		//alert("process later")
		pendingResults.push(resultDiv);
	}
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function getResultsDiv()
{
	if(!document.getElementById("JSApiResults")){
		var theDiv = document.createElement("div");
		theDiv.id = "JSApiResults";
		document.body.appendChild(theDiv);
	}
	return document.getElementById("JSApiResults");
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function createResultDiv(resultId)
{
	var theDiv = document.createElement("div");
	theDiv.id  = resultId;
	theDiv.innerHTML = "";
	return theDiv;
}

/*
* a test method
*/
function test(arg1, arg2, arg3)
{
	//alert("Test was called with " + arg1 + ", " + arg2);
	return "Value from test() function."
}


//------------------------------------------------------------------------------
// Hook for Internet Explorer.
//------------------------------------------------------------------------------
if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<script language=\"VBScript\"\>\n');
	document.write('On Error Resume Next\n');
	document.write('Sub example_FSCommand(ByVal command, ByVal args)\n');
	document.write('	Call example_DoFSCommand(command, args)\n');
	document.write('End Sub\n');
	document.write('</script\>\n');
}


function isDefined(property) {
  return (typeof property != 'undefined');
}

var flashVersion = 0;
function getFlashVersion() {

	var agent = navigator.userAgent.toLowerCase(); 
	
   // NS3 needs flashVersion to be a local variable
   if (agent.indexOf("mozilla/3") != -1 && agent.indexOf("msie") == -1) {
      flashVersion = 0;
   }
   
	// NS3+, Opera3+, IE5+ Mac (support plugin array):  check for Flash plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		var flashPlugin = navigator.plugins['Shockwave Flash'];
		if (typeof flashPlugin == 'object') { 
			for (var i = latestFlashVersion; i >= 3; i--) {
            if (flashPlugin.description.indexOf(i + '.') != -1) {
               flashVersion = i;
               break;
            }
         }
		}
	}

	// IE4+ Win32:  attempt to create an ActiveX object using VBScript
	else if (agent.indexOf("msie") != -1 && parseInt(navigator.appVersion) >= 4 && agent.indexOf("win")!=-1 && agent.indexOf("16bit")==-1) {
	   var doc = '<scr' + 'ipt language="VBScript"\> \n';
      doc += 'On Error Resume Next \n';
      doc += 'Dim obFlash \n';
      doc += 'For i = ' + latestFlashVersion + ' To 3 Step -1 \n';
      doc += '   Set obFlash = CreateObject("ShockwaveFlash.ShockwaveFlash." & i) \n';
      doc += '   If IsObject(obFlash) Then \n';
      doc += '      flashVersion = i \n';
      doc += '      Exit For \n';
      doc += '   End If \n';
      doc += 'Next \n';
      doc += '</scr' + 'ipt\> \n';
      document.write(doc);
   }
		
	// WebTV 2.5 supports flash 3
	else if (agent.indexOf("webtv/2.5") != -1) flashVersion = 3;

	// older WebTV supports flash 2
	else if (agent.indexOf("webtv") != -1) flashVersion = 2;

	// Can't detect in all other cases
	else {
		flashVersion = flashVersion_DONTKNOW;
	}

	return flashVersion;
}

flashVersion_DONTKNOW = -1;

function getSWVersion () {

	var tVersionString = "";

	if (navigator.mimeTypes && navigator.mimeTypes["application/x-director"] && navigator.mimeTypes["application/x-director"].enabledPlugin) {
		if (navigator.plugins && navigator.plugins["Shockwave for Director"] && (tVersionIndex = navigator.plugins["Shockwave for Director"].description.indexOf(".")) != - 1) {	
			var tVersionString = navigator.plugins["Shockwave for Director"].description.substring(tVersionIndex-2, tVersionIndex+2);
		}
	} else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.userAgent.indexOf("Windows 95")>=0 || navigator.userAgent.indexOf("Windows 98")>=0 || navigator.userAgent.indexOf("Windows NT")>=0 )) {
		document.write('<SCRIPT LANGUAGE=VBScript\> \n');
		document.write('on error resume next \n');
		document.write('set tSWControl = CreateObject("SWCtl.SWCtl") \n');
//		document.write('set tSWControl = CreateObject("SWCtl.SWCtl") \n');
		document.write('if IsObject(tSWControl) then \n');
		document.write('tVersionString = tSWControl.ShockwaveVersion("") \n');
		document.write('end if');
		document.write('</SCRIPT\> \n');
	}
//	alert(tVersionString);
	if (tVersionString == "") {
		tVersionString = "Not Detactable.</b> This may be because you have the player version <b>10.1</b>. If this is the case then you dont need to update your shockwave&reg; player";
	}
	return tVersionString;
}

//-->