// JavaScript Document
/*jshint esversion: 6 */

function unitLinks(unit, lesson, topic, intro) {
	/* function builds list in right sidebar and initializes lesson/topic build called on every page load*/
	try {
		// adds right sidebar image
		if (lesson == 0) {
			document.getElementById("sideImg").src = "../../media/images/logoImage.png";
		} else {
			document.getElementById("sideImg").src = "../../../media/images/logoImage.png";
		}
	} catch(e) {console.warn("unitLinks :", e);}
	// Change page header
	document.getElementById("pageHeader").innerHTML = window.parent.pageOrder[unit][1].title[lesson][topic];
	// ******  Variable Init  ******
	let iCheck, mainUl, endUl, topicUl, unitLoop, i;
	let infoName = "";
	let links = "";
	let tLinks = "";
	iCheck = window.parent.infoCheck(unit);	
	if (iCheck != false) {
		infoName = iCheck;
	} else {
		infoName = window.parent.unitInit(unit);
	}
	mainUl = "<ul id=\"unitList\">";
	endUl = "</ul>";
	topicUl = "<ul class=\"topicList\">";
	unitLoop = window.parent.pageOrder[unit][0].pageOrder[0].length;
	// ******  End Variable Init  ******
	for (i = 1; i < unitLoop; i++) {
		// loop the unit and build right sidebar list
		tLinks = listBuild(unit, lesson, i, endUl, topicUl, intro);	
		links += mainUl + tLinks;
	}
	links += endUl;
	document.getElementById("linkBuild").innerHTML = links;	//	add links to right sidebar
	percentAdjst(infoName, unit, lesson, topic, intro);	
	caretCheck(infoName, unit, lesson, topic);		
}

function listBuild(unit, unitLesson, lesson, endUl, topicUl, intro) {
	/* function builds topic list in right sidebar	*/
	let display_strt, pageInList, firstPage, pageTitle, subPageLength, j;
	let updateUl = "";
	let head = "";
	let li_strt = "";
	let li_mid = "";
	let end_mid = "";
	let end_li = "";
	display_strt = window.parent.unitPath(unit);								
	pageInList = window.parent.pageOrder[unit][0].pageOrder[0];		
	firstPage = pageInList[lesson];
	pageTitle = window.parent.pageOrder[unit][2].sideTitle[0][lesson];	
	head = "<li><span class=\"caret\"><a onClick=window.parent.pageNav('" + unit + "'," + lesson + "," + 1 + ");>" + pageTitle + "</a></span>";
	updateUl += head + topicUl;
	if (unit != "u1") {
		if (unitLesson == 0) {
			li_strt = "<li><span class=\"listCir\"><a href=\"";
		} else {
			li_strt = "<li><span class=\"listCir\"><a href=\"../";
		}
		li_mid = ".html\" onClick=\"window.parent.pgAdjst(";
		end_mid = ");\">";
		end_li = '</a></span></li>';
		subPageLength = window.parent.pageOrder[unit][0].pageOrder[lesson].length - 1;	
		for (j = 1; j <= subPageLength; j++) {
			let topicHtm = window.parent.pageOrder[unit][0].pageOrder[lesson][j];		
			let topicTitle = window.parent.pageOrder[unit][2].sideTitle[lesson][j];	
			updateUl += li_strt + "lesson" + [lesson] + "/" + topicHtm + li_mid + j + end_mid + topicTitle + end_li;
		}
	}
	updateUl += endUl;
	return updateUl;
}


