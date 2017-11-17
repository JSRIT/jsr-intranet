/*
File: left_nav.js
Written by Benjamin Kroll in 2007, for Westone Services - http://www.westone.wa.gov.au
Italian 2B
*/

window.onload = function(){
	var sSearch = document.location.search;
	
	if (sSearch != ''){
		// get the idea pack passed in the query string (idea1, idea2 etc)
		sParam = sSearch.substring(sSearch.lastIndexOf('?') + 1,sSearch.length);
		// we just need the number
		sId = Number(sParam.substring(sParam.lastIndexOf('a') + 1, sParam.length) + 1);
		// trigger the correct section nav header
		switchActiveTab('menu_' + sId);
	} 
	else { 
		// work around for the flash parameter issue (hence the 6 framesets).
		// this bit of code will figure out the id of the frameset that has been loaded instead
		// off grabing the id out of the query string (above)
		var sLocation = String(window.parent.location);
		sId = Number(sLocation.substring(sLocation.lastIndexOf('.')-1, sLocation.lastIndexOf('.'))) + 1;
		if (!Number(sId)){ sId = 1; }
		switchActiveTab('menu_' + sId);
	}
}

function switchActiveTab(tabElemId){
	
	var sIdName = tabElemId.substr(0,tabElemId.indexOf('_')+1);
		
	for (var i=1; i<=7; i++) {
		var sTabId = sIdName + '' + i;
		document.getElementById(sTabId).style.backgroundColor = "#234F90";
		document.getElementById(sTabId).style.color = "#FFFFFF";
	}

	document.getElementById(tabElemId).style.backgroundColor = "#FCBC12";
	document.getElementById(tabElemId).style.color = "#000000";
}
