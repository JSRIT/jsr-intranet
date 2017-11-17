
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
		if (triggerItem.style.display != sStyle){
			triggerItem.style.display = sStyle;
		}
		else {
			triggerItem.style.display = 'none';
		}
	}
	
	return false;
}

function checkAnswer(elem,boxId,answer){
	
	var aCorrectAnswers = new Array();
		aCorrectAnswers['e8_q1'] = 'c';
	
	var aAnswerFeedback = new Array();
		aAnswerFeedback['e8_q1'] = new Array();
		aAnswerFeedback['e8_q1']['a'] = 'Look at what follows the phrase in which sogno appears.';
		aAnswerFeedback['e8_q1']['b'] = 'On the right track - more specific information required';
		aAnswerFeedback['e8_q1']['c'] = 'Correct answer';
		aAnswerFeedback['e8_q1']['d'] = 'No. There is no development of these points. The position of this phrase on the page suggests that it\'s a regular section in the magazine.';
	
	var objElem = elem.checked;
	
	//alert(objElem + ' . ' + answer);
	
	if (objElem == true){ 
		if (answer == aCorrectAnswers[boxId]){
			alert(aAnswerFeedback[boxId][answer]);
		}
		else {
			alert(aAnswerFeedback[boxId][answer]);
			elem.checked = false;
		}
	}
	
}

function popup(loc,width,height,scrl){
	var newWin = window.open(loc,'popup','width=' + width + ',height=' + height + ',scrollbars=' + scrl + ',top=0,left=0,resizable=yes');
	if (window.focus) { newWin.focus() }
	return false;
}