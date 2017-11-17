/*
File: accordion.js
Written by Benjamin Kroll in 2007, for Westone Services - http://www.westone.wa.gov.au
Human Biological Science Unit 2A 

Note: requires jQuery to be included before this script is called
*/

$(document).ready(function(){
	// super simple accordion
	$("#accord a.toggle").click(function (){
		$("#accord a.toggle").parent().siblings().hide(); // hide every 'slide';
		$(this).parent().siblings().fadeIn('slow');
		$(this)[0].blur();
		
		return false;
	});
	
	// add print link
	$("#accord").append('<br /><a href="#" id="toggle_all">show (all slides)</a><br /><br />');
	
	$("#toggle_all").click(function(){ // print link event handler
		$("#accord a").parent().siblings().show(); // show all slides
		return false;
	});
	
});