$(document).ready(function()
{
	// handles text alternative hide and show; for document text alternatives (.doc .pdf etc.) please
	// do NOT use the ta_toggle class (it is hidden in CSS by default and only shown via Javascript,
	// which would mean a text document would not appear if you used this class for it)
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
	textAltPrep();

	
	
	
});