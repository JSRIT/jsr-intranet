
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
	
	// true false toggle (for select list interactions)
	$('.tfsi select').change(function(){				  
		
		if ($(this).val() == 1){
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
	
});
