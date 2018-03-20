var student_id, BarGraph = '', count = 0, moti = '', criteria = [1,1,1,1];
$(document).ready(function(){
    $.ajax({
        url : "http://localhost/LA/php/student.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var options = "";
            for (var i =0; i<data.length; i++)
            {
                if (i == 0)
                {
                    student_id = data[i].Student_ID;
                    console.log(student_id);
                }
                options += "<option value ='" + data[i].Student_ID + "''>"+ "Student " + data[i].Student_ID +"</option>";
            }
            thegraph();
            detect_moti();
            //document.getElementById("stud_mot").innerHTML=data[0].Student_Name + " is " + moti;
            document.getElementById("stud_mot").innerHTML="Student "+ student_id + " is " + moti;
            $("#students").append(options);
            $('select#students').on('change', function() {
              //console.log( this.value );
              student_id = this.value;
              console.log("clicked Student: " + student_id);
              thedestroyer();
              thegraph();
              detect_moti();
              console.log("motivation: ",moti);
              //document.getElementById("stud_mot").innerHTML=data[student_id - 1].Student_Name + " is " + moti;
              document.getElementById("stud_mot").innerHTML="Student "+ student_id + " is " + moti;
            })
            console.log("student: ", student_id);
        },
        error: function(data){
            console.log('err');
        }

    });

});
var s1 = "less", s2 = "less", s3 = "less", s4 = "less";
function seemore1(){
    var dd = "<dd>- student answered MORE than 60% of the questions correctly</dd> <dd>- average student speed in answering questions is LESS than 50% of the given time limit</dd>";
    if (s1 == "less") {
        document.getElementById("fa").innerHTML=dd;
        document.getElementById("see1").innerText = "See Less";
        s1 = "more";
    } else if (s1 == "more") {
        document.getElementById("fa").innerHTML = "";
        document.getElementById("see1").innerText = "See More";
        s1 = "less"
    }
}

function seemore2(){
    var dd = "<dd>- student answered LESS than 60% of the questions correctly</dd><dd>- average student speed in answering questions is LESS than 50% of the given time limit</dd>";
    if (s2 == "less") {
        document.getElementById("fi").innerHTML=dd;
        document.getElementById("see2").innerText = "See Less";
        s2 = "more";
    } else if (s2 == "more") {
        document.getElementById("fi").innerHTML = "";
        document.getElementById("see2").innerText = "See More";
        s2 = "less"
    }
}

function seemore3(){
    var dd = "<dd>- student answered MORE than 60% of the questions correctly</dd> <dd>- average student speed in answering questions is MORE than 50% of the given time limit</dd>";
    if (s3 == "less") {
        document.getElementById("sa").innerHTML=dd;
        document.getElementById("see3").innerText = "See Less";
        s3 = "more";
    } else if (s3 == "more") {
        document.getElementById("sa").innerHTML = "";
        document.getElementById("see3").innerText = "See More";
        s3 = "less"
    }
}

function seemore4(){
    var dd = "<dd>- student answered LESS than 60% of the questions correctly</dd> <dd>- average student speed in answering questions is MORE than 60% of the given time limit</dd>";
    if (s4 == "less") {
        document.getElementById("si").innerHTML=dd;
        document.getElementById("see4").innerText = "See Less";
        s4 = "more";
    } else if (s4 == "more") {
        document.getElementById("si").innerHTML = "";
        document.getElementById("see4").innerText = "See More";
        s4 = "less"
    }
}

