//https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
//https://sensor-js.xyz/demo.html

start = Date.now()
running = false
elapsed = 0
clockID = null
accelerationData = []

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
		
		handleMotion(event, elapsed)
	}
			
	else if(running){
		console.log(accelerationData)
		window.removeEventListener("devicemotion", handleMotion);
		accelerationData = []
		
		running = false
		elapsed = 0
		clearInterval(clockID)
		
	}
}

function handleMotion(event, time) {	
	if(event.acceleration && event.acceleration.x && event.acceleration.y && event.acceleration.z){
		accelerationData.push({"time": time, "x": event.acceleration.x, "y": event.acceleration.y, "z": event.acceleration.z})
		document.getElementById("x_acceleration").innerHTML = event.acceleration.x.toFixed(5)
		document.getElementById("y_acceleration").innerHTML = event.acceleration.y.toFixed(5)
		document.getElementById("z_acceleration").innerHTML = event.acceleration.z.toFixed(5)
	}
}


