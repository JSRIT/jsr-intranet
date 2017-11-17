// JavaScript Document
function InputTextLO5 (_arr) {
	this.correctAnswers = _arr;
	this.score=0;
}
InputTextLO5.prototype.clearAnswers = function () {
	var i = 1;	
	while ( document.lo5["textfield5_"+i.toString()] !=undefined ) {
		document.lo5["textfield5_"+i.toString()].value = "";
		i++;
	}
}
InputTextLO5.prototype.reset = function () {
	this.score=0;
	this.clearAnswers();
	//this.clearFeedback();
}
InputTextLO5.prototype.clearFeedback = function () {
}
InputTextLO5.prototype.checkAnswers = function () {	
	this.clearFeedback();	
	var i = 1;	
	while (document.lo5["textfield5_"+i.toString()]!=undefined) {
		var ansTI = document.lo5["textfield5_"+i.toString()].value;
		//alert(ansTI);
		var _str = ansTI.split(" ").join("");
		if (_str == this.correctAnswers[i-1].split(" ").join("")) {
			this.score++;
			//show tick
		} else {
			//show cross		
		}
		_str = null;
		i++;
	}
	this.showFB();
	this.score=0;
}
InputTextLO5.prototype.showFB = function () {
	 var fbDiv =  document.getElementById("lo5fb");
	 var fbP = document.getElementById("lo5fbtext");
	 if (this.score<15) {
	 var fbStr = "You have <strong>"+this.score.toString()+" out of 15</strong> correct on this attempt - keep trying.<br />The nouns in plural form are:";
	 } else {
	 var fbStr = "Well done you have all 15 correct.<br />The nouns in plural form are:";	 
	 }
	 if (fbP.hasChildNodes()) fbP.removeChild(fbP.firstChild);
	 fbP.innerHTML = fbStr;
	 fbDiv.style.display="block";
	 this.score=0;
	 	
}