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


//  ENEMIES
// create an array for the circle object that stores all attributes nclues r, cx, cy, (transition to new cx, cy
var r = 25;
var enemiesArray = [
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
var enemies = d3.select('svg').selectAll('.enemies')
   .data(enemiesArray)
   .enter()
   .append('circle')
   .attr({
     'cx': function (d) { return setRandom(); },
     'cy': function (d) { return setRandom(); }
   })
   .attr({r: r})
   .attr({'class': 'enemies'});


// PLAYERS
// create seperate user circle that will take mouse input to move
var playerArray = [{'r': r, 'cx': 50, 'cy': 150}];


var player = d3.select('svg').selectAll('.player')
   .data(playerArray)
   .enter()
   .append('circle')
   .attr({
     'cx': function (d) { return setRandom(); },
     'cy': function (d) { return setRandom(); }
   })
   .attr({r: r})
   .attr({'class': 'player'})
   .attr({'fill': 'red'});

//ANIMATIONS

//Make the enemies move
   //can also interrupt current transition with .interrupt() ... IF THEY HIT???
var moveRepeatly = function() {
  setTimeout(function () {
    enemies.transition()
    .duration(1000)
    .attr('cx', function(d) { return setRandom(); })
    .attr('cy', function(d) { return setRandom(); });
    moveRepeatly();
  }, 1000);
};

moveRepeatly();


// create some type of function that tests to see if any other circles touching it
// // create a setTimeout that recursively calls our collision test

// ///MOUSE: 
player.on('dragstart' function(){
  d3.event./////.stopPropagation
})

// force.drag
// //d3.mouse will tell us mouse coordinates [x,y] : relative to the container!! 
//   //will need to use this + funciton that reports 
//      //if any other el crosses mouse, hit++
//      //interrupt: play again / deaths
// // console.log(d3.mouse());

// .on('click') // .mouseover

//if click: use d3.mouse to report position? continuously?


//d3.event: stores current event
//captureFlag: all events of the specified type will be dispatched to registered EventListenere



//
// function enter_update_exit (){
// //new transition
// }

// enter_update_exit();
 //setTimeout 

 //linear movement. 
    //rotate keyfame2s