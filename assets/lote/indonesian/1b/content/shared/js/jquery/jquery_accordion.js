// create accordion using jQuery
// by Jason Carle for Bookkeeping toolbox
// modified by Scott Davies
//		Added showAll / hideAll and nextUntil

	$(document).ready(function() {
							   
		$('div.accordion> div').hide(); 
		
        $('div.accordion> h3').click(function() {
        	$(this).next('div').slideToggle('fast')
        	//.siblings('div:visible').slideUp('fast');		//taken out cause louise wanted it to not collapse but to remain shown.
		
		});
		
		 $('div.accordion> h3').hover(function() {
			$(this).css({ "background-color":"#BBBBBB" });
		}, function() {
			$(this).css({ "background-color":"#E0E0E0" });
		});
		
		
		
	// assign show/hide functionality for the content page accordions
	$('.accordionToggle').attr('isOpen','n');		
	$('.accordionToggle').click(function(){
			if ($(this).attr('isOpen')=='n'){
			$(this).attr("src", $(this).attr("src").split('_normal').join('_hover'))
			//$(this).html('<img src="../../../shared/images/minus_btn.gif" alt="Click to close this accordion" height="13" width="13">');
			$(this).parent().parent().parent().parent().find('h3').nextUntil('h3').show('slow');
			$(this).attr('isOpen','y');
		} else {
			$(this).attr("src", $(this).attr("src").split('_hover').join('_normal'))
			//$(this).html('<img src="../../../shared/images/plus_btn.gif" alt="Click to expand this accordion" height="13" width="13">');
			$(this).parent().parent().parent().parent().find('h3').nextUntil('h3').hide('slow');
			$(this).attr('isOpen','n');
		}
		return false;
	}); 
	
	
	
	
	
	
	
	
	
	
	// SUB ACCORDION
	$('div.accordionSub> div').hide(); 
		
        $('div.accordionSub> h4').click(function() {
        	$(this).next('div').slideToggle('fast')
        	//.siblings('div:visible').slideUp('fast');		//taken out cause louise wanted it to not collapse but to remain shown.
		
		});
		
		 $('div.accordionSub> h4').hover(function() {
			$(this).css({ "background-color":"#BBBBBB" });
		}, function() {
			$(this).css({ "background-color":"#E0E0E0" });
		});
		
	// assign show/hide functionality for the content page accordions
	$('.accordionToggleSub').attr('isOpen','n');		
	$('.accordionToggleSub').click(function(){
			if ($(this).attr('isOpen')=='n'){
			$(this).attr("src", $(this).attr("src").split('_normal').join('_hover'))
			//$(this).html('<img src="../../../shared/images/minus_btn.gif" alt="Click to close this accordion" height="13" width="13">');
			$(this).parent().parent().parent().parent().find('h4').nextUntil('h4').show('slow');
			$(this).attr('isOpen','y');
		} else {
			$(this).attr("src", $(this).attr("src").split('_hover').join('_normal'))
			//$(this).html('<img src="../../../shared/images/plus_btn.gif" alt="Click to expand this accordion" height="13" width="13">');
			$(this).parent().parent().parent().parent().find('h4').nextUntil('h4').hide('slow');
			$(this).attr('isOpen','n');
		}
		return false;
	}); 
	
	
	
	
	
	
	
		
		
/*		$('#showAllContent_1_btn').click(function() {
			$('#accordion_1> h3').nextUntil('h3').show('slow');
			return false;
		});
		$('#hideAllContent_1_btn').click(function() {
			$('#accordion_1> h3').nextUntil('h3').hide('slow');
			return false;
		});
		
		
		$('#showAllContent_2_btn').click(function() {
			$('#accordion_2> h3').nextUntil('h3').show('slow');
			return false;
		});
		$('#hideAllContent_2_btn').click(function() {
			$('#accordion_2> h3').nextUntil('h3').hide('slow');
			return false;
		});
		
		
		$('#showAllContent_3_btn').click(function() {
			$('#accordion_3> h3').nextUntil('h3').show('slow');
			return false;
		});
		$('#hideAllContent_3_btn').click(function() {
			$('#accordion_3> h3').nextUntil('h3').hide('slow');
			return false;
		});
*/			
		
		// NextUntil function
		$.fn.nextUntil = function(expr) {
		   var match = [];
		
		   // We need to figure out which elements to push onto the array
		   this.each(function(){
			   // Traverse through the sibling nodes
			   for( var i = this.nextSibling; i; i = i.nextSibling ) {
				   // Make sure that we're only dealing with elements
				   if ( i.nodeType != 1 ) continue;
		
				   // If we find a match then we need to stop
				   if ( jQuery.filter( expr, [i] ).r.length ) break;
		
				   // Otherwise, add it on to the stack
				   match.push(i);
			   }
		   });
		
		   return this.pushStack( match, arguments );
		};
	});
	
	