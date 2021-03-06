<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Timesheet Calculator</title>
    <link rel="stylesheet" href="styles/normalize.css">
    <link rel="stylesheet" href="styles/styles.css"/>

    
</head>
<body>
<header>
    <h1>Compute Hours</h1>
</header>
<div class="sections">
    <!--start time inputs-->
    <section>
        <div class="start">
            <br>
            <span>Start</span>
            </br>
            <input  type="text" value="08:00 AM"/>
            <br>
           
        </div>
    </section>


    <!--end time inputs-->
    <section>
        <div class="end">
            <br>
            <span>End</span>
            </br>
            <input  type="text" value="5:00 PM"/>
              <br>
           
        </div>
    </section>

  

    <!--break inputs-->
    <section>
        <div class="break">
            <br>
            <span>Break</span>
            </br>
            <input id="hour" style="width: 30px;" type="text" value="0"/>
            <span>:</span>
            <input id="minutes" style="width: 30px;" type="text" value="0"/>
        </div>
    </section>
    <!--hours worked display button-->
    <section>
        <div class="hours">
            <br>
            <span>Hours</span>
            </br>
            <input  class="button" id="hoursButton" style="width: 140px;" type="button" value="timeSheet"/>
        </div>
    </section>

    <!--ADD BUTTON TO Table-->
    <section>
        <div class="add">
            <br>
            <span></span>
            </br>
            <input class="button" id="add" type="button" value="+"/>
        </div>
    </section>

</div>


<!--BOTTOM DATA -->
<div class="bottomDataDiv">

        <!-- employee name and work description and date-->
        <div class="moreInputs">
            <input class="workdescription"  type="text" placeholder="Work description(optional)"/>
            <input class="workDate" type="text" placeholder="Day worked (mm/dd/yyyy)"/>
            <input class="addToTimesheetBtn" type="button" value=">>"/>
        </div>
            
            <!--table-->
        <table id="timesheetTable">
            <th>Day/Date</th>
            <th>Time In</th>       
            <th>Time Out</th>
            <th>Break</th>
            <th>Work Description</th>
            <th>Hours</th>
        </table>

        <!--clear div-->
        <div class="clearDiv">
            <input id="clear" type="button" value="Clear"/>
            <input id="deleteLast" type="button" value="Delete Last"/>
        </div>
       


</div>


<!--Footer-->
<footer>
    <div class="footer_div">
        <p>Get the desktop and android version.
           <img id="desktop" src="images/timesheetcalc_icon_512_desktop_web.png"/>

           <a href="https://play.google.com/store/apps/details?id=timesheetcalc.teamappcreative.com.timesheetcalculator" target="_blank"><img id="android" src="images/timesheetcalc_icon_512_android_web.png"/></a>
    </div>

</footer>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    <script src="js/mainjs.js"></script>

</body>
</html>