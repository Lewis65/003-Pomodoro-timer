var active = false;
var minutes = 0;
var seconds = 0;
var working = false;
var intervalID = null;

//Switch status to work or rest
var switchTimer = function(){
	//Do stuff like play a sound
	if(working === true){
		//switch to rest timer
		minutes = document.getElementById("rest-setting").innerHTML;
		seconds = 0;
		working = false;
		$("#h2-rest").addClass("active");
		$("#h2-work").removeClass("active");
	} else if (working === false){
		//switch to work timer
		minutes = document.getElementById("work-setting").innerHTML;
		seconds = 0;
		working = true;
		$("#h2-work").addClass("active");
		$("#h2-rest").removeClass("active");
	}
	updateClock();
};

//Count down by 1 second
var countdown = function(){
	if(seconds > 0){
		seconds -= 1;
	} else if(seconds === 0 && minutes > 0){
		seconds = 59;
		minutes -= 1;
	}
	updateClock();
};

//Stringify times in updateClock()
var timeString = function(x){
  if(x < 10) {
		return "0" + x;
	} else {
		return x;
	}
};

//Stringify times and use them to change the timer;
//Switch time work/rest when appropriate
var updateClock = function(){
	var newMins = timeString(minutes);
	var newSecs = timeString(seconds);
	$("#clock-minutes").text(newMins);
	$("#clock-seconds").text(newSecs);
	if(newMins == 0 && newSecs == 0){
		switchTimer();
	}
}

//When active true/false turn timer on/off
var activeChange = function(){
	if(active === true){
		intervalID = setInterval(countdown, 1000);
	} else {
		clearInterval(intervalID);
	}
}

//Pause-play button icon switching
$("#button-play").click(function(){
	$("#button-pause").removeClass("nodisplay");
	$("#button-play").addClass("nodisplay");
	active = true;
	activeChange();
});

$("#button-pause").click(function(){
	$("#button-play").removeClass("nodisplay");
	$("#button-pause").addClass("nodisplay");
	active = false;
	activeChange();
});

//Update the timer on page load
$(document).ready(function(){
	working = false;
	switchTimer();
});

//Add and subtract buttons for rest and work settings
var restSetting = document.getElementById("rest-setting").innerHTML;

$("#rest-less").click(function(){
	if (restSetting > 0){
		restSetting = parseInt(restSetting) - 1;
		$("#rest-setting").text(restSetting);
	};
});

$("#rest-more").click(function(){
	if (restSetting < 60){
		restSetting = parseInt(restSetting) + 1;
		$("#rest-setting").text(restSetting);
	};
});

var workSetting = document.getElementById("work-setting").innerHTML;

$("#work-less").click(function(){
	if (workSetting > 0){
		workSetting = parseInt(workSetting) - 1;
		$("#work-setting").text(workSetting);
	};
});

$("#work-more").click(function(){
	if (workSetting < 60){
		workSetting = parseInt(workSetting) + 1;
		$("#work-setting").text(workSetting);
	};
});

$("#button-reset").click(function(){
	working = false;
	minutes = $("#work-setting").val();
	seconds = 0;
	active = false;
	activeChange();
	updateClock();
	$("#button-play").removeClass("nodisplay");
	$("#button-pause").addClass("nodisplay");
});