$(document).ready(function() {
	//get canvas
	var ctx = $("#pie1"); 
	var data = {
		labels: ["Motivated\n75%", "Unmotivated\n25%"],
		datasets: [{
			data: [75,25],
			backgroundColor: ["#880e4f", "#9e9e9e"]

		}]
	};
	var options = {
		legend: {
			labels:{
				fontColor: '#424242',
				fontFamily: 'sans-serif'
			}
		},
        plugins: {
            datalabels: {
                formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex];
                }
            }
        }
	};
	var chart = new Chart(ctx, {
		type: "pie",
		data: data,
		options: options
	});
	var ctx = $("#pie2"); 
	var data = {
		labels: ["Performed Well\n75%", "Performed Unwell\n25%"],
		datasets: [{
			data: [75,25],
			backgroundColor: ["#ff4081", "#9e9e9e"]

		}]
	};
	var options = {
		legend: {
			labels:{
				fontColor: '#424242',
				fontFamily: 'sans-serif'
			}
		},
        plugins: {
            datalabels: {
            	fontColor: 'white',
                formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex];
                }
            }
        }
	};
	var chart = new Chart(ctx, {
		type: "pie",
		data: data,
		options: options
	});
});