function thegraph(){
    $.ajax({
        url : "http://localhost/LA/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var speed = [0.00,0.00,0.00];
            var cor = [0.00,0.00,0.00];
            var err = [0.00,0.00,0.00];
            var easy = [0,0,0];
            var average = [0,0,0];
            var hard = [0,0,0];
            console.log("Current Student: ",student_id);
            for(var i in data){
                if (student_id == data[i].Student_ID){
                    speed[data[i].Topic_ID - 1] = speed[data[i].Topic_ID - 1] + parseInt(data[i].Inspeed);
                    if (data[i].Result.toLowerCase() == "success"){
                        cor[data[i].Topic_ID - 1] = cor[data[i].Topic_ID - 1] + 1;
                    }
                    else{err[data[i].Topic_ID - 1] = err[data[i].Topic_ID - 1] + 1;}

                    if(data[i].Difficulty.toLowerCase() == "easy"){
                        easy[data[i].Topic_ID - 1] = easy[data[i].Topic_ID - 1] + 1;
                    }
                    else if(data[i].Difficulty.toLowerCase() == "average"){
                        average[data[i].Topic_ID - 1] = average[data[i].Topic_ID - 1] + 1;
                    }
                    else{hard[data[i].Topic_ID - 1] = hard[data[i].Topic_ID - 1] + 1;}
                }


            }
            var speed_fast = [0.0,0.0,0.0], speed_slow = [0.0,0.0,0.0], k=0;
            var accu = [0.0,0.0,0.0], inaccu = [0.0,0.0,0.0];
            while (k < 3){
                var total = cor[k] + err[k];
                if (total!=0){
                    speed[k] = speed[k] / total;
                    cor[k] = (cor[k] / total);
                }
                k = k +1;

            }
            k = 0;
            while(k<3){
                if (speed[k] <= 45){
                    speed_fast[k] = speed[k];
                }
                else{speed_slow[k] = speed[k];}
                if (cor[k] >= (total*0.6)){
                    accu[k] = cor[k]*100;
                }
                else{inaccu[k] = cor[k]*100;}
                k= k + 1;
            }
            console.log(speed,cor,easy,average,hard);
            var chartdata = {
                labels: ["Topic 1","Topic 2","Topic 3"],
                datasets:[
                {
                    type: 'bar',
                    label: 'FAST',
                    backgroundColor: "#3949ab",
                    borderColor: '#3949ab',
                    borderWidth: 1,
                    data: speed_fast
                },
                {
                    type: 'bar',
                    label: 'Slow',
                    backgroundColor: "#ef5350",
                    borderColor: '#ef5350',
                    borderWidth: 1,
                    data: speed_slow
                }          

                ]};
            var chartdata1 = {
                labels: ["Topic 1","Topic 2","Topic 3"],
                datasets:[
                {
                    type: 'bar',
                    label: 'Accurate',
                    backgroundColor: "#3949ab",
                    borderColor: '#3949ab',
                    borderWidth: 1,
                    data: accu
                },
                {
                    type: 'bar',
                    label: 'Inaccurate',
                    backgroundColor: "#ef5350",
                    borderColor: '#ef5350',
                    borderWidth: 1,
                    data: inaccu
                }          

                ]};
            var chartdata2 = {
                labels: ["Topic 1","Topic 2","Topic 3"],
                datasets:[
                {
                    type: 'bar',
                    label: 'Easy',
                    backgroundColor: "#ce93d8",
                    borderColor: '#ce93d8',
                    borderWidth: 1,
                    data: easy
                },
                {
                    type: 'bar',
                    label: 'Average',
                    backgroundColor: "#e040fb",
                    borderColor: '#e040fb',
                    borderWidth: 1,
                    data: average
                },
                {
                    type: 'bar',
                    label: 'Hard',
                    backgroundColor: "#9c27b0",
                    borderColor: '#9c27b0',
                    borderWidth: 1,
                    data: hard
                }           

                ]};
            var options = {
                    title: {display:true, text: "Student's Average Speed"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 10,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'in seconds',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };
            var options1 = {
                    title: {display:true, text: "Student's Accuracy"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 10,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'in % (percentage)',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };
            var options2 = {
                    title: {display:true, text: "Student's Chosen Difficulty"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 5,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "frequency",
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };
            var ctx = $("#mycanvas");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata,
                options: options
            });

            var ctx = $("#mycanvas1");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata1,
                options: options1
            });

            var ctx = $("#mycanvas2");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata2,
                options: options2
            });

        },
        error: function(data){

        }
    });

    $.ajax({
        url : "http://localhost/LA/php/outcome.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var win = [0,0,0], lose = [0,0,0], escape = [0,0,0];
            console.log("Current Student: ",student_id);
            for(var i in data){
                if (student_id == data[i].Student_ID){
                    if (data[i].Outcome.toLowerCase() == "win"){
                        win[data[i].Topic_ID - 1] = win[data[i].Topic_ID - 1] + 1;
                    }
                    else if(data[i].Outcome.toLowerCase() == "lose"){
                        lose[data[i].Topic_ID - 1] = lose[data[i].Topic_ID - 1] + 1;
                    }
                    else{escape[data[i].Topic_ID - 1] = escape[data[i].Topic_ID - 1] + 1;}
                }


            }
            console.log("outcome: ",win,lose,escape);
            var chartdata = {
                labels: ["Topic 1","Topic 2","Topic 3"],
                datasets:[
                {
                    type: 'bar',
                    label: 'Win',
                    backgroundColor: "#ffca28",
                    borderColor: '#ffca28',
                    borderWidth: 1,
                    data: win
                },
                {
                    type: 'bar',
                    label: 'Lose',
                    backgroundColor: "#607d8b",
                    borderColor: '#607d8b',
                    borderWidth: 1,
                    data: lose
                },         
                {
                    type: 'bar',
                    label: 'Escape',
                    backgroundColor: "#795548",
                    borderColor: '#795548',
                    borderWidth: 1,
                    data: escape
                }

                ]};
            var options = {
                    title: {display:true, text: "Student's Battle Result"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 3,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'frequency',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };


            var ctx = $("#mycanvas3");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata,
                options: options
            });

        },
        error: function(data){

        }
    });
}

function thedestroyer(){
    BarGraph.destroy();
}

function detect_moti(){
    console.log("passed detect_moti");
    if (criteria[0] == 1 && criteria[1] == 1 && criteria[2] == 1 && criteria[3] == 1){
        console.log("me moti");
        moti = "MOTIVATED!";
        criteria = [1,0,1,1];
    }
    else if (criteria[0] == 1 && criteria[1] == 0 && criteria[2] == 1 && criteria[3] == 1){
        console.log("me.unmoti");
        moti = "UNMOTIVATED";
    }
}
function the_trend(){
    localStorage.setItem("sid", student_id);  
}
/*function the_trend(){
    $.ajax({
        //data: 'Student_ID=' + student_id,
        url: 'http://localhost/LA/php/trend.php',
        //method: 'POST', // or GET
        data: {'Student_ID' : student_id},
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType:'json',
        success: function(response) {
            alert(response.status);
        },
    });
    $.post('http://localhost/LA/php/trend.php', {postname: 2}, function(data){
        $('#result').html(data);
    });
    $.post('http://localhost/LA/php/trend.php', {postname: 2}, function(data){
        $('#result').html(data);
    });
}*/
