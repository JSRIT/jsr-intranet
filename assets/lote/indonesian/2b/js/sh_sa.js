
/* show/hide the element with the chosen id, if iElemCount is given all id's
   with the same name + number will be shown. 
   (i.e. showHideAny('e1_q1_ans_',6); will toggle 'e1_q1_ans1' > 'e1_q1_ans6')
*/															   

function showHideAny(oElem,iElemCount){
	
	if (iElemCount > 0){
		
		var bAllAnswered = true;
		var iNotAnswered = 0;
		
		for (i=1; i<=iElemCount; i++) {

			if ($('#' + oElem + '_inp_' + i).val() != ''){ // something was entered into the appropriate box		
				$('#' + oElem + '_ans_' + i).show();
			}
			else {
				$('#' + oElem + '_ans_' + i).hide();
				bAllAnswered = false;
				iNotAnswered += 1;
			}
		}
		
		if (bAllAnswered != true){
			alert('Please try to answer all parts before checking the answers.\nYou only answered ' + (iElemCount-iNotAnswered) + '/' + iElemCount + ' parts.');
		}
		
	}
	else {
		$('#' + oElem + '_ans').toggle();
	}
	
	return false;
}

$(document).ready(function(){
	
	// overall 
	$('.answers').toggle(); // class rem. from CSS for PE
		
	// show answer toggle (multiple)
	$('.sa_toggle').click(function(){
		
		var sID = $(this).attr('id').substr(0,$(this).attr('id').lastIndexOf('_'));
		var iElemCount = $(this).attr('id').substr($(this).attr('id').lastIndexOf('_')+1);
		
		showHideAny(sID,iElemCount);
		return false;		
	});
	
	// show hide toggle (single)
	$('.sh_toggle').click(function(){
		$('#' + $(this).attr('id') + '_c').toggle();
		return false;		
	});
});