function percentAdjst(infoName, unit, lesson, topic, intro) {
	/* function to adjust progress bar on page	*/
	let elem = document.getElementById("myBar");
	let perExecuted, progPercent, unit_number, next_unit;
	let linkString = "";
	perExecuted = window.parent.checkPage(infoName, lesson, topic);	//if lesson/topic complete
	progPercent = window.parent.eval(infoName)[lesson].width * window.parent.eval(infoName)[lesson].page; //percentage complete
	elem.style.width = progPercent + "%";	// change progbar according to percent
	if (progPercent >= 100) {
	//******	If lesson/topic/unit 100% complete	******
		elem.style.width = "100%";
		if (window.parent.eval(infoName)[lesson].completed == false) {
			window.parent.unitAdd(infoName, unit, 0, lesson);
			window.parent.eval(infoName)[0].page++;
			window.parent.eval(infoName)[lesson].completed = true;
		}
		chngColor(infoName, unit, lesson, topic);
		window.parent.eval(infoName)[lesson].page = window.parent.eval(infoName)[lesson].unitLength;
		if (intro) {
			if (unit == "u1") {next_unit = "u2a";}
			else if (unit == "u2a") {next_unit = "u2b";}
			else if (unit == "u2b") {next_unit = "u3a";}
			else if (unit == "u3a") {next_unit = "u3b";}
			else if (unit == "u3b") {next_unit = "u4";}
			document.getElementById("pvs_nxt_lsn").insertAdjacentHTML("afterbegin", "<span class=\"nxtLsn\" onClick=\"window.parent.pageNav('" + next_unit + "'," + lesson + "," + 1 + "," + 1 + ");\">Next Lesson &rarr; </span>");
		}
	} else if (perExecuted) {
		chngColor(infoName, unit, lesson, topic);
	} else {
		if (intro == 1) {
			window.parent.currentPage = 0;
			unit_number = window.parent.unitNumber(unit);
			if (unit == "u1") {
				linkString = "<span class=\"nxtLsn\" onClick=\"window.parent.pageNav('" + unit + "'," + 1 + "," + 0 + "," + 1 + ");\"> Continue &rarr;</span>";
			} else {
				if (topic == 0) {
					linkString = "<span class=\"nxtLsn\" onClick=\"window.parent.pageNav('" + unit + "'," + 1 + "," + 1 + "," + 1 + ");\"> Continue &rarr;</span>";
				} else {
					linkString = "<span class=\"nxtLsn\" onClick=\"window.parent.pageNav('" + unit + "'," + topic + "," + 0 + "," + 1 + ");\"> Continue &rarr;</span>";
				}
			}
			document.getElementById("pvs_nxt_lsn").insertAdjacentHTML("afterbegin", linkString);
		}
	}
}

function progBar(infoName, unit, lesson, topic, intro) {
	let progPercent, executed;
	executed = window.parent.checkPage(infoName, lesson, topic);
	if (!executed) {
		window.parent.unitAdd(infoName, unit, lesson, topic);
		window.parent.eval(infoName)[lesson].page++;
		percentAdjst(infoName, unit, lesson, topic, intro);
	} else {
		percentAdjst(infoName, unit, lesson, topic, intro);
	}
}

function chngColor(infoName, unit, lesson, topic) {
	try {
		document.getElementById("completeButton").style.backgroundColor = "#5CB85C";
	} catch(err) {
		console.warn("chngColor", err.message);
	} finally {
		if (unit == "u1") {
			topic -= 1;
		}
		caretCheck(infoName, unit, lesson, topic);
	}
}

function caretCheck(infoName, unit, lesson, topic) {
	let uLength, lsnLength, n, p, tempTopic;
	uLength = window.parent.pageOrder[unit][0].pageOrder.length -1;
	for (n = 0; n <=- uLength; n++) {
		lsnLength = window.parent.pageOrder[unit][0].pageOrder[n].length - 1;
		for (p = 0; p <= lsnLength; p++) {
			if (n == 0) {
				if (window.parent.eval(infoName)[0].pageComplete[p]) {
					tempTopic = p - 1;
					caretAdj(tempTopic);
				}
			} else if (n != 0) {
				if (window.parent.eval(infoName)[n].pageComplete[p]) {
					tempTopic = p - 1;
					sidebarCircAdj(unit, n, tempTopic);
				}
			}
		}
	}
}

function caretAdj(lesson) {
	try {
		let fnd;
		fnd = document.getElementById("caret")[lesson];
		fnd.className = "caret caretChng";
	} catch(err) {
		console.warn("caretAdj:", err.message);
	}
}

function sidebarCircAdj(unit, lesson, topic) {
	let PvsCircNumbAdjst, fnd;
	PvsCircNumbAdjst = window.parent.sidebarNumbAdjust(unit, lesson, topic);
	fnd = document.getElementsByClassName("listCir")[PvsCircNumbAdjst];
	fnd.className = "listCir listCirChng";
}


























