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
			xAccelerations.push(snapshot["x"])
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

//https://stackoverflow.com/questions/30216167/chartjs-plot-data-based-with-unequal-time-intervals
//https://dima117.github.io/Chart.Scatter/
//https://www.tutorialspoint.com/chartjs/chartjs_scatter_chart.htm
function makeChart(xValues, yValues){
	var chrt = document.getElementById("chart").getContext("2d");
    var chartId = new Chart(chrt, {
		type: 'scatter',
        data: {
			labels: ["HTML", "CSS", "JAVASCRIPT", "CHART.JS", "JQUERY", "BOOTSTRP"],
            datasets: [{
				label: "online tutorial subjects",
				data: [
					{x:10, y:14},
					{x:25, y:35},
					{x:21, y:20},
					{x:35, y:28},
					{x:15, y:10},
					{x:19, y:30},
				],
				backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'gold', 'lightblue'],
				borderColor: ['black'],
				radius: 8,
			}],
		},
        options: {
			responsive: false,
            scales: {
				x: {
					type: 'linear',
					position: 'bottom,'
				}
			}
        },
    });
}
	
