var WORD_SELECT_FBK_COLS = 15
var WORD_SELECT_FBK_ROWS = 1

function Environment()
{
	this.vers = parseFloat(navigator.appVersion);
	this.isIE = navigator.userAgent.indexOf("MSIE") > -1;
	this.isNN = navigator.appName.indexOf("Netscape") > -1;
	this.isMAC = navigator.appVersion.indexOf("Mac") > -1;
	this.isMACie = this.isIE && this.isMAC;
	this.isDHTML = (this.isIE || this.isNN) && !this.isMACie;
	this.obj = (this.isNN) ? "document" : "document.all";
	this.oStyle = (this.isNN) ? "" : ".style";
}
var env = new Environment();

function htmlUnEncode(h)
{
	var tagList = new Array("<b>","</b>")
	var oldH = ""
	if(h == null) h = ""
	do
	{
		oldH = h
		h = h.replace("<p>","\r\n")
		h = h.replace("</p>","\r\n")
		h = h.replace("<br>","\r\n")
	} while(h != oldH)
	for(var t = 0 ; t < tagList.length ; t++)
	{
		do
		{
			oldH = h
			h = h.replace(tagList[t],"")
		} while(h != oldH)
	}
	return h
}

function showSelectMulti(w)
{
	var t = '<select class="txt" name="selectFbkSlct' + w + '" '
	+ 'onChange="doSelectFbkFeedback(' + w + ')">'
	+ '<option>Select Answer</option>'
	for(var o = 0 ; o < selectfbk[w].option.length ; o++)
	{
		t += '<option>' + selectfbk[w].option[o] + '</option>'
	}
	t += '</select>'

	return t
}

function showSelectFbk(w)
{
	if(env.isIE && env.vers >= 4 && !env.isMAC)
	{
		var t = '<div id="selectFbk' + w + '">&nbsp;</div>'
	}
	else
	{
		var t = '<textarea class="txt" name="selectFbk' + w + '" '
		+ 'rows="' + WORD_SELECT_FBK_ROWS + '" '
		+ 'cols="' + WORD_SELECT_FBK_COLS + '" '
		+ '>'
		+ '</textarea>'
	}

	return t
}

function SelectFbk()
{
	this.option = new Array
	this.answer
	this.feedback = new Array
}

var selectfbk = new Array("")

function newSelectFbk()
{
	selectfbk[selectfbk.length] = new SelectFbk()
}

function addSelectFbkOption(f)
{
	var w = selectfbk.length - 1
	selectfbk[w].option[selectfbk[w].option.length] = f
}

function addSelectFbkFeedback(f)
{
	var w = selectfbk.length - 1
	selectfbk[w].feedback[selectfbk[w].feedback.length] = f
}

function doSelectFbkFeedback(w)
{
	var el,selIndex,fbk
	el = eval("document.selectFbkForm.selectFbkSlct" + w)
	selIndex = el.selectedIndex
	if(selIndex == 0)
		fbk = "Please make a selection"
	else
		fbk = selectfbk[w].feedback[selIndex - 1]
		
	if(env.isIE && env.vers >= 4 && !env.isMAC)
		eval("selectFbk" + w).innerHTML =  fbk 
	else
		eval("document.selectFbkForm.selectFbk" + w).value = htmlUnEncode(fbk)
}
