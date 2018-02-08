var student, sess, batt;
$(document).ready(function(){
	$.ajax({
		url : "http://localhost/chart2/php/studentName.php",
		type : "GET",
		success: function(data){
			console.log(data);
			var options = "";
			options += "<option value =none>none</option>";
			for (var i =0; i<data.length; i++)
			{
				options += "<option value ='" + data[i].Student_Name + "''>"+  data[i].Student_Name +"</option>";
			}

			$("#student").append(options);
			$('select#student').on('change', function() {
			  //console.log( this.value );
			  student = this.value;
			  console.log("clicked Student: " + student);
			})
		},
		error: function(data){
			console.log(data);
		}

	});

	$.ajax({
		url : "http://localhost/chart2/php/session.php",
		type : "GET",
		success: function(data){
			console.log(data);
			var options = "";
			options += "<option value =none>none</option>";
			for (var i =0; i<data.length; i++)
			{
				options += "<option value ='" + data[i].Sessionnum + "''>"+  data[i].Sessionnum +"</option>";
			}

			$("#session").append(options);
			$('select#session').on('change', function() {
			  //console.log( this.value );
			  sess = this.value;
			  console.log("clicked Session: " + sess);
			})
		},
		error: function(data){
			console.log(data);
		}

	});

	$.ajax({
		url : "http://localhost/chart2/php/battle.php",
		type : "GET",
		success: function(data){
			console.log(data);
			var options = "";
			options += "<option value =none>none</option>";
			for (var i =0; i<data.length; i++)
			{
				options += "<option value ='" + data[i].Battlenum + "''>"+  data[i].Battlenum +"</option>";
			}

			$("#battle").append(options);
			$('select#battle').on('change', function() {
			  //console.log( this.value );
			  batt = this.value;
			  console.log("clicked Battle: " + batt);
			})
		},
		error: function(data){
			console.log(data);
		}

	});


});

function mot(){
	console.log(student);
	$.ajax({
	    url: "http://localhost/chart2/php/mot.php",
	    type: 'POST',
	    data: {student1 : student},
	    success: function(response) {
	    	alert(response);
			var rem = "<p>" + response + "</p>";
			$(".boxed").append(rem);
	 	},
		error: function(data){
			console.log("can't load");
		}	 	

	});
}