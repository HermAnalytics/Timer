//https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
//https://sensor-js.xyz/demo.html
//https://www.tutorialspoint.com/how-to-create-and-save-text-file-in-javascript

dateLoaded = Date.now()
start = Date.now()
running = false
elapsed = 0
clockID = null
accelerationData = []
gAccelerationData = []

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
		downloadAccelerationProfile()
		window.removeEventListener("devicemotion", handleMotion);
		accelerationData = []
		running = false
		elapsed = 0
		clearInterval(clockID)
	}
}

function handleMotion(event) {	
	if(event.acceleration && event.acceleration.x && event.acceleration.y && event.acceleration.z){
		accelerationData.push({"time": elapsed, "x": event.acceleration.x.toFixed(5), "y": event.acceleration.y.toFixed(5), "z": event.acceleration.z.toFixed(5)})
		document.getElementById("x_acceleration").innerHTML = event.acceleration.x.toFixed(5)
		document.getElementById("y_acceleration").innerHTML = event.acceleration.y.toFixed(5)
		document.getElementById("z_acceleration").innerHTML = event.acceleration.z.toFixed(5)
	}
	
	//if(event.accelerationIncludingGravity && event.accelerationIncludingGravity.x && event.accelerationIncludingGravity.y && event.accelerationIncludingGravity.z){
	//	gAccelerationData.push({"time": event.timeStamp, "x": event.accelerationIncludingGravity.x.toFixed(5), "y": event.accelerationIncludingGravity.y.toFixed(5), "z": event.accelerationIncludingGravity.z.toFixed(5)})
	//	document.getElementById("gx_acceleration").innerHTML = event.accelerationIncludingGravity.x.toFixed(5)
	//	document.getElementById("gy_acceleration").innerHTML = event.accelerationIncludingGravity.y.toFixed(5)
	//	document.getElementById("gz_acceleration").innerHTML = event.accelerationIncludingGravity.z.toFixed(5)
	//}
}


function downloadAccelerationProfile() {
    const link = document.createElement("a");
    const content = JSON.stringify({"NoG": accelerationData, "G": gAccelerationData})
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "acceleration_profile.txt";
    link.click();
    URL.revokeObjectURL(link.href);
};

