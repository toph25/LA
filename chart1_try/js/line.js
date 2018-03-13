$(document).ready(function() {
	//get canvas
	var ctx = $("#line-chartcanvas");
	var data = {
		labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
		datasets: [
			{
				label: "Red - Easy \t Blue - Average \t Green - Hard \t o plot - correct\t" + String.fromCharCode(9650) + " plot - wrong",
				data:[10,20,30,40,50,60,20,30,70,80,40,50,90,95,85,105,100,106,90,100,
						10,20,30,40,50,60,20,30,70,80,40,50,90,95,85,105,100,106,90,100],
				background: "#ff1744",
				pointBackgroundColor: ["#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c","#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c",
										"#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c","#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c","#1565c0","#43a047","#b71c1c"],
				borderColor: "#fafafa",
				fill: false,
				lineTension: 0,
				pointRadius: 5,
				showLine: true,
				pointStyle: ["circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect",
								"circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect","circle","rect"]
			},
			/*{
				data:[0,0,0,0,0,0,0,0,0,0],
				background: "#e040fb",
				backgroundColor: "#e040fb",
				borderColor: "#e040fb",
				fill: false,
				lineTension: 0,
				pointRadius: 10,
				showLine: false,
				pointStyle: "circle"
			}*/
		]
	};
	var options = {
		title : {
			display: true,
			position: "top",
			text: "Line Graph",
			fontSize: 18,
			fontColor: "#111"
		},
		legend: {
			display: true,
			fontColor: "#111",
			position: "top",
			labels:{
				usePointStyle: true,
			}
		},
		/*elements: {
			point: {
				pointStyle: "circle",
			}
		},*/
	    scales: {
	        xAxes: [{
	            ticks: {
	                beginAtZero: true,
	                min: 0,

	            }
	        }],
	        yAxes: [{
	            ticks: {
	                beginAtZero: true,
	                min: 0
	            }
	        }]
	    }
	};
	var chart = new Chart(ctx, {
		type: "line",
		data: data,
		options: options
	});
});