// JavaScript Document
   
/*
@author E4025142, WestOne Services
@created for glossary template
WUPI: 956W107_STAP
@modified [26/09/2008], [e3007612], [make more robust and compressed] $Rev: 01 $
@modified [08/10/2008], [E4024405], [doing the same as above] $Rev: 02 $

*/ 
 	// When the page is ready
	
   $(document).ready(function(){
				
		$('.glossaryBlock:not(:first)').hide();
		
		var firstTab = (String($('.glossaryBlock:first').attr('id')).slice(0,1)) + 'Glossary_btn';

		$('#' + firstTab).addClass('activeGloss');			// set the link for the first item to active
   		
		// Show the item they've clicked on
		var sLink = document.location.toString();
		if (sLink.match('#')) {		// Check to see if the URL contains an anchor
			$('.activeGloss').removeClass('activeGloss');
			$('#subNavigationPositionJS').hide();			// Hide the navigation
			  
			// click the navigation item corresponding to the anchor
			var sAnchor = sLink.split('#')[1];
			var sLetter = (sAnchor.substring(0,1)).toLowerCase();
			$('#' + sLetter + 'Glossary_btn').addClass('activeGloss');
			$('.glossaryBlock').hide();
			$('#' + sLetter+'Terms').show();
			
			$.scrollTo($('a[name='+ sAnchor +']'), 1000);
			
		} else {
			$('.glossaryBlock:first').show();
		}
		
		
		
		//	Add the js to the Glossary buttons.
		$('.glossaryMenu').click(function(event) {
			event.preventDefault();
			// Kill the function if that tab is already active.
			if ($(this).hasClass('activeGloss')) { return false;};
			
			$('.activeGloss').removeClass('activeGloss');
			$('.glossaryBlock').hide();
			$(this).addClass('activeGloss');
								
			sID = String(this.hash).split('#')[1];
			$("#"+sID+'Terms').toggle("slow");
						
			$.scrollTo($('a[name='+ sID +']'), 1000);
			event.preventDefault();
		});
		
		//	Add the js to the Glossary buttons.
		$('.internalGlossaryItem').click(function(event) {
			$('.glossaryBlock').hide();
			$('.activeGloss').removeClass('activeGloss');
			
			// click the navigation item corresponding to the anchor
			var sAnchor = String(this.hash).split('#')[1];
			var sLetter = (sAnchor.substring(0,1)).toLowerCase();
			
			$('#' + sLetter + 'Glossary_btn').addClass('activeGloss');
			$('.glossaryBlock').hide();
			$('#' + sLetter+'Terms').show();
			
			$.scrollTo($('a[name='+ sAnchor +']'), 1000);
			event.preventDefault();
		});
		
		
		$('#showAllGlossary_btn').click(function(event) {
			$('.glossaryBlock').show();
			$('.activeGloss').removeClass('activeGloss');
			$('#showAllGlossary_btn').addClass('activeGloss');
			event.preventDefault();
		});
});