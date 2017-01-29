
$(document).ready(function(){
	/****BEGIN DOCUMENT***/

	/***variables***/
	var timeStartTextField = $(".start input");
	var timeEndTextField = $(".end input");
	var breakHrsTextfield = $(".break #hour");
	var breakMinsTextfield = $(".break #minutes");
	var hoursBtn = $(".hours input");
	var addBtn = $(".add input");
	var timeStartPane = $(".start #timeStartDiv");
	var timeEndPane = $(".end #timeEndDiv");
	var addButton = $(".add .button");
	var bottomDataDiv = $(".bottomDataDiv");
	var workDescriptionTextField = $(".workdescription");
	var dayWorkedTextField = $(".workDate");
	var addToTimesheetBtn = $(".addToTimesheetBtn");
	var clear = $("#clear");
	var deleteLast = $("#deleteLast");
	var addToTimesheetBtn = $(".addToTimesheetBtn");

	var breakTImeMins = "0";
    varbreakTImeHrs = "0";
    var minDiff;
    var hoursDiff;
    var totalHours;
    var totalMinutes;
    var minsThatDay;
    var hoursThatDay;
    var timesheet; //regular timesheet variable
    var timesheetWithTotalHrs; //timesheet with TOTAL HOURS variable

	var mTimesheetList = [];
    var hoursList = [];
    var minutesList = [];
    var timesList = [];
    var timesheetTable = $("#timesheetTable");

    //arrow start
    //top
    var arrowImageUp1 = $("#timeStartDiv #hourArrowUp");
    var arrowImageUp2 = $("#timeStartDiv #minuteArrowUp");
    var arrowImageUp3 = $("#timeStartDiv #ampmArrowUp");
    //bottom
    var arrowImageUp4 = $("#timeStartDiv #hourArrowDown");
    var arrowImageUp5 = $("#timeStartDiv #minuteArrowDown");
    var arrowImageUp6 = $("#timeStartDiv #ampmArrowDown");

    //arrow end
    //top
    var arrowImageUp7 = $("#timeEndDiv #hourArrowUp1");
    var arrowImageUp8 = $("#timeEndDiv #minuteArrowUp1");
    var arrowImageUp9 = $("#timeEndDiv #ampmArrowUp1");
    //bottom
    var arrowImageUp10 = $("#timeEndDiv #hourArrowDown1");
    var arrowImageUp11 = $("#timeEndDiv #minuteArrowDown1");
    var arrowImageUp12 = $("#timeEndDiv #ampmArrowDown1");

    var startHour;
    var startMinute;
    var AMPM;
    var endHour;
    var endMinute;
    var AMPM2;

    var minsWithBreakDeducted;
    





    /*****CREATE THE TIMESHEET CLASS******/
    var Timesheet = function (dayDate, timeIn, timeOut, breakTime, workDescription, hoursFloat) {
	  this.dayDate = dayDate;
	  this.timeIn = timeIn;
	  this.timeOut = timeOut;
	  this.breakTime = breakTime;
	  this.workDescription = workDescription;
	  this.hoursFloat = hoursFloat;
	};

	/***getters**/
	Timesheet.prototype.getDayDate = function() {
		  	return this.dayDate;
		};
	Timesheet.prototype.getTimeIn = function() {
	  	return this.timeIn;
	};
	Timesheet.prototype.getTimeOut = function() {
	  	return this.timeOut;
	};
	Timesheet.prototype.getBreakTime = function() {
	  	return this.breakTime;
	};
		Timesheet.prototype.getWorkDescription = function() {
	  	return this.workDescription;
	};
	Timesheet.prototype.getHoursFloat = function() {
	  	return this.hoursFloat;
	};
	//setters
	Timesheet.prototype.setWorkDescription = function() {
	  	this.workDescription = workDescription;
	};

	
	/*************END OF OOP CLASS*****/
	//****START****/
	//start focus
	timeStartTextField.focus(function() {
  		//show start pane hide end pane
  		timeEndPane.css("opacity","0");
  		//timeStartPane.css("opacity","1");
	});

	//start key up
	timeStartTextField.keyup(function() {

		//hoursBtn.val(sHours + ":" + sMinutes + " " + AMPM);
		calculateWorkHours();
	});

	//hide start pane on mouseout
	timeStartPane.mouseleave(function(){
		timeStartPane.css("opacity","0");
	});

	//****END****/
	//end focus
	timeEndTextField.focus(function() {
  		//show start pane and hide start
  		timeStartPane.css("opacity","0");
  		//timeEndPane.css("opacity","1");
	});

	//end key up
	timeEndTextField.keyup(function() {
  		calculateWorkHours();
	});

	//break entered
	breakHrsTextfield.keyup(function(){
		
		calculateWorkHours();
	});

	breakMinsTextfield.keyup(function(){
		
		calculateWorkHours();
	});

	function calculateWorkHours(){
		var startTimeString = timeStartTextField.val();
		var endTimeString = timeEndTextField.val();
	
		console.log(startTimeString + " " + endTimeString);
		//convert the times to 24 hrs system
		/***start hours***/
		var time = startTimeString;
		startHour = Number(time.match(/^(\d+)/)[1]);
		startMinute = Number(time.match(/:(\d+)/)[1]);
		AMPM = time.match(/\s(.*)$/)[1];
		AMPM = AMPM.toUpperCase();
		if(AMPM == "PM"  && startHour < 12) {
				startHour += 12;
		}
		if(AMPM == "AM"  && startHour == 12) {
				startHour -= 12
			};
		var startHours = startHour.toString();
		var startMinutes = startMinute.toString();
		/***end hours***/
		var time2 = endTimeString;
		endHour = Number(time2.match(/^(\d+)/)[1]);
		endMinute = Number(time2.match(/:(\d+)/)[1]);
		AMPM2 = time2.match(/\s(.*)$/)[1];
		AMPM2 = AMPM2.toUpperCase();
		if(AMPM2 == "PM"  && endHour < 12) {
			endHour += 12;
		}
		if(AMPM2 == "AM"  && endHour == 12) {
			endHour -= 12
		};
		var endHours = endHour.toString();
		var endMinutes = endMinute.toString();

		//hours difference
		hoursDiff = endHours - startHours;
         //minutes difference
         minDiff = endMinutes - startMinutes;
         if(hoursDiff < 0){
                hoursDiff += 24; //add 24
            }

           //handle the am pm issue thing
        //break time mins to deduct
        var breakTimeMins = breakMinsTextfield.val();
        var breakTimeHrs= breakHrsTextfield.val();
        minsWithBreakDeducted = minDiff - breakTimeMins;

        //deduct break mins
         if (breakTimeMins > 60) {
             minsWithBreakDeducted += 60;
             hoursDiff--;
         }

        //deduct break hours
        if (breakTimeHrs > 0) {
              hoursDiff -= breakTimeHrs;
        }

      
		handleMInutesDifference();
		handleMInutesDifference();

		console.log(startHours + " " + startMinutes);
		console.log(endHours + " " + endMinutes);
		console.log("Hours worked "+hoursDiff + "H:" + minsWithBreakDeducted+"M");
		

	}

/**I HAVE TO CALL THIS TWICE TO CHECK FOR ANY MORE NEGATIVITY AND AVOID NEGATIVE MINUTES****/
	function handleMInutesDifference(){
		//handles the minutes difference for the second time. if possible
        if(minsWithBreakDeducted < 0){
            minsWithBreakDeducted += 60;
            hoursDiff--;
        }

		hoursBtn.val(hoursDiff+"H:"+minsWithBreakDeducted+"M");
	}

	//hide start pane on mouseout
	timeEndPane.mouseleave(function(){
		timeEndPane.css("opacity","0");
	});

	/****listen to add button click***/
	addButton.click(function(){
		if ( $(bottomDataDiv).css('display') == 'none' ){
   		 // element is hidden, show it then
    		bottomDataDiv.show();
    		addButton.val("-");


		}else{
			bottomDataDiv.hide();
			addButton.val("+");

		}

	});


	/***listen to add to timesheet button***/
	addToTimesheetBtn.click(function(){

		timesheet = new Timesheet(dayWorkedTextField.val(), timeStartTextField.val(), timeEndTextField.val(), breakHrsTextfield.val()+"H:"+breakMinsTextfield.val()+"M", workDescriptionTextField.val(), hoursBtn.val());
		mTimesheetList.push(timesheet);

			

		//add to populate table
			timesheetTable.append($('<tr>')
			        .append(
			        	$('<td>').append(timesheet.getDayDate()), 
			       		$('<td>').append(timesheet.getTimeIn()),
			        	$('<td>').append(timesheet.getTimeOut()),
						$('<td>').append(timesheet.getBreakTime()),
						$('<td>').append(timesheet.getWorkDescription()),
						$('<td>').append(timesheet.getHoursFloat()))

			    );


			//add the hours and minutes to their respective arrays for totalling
			hoursList.push(hoursDiff);
			minutesList.push(minsWithBreakDeducted);

			calculateAndTotalRow();

			//remove last total row
            if(mTimesheetList.length > 2){
                    //remove the last calculated time which is position 3 on table from last
					document.getElementById("timesheetTable").deleteRow(mTimesheetList.length - 2);
					mTimesheetList.pop(mTimesheetList[mTimesheetList.length - 2]);
             }



		
	});

	/**listen to clear button click***/
	clear.on("click", function(){
		if(confirm("Are you sure you want to clear the table?")) {
    		for (var i = 0; i < mTimesheetList.length + 1; i++) {
				timesheetTable.find("tr:gt(0)").remove();
				mTimesheetList = []; //empty the array
				hoursList = [];
				minutesList = [];

			};
		}

	});

	/**listen to delete last click**/
	deleteLast.on("click", function(){
		var itemLength = mTimesheetList.length;


		if(itemLength > 1){
			document.getElementById("timesheetTable").deleteRow(itemLength - 1); //last item 
			mTimesheetList.pop(mTimesheetList[itemLength] - 1);
			hoursList.pop(itemLength - 1);
			minutesList.pop(itemLength - 1);

			document.getElementById("timesheetTable").deleteRow(itemLength - 1); //last item 
			mTimesheetList.pop(mTimesheetList[itemLength] - 1);
	
			calculateAndTotalRow();

			if(itemLength == 2){
				timesheetTable.find("tr:gt(0)").remove(); //clear all
				hoursList = [];
				minutesList = [];
				mTimesheetList = [];
			}

		}else{
			document.getElementById("timesheetTable").deleteRow(1);
			mTimesheetList = [];
			hoursList = [];
			minutesList = [];

		}

			

		
	});


	function calculateAndTotalRow(){
		//total all time and add to timesheet below every second or so
				var totalHrs = 0;
				var totalMins = 0;
				for (var i = 0; i < hoursList.length; i++) {
						totalHrs += hoursList[i];
						totalMins += minutesList[i];
						if(totalMins >= 60){
							totalMins -= 60;
							totalHrs++;
						}

					};
				console.log("total hrs "+ totalHrs + " total min "+ totalMins);
				//create a new total hrs row and populate with total hrs
				timesheetTable.append($('<tr>')
				        .append(
				        	$('<td>').append(""), 
				       		$('<td>').append(""),
				        	$('<td>').append(""),
							$('<td>').append(""),
							$('<td>').append("Total:"),
							$('<td>').append(totalHrs+"H:"+totalMins+"M"))

				    );
				mTimesheetList.push(timesheet);
	}



	//alert for desktop version
	$("#desktop").click(function(){
		alert("Coming soon... Please stay tuned to this website by bookmarking it.");
	});



	//method calls
	calculateWorkHours();

	/****END OF DOCUMENT START***/
});

