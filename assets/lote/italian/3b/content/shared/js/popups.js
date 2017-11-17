/* popups.js

Copyright 2007 B.Kroll (unrestricted usage permission given to WestOne Services) 

@author Benjamin Kroll (ben.kroll@westone.wa.gov.au), WestOne Services

$CreatedDate: 2007/11/13 $

$CreatedDate: 2007/11/13 $

@modified [Date], [Name], [Reason] $Rev: 01 $
============================================

DESCRIPTION:
Triggers popups for links with class popup_<w>x<h>, where w = width and h = height.
Popup is determined from href attribute of the link.

NOTES:
To add further custom class handlers, see event handler section of this document (very end).

=============================================
*/

function popup_init(att,val,warning){

	var strAtt = ((typeof att == 'undefined') || (att == null)) ? 'class' : att;
	var strVal = ((typeof val == 'undefined') || (val == null)) ? 'non-html' : val;
	strWarning = ((typeof warning == 'undefined') || (warning == null)) ? ' (opens in a new window)' : warning;
	
	// regExp to fine either links with attribute values like i.e. 'popup' OR 'popup_100x200'
	// Custom sizes can be set following this pattern: <class/id name>_<width>x<height>
	var oRegExp = new RegExp("(^|\\s)(("+ strVal + ")|(" + strVal + "_(\\d){1,}x(\\d){1,}))(\\s|$)");

	$('a').each(function(){ // go through all anchors in the page
		
		var strAttVal = $(this).attr(strAtt); // attribute value (i.e. class, id etc.)
		
		if (oRegExp.test(strAttVal)){
				
			if (strWarning !== '') { $(this).append(strWarning); } // add link notification (unless empty
				
			$(this).click(function(){ // add click handler

				// work out custom size dimensions
				var strDim = strAttVal.substr(strAttVal.lastIndexOf('_')+1);
				var wWidth = strDim.substr(0,strDim.indexOf('x'));
				var wHeight = strDim.substr(strDim.indexOf('x')+1);
				
				if (wWidth !== '' && wHeight !== ''){ // determine/set custom size			
					strWSize = 'width=' + wWidth + ',height=' + wHeight;
				}
				else { // SET PRE-SET VALUES HERE
					
					switch (strAttVal){ // determine/set pre-set sizes
						case 'popup_sml':
							strWSize = 'width=200,height=200';
						 break;
						case 'popup_med':
							strWSize = 'width=300,height=300';
						 break;
						case 'popup_lrg':
							strWSize = 'width=400,height=400';
						 break;
					 	case 'popup_risorse':
							strWSize = 'width=770,height=450';
						 break;	
						default:
							strWSize = 'width=200,height=200';
						 break;
					}
				}
				
				// create a timestamp to attach to the window name so we can create a relativly (to the milisecond) 
				// unique window name to avoid popups from overwriting each other
				var dtNow = new Date();
				
				var oWin = window.open($(this).attr('href'), 'popup' + dtNow.getTime(), strWSize + ",resizable=yes,scrollbars=yes");
				if (oWin) {
					if (oWin.focus) oWin.focus(); // check for focus, set focus
				        return false;
                }
				oWin = null; // destroy
				return true;
			});
	
		}		
	});

} // end popup_init();

// CREATE handler instances
$(document).ready(function(){

	// popup_init(attribute (class|id), attribute value (string), notification (string)); 
	popup_init('class','popup_sml','');
	popup_init('class','popup_med','');
	popup_init('class','popup_lrg','');
	popup_init('class','popup_risorse','');
	popup_init('class','popup','');

});