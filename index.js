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
		window.removeEventListener("devicemotion", handleMotion);
		running = false
		elapsed = 0
		clearInterval(clockID)
		makeCharts(accelerationData)
		accelerationData = []
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
//https://stackoverflow.com/questions/46232699/display-line-chart-with-connected-dots-using-chartjs
//https://stackoverflow.com/questions/42768494/how-to-remove-rectangle-box-next-to-the-legend-text-in-chart-js
//https://github.com/chartjs/Chart.js/discussions/11441
function makeCharts(accelerationData){
	xData = []
	yData = []
	zData = []
	red = []
	yellow = []
	orange = []
	black = []
	
	for(snapshot of accelerationData){
		xData.push({"x": snapshot["time"], "y": snapshot["x"]})
		yData.push({"x": snapshot["time"], "y": snapshot["y"]})
		zData.push({"x": snapshot["time"], "y": snapshot["z"]})
		red.push("red")
		yellow.push("yellow")
		orange.push("orange")
		black.push("black")
	}
	
	makeChart("x", xData, red)
	makeChart("y", yData, yellow)
	makeChart("z", zData, orange)
}

//https://www.chartjs.org/docs/latest/charts/line.html
function makeChart(id, data, pointColor){
	var chrt = document.getElementById("chart"+id).getContext("2d");
    var chartId = new Chart(chrt, {
		type: 'scatter',
        data: {
            datasets: [{
				label: id + " acceleration",
				data: data,
				backgroundColor: pointColor,
				borderColor: "black",
				fill: false,
				showLine: true,
				borderWidth: 1.5,
				radius: 2,
				tension: 0
			}],
		},
        options: {
			responsive: false,
			legend: {
				labels: {
					boxWidth: 0,
				}
			},
            scales: {
				x: {
					type: 'linear',
					position: 'bottom,'
				}
			}
        },
    });
}
	
