

var ids=new Array('ans1','ans2','ans3','ans4');


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


function doForm() {
	showdiv('ans1');
	showdiv('ans2');
	showdiv('ans3');
	showdiv('ans4');
}

