
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
				$('#' + oElem + '_ans_' + i).show('slow');
			}
			else {
				$('#' + oElem + '_ans_' + i).hide('fast');
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

// textalt handling
function textAltPrep (){ 
	
	// init stuff
	$('.ta_toggle').show();
	$('.ta_toggle').siblings('.ta_content').hide(); // hide all text alternative texts
	
	// event handlers
	$('.ta_toggle').click(function(){
		$(this).siblings('.ta_content').toggle('slow');		
		return false; // disable triggers	
	});
}


$(document).ready(function(){
	
	// overall 
	$('.hidden').hide(); // class rem. from CSS for PE
		
	// show answer toggle (multiple)
	$('.sa_toggle').click(function(){
		
		var sID = $(this).attr('id').substr(0,$(this).attr('id').lastIndexOf('_'));
		var iElemCount = $(this).attr('id').substr($(this).attr('id').lastIndexOf('_')+1);
		
		showHideAny(sID,iElemCount);
		return false;		
	});
	
	// show hide toggle (single)
	$('.sh_toggle').click(function(){
		
		if ($(this).attr('class') !== 'sh_toggle ch'){ // exception for "click here links"
			$(this).toggleClass('down');	
		}
		$('#' + $(this).attr('id') + '_c').slideToggle('slow');
		return false;		
	});
	
	// true false toggle
	$('.tf input').click(function(){				  
		
		if ($(this).val() == 1){
			//alert('Correct!');
			$('#' + $(this).attr('name') + '_fls').fadeOut('fast');
			$('#' + $(this).attr('name') + '_ans').fadeIn('slow');
		}
		else {
			//alert('Wrong, please try again!');
			$('#' + $(this).attr('name') + '_ans').fadeOut('fast');
			$('#' + $(this).attr('name') + '_fls').fadeIn('slow');
			$(this).attr('checked',false);
		}
		
	});
	
	// true false toggle (for input text interactions)
	$('.tfi input').change(function(){				  
		
		if ($(this).val() == $('#' + $(this).attr('id') + '_val').html()){
			
			$('#' + $(this).attr('id') + '_fls').fadeOut('fast');
			$('#' + $(this).attr('id') + '_ans').fadeIn('slow');
		}
		else {
			//alert('Wrong, please try again!');
			$('#' + $(this).attr('id') + '_ans').fadeOut('fast');
			$('#' + $(this).attr('id') + '_fls').fadeIn('slow');
			$(this).attr('value','');
		}
		
	});
	
	// checkbox toggle
	$('.cbi input[@type="checkbox"]').click(function(){				  

		if ($(this).attr('checked') == true){
			
			if ($(this).val() == 1){
				$('#' + $(this).attr('id') + '_fls').fadeOut('fast');
				$('#' + $(this).attr('id') + '_ans').fadeIn('slow');
			}
			else {
				$('#' + $(this).attr('id') + '_ans').fadeOut('fast');
				$('#' + $(this).attr('id') + '_fls').fadeIn('slow');
			}
		
		} 
		else {
			$('#' + $(this).attr('id') + '_ans').fadeOut();
			$('#' + $(this).attr('id') + '_fls').fadeOut();
		}

	});
	
	// true false toggle (for select list interactions)
	$('.tfs select').change(function(){				  
		
		if ($(this).val() == $('#' + $(this).attr('id') + '_val').html()){
			//alert('Correct!');
			$('#' + $(this).attr('id') + '_fls').fadeOut('fast');
			$('#' + $(this).attr('id') + '_ans').fadeIn('slow');
		}
		else {
			//alert('Wrong, please try again!');
			$('#' + $(this).attr('id') + '_ans').fadeOut('fast');
			$('#' + $(this).attr('id') + '_fls').fadeIn('slow');
			//$(this).attr('value','');
		}
		
	});
	
	// tab init
	$('.tab').hide();
	$('#tab_1_c').show();
	
	$('.tab_nav li a').click(function (){
		$('.tab_nav li a').removeClass('ctab');
		$('.tab').hide();
		$(this).addClass('ctab');
		$('#' + $(this).attr('id') + '_c').slideDown('slow');
		return false;
	});
	
	textAltPrep();
	
	// quiz CSS
	/* <div class="quiz_css" id="q1_q">
		<ol>
			<li><question_text><br />
				<input type="text" size="50" id="q1_1" /> 
				<input type="hidden" id="q1_1_val" value="<correct_answer>" />
				<input type="hidden" id="q1_1_valt" value="<alt_correct_answer>|<alt_correct_answer>" /><br />
				<span class="hidden ans" id="q1_1_ans">Correct. (<correct_answer>)<br /></span>
				<span class="hidden fls" id="q1_1_fls">Incorrect. <primary_feedback>.<br /></span>
				<span class="hidden fls" id="q1_1_fls2">Incorrect. <secondary_feedback>.<br /><br /></span>
				... etc
			</li>
		</ol>
		<input type="hidden" id="q1_fls2" value="<generic_final_feedback>" />
		<input type="hidden" id="q1_att" value="1" />
		<input type="hidden" id="q1_maxatt" value="2" />
		<input type="button" class="btn_answers" id="q1" value="check answers" />	
	</div>
	*/
	
	$('.quiz_css .btn_answers').click(function(){
						
		nAttempts = $('#' + $(this).attr('id') + '_att').val();
		nMaxAttempts = $('#' + $(this).attr('id') + '_maxatt').val();
		
		bAllFilledOut = false;
		var sFalse2 = '#' + $(this).attr('id') + '_fls2';
				
		$('#' + $(this).attr('id') + '_q input:text').each(function(){
			bAllFilledOut = ($.trim($(this).val()) !== '')? true : false; // check if the question has been attempted
		});
		
		if (bAllFilledOut == true){ // all questions have been attempted, show feedback
		
			$('#' + $(this).attr('id') + '_q input:text').each(function(){
			
				var thisId = $(this).attr('id');
				var thisFalse = '#' + thisId + '_fls';
				var thisAnswer = '#' + thisId + '_ans';
				
				var thisUserVal = $.trim($(this).val());
				var thisValId = '#' + thisId + '_val';
				var thisVal = $.trim($(thisValId).val());
				var thisValAltId = '#' + thisId + '_valt';
				var thisValAlts = ($(thisValAltId).val() !== undefined)? $(thisValAltId).val().split('|') : ''; // if there are alternative answers, create the array

				//alert(thisUserVal + ' vs ' + thisValAlts);
				//alert(in_array(thisUserVal,thisValAlts));

				if ((thisUserVal == thisVal) || in_array(thisUserVal,thisValAlts)){ // if the right answer has been given or is part of the possible alt answers accepted
					
					//alert('right answer');
					
					$(thisFalse).hide();
					
					if (nAttempts == 1){
						$(thisAnswer).html($(thisAnswer).html().replace('Correct.','Well done!'));
					}
					
					$(thisAnswer).show();
					
				}
				else if ( ((thisUserVal !== thisVal) || in_array(thisUserVal,thisValAlts)) && nAttempts > 1){ // on second attempt feedback changes (either all same or individual)
					
					//alert('wrong answer');
					
					var sNewFalseFeedback = '';
					
					if ($(thisFalse + nAttempts).html() !== null){
						sNewFalseFeedback = $(thisFalse + nAttempts).html();
					}
					else if ($(sFalse2).val() !== undefined && (nAttempts == nMaxAttempts)){ // final attempt, still wrong; show global feedback if there is any
						sNewFalseFeedback = $(sFalse2).val();
					}
					
					$(thisAnswer).hide();
					if (sNewFalseFeedback !== ''){ // there is n'th attempt feedback, show it
						$(thisFalse).html(sNewFalseFeedback);
					}
					$(thisFalse).show();
				}
				else {
					$(thisAnswer).hide();
					$(thisFalse).show();
				}
			
			}); // each input loop END
		}
		
		if (bAllFilledOut !== true){
			alert('Type the answers in all the blanks before you hit the feedback button.');
		}
		else { // only increment "attempts" if all questions have been answered before an attempt
			//alert(nAttempts);
			$('#' + $(this).attr('id') + '_att').val(Number($('#' + $(this).attr('id') + '_att').val())+1); // 
		}	

	});
	
	function in_array(needle,haystack){
		
		var nHaySize = haystack.length;
		
		for (var i=0;i<nHaySize;i++) {
			
			if (haystack[i] == needle) {
				return true;
			}
			else if (haystack[i] instanceof Array) {
				return in_array(needle,haystack[i]);
			}
			
		}
		
	   return false;			
	}
	
});


