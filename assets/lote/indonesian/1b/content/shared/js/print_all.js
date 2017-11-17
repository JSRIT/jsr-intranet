/* print_all.js

@author e4023932, WestOne Services

$CreatedDate: 2008/05/15 $

@modified [Date], [Name], [Reason] $Rev: 01 $
============================================

DESCRIPTION:
Load page contents in pre-defined order and pushes them to a new page 
which initiates printing.

NOTES:
Configuration for this script is done in "print.html" in each projects "<content cell name>/html" folder.

=============================================
*/
	
	var numberOfPages = 0;
	var buildedCode = new Array();
	var addPrintPageArray = new Array();
	var addPrintTitlesArray = new Array();
	var courseTitle = "";
	
	function init() { // setup basics
	
		numberOfPages = addPrintPageArray.length;
		
		writeContent();
		initHandlers();
		sortablesInit();
		doSelectAll();
		
		$('#printingLayer').hide();
		$('#loadHolder').hide();
		$('#transferHolder').hide();		

	} // END init
	
	function initHandlers(){ // setup all event handler actions
	
		$('#chkSelectAll').click(function () { doSelectAll(); });
		$('#btnPrint').click(function () { doThePrint(); });
		$('#btnReset').click(function () { location.reload(true); }); // page refresh
		
	} // END initHandlers
	
	// Sortables 
	function sortablesInit(){
		
		$("#sortList").sortable(
			{
				axis: "y",
				opacity: 0.7
			}
		);
	}
	
	function addPrintPage(addPage, addTitle) {
	
		addPrintPageArray.push(addPage);
		addPrintTitlesArray.push(addTitle);
		
	} // END addPrintPage
	
	function writeContent() { // shows the print select list content
		
		var listHeader = '<ul id="sortList">\n';
		var listContent = "";
		var listFooter = "</ul>\n";
		
		
		$(addPrintPageArray).each(function(index, obj){
			listContent += '<li id="divLayer_' + index + '" class="sortItem"><input type="checkbox" name="page_' + index + '" id="page_' + index + '" /> ' + addPrintTitlesArray[index] + '</li>\n';
		});
		
		$('#printContent').empty();
		$('#printContent').append(listHeader + listContent + listFooter);

	} // END writeContent
	
	function doSelectAll() { // sets all print select list checkboxes to checked (print) by default
		
		var toggle;
		
		if ($("#chkSelectAll").attr('class') == 'on'){
			
			$("#chkSelectAll").attr('class','off');
			toggle = false;
		}
		else {	
		
			$("#chkSelectAll").attr('class','on');
			toggle = true;
		}	
		
		$("#chkSelectAll").attr('checked',toggle);
				
		for (var i = 0; i < numberOfPages; i++) {
			$("#page_" + i).attr('checked',toggle);
		}

	} // END doSelectAll
	
	// fetches the content we want from the loadHolder, before the next page is loaded
	// then pushes the content in our global holder array.
	function getTheContent(itemURL) {
					
		var content = $('#loadHolder').html();
		
		if (itemURL == '../index.html'){
			if ($.browser.msie){ // IE 6 ... ARGHHH
				content = content.replace(/html\/images\//g, '/images/');  // REVIEW THIS AGAIN !!!	
			}
			else {
				content = content.replace(/img src="/g, 'img src="../');  // REVIEW THIS AGAIN !!!
			}
		}
		
		buildedCode.push(content);
		
		if (w1_debug){
			$('#transferHolder').append(content);
		}	
	} // END getTheContent
	
	// resets visuals and holders before each print
	function cleanUp(){
		//$('.print_status').remove();
		$('.sortItem').css('border-right','1px solid #000'); 
		$('#printingLayer').empty();
		$('#printingLayer').append('<br />Compiling pages ');
		$('#printingLayer').show();
		$('#transferHolder').empty();
	}
	
	function doThePrint() { // controls page assembly 
		
		// cleanup in case of re-print
		cleanUp();
		
		if (w1_debug){
			$('#transferHolder').show();
		}

		checkedPagesArray = new Array();
		
		$('.sortItem').each(function() { // go through each printable item
		
			var sortableId = $(this).attr('id').substr($(this).attr('id').lastIndexOf('_') + 1); // id looks like #page_1; we just want the number
		
			if ($('#page_' + sortableId).attr('checked')) { // add printable items that have been chosen, in the order they appear in the selection (sort order)
				checkedPagesArray.push(sortableId); 
			}
		
		});
		
		if (checkedPagesArray.length < 1) { // no pages to print; abort
			alert('You have not selected any pages for printing. Aborting.');
		}
		else { // at least 1 page to print; let's go
			
			checkedPages = checkedPagesArray.length;
			checkIndex = 0;
			
			$(checkedPagesArray).each(function(index, obj) {
			
				$("#loadHolder").load(addPrintPageArray[checkedPagesArray[index]] + ' #' + divLayerToCapture, function() { 
				
					getTheContent(addPrintPageArray[checkedPagesArray[index]]);
					
					checkIndex += 1;
						
					//$("#divLayer_" + checkedPagesArray[index]).append(' <strong class="print_status"> ..... completed</strong>\n');
					$("#divLayer_" + checkedPagesArray[index]).css('border-right','10px solid #090');
					$('#printingLayer').append('.');
					
					if (checkIndex == checkedPages){ // all checked pages have been assembled, finish the job
						printTheContent();
					}
				});
				
			});
		} // END page to print check
		
	}  // END doThePrint
	
	function printTheContent(){ // all said and done, prep the print page and pass the content
			
		theHeader = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>' + courseTitle + '</title>';
		theHeader += '<link rel="stylesheet" type="text/css" media="all" href="../../shared/css/print.css" /></head><body onload="self.print();">';
		theContent = "";
		theFooter = "</body></html>";
		
		$(buildedCode).each(function(index,obj){
			theContent += buildedCode[index];
		});		
		
		newWin = window.open('','myconsole', 'width=700,height=500,menubar=1,toolbar=1status=1,scrollbars=1,resizable=1'); 
		newWin.document.writeln(theHeader + theContent + theFooter);
		newWin.document.close();
		
		$('#printingLayer').append(" Done.<br /><br />\n");
		
		// cleanup
		$('#loadHolder').empty(); // cleanup loader div
		if (!w1_debug){
			$('#transferHolder').empty(); // cleanup transfer div
		}
		buildedCode = new Array(); // cleanup content array
		
	} // END printTheContent