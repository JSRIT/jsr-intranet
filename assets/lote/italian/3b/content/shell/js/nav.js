// LHS nav

$(document).ready(function() {

	$('.menu ul').hide();

	$('.menu li a.topnav').click(function() {	
		
		if ($(this).attr('class') != 'topnav selected'){ // menu hasn't been active before click
			
			$('a.selected').toggleClass('selected');
			$('.menu ul').hide();
			$(this).toggleClass('selected').next('ul').slideToggle('300');
			
		}	

	});
	
	$('a').click(function() {
		
		if ($(this).attr('class') == 'topnav'){ // only parent elements are allowed to reset styles of parents & children
			
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
		}
		else { // child elements are allowed to reset styles of children
			
			$('a').not('.topnav').removeClass('selected');
			$(this).addClass('selected');
			
		}
		
		if ($(this).attr('href') == '#'){ // only stop trigger on hashed links
			return false;
		}
		
	});
});
