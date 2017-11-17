
$(document).ready(function(){

	$("#cc1_dani div:not('#dani_nav')").hide();
	$("#cnt_home").show();
	
	$("#dani_nav a").click(function(){
		$("#cc1_dani div:not('#dani_nav')").hide();
		$($(this).attr('href')).show();
		return false;
	});
	
});