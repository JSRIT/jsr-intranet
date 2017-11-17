// JavaScript Document
function InputTextLO4 () {
	this.ansAttempted = 0;
}
InputTextLO4.prototype.checkAnswers = function () {
	var i = 1;
	while(document.lo4["textfield4_"+i] != undefined) {
		if (document.lo4["textfield4_"+i].value.split(" ").join("") != "") {
			this.ansAttempted++;
		}
		i++;
	}
	if (this.ansAttempted == i-1) {
		this.showAnswers();
		document.getElementById("lo4fb").style.visibility = "hidden";
	} else {
		document.getElementById("lo4fb").style.visibility = "visible";
	}
	this.ansAttempted = 0;
}
InputTextLO4.prototype.showAnswers = function () {
	var i = 1;
	while(document.getElementById("lo4ans"+i) != undefined) {
		document.getElementById("lo4ans"+i).style.visibility="visible";
		i++;
	}
}