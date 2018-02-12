var student_id, times = 0, BarGraph, LineGraph, BarGraph1;
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
    clickers();
})
function clickers(){
    $.ajax({
        url : "http://localhost/chart2/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var accuracy = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
            var topic = [1,2,3,4];
            var speed = [[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,0.0,0.0]];
            var diffi = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
            var cor = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
            var ti = 0;
            console.log("student: ", student_id);
            for(var i in data){
                if (student_id == data[i].Student_ID){
                    if ( topic[ti] != Number(data[i].Topic_ID)){ti+=1;}
                    
                    if (data[i].Difficulty.toLowerCase() == 'easy'){
                        diffi[ti][0] += 1;
                        speed[ti][0] += Number(data[i].Inspeed);
                        if (data[i].Result.toLowerCase() == 'success'){cor[ti][0]+=1;}
                    }
                    else if (data[i].Difficulty.toLowerCase() == 'average'){
                        diffi[ti][1] += 1;
                        speed[ti][1] += Number(data[i].Inspeed);
                        if (data[i].Result.toLowerCase() == 'success'){cor[ti][1]+=1;}
                    }
                    else {
                        diffi[ti][2] += 1;
                        speed[ti][2] += Number(data[i].Inspeed);
                        if (data[i].Result.toLowerCase() == 'success'){cor[ti][2]+=1;}
                    }
                }
            }
            ti = 0;
            var pf = 0;
            while(ti < 4){
                pf = 0;
                while(pf < 3){
                    if(diffi[ti][pf] != 0){
                        accuracy[ti][pf] = (cor[ti][pf]/diffi[ti][pf]) * 100;
                        speed[ti][pf] = (speed[ti][pf]/diffi[ti][pf]);
                    }
                    else {
                        accuracy[ti][pf] = 0;
                        speed[ti][pf] = 0;
                    }
                    pf += 1;
                }
                ti += 1;
            }
            console.log("cor: ",cor);
            var chartdata = {
                labels: ['topic 1', 'topic 2', 'topic 3', 'topic 4'],
                datasets:[
                {
                    type: 'bar',
                    label: 'easy',
                    backgroundColor: "#e91e63",
                    borderColor: '#e91e63',
                    borderWidth: 1,
                    data: [accuracy[0][0],accuracy[1][0],accuracy[2][0],accuracy[3][0]]
                },
                {
                    type: 'bar',
                    label: 'average',
                    backgroundColor: "#5e35b1",
                    borderColor: '#5e35b1',
                    borderWidth: 1,
                    data: [accuracy[0][1],accuracy[1][1],accuracy[2][0],accuracy[3][1]]
                },
                {
                    type: 'bar',
                    label: 'hard',
                    backgroundColor: "#00796b",
                    borderColor: '#00796b',
                    borderWidth: 1,
                    data: [accuracy[0][2],accuracy[1][2],accuracy[2][2],accuracy[3][2]]
                }         

                ]};
            var options1 = {
                    title: {display:true, text: "Student's Accuracy per Topic and Difficulty"},
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
                                labelString: 'topics',
                                fontColor: "#3949ab"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'accuracy in percentage',
                                fontColor: "#3949ab"
                            } 
                        }]
                    }
                };

            var chartdata1 = {
                labels: ['topic 1', 'topic 2', 'topic 3', 'topic 4'],
                datasets:[
                {
                    type: 'bar',
                    label: 'easy',
                    backgroundColor: "#e91e63",
                    borderColor: '#e91e63',
                    borderWidth: 1,
                    data: [speed[0][0],speed[1][0],speed[2][0],speed[3][0]]
                },
                {
                    type: 'bar',
                    label: 'average',
                    backgroundColor: "#5e35b1",
                    borderColor: '#5e35b1',
                    borderWidth: 1,
                    data: [speed[0][1],speed[1][1],speed[2][0],speed[3][1]]
                },
                {
                    type: 'bar',
                    label: 'hard',
                    backgroundColor: "#00796b",
                    borderColor: '#00796b',
                    borderWidth: 1,
                    data: [speed[0][2],speed[1][2],speed[2][2],speed[3][2]]
                } 

                ]};

            var options2 = {
                    title: {display:true, text: "Student's Average Speed per Topic and Difficulty"},
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
                                labelString: 'topics',
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
                    title: {display:true, text: "Student's Chosen Difficulty per Topic"},
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
                                labelString: 'topics',
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
                labels: ['topic 1', 'topic 2', 'topic 3', 'topic 4'],
                datasets:[
                {
                    type: 'bar',
                    label: 'easy',
                    backgroundColor: "#e91e63",
                    borderColor: '#e91e63',
                    borderWidth: 1,
                    data: [diffi[0][0],diffi[1][0],diffi[2][0],diffi[3][0]]
                },
                {
                    type: 'bar',
                    label: 'average',
                    backgroundColor: "#5e35b1",
                    borderColor: '#5e35b1',
                    borderWidth: 1,
                    data: [diffi[0][1],diffi[1][1],diffi[2][0],diffi[3][1]]
                },
                {
                    type: 'bar',
                    label: 'hard',
                    backgroundColor: "#00796b",
                    borderColor: '#00796b',
                    borderWidth: 1,
                    data: [diffi[0][2],diffi[1][2],diffi[2][2],diffi[3][2]]
                }      

                ]};
            if (times != 0){
            	BarGraph.destroy();
            	LineGraph.destroy();
            	BarGraph1.destroy();
            }

            var ctx = $("#mycanvas");
            BarGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata,
                options: options1
            });

            var ctx = $("#mycanvas1");
            LineGraph = new Chart(ctx,{
                type: 'bar',
                data: chartdata1,
                options: options2
            });

            var ctx = $("#mycanvas2");
            BarGraph1 = new Chart(ctx,{
                type: 'bar',
                data: chartdata2,
                options: options3
            });
            times += 1;

        },
        error: function(data){

        }
    });
}