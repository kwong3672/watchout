///////////////////////////////////////
////GLOBAL FUNCTIONS
///////////////////////////////////////
var ourEach = function (col, it){
  if (Array.isArray(col)) {
    for(var i = 0; i < col.length; i++) {
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
///////////////////////////////////////
////SCOREBOARD
///////////////////////////////////////

var highScore = [0];
var scoreData = [1];
var hits = [0];

//start initially on page load
//want it to reset if there is ever a collision
var increaseScore = function () {
  var currentScore = d3.select('.current span')
      .data(scoreData)
      .text(function(d) { return d; } );
  scoreData[0] = scoreData[0] + 1;
};

//create reset score function 

var resetScore = function () {
  //set the currentScore to 0
  scoreData[0] = 0;
  //set the hits to increase by 1
  hits[0] = hits[0] + 1;
  //update the right div/spans.
  d3.select('.current span')
    .data(scoreData)
    .text(function(d) { return d; });

  d3.select('.collisions span')
    .data(hits)
    .text(function(d) { return d; });
};

var trackHighScore = function () {
  var prevHigh = highScore[0];
  var newHigh = scoreData[0];
  if (prevHigh < newHigh) {
    highScore[0] = newHigh;
  }

  d3.select('.highscore span')
    .data(highScore)
    .text(function(d) { return d; } );
};

///////////////////////////////////////
////BOARD
///////////////////////////////////////

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


///////////////////////////////////////
////ENEMIES
///////////////////////////////////////
///ENEMIES DATA
var r = 25;
var enemiesArray = [
 {'r': r, 'cx': 0, 'cy': 0}, 
 {'r': r, 'cx': 0, 'cy': 0},
 {'r': r, 'cx': 0, 'cy': 0}, 
 {'r': r, 'cx': 0, 'cy': 0},
{'r': r, 'cx': 0, 'cy': 0},
 {'r': r, 'cx': 0, 'cy': 0},
 {'r': r, 'cx': 0, 'cy': null}];


////////////////////////////CONNECT ENEMIES AND DATA
var enemies = d3.select('svg').selectAll('.enemies')
   .data(enemiesArray)
   .enter()
   .append('circle')  ///make image insteaD?? ?  >> 'svg:image'
   .attr({
     'cx': function (d) { return setRandom(); },
     'cy': function (d) { return setRandom(); }
   })
   .attr({r: r})
   .attr({'class': 'enemies'})
   .attr('transform', 'translate(' + r + ',' + r + ')')
   // .attr('xlink:href', 'https://image.spreadshirtmedia.com/image-server/v1/designs/12334647,width=178,height=178,version=1366571108/shuriken.png');
   // var img = enemies.append('svg:image')
   //   .attr(xlink:href, 'https://image.spreadshirtmedia.com/image-server/v1/designs/12334647,width=178,height=178,version=1366571108/shuriken.png')
   //   .attr('width' , 25)
   //   .attr('height' , 25);
///////////////////////////////////////
////PLAYER
///////////////////////////////////////
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




///////////////////////////////////////
////ANIMATIONS
///////////////////////////////////////

///////// MOVE THE ENEMIES
   //can also interrupt current transition with .interrupt() ... IF THEY HIT???
var moveRepeatly = function() {
  setTimeout(function () {
    enemies.transition()
    .duration(1000)
    .attr('cx', function(d) { return setRandom(); })
    .attr('cy', function(d) { return setRandom(); });
    // increaseScore();
    moveRepeatly();

  }, 1000);
};

 moveRepeatly ();

 setInterval (function() {
   increaseScore();
   trackHighScore();
 }, 100);


////////////CALCULATE DISTANCES ENEMY:PLAYER
var distanceToPlayer = function () {
  //GET PLAYER X and Y
  var playerX = d3.select('.player').attr('cx');
  var playerY = d3.select('.player').attr('cy');

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

///////////////////////////////////////
////RESET SCORE UPON COLLISION
///////////////////////////////////////
var collision = function () {
  //call the increaseScore function and pass true to stop it. 
   resetScore();
};


///////////////////////////////////////
////CLICK-DRAG THE PLAYER
///////////////////////////////////////
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


///////////////////////////////////////
////WHIRL THE ENEMIES
///////////////////////////////////////

d3.timer(function(){
  svg.selectAll('enemies')
     .attr('transform', function (d) {
        return "rotate(" + d + ")";
     })
});
