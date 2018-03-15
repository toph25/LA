$(document).ready(function(){
  the_trend();

});

function the_trend(){
    /*$.ajax({
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
    });*/
    var student_id = localStorage.getItem("sid");
    console.log(student_id);
    $.ajax({
        url : "http://localhost/LA/php/data.php",
        type : "GET",
        success: function(data){
            console.log(data);
            var actions=[], speed = [], difficulty = [], answer = [], j=1;

            for (i in data){
              if (data[i].Student_ID == student_id){
                speed.push(Number(data[i].Inspeed));
                if(data[i].Difficulty.toLowerCase() == "easy"){difficulty.push("#ffd600");}
                else if(data[i].Difficulty.toLowerCase() == "average"){ difficulty.push("#009688");}
                else{difficulty.push("#e53935");}
                if(data[i].Result.toLowerCase() == "success") { answer.push("circle");}
                else{answer.push("triangle");}
                actions.push(j);
                j+=1;
              }
            }
            console.log("speed: ",speed);
            var data = {
              labels: actions,
              datasets: [
                {
                  label: "YELLOW - Easy \t BLUE - Average RED - Hard \t" + String.fromCharCode(9899)+ " plot - correct\t" + String.fromCharCode(9650) + " plot - wrong",
                  data: speed,
                  background: "#ff1744",
                  pointBackgroundColor: difficulty,
                  borderColor: "#fafafa",
                  fill: false,
                  lineTension: 0,
                  pointRadius: 5,
                  showLine: true,
                  pointStyle: answer
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
                text: "Trend",
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

                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Question Number',
                            fontColor: "#3949ab"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'in seconds',
                            fontColor: "#3949ab"
                        }
                    }]
                }
            };
            var ctx = $("#trend");
            var chart = new Chart(ctx, {
              type: "line",
              data: data,
              options: options
            });
          


        },
        error: function(data){

        }
    });
}