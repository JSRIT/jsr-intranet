/***** B1 specific functions *****/

// b1.8.html, excercise 1

function showHideAnswers(){
	
	var isShowing = document.getElementById('isShowing').value;
	var answer1 = '1. la tiv&ugrave;\n 2. il computer/PlayStation&reg;\n 3. andare a scuola in macchina o in autobus';
	var answer2 = 'Lack of exercise and unhealthy diet.';
	var answer3 = '1. participate in physical activity\n 2. follow a healthy diet';
	
	if (isShowing == 0){
		document.getElementById('e3_1_answer').innerHTML = answer1;
		document.getElementById('e3_2_answer').innerHTML = answer2;
		document.getElementById('e3_3_answer').innerHTML = answer3;
		document.getElementById('isShowing').value = 1;
	}
	else {
		document.getElementById('e3_1_answer').innerHTML = '';
		document.getElementById('e3_2_answer').innerHTML = '';
		document.getElementById('e3_3_answer').innerHTML = '';
		document.getElementById('isShowing').value = 0;
	}
		
}