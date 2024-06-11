//https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
//https://sensor-js.xyz/demo.html
//https://www.tutorialspoint.com/how-to-create-and-save-text-file-in-javascript

start = Date.now()
running = false
elapsed = 0
clockID = null
accelerationData = []

function TimerButton() {
	if(!running){
		document.getElementById("acceleration_data").innerHTML = ""
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
		for(snapshot of accelerationData){
			document.getElementById("acceleration_data").innerHTML += JSON.stringify(snapshot) + "<br>"
		}
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
		//Hopefully using elapsed time doesnt introduce a delay. I couldnt get elapsed to send with the event, so there may be a delay between when the event happened and the time it uses
		accelerationData.push({"time": elapsed, "x": event.acceleration.x, "y": event.acceleration.y, "z": event.acceleration.z})
		document.getElementById("x_acceleration").innerHTML = event.acceleration.x.toFixed(5)
		document.getElementById("y_acceleration").innerHTML = event.acceleration.y.toFixed(5)
		document.getElementById("z_acceleration").innerHTML = event.acceleration.z.toFixed(5)
	}
}


function downloadAccelerationProfile() {
    const link = document.createElement("a");
    const content = JSON.stringify(accelerationData)
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "acceleration_profile.txt";
    link.click();
    URL.revokeObjectURL(link.href);
};

