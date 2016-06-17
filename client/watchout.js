//GLOBAL FUNCTIONS

var setRandom = function () {
  //return a random number that will be (almost) anywhere on the board
  var randomNumber = Math.random() * boardSize;
  if (randomNumber > 2 * r && randomNumber < (boardSize - (2 * r))) {
    return randomNumber;
  } else {
    return setRandom();
  }
};
///BOARD

var boardSize = 800;


var svgAttributes = [{'width': boardSize, 'height': boardSize, 'background': 'green'}];
// create a svg element
// append svg element to the body
var svg = d3.select('.board').selectAll('svg')
  .data(svgAttributes)
  .enter()
  .append('svg')
  .attr({
    'width': function(d) { return d.width; },
    'height': function(d) { return d.height; },
    'background': function(d) { return d.background; }
  });


//  CIRCLES 
// create an array for the circle object that stores all attributes nclues r, cx, cy, (transition to new cx, cy
var r = 25;
var circleAttributes = [
 {'r': r, 'cx': 50, 'cy': 150}, 
 {'r': r, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 75}r
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 // {'r': 25, 'cx': 50, 'cy': 50},
 {'r': r, 'cx': 50, 'cy': 150},
 {'r': r, 'cx': 50, 'cy': 50},
 {'r': r, 'cx': 50, 'cy': 50},
 {'r': r, 'cx': 50, 'cy': 50}];


// select circle
// append the data set to the circle - i
var enemies = d3.select('svg').selectAll('circle')
   .data(circleAttributes)
   .enter()
   .append('circle')
   .attr({
     'cx': function (d) { return setRandom(); },
     'cy': function (d) { return setRandom(); }
   })
   .attr({r: r});




//ANIMATIONS

//Make the circles move
   //can also interrupt current transition with .interrupt() ... IF THEY HIT???
var moveRepeatly = function() {
  setTimeout(function () {
    enemies.transition()
    .duration(2000)
    .attr('cx', function(d) { return setRandom(); })
    .attr('cy', function(d) { return setRandom(); });
    moveRepeatly();
  }, 1000);
};

moveRepeatly();





// create seperate user circle that will take mouse input to move


// create some type of function that tests to see if any other circles touching it
// create a setTimeout that recursively calls our collision test



 // .data (data, function (d){}


//
// function enter_update_exit (){
// //new transition
// }

// enter_update_exit();
 //setTimeout 

 //linear movement. 
    //rotate keyfame2s