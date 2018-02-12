var student_id, sess, batt, topic, LineGraph, BarGraph, BarGraph1;
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
        url : "http://localhost/chart2/php/session.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var options = "";
            for (var i =0; i<data.length; i++)
            {
                if (i == 0)
                {
                    sess = data[i].Sessionnum;
                    console.log(sess);
                }
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
            console.log('err');
        }

    });

    $.ajax({
        url : "http://localhost/chart2/php/battle.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var options = "";
            for (var i =0; i<data.length; i++)
            {
                if (i == 0)
                {
                    batt = data[i].Battlenum;
                    console.log("batt: ",batt);
                }
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
            console.log('err');
        }

    });

    $.ajax({
        url : "http://localhost/chart2/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var actionnum = [];
            var speed = [];
            var cor = [];
            var err = [];
            var easy = [];
            var average = [];
            var hard = [];
            console.log('s',student_id,'b',batt,'s',sess);
            for(var i in data){
                if ((student_id == data[i].Student_ID) && (batt == data[i].Battlenum) && (sess == data[i].Sessionnum) && (topic == data[i].Topic_ID))
                {
                    speed.push(data[i].Inspeed);
                    actionnum.push(data[i].Actionnum);
                    if (data[i].Result.toLowerCase() == 'success')
                    {
                        cor.push(1);
                        err.push(0);
                    }
                    else{cor.push(0); err.push(1);}
                    if (data[i].Difficulty.toLowerCase() == 'easy'){easy.push(1);average.push(0);hard.push(0)}
                    else if (data[i].Difficulty.toLowerCase() == 'average'){easy.push(0);average.push(1);hard.push(0)}
                    else{easy.push(0);average.push(0);hard.push(1)}
                }

            }
            console.log(cor,err);
            var chartdata = {
                labels: actionnum,
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
                                labelString: 'question number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                min: 0,
                                max: 2
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'frequency',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var chartdata1 = {
                labels: actionnum,
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

            var options2 = {
                    title: {display:true, text: "Student's Speed in Answering Question"},
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
                                labelString: 'speed in seconds',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };
            var options3 = {
                    title: {display:true, text: "Student's Chosen Difficulty per Question"},
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
            var chartdata2 = {
                labels: actionnum,
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


    $(".call-btn").click(function(){

    $.ajax({
        url : "http://localhost/chart2/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var actionnum = [];
            var speed = [];
            var cor = [];
            var err = [];
            var easy = [];
            var average = [];
            var hard = [];
            console.log('s',student_id,'b',batt,'s',sess);
            for(var i in data){
                if ((student_id == data[i].Student_ID) && (batt == data[i].Battlenum) && (sess == data[i].Sessionnum) && (topic == data[i].Topic_ID))
                {
                    speed.push(data[i].Inspeed);
                    actionnum.push(data[i].Actionnum);
                    if (data[i].Result.toLowerCase() == 'success')
                    {
                        cor.push(1);
                        err.push(0);
                    }
                    else{cor.push(0); err.push(1);}
                    if (data[i].Difficulty.toLowerCase() == 'easy'){easy.push(1);average.push(0);hard.push(0)}
                    else if (data[i].Difficulty.toLowerCase() == 'average'){easy.push(0);average.push(1);hard.push(0)}
                    else{easy.push(0);average.push(0);hard.push(1)}
                }

            }
            console.log(cor,err);
            var chartdata = {
                labels: actionnum,
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
                                labelString: 'question number',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                min: 0,
                                max: 2
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'frequency',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };

            var chartdata1 = {
                labels: actionnum,
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
            var options2 = {
                    title: {display:true, text: "Student's Speed in Answering Question"},
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
                                labelString: 'speed in seconds',
                                fontColor: "#3949ab"
                            }
                        }]
                    }
                };
            var options3 = {
                    title: {display:true, text: "Student's Chosen Difficulty per Question"},
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


            var chartdata2 = {
                labels: actionnum,
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
                options: options1
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

    });

});