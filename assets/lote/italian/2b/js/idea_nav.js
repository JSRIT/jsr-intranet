
var mapArray = new Array("../images/idea_i.gif","../images/idea_d.gif","../images/idea_e.gif","../images/idea_a.gif");
preload_image_object = new Image();
var i = 0;

for (i=0; i<4; i++) {	
	preload_image_object.src = mapArray[i]; 
}

function swapMap(mapID){
	document.images["idea"].src = mapArray[mapID];
	return false;
}

function showCurrent(mapID){
	document.images["idea"].src = mapArray[mapID];
	return false;
}