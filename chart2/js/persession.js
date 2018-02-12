var student_id, topic, LineGraph, BarGraph, BarGraph1;
$(document).ready(function(){
    $.ajax({
        url : "http://localhost/chart2/php/studentName.php",
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
                options += "<option value ='" + data[i].Student_ID + "''>"+  data[i].Student_Name +"</option>";
            }

            $("#student").append(options);
            $('select#student').on('change', function() {
              //console.log( this.value );
              student_id = this.value;
              console.log("clicked Student: " + student);
            })
        },
        error: function(data){
            console.log('err');
        }

    });

    $.ajax({
        url : "http://localhost/chart2/php/topic.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var options = "";
            for (var i =0; i<data.length; i++)
            {
                if (i == 0)
                {
                    topic = data[i].Topic_ID;
                    console.log(topic);
                }
                options += "<option value ='" + data[i].Topic_ID + "''>"+  data[i].Topic_name +"</option>";
            }

            $("#topic").append(options);
            $('select#topic').on('change', function() {
              //console.log( this.value );
              topic = this.value;
              console.log("clicked Topic: " + topic);
            })
        },
        error: function(data){
            console.log('err');
        }

    });


    $.ajax({
        url : "http://localhost/chart2/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var session = [1];
            var speed = [0];
            var cor = [0];
            var err = [0];
            var easy = [0];
            var average = [0];
            var hard = [0];
            var j = 0;
            var scounter = 0;
            console.log('s',student_id);
            for(var i in data){
                if ((student_id == data[i].Student_ID) && (topic == data[i].Topic_ID))
                {
                    if (session[j] != data[i].Sessionnum)
                        {
                            batt.push(data[i].Sessionnum);speed.push(0);cor.push(0);err.push(0);easy.push(0);average.push(0);hard.push(0);
                            if (speed[j] != 0 && scounter!=0){speed[j] =  speed[j]/scounter;}
                            j += 1;
                            scounter = 0;
                        }
                    scounter += 1;
                    speed[j] = speed[j] + Number(data[i].Inspeed);
                    if (data[i].Result.toLowerCase() == 'success')
                    {
                        cor[j] += 1;
                    }
                    else{err[j] += 1;}
                    if (data[i].Difficulty.toLowerCase() == 'easy'){easy[j] += 1;}
                    else if (data[i].Difficulty.toLowerCase() == 'average'){average[j] += 1;}
                    else{hard[j] += 1;}
                }

            }
            speed[j] = speed[j]/scounter;
            console.log(speed);
            console.log(cor,err);
            var chartdata = {
                labels: session,
                datasets:[
                {
                    type: 'bar',
                    label: 'correct',
                    backgroundColor: "#3949ab",
                    borderColor: '#3949ab',
                    borderWidth: 1,
                    data: cor
                },
                {
                    type: 'bar',
                    label: 'wrong',
                    backgroundColor: "#ef5350",
                    borderColor: '#ef5350',
                    borderWidth: 1,
                    data: err
                }          

                ]};

            var chartdata1 = {
                labels: session,
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

                ]};


            var chartdata2 = {
                labels: session,
                datasets:[
                {
                    type: 'bar',
                    label: 'easy',
                    backgroundColor: "#ff4081",
                    borderColor: '#ff4081',
                    borderWidth: 0.5,
                    data: easy
                },
                {
                    type: 'bar',
                    label: 'average',
                    backgroundColor: "#8e24aa",
                    borderColor: '#8e24aa',
                    borderWidth: 0.5,
                    data: average
                },
                {
                    type: 'bar',
                    label: 'hard',
                    backgroundColor: "#3949ab",
                    borderColor: '#3949ab',
                    borderWidth: 0.5,
                    data: hard
                }       

                ]};

            var options1 = {
                title: {display:true, text: "Student's Correct and Wrong Answer statistic"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            autoSkip: false,
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'battle number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'score',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var options2 = {
                    title: {display:true, text: "Student's  Average Speed per Session"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            autoSkip: false,
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'battle number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'speed in seconds',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var options3 = {
                    title: {display:true, text: "Student's Chosen Difficulty per Session"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            autoSkip: false,
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'question number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'frequency',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var ctx = $("#mycanvas");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata,
                options: options1
            });

            var ctx = $("#mycanvas1");
            LineGraph = new Chart(ctx,{
                type: 'line',
                data: chartdata1,
                options: options2
            });

            var ctx = $("#mycanvas2");
            BarGraph1 = new Chart(ctx,{
                type: 'bar',
                data: chartdata2,
                options: options3
            });

        },
        error: function(data){

        }
    });

});

