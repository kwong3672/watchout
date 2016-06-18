//GLOBAL FUNCTIONS
var ourEach = function (col, it){
  if (Array.isArray(col)){
    for(var i = 0; i < col.length; i++){
      it(col[i], i, col);
    }
  } else {
      for (var prop in col){
        it(col[prop], prop, col);
      }
  }
};

var setRandom = function () {
  //return a random number that will be (almost) anywhere on the board
  var randomNumber = Math.random() * boardSize;
  if (randomNumber > 2 * r && randomNumber < (boardSize - (2 * r))) {
    return randomNumber;
  } else {
    return setRandom();
  }
};

//SCOREBOARD
var highScore = [0];
var scoreData = [1];

//start initially on page load
//want it to reset if there is ever a collision
var increaseScore = function (crash) {
  var currentScore = d3.select('.current span')
      .data(scoreData)
      .text(function(d){return d;});
  scoreData[0] = scoreData[0] + 1;
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
 {'r': r, 'cx': 0, 'cy': 0}, 
 {'r': r, 'cx': 0, 'cy': 0},
 {'r': r, 'cx': 0, 'cy': 0},
 {'r': r, 'cx': 0, 'cy': null}];


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
var playerArray = [{'r': r, 'cx': 0, 'cy': 0}];



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
    increaseScore();
    moveRepeatly();

  }, 1000);
};

 moveRepeatly();

var distanceToPlayer = function () {
  //GET PLAYER X and Y
  var playerX = d3.select('.player').attr('cx');
  var playerY = d3.select('.player').attr('cy');

  //

  //GET ALL ENEMY Xs and Yx

  // loop through all enemy nodes
  ourEach(enemies, function (enemy, i) {
    // get absolute value of the difference between enemyX and playerX
    ourEach(enemy, function(obj) {
      diffX = Math.abs(obj['attributes']['0']['value'] - playerX );
      // console.log('difference of X: ' + diffX);
      diffY = Math.abs(obj['attributes']['1']['value'] - playerY );
      // console.log('difference of Y: ' + diffY);

                      // var diffX = Math.abs(enemy[i]['attributes']['0']['value'] - playerX );
                      //   // d3.selectAll().attribute[0][i].cx.value
                      // console.log(diffX);
                      // // get absolute value of the difference between enemyY and playerY
                      // var diffY = Math.abs(enemy[i]['attributes']['1']['value'] - playerY);

      var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
      // if distance < radius
      if (distance < (r * 2)) {
        collision();
      }

    });
  });

  setTimeout(function() {
    distanceToPlayer();
  }, 25);
};
 distanceToPlayer();

// create a collision function
var collision = function () {
  //call the increaseScore function and pass true to stop it. 
   console.log('Bang you are dead');
};



///////// create function to move player 
var drag = d3.behavior.drag()
  .on('drag', function (d, i) {
    // var temp = 0;
    d.cx += d3.event.dx;
     // console.log(d.cx);
    d.cy += d3.event.dy;
    d3.select(this).attr('transform', function(d, i) {
      return 'translate(' + [d.cx, d.cy] + ')';
    });
    // console.log('you are dragging the mouse');
  });

player.call(drag);






///see if the data thing works 
// var dataTest = [{bob:2},{bob:2},{bob:2},{bob:2}];
// d3.selectAll('.enemies')
//    .data(dataTest, function(d){return d.bob;})
//    .enter()
//    .attr({'class':})

// create some type of function that tests to see if any other circles touching it
// // create a setTimeout that recursively calls our collision test

// ///MOUSE: 
// player.on('dragstart' function(){
//   d3.event./////.stopPropagation
// })

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