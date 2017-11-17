

	var mapArray = new Array("../images/iroll.jpg","../images/droll.jpg","../images/eroll.jpg","../images/aroll.jpg");
 	var mapArray2= new Array("../images/I_text.jpg","../images/D_text.jpg","../images/E_text.jpg","../images/A_text.jpg");
	preload_image_object = new Image();
	preload_image_object2 = new Image();
	var i = 0;
	for(i=0; i<4; i++) {	
		preload_image_object.src = mapArray[i];
		preload_image_object2.src = mapArray2[i]; 
	}
	
function initIdea(){
	switch (thisSection){
		case "i" : doRoll(0); break;
		case "d" : doRoll(1); break;
		case "e" : doRoll(2); break;
		case "a" : doRoll(3); break;
	}
}	
	
function addLoadEvent(func) { 
  	var oldonload = window.onload; 
  	if (typeof window.onload != 'function') { 
    	window.onload = func; 
  	} else { 
    	window.onload = function() { 
      	oldonload(); 
      	func(); 
    } 
  } 
} 

function doRoll(rollID){
	document.images["inav"].src = "../images/i.jpg";
	document.images["dnav"].src = "../images/d.jpg";
	document.images["enav"].src = "../images/e.jpg";
	document.images["anav"].src = "../images/a.jpg";
	switch(rollID){
		case 0 : document.images["inav"].src = mapArray[rollID]; break;
		case 1 : document.images["dnav"].src = mapArray[rollID]; break;
		case 2 : document.images["enav"].src = mapArray[rollID]; break;
		case 3 : document.images["anav"].src = mapArray[rollID]; break;
	}
	document.images["ideatitle"].src = mapArray2[rollID];	
} 	

function toggle(id) {
	var e = document.getElementById(id);
	if(e.style.display == 'none') {
		e.style.display = 'block';
	} else {
		e.style.display = 'none';
	}
}

function show_answern(total, question) {
	
	for(i=1; i<total; i++){
	var e = document.getElementById(question+i);
		
		if(e.style.display == 'none') {
			e.style.display = 'block';
		} else {
			e.style.display = 'none';
		}
	
	}
}

/*function check_blank(total, question){
	var filled = true;

for (i=0;i<total,i++){
		if (!document.ex1.elements[i].value) filled = false;
	}

if (!filled){
		alert ("Coba jawablah semua pertanyaan!");
	} else {
		for (i=0;i<total,i++){
		show(question+'_ans_'+i);
			
		}
	}
}*/

function show(id) {
	var e = document.getElementById(id);
	e.style.display = 'block';
}

function hide(id) {
	var e = document.getElementById(id);
	e.style.display = 'none';
}


function doEx(iElem,iElemCount){
	var filled = true;
	iElemCount = (!iElemCount || iElemCount == 1)? 1 : iElemCount;
	//alert(iElem);
	for (i=0;i<iElemCount;i++){
		if (!document.getElementById('ex' + iElem).elements[i].value){ filled = false; }
	}
	
	if (!filled){
		alert ("Coba jawablah semua pertanyaan!");
	} else {
		if (iElemCount == 1){
			show('notes' + iElem);
		} else {
			for (i=0;i<iElemCount;i++){
				show('q' + iElem + '-' + (i+1));	
			}	
		}			
	}
}


