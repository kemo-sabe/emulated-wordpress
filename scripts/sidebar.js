// JavaScript Document
/*jshint esversion: 6 */

//***************Variables***************
let u1Info, u2aInfo, u2bInfo, u3aInfo, u3bInfo, u4Info = [];

//***************Functions***************
//	Changes color/border of left sidebar when called
function activeNav(numb) {
	let navLength, l, navEle, navHead;
	navLength = document.getElementsByClassName("crseNavSubHead").length;
	//	reset previous changes
	for (l = 0; l < navLength; l++) {
		navEle = document.getElementsByClassName("crseNavSubHead")[l];
		navHead = document.getElementsByClassName("crseNavHeader")[l];
		navEle.classList.remove("crseNavActive"); // Removes active class of all elements
		navHead.style.color = "#515151"; // Changes color to default of all elements
	}
	
	// Add changes
	navEle = document.getElementsByClassName("crseNavSubHead")[numb];
	navHead = document.getElementsByClassName("crseNavHeader")[numb];
	navEle.classList.add("crseNavActive"); // Adds active class
	navHead.style.color = "#6664DD"; // Change color
}

//	Builds object and assigns to variable
function buildUnitInfo(unit) {
	let i;
	let list = [];
	if (unit == "u1") {
		// u1 is different (no topic, only lessons)
		let unitLength = pageOrder[unit][0].pageOrder[0].length - 1;
		list[0] = {
			"unitLength": unitLength,
			"page": 0,
			"width": 100 / unitLength,
			"pageComplete": []
		};
	} else {
		let unitLength = pageOrder[unit][0].pageOrder.length;
		
		for (i = 0; i < unitLength; i++) {
			list[i] = {
				"completed": false,
				"unitLength": pageOrder[unit][0].pageOrder[i].length - 1,
				"page": 0,
				"width": 100 / (pageOrder[unit][0].pageOrder[i].length - 1),
				"pageComplete": []
			};
		}
	}
	return list;
}

//	Initializes unit related information
function unitInit(unit) {
	if (u1Info == undefined ||
		  u2aInfo == undefined ||
		  u2bInfo == undefined ||
		  u3aInfo == undefined ||
		  u3bInfo == undefined ||
		  u4Info == undefined) 
		{
			if (unit == "u1") {
				u1Info = buildUnitInfo(unit);
				return "u1Info";							// returned variable to be used/called
			}
			else if (unit == "u2a") {
				u2aInfo = buildUnitInfo(unit);
				return "u2aInfo";		
			}
			else if (unit == "u2b") {
				u2bInfo = buildUnitInfo(unit);
				return "u2bInfo";		
			}
			else if (unit == "u3a") {
				u3aInfo = buildUnitInfo(unit);
				return "u3aInfo";		
			}
			else if (unit == "u3b") {
				u3bInfo = buildUnitInfo(unit);
				return "u3bInfo";		
			}
			else if (unit == "u4") {
				u4Info = buildUnitInfo(unit);
				return "u4Info";		
			}
		}
}

//Checks if unit info variable is set and resets left sidebar
function infoCheck(unit) {
	if (unit == "u1") {
		activeNav(0);
		if (u1Info) {
			return "u1Info";
		} else {
			return false;
		}
	} else if (unit == "u2a") {
		activeNav(1);
		if (u2aInfo) {
			return "u2aInfo";
		} else {
			return false;
		}
	} else if (unit == "u2b") {
		activeNav(2);
		if (u2bInfo) {
			return "u2bInfo";
		} else {
			return false;
		}
	} else if (unit == "u3a") {
		activeNav(3);
		if (u3aInfo) {
			return "u3aInfo";
		} else {
			return false;
		}
	} else if (unit == "u3b") {
		activeNav(4);
		if (u3bInfo) {
			return "u3bInfo";
		} else {
			return false;
		}
	} else if (unit == "u4") {
		activeNav(5);
		if (u4Info) {
			return "u4Info";
		} else {
			return false;
		}
	}
}

// Adjusts number to account for previous topics/lessons
function sidebarNumbAdjust(unit, lesson, topic) {
	let i, c, loopLength, tempLesson, nCount;
	let numbAdjst = 0;
	if (unit == "u1") {
		numbAdjst = topic;
	} else {
		nCount = topic;
		tempLesson = lesson - 1;
		for (i = lesson; i > 1; --i) {
			c = pageOrder[unit][0].pageOrder[tempLesson].length - 1;
			nCount += c;
			tempLesson = tempLesson - 1;
		}
		tempLesson += nCount;
	}
	return numbAdjst;
}

function checkPage(infoName, lesson, topic) {
	if (typeof eval(infoName)[lesson].pageComplete[topic] == 'string') {
		return true;
	} else {
		return false;
	}
}

function unitAdd(infoName, unit, lesson, topic) {
	eval(infoName)[lesson].pageComplete[topic] = pageOrder[unit][0].pageOrder[lesson][topic];
}

