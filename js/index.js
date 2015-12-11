var active = false;
var minutes = 0;
var seconds = 0;
var working = false;
var intervalID = null;

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

//working
var countdown = function(){
	if(seconds > 0){
		seconds -= 1;
	} else if(seconds === 0 && minutes > 0){
		seconds = 59;
		minutes -= 1;
	}
	updateClock();
};

//working
var timeString = function(x){
  if(x < 10) {
		return "0" + x;
	} else {
		return x;
	}
};

//working
var updateClock = function(){
	var newMins = timeString(minutes);
	var newSecs = timeString(seconds);
	$("#clock-minutes").text(newMins);
	$("#clock-seconds").text(newSecs);
	if(newMins == 0 && newSecs == 0){
		switchTimer();
	}
}

//working
var activeChange = function(){
	if(active === true){
		intervalID = setInterval(countdown, 1000);
	} else {
		clearInterval(intervalID);
	}
}

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

$(document).ready(function(){
	working = false;
	switchTimer();
});