function butclick(){

    $.ajax({
        url : "http://localhost/chart2/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var session = [1];
            var speed = [0];
            var cor = [0];
            var err = [0];
            var easy = [0];
            var average = [0];
            var hard = [0];
            var j = 0;
            var scounter = 0;
            console.log('s',student_id);
            for(var i in data){
                if ((student_id == data[i].Student_ID) && (topic == data[i].Topic_ID))
                {
                    if (session[j] != data[i].Sessionnum)
                        {
                            batt.push(data[i].Sessionnum);speed.push(0);cor.push(0);err.push(0);easy.push(0);average.push(0);hard.push(0);
                            if (speed[j] != 0 && scounter!=0){speed[j] =  speed[j]/scounter;}
                            j += 1;
                            scounter = 0;
                        }
                    scounter += 1;
                    speed[j] = speed[j] + Number(data[i].Inspeed);
                    if (data[i].Result.toLowerCase() == 'success')
                    {
                        cor[j] += 1;
                    }
                    else{err[j] += 1;}
                    if (data[i].Difficulty.toLowerCase() == 'easy'){easy[j] += 1;}
                    else if (data[i].Difficulty.toLowerCase() == 'average'){average[j] += 1;}
                    else{hard[j] += 1;}
                }

            }
            speed[j] = speed[j]/scounter;
            console.log(speed);
            console.log(cor,err);
            var chartdata = {
                labels: session,
                datasets:[
                {
                    type: 'bar',
                    label: 'correct',
                    backgroundColor: "#3949ab",
                    borderColor: '#3949ab',
                    borderWidth: 1,
                    data: cor
                },
                {
                    type: 'bar',
                    label: 'wrong',
                    backgroundColor: "#ef5350",
                    borderColor: '#ef5350',
                    borderWidth: 1,
                    data: err
                }          

                ]};

            var chartdata1 = {
                labels: session,
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

                ]};


            var chartdata2 = {
                labels: session,
                datasets:[
                {
                    type: 'bar',
                    label: 'easy',
                    backgroundColor: "#ff4081",
                    borderColor: '#ff4081',
                    borderWidth: 0.5,
                    data: easy
                },
                {
                    type: 'bar',
                    label: 'average',
                    backgroundColor: "#8e24aa",
                    borderColor: '#8e24aa',
                    borderWidth: 0.5,
                    data: average
                },
                {
                    type: 'bar',
                    label: 'hard',
                    backgroundColor: "#3949ab",
                    borderColor: '#3949ab',
                    borderWidth: 0.5,
                    data: hard
                }       

                ]};

            var options1 = {
                title: {display:true, text: "Student's Correct and Wrong Answer statistic"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            autoSkip: false,
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'battle number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'score',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var options2 = {
                    title: {display:true, text: "Student's  Average Speed per Battle"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            autoSkip: false,
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'battle number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'speed in seconds',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var options3 = {
                    title: {display:true, text: "Student's Chosen Difficulty per Battle"},
                    responsive: true,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            autoSkip: false,
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'question number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'frequency',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            BarGraph.destroy();
            var ctx = $("#mycanvas");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata,
                options: options1
            });

            LineGraph.destroy();
            var ctx = $("#mycanvas1");
            LineGraph = new Chart(ctx,{
                type: 'line',
                data: chartdata1,
                options: options2
            });
            BarGraph1.destroy();
            var ctx = $("#mycanvas2");
            BarGraph1 = new Chart(ctx,{
                type: 'bar',
                data: chartdata2,
                options: options3
            });

        },
        error: function(data){

        }
    });

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
