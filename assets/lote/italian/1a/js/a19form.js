

var ids=new Array('c1','w1','c2','w2','c3','w3','c4','w4','c5','w5','c6','w6','c7','w7','c8','w8','c9','w9',
				  'cc1','ww1','cc2','ww2','cc3','ww3','cc4','ww4','cc5','ww5',
				  'cc6','ww6','cc7','ww7','cc8','ww8','cc9','ww9','cc10','ww10');


function switchid(id){	
	hideallids();
	showdiv(id);
}
function hideallids(){
	for (var i=0;i<ids.length;i++){
		hidediv(ids[i]);
	}		  
}
function hidediv(id) {
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}
function showdiv(id) {
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'block';
		}
		else { // IE 4
			document.all.id.style.display = 'block';
		}
	}
}


function checkForm() {
	a1 = document.act2.a1.value;
	a2 = document.act2.a2.value;
	a3 = document.act2.a3.value;
	a4 = document.act2.a4.value;
	a5 = document.act2.a5.value;
	a6 = document.act2.a6.value;
	a7 = document.act2.a7.value;
	a8 = document.act2.a8.value;
	a9 = document.act2.a9.value;

	if (a1=="a") { 	
		showdiv('c1'); 	hidediv('w1');
	} else { 
		showdiv('w1'); hidediv('c1');
	}

	if (a2=="iamo") { 
		showdiv('c2'); hidediv('w2');
	} else {
		showdiv('w2'); hidediv('c2');
	}

	if (a3=="i") { 
		showdiv('c3'); hidediv('w3');
	} else {
		showdiv('w3'); hidediv('c3');
	}

	if (a4=="a") { 
		showdiv('c4'); hidediv('w4');
	} else {
		showdiv('w4'); hidediv('c4');
	}

	if (a5=="ano") { 
		showdiv('c5'); hidediv('w5');
	} else {
		showdiv('w5'); hidediv('c5');
	}

	if (a6=="ate") { 
		showdiv('c6'); hidediv('w6');
	} else {
		showdiv('w6'); hidediv('c6');
	}

	if (a7=="a") { 
		showdiv('c7'); hidediv('w7');
	} else {
		showdiv('w7'); hidediv('c7');
	}

	if (a8=="ano") { 
		showdiv('c8'); hidediv('w8');
	} else {
		showdiv('w8'); hidediv('c8');
	}

	if (a9=="a") { 
		showdiv('c9'); hidediv('w9');
	} else {
		showdiv('w9'); hidediv('c9');
	}
}

/*  activity 4   */

function checkForm2() {
	a1 = document.act4.a1.value;
	a2 = document.act4.a2.value;
	a3 = document.act4.a3.value;
	a4 = document.act4.a4.value;
	a5 = document.act4.a5.value;
	a6 = document.act4.a6.value;
	a7 = document.act4.a7.value;
	a8 = document.act4.a8.value;
	a9 = document.act4.a9.value;
	a10 = document.act4.a10.value;

	if (a1=="balla") { 	
		showdiv('cc1'); 	hidediv('ww1');
	} else { 
		showdiv('ww1'); hidediv('cc1');
	}

	if (a2=="balla") { 
		showdiv('cc2'); hidediv('ww2');
	} else {
		showdiv('ww2'); hidediv('cc2');
	}

	if (a3=="ascoltano") { 
		showdiv('cc3'); hidediv('ww3');
	} else {
		showdiv('ww3'); hidediv('cc3');
	}

	if (a4=="guardiamo") { 
		showdiv('cc4'); hidediv('ww4');
	} else {
		showdiv('ww4'); hidediv('cc4');
	}

	if (a5=="presenta") { 
		showdiv('cc5'); hidediv('ww5');
	} else {
		showdiv('ww5'); hidediv('cc5');
	}

	if (a6=="arriva") { 
		showdiv('cc6'); hidediv('ww6');
	} else {
		showdiv('ww6'); hidediv('cc6');
	}

	if (a7=="lavoro") { 
		showdiv('cc7'); hidediv('ww7');
	} else {
		showdiv('ww7'); hidediv('cc7');
	}

	if (a8=="studiamo") { 
		showdiv('cc8'); hidediv('ww8');
	} else {
		showdiv('ww8'); hidediv('cc8');
	}

	if (a9=="mangiano") { 
		showdiv('cc9'); hidediv('ww9');
	} else {
		showdiv('ww9'); hidediv('cc9');
	}

	if (a10=="comprate") { 
		showdiv('cc10'); hidediv('ww10');
	} else {
		showdiv('ww10'); hidediv('cc10');
	}

}



