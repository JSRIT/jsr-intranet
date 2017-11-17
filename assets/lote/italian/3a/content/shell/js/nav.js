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
		
		showImages($(this).attr('id').substr($(this).attr('id').lastIndexOf('_')+1)); // change photos according to cell
		
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
	
	
	function showImages(cellId){
		for (var i=0;i<=4;i++){ // change photos
			$('#nav_' + i + '_frame img').attr('src','../images/nav_img_' + cellId + '_' + i + '.jpg');
		}
	}
	
});
