$(document).ready(function(){
	
	$(".rollover").hover(function() { 
			$(this).attr("src", $(this).attr("src").split('_normal').join('_hover'))                // this code is executed on rollover of the image, it grabs the image source value and strips the '_off' and replaces with '_on'
	}, function() {
			$(this).attr("src", $(this).attr("src").split('_hover').join('_normal'))                // this code is executed on rollout of the image, it does the reverse of the above
	});

});


