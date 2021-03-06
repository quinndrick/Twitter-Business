
var ajaxResult;

$(document).ready(function (){

  console.log('search js loaded');

  if( $('.tweets.index').length){

    console.log('searches loaded');

    // START SEACH FUNCTION
    $('#search').on('click', function (){
          console.log('Search Clicked');

    // QUERY VALUES //
    var searchWords = $('#twitterSearch').val();
      console.log(searchWords);
    var searchNum = $('#searchNum').val();
      console.log(searchNum);
    var geography = $("#location").val();
      console.log(geography);
    var type = $('#searchType').val();
      console.log(type);

    // SENTIMENT WORD COUNTER
    var positive = 0;
    var neutral = 0;
    var negative = 0;

    // SENTIMENT SCORE ARRAY
    var sentScoreArr = [];
    var sentLabels = [];

    for (var i = 0; i < search.length; i++) {
      sentLabels.push(i);
    }

    var ajaxData = {
      query:searchWords,
      limit:searchNum,
      type:type
    };
    console.log(ajaxData);

    // clear previous sentiment word results
    $(".addTweets").empty();
    positive = 0;
    neutral = 0;
    negative = 0;


    // set the ajax call to grab the data from the ruby back-end call
      $.ajax({
        url: "/tweets/search",
        type: "GET",
        data: ajaxData,
        dataType: "JSON"
      })
      .done(function (res){

        // make ajax request res //
        ajaxResult = res;
        // objects of tweets returned
        console.log("Your twitter search term: ", res);

        //COUNTER FUNCTION

        //DISPLAY SEARCH WORDS//
        res.counter.forEach(function(w) {
             console.log(w);
              //  $("<p>" + w + "</p>").appendTo('.wordCounter');
        });

        // D3 first bar graph //

        // debugger;
        //
        // var data = [30, 86, 168, 281, 303, 365];
        //
        // var width = 420,
        //     barHeight = 20;
        //
        //
        // var x = d3.scale.linear()
        //     .domain([0, d3.max(data)])
        //     .range([0, width]);
        //
        // var chart = d3.select(".svgchart")
        //     .attr("width", width)
        //     .attr("height", barHeight * data.length);
        //
        // var bar = chart.selectAll("g")
        //     .data(data)
        //     .enter().append("g")
        //     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
        //
        // bar.append("rect")
        //     .attr("width", x)
        //     .attr("height", barHeight - 1);
        //
        // bar.append("text")
        //     .attr("x", function(d) { return x(d) - 3; })
        //     .attr("y", barHeight / 2)
        //     .attr("dy", ".35em")
        //     .text(function(d) { return d; });


        ////////// CHART JS GRAPHS ///////////

        // loop for twitter feed  **to used later **
        for (var i = 0; i < res.data.length; i++) {
          var result = res.data[i].body;
          console.log(res.data[i]);
          // $("<p>"+result+"</p>").appendTo(".addTweets");
          }
          // append to make twitter feed
          // $("<li>"+sentiment+"</li>").appendTo('.addTweets');


          // LOOP FOR SENTIMENT WORD
        for (var j = 0; j < res.data.length; j++) {
          //define sentiment value
          var sentiment = res.data[j].sentiment;

          // add to word counter
          if(sentiment === "positive"){
            positive += 1;
          } else if (sentiment === "neutral"){
              neutral += 1;
            } else if (sentiment === "negative"){
              negative += 1;
            };
          }

          // display sentiment numbers
          $("<li>" + "number of positive scores: " + positive + "</li>").appendTo('.addTweets');
          $("<li>" + "number of neutral scores: " + neutral + "</li>").appendTo('.addTweets');
          $("<li>" + "number of negative scores: " + negative + "</li>").appendTo('.addTweets');

          // SENTIMENT RESULTS
          var barGraph = $("#sentimentChart");

          var myChart = new Chart(barGraph, {
            type: 'bar',
            data: {
              labels: ["Positive", "Neutral", "Negative"],
              datasets: [{
                label: ('sentiment graph for ' + searchWords),
                data: [positive, neutral, negative],
                backgroundColor: [
                  'rgba(119, 221, 119, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(255, 105, 97, 0.8)'
                ],
                borderColor: [
                  'rgba(119, 221, 119, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 105, 97, 1)',
                ],
                borderWidth: 1
              }]
            },
            options: {
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero:true
                  }
                }]
              },// scales end
              // animation: {
              //   onProgress: function(animation) {
              //     progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
              //   }
              // } // animations end
            } // end options
          }); // bar chart end

    // SENTIMENT SCORE RESULTS

        for (var k = 0; k < res.data.length; k++) {
          var sentScore = res.data[k].score;
          sentScoreArr.push(sentScore);
          sentLabels.push(sentScore);
          // console.log(sentScore);
        }

        //

        var lineGraph = $('#scoreChart');
        var myLineChart = new Chart(lineGraph, {
              type: 'line',
              data: {
                datasets: [{
                  label: ('Line Graph for: ' + searchWords),
                  data: sentScoreArr,
                  backgroundColor: [
                    'rgba(63, 124, 172, 1)',
                  ]
                }],
                labels: sentLabels
              },// data
              options: {
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    ticks: {
                      min: sentLabels
                    }
                  }] // options
                },
                pointStyle:'circle',  // scales
              } // options
          }); // lineGraph end


      }) // done end
      .fail(function (xhr,status,error){

        console.log(xhr, status, error);
      }); // fail end


  }); // end on click


    // Register enter click to search // ** needs to be fixed
      $('#search').keypress(function(e){
      if(e.keyCode == 13){//Enter key pressed
          $('#search').click();//Trigger search button click event
          console.log("enter smashed!");
      }
  });



  } // if show. search

}); // end doc ready
