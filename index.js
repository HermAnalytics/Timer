dateLoaded = Date.now()
start = Date.now()
running = false
elapsed = 0
clockID = null
accelerationData = []
charts = []

function TimerButton() {
	if(!running){
		for(chart of charts){
			chart.destroy()
		}
		document.getElementById("TimerButton").innerText = "stop";
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
		document.getElementById("TimerButton").innerText = "start";
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
	
	charts.push(makeChart("x", xData, red))
	charts.push(makeChart("y", yData, yellow))
	charts.push(makeChart("z", zData, orange))
}

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
				tension: 0, //tension does not seem to work. known bug it seems?
				borderWidth: 1.5,
				radius: 2,
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
	return chartId;
}
	
