// JavaScript Document

function InputTextLO1() {
}
InputTextLO1.prototype.showAnswer = function (pID,aID) {
	if (!document.getElementById) alert("JavaScript isn't supported well enough to do this activity.\nYour web browser will need to be updated.");	
	if (aID.value==""){
		alert("Please attempt to answer");
	} else {
	var pTag = document.getElementById(pID);
	pTag.style.visibility = "visible";
	}
	
}