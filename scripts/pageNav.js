// JavaScript Document
/*jshint esversion: 6 */

//variables 
var currentPage = 0;
var main_path = "htm/";
var main_end = ".html";
var main_display = document.getElementById("mainContent");

//Loads first iframe at launch
main_display.src = main_path + "00_home" + main_end;

//bibliography
function showBib() {
	main_display.src = main_path + "000_bibliography" + main_end;
}

//allows links in sidbar to correspond to the right page
function pgAdjst(numb) {
	currentPage = numb;
}

function unitNumber(unit){
	if (unit == "u1") {
		unit_number = 0;
	} else if (unit == "u2a") {
		unit_number = 1;
	} else if (unit == "u3a") {
		unit_number = 2;
	}
	return unit_number;
}

//returns mid path, used in pageNav and unitSidebar
function unitPath(unit){
	let display_strt, unit_number;
	unit_number = unitNumber(unit); // 21
	display_strt = main_path + pageOrder.mid[unit_number];
	return display_strt;
}

							// "u3a", 1, 1, 1
function pageNav(unit, lesson, first, direction) {
	let display, intro, unitNum, display_strt, lesson_dir;
	display_strt = unitPath(unit);
	lesson_dir = "lesson" + lesson + "/";
	// currentPage correction depending on forward or reverse
	if (currentPage <= 0) {
		currentPage = 0;
	}
	if (direction) {
		currentPage = currentPage + 1;
	} else {
		currentPage = currentPage - 1;
	}
	
	//changes iframe to path according to first or consecutive navigation
	switch (first) {
		case 0:
			if (unit == "u1") {
				display = pageOrder[unit][0].pageOrder[0][lesson]; 
				main_display.src = display_strt + display + main_end;
			} else {
				display = pageOrder[unit][0].pageOrder[lesson][currentPage]; 
				main_display.src = display_strt + lesson_dir + display + main_end;
			}
			break;
		case 1:
			intro = pageOrder[unit][0].pageOrder[0][lesson]; 
			main_display.src = display_strt + intro + main_end;
			currentPage = 0;
			break;
	}
}
