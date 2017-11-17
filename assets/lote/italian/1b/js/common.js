
/* show/hide the element with the chosen id, if iElemCount is given all id's
   with the same name + number will be shown. 
   (i.e. showHideAny('e1_q1_ans_',6); will toggle 'e1_q1_ans1' > 'e1_q1_ans6')
*/															   

function showHideAny(oElem,iElemCount,sStyle){ 
	
	switch (sStyle){
		case 'b':
		 	sStyle = 'block';
		 break;
		case 'i':
		 	sStyle = 'inline';
		 break;
		default:
		 	sStyle = 'block';
		 break;
	}
	
	if (iElemCount > 0){
	
		for (i=1; i<=iElemCount; i++) {
			
			var triggerItem = document.getElementById(oElem + i);
			
			if (triggerItem.style.display != sStyle){
				triggerItem.style.display = sStyle;
			}
			else {
				triggerItem.style.display = 'none';
			}
		}
	
	}
	else {
		var triggerItem = document.getElementById(oElem);	
	}
	
}

function popup(loc,width,height,scrl){
	var newWin = window.open(loc,'popup','width=' + width + ',height=' + height + ',scrollbars=' + scrl);
	newWin.focus();
}