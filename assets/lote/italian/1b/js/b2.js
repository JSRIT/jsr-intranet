/***** B1 specific functions *****/

// generic functions

function showHideAny(oElem){
	var triggerItem = document.getElementById(oElem);
	
	if (triggerItem.style.display != 'block'){
		triggerItem.style.display = 'block';
	}
	else {
		triggerItem.style.display = 'none';
	}
}


// b2.1.html, excercise 2

function showHideAnswers (){
	
	var isShowing = document.getElementById('isShowing').value;
	var i;
	var answers = new Array('5 porzioni di ortaggi/verdure, 2 porzioni di frutta','3 porzioni di latticini','1 porzione di carne, pollame o pesce','non pi&ugrave; di 1-2 porzioni di grassi/zuccheri','prodotti come cioccolata, olio, sale, burro, zucchero, alcol','6-8 bicchieri d&rsquo;acqua al giorno');
	
	if (isShowing == 0){
		for (i=0; i<=5; i++){
			document.getElementById('e2_' + i +'_answer').innerHTML = answers[i];	
		}
		document.getElementById('isShowing').value = 1;
	}
	else {
		for (i=0; i<=5; i++){
			document.getElementById('e2_' + i +'_answer').innerHTML = '';	
		}
		document.getElementById('isShowing').value = 0;
	}
		
}

// b2.2.html, excercise 2

function showHideLista (){
	
	var isShowing = document.getElementById('isShowingLista').value;
	
	if (isShowing == 0){
		document.getElementById('e2_1_answer').style.display = 'block';	
		document.getElementById('isShowingLista').value = 1;
	}
	else {
		document.getElementById('e2_1_answer').style.display = 'none';	
		document.getElementById('isShowingLista').value = 0;
	}
		
}

function popup(loc,width,height,scrl){
	var newWin = window.open(loc,'popup','width=' + width + ',height=' + height + ',scrollbars=' + scrl);
	newWin.focus();
}