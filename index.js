//https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
//https://sensor-js.xyz/demo.html

start = Date.now()
running = false
elapsed = 0
clockID = null

function TimerButton() {
	if(!running){
		window.addEventListener("devicemotion", handleMotion);
		stopped = false
		running = true
		
		start = Date.now()
		clockID = setInterval(function () {
			document.getElementById("Display").innerHTML = elapsed.toFixed(2)
			elapsed = (Date.now() - start)/1000
		}, 10);
		
		handleMotion(event)
	}
			
	else if(running){
		window.removeEventListener("devicemotion", handleMotion);
		
		running = false
		elapsed = 0
		clearInterval(clockID)
	}
}

function handleMotion(event) {
	//if(event.accelerationIncludingGravity){
	//	updateValue("x_acceleration", event.accelerationIncludingGravity.x)
	//	updateValue("y_acceleration", event.accelerationIncludingGravity.y)
	//	updateValue("z_acceleration", event.accelerationIncludingGravity.z)
	//}
	
	if(event.acceleration){
		updateValue("x_acceleration", event.acceleration.x)
		updateValue("y_acceleration", event.acceleration.y)
		updateValue("z_acceleration", event.acceleration.z)
	}
}

function updateValue(name, value){
  if (value != null)
    document.getElementById(name).innerHTML = value.toFixed(5)
}

