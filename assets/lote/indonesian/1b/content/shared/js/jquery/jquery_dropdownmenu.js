/*
 * date:	2003-11-16
 * info:	http://inspire.server101.com/js/mb/
 
 @modified [14/07/2008], [e3007612], [check to see if css is enabled] $Rev: 01 $
 */
 
var mbW=250;
var mbA,mbT,mbTf,mbSf;
var mbR = [];


function mbSet(m,c)
{	
	$('#subNavigationPosition').attr("id", "subNavigationPositionJS")
	$('#'+m).attr("id", "subNavigationJS")
	m = "subNavigationJS"

	var m=document.getElementById(m);
	m.className=c;
	mbR[mbR.length] = m;
	var i;
	//alert("isEnabled: "+isEnabled);
	var e=m.getElementsByTagName('a');
	if (!mbTf) mbTf=new Function('mbHT();');
	if (!mbSf) mbSf=new Function('mbS(this);');
	for (i=0;i<e.length;i++) {
		e[i].onmouseout=e[i].onblur=mbTf;
		e[i].onmouseover=e[i].onfocus=mbSf;
	}

	m=m.getElementsByTagName('ul');
	for (i=0;i<m.length;i++) {
		mbH(mbL(m[i]));
	}
		
		
		
}

function mbHA() {
	if (mbA) {
		while (mbA) mbH(mbA);
		mbHE('visible');
	}
}

function mbHT() {
	if (!mbT) mbT=setTimeout('mbHA();', mbW);
}

function mbTC() {
	if (mbT) {
		clearTimeout(mbT);
		mbT=null;
	}
}

function mbS(m) {
	mbTC();
	if (mbA) while (mbA&&m!=mbA&&mbP(m)!=mbA) mbH(mbA);
	else mbHE('hidden');

	if (mbM(m)) {
		mbSH(m,'visible');
		$(m).addClass('mActive');
		mbA=m;
	}
}

function mbH(m) {
	if (m==mbA) mbA=mbP(m);
	mbSH(m,'hidden');
	$(m).removeClass('mActive');
	mbT=null;
}

function mbL(m) {
	while (m && m.tagName != 'A') m = m.previousSibling;
	return m;
}

function mbM(l) {
	while (l && l.tagName != 'UL') l = l.nextSibling;
	return l;
}

function mbP(m) {
	var p = m.parentNode.parentNode;
	if (p.tagName == 'UL') {
		var i = 0;
		while (i < mbR.length) {
			if (mbR[i] == p) return null;
			i++;
		}
	} else {
		return null;
	}
	return mbL(p);
}

function mbSH(m,v) {
	if(hasCSS()) {
		m.className=v;
		mbM(m).style.visibility=v;
	 } else
	 {
		//alert("no css");
	 }
	 
}

function mbHE(v) {
/*	REMOVE TO PREVENT HOVER BUG

mbHEV(v,document.getElementsByTagName('select')); */
}

function mbHEV(v,e) {
	for (var i=0;i<e.length;i++) e[i].style.visibility=v;
}


function hasCSS() {
	
	var sCSScolour = $("#isCSSEnabled").css("color");
	isCSS = true
	if(sCSScolour == "#000000" || sCSScolour == "rgb(0, 0, 0)")
	{
		isCSS = false
	}
	//alert($("#isCSSEnabled").css("color"));
	return isCSS
}

// Initialise the menu.
$(document).ready(function()
{
	mbSet("subNavigationNOJS", "mbh")
});
