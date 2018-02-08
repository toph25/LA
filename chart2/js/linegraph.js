$(document).ready(function(){
	$.ajax({
		url : "http://localhost/chart2/php/data.php",
		type : "GET",
		success: function(data){
			console.log(data);
			var studentid = [];
			var session = [];
			var battle = [];
			var speed = [];
			var outcome = [];

			for(var i in data){
				studentid.push("StudentID" + data[i].Student_ID);
				session.push(data[i].Sessionnum);
				battle.push(data[i].Battlenum);
				speed.push(data[i].Speed);
				outcome.push(data[i].Outcome);
			}

			var chartdata = {
				labels: studentid,
				datasets:[
				{
					label: "speed",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(59, 89, 152, 0.75)",
					borderColor: "rgba(59, 89, 152, 1)",
					pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
					pointHoverBorderColor: "rgba(59, 89, 152, 1)",
					data: speed
				}

				],
				options: {
					legend: {
						display: true,
						position: 'left'
					}
				}
			};

			var chartdata1 = {
				labels: studentid,
				datasets:[
				{
					label: "speed",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(59, 89, 152, 0.75)",
					borderColor: "rgba(59, 89, 152, 1)",
					pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
					pointHoverBorderColor: "rgba(59, 89, 152, 1)",
					data: speed
				}

				],
				options: {
					legend: {
						display: true,
						position: 'right'
					}
				}
			};

			var ctx = $("#mycanvas");
			var LineGraph = new Chart(ctx,{
				type: 'line',
				data: chartdata
			});

			var ctx = $("#mycanvas1");
			var LineGraph = new Chart(ctx,{
				type: 'line',
				data: chartdata1
			});

		},
		error: function(data){

		}
	});
});
