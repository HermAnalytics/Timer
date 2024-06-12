//https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
//https://sensor-js.xyz/demo.html
//https://www.tutorialspoint.com/how-to-create-and-save-text-file-in-javascript

dateLoaded = Date.now()
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
		
		handleMotion(event)
	}
			
	else if(running){
		times = []
		xAccelerations = []
		for(snapshot of accelerationData){
			times.push(snapshot["time"])
			xAccelerations.push(snapshot["x_acceleration"])
		}
		window.removeEventListener("devicemotion", handleMotion);
		accelerationData = []
		running = false
		elapsed = 0
		clearInterval(clockID)
		
		makeChart(times, xAccelerations)
	}
}

function handleMotion(event) {	
	if(event.acceleration && event.acceleration.x && event.acceleration.y && event.acceleration.z){
		//USING ELAPSED AS THE TIME STAMP MAY CAUSE DELAY. But in practice this has been the closest to the visual timer.
		accelerationData.push({"time": elapsed, "x": event.acceleration.x.toFixed(5), "y": event.acceleration.y.toFixed(5), "z": event.acceleration.z.toFixed(5)})
		document.getElementById("x_acceleration").innerHTML = event.acceleration.x.toFixed(5)
		document.getElementById("y_acceleration").innerHTML = event.acceleration.y.toFixed(5)
		document.getElementById("z_acceleration").innerHTML = event.acceleration.z.toFixed(5)
	}
}

function makeChart(xValues, yValues){
	new Chart("chart", {
	type: "line",
	data: {
		labels: xValues,
		datasets: [{
		fill: false,
		lineTension: 0,
		backgroundColor: "rgba(0,0,255,1.0)",
		borderColor: "rgba(0,0,255,0.1)",
		data: yValues
		}]
	},
	options: {
		legend: {display: false},
		scales: {
		yAxes: [{ticks: {min: 6, max:16}}],
	}
  }
});
}

