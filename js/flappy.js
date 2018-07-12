// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
* Loads all resources for the game and gives them names.
*/
var score;
score = -1;
var labelScore;

var pipes = [];

var player;



function playerJump() {
  player.body.velocity.y = -135;
}

function start () {
  game.physics.arcade.enable(player);
  player.body.gravity.y = 200;
  player.body.setCircle(20);

  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generatePipe
  );
  game.input.onDown.add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  generatePipe ();

  score = -1;
}

function preload() {
  game.load.image("flappyBird", "../assets/flappy.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
}

function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
  for (var count = 0; count < 8; count++) {
    if (count != gap && count != gap+1) {
      addPipeBlock(750, count * 50);
    } }
    changeScore();
  }

  function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
  }



  /*
  * Initialises the game. This function is only called once.
  */
  function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#0dc447");
    game.add.text(200, 200, "It's coming home", {font: "40px Courier", fill:
    "#FFFFFF"});
    //game.add.sprite(395, 200, "flappyBird");


    labelScore = game.add.text(20, 20, "0");


    //generatePipe();

    player = game.add.sprite(100, 200, "flappyBird");


    /*  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(PlayerMoveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(PlayerMoveLeft);

    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(PlayerMoveUp);

    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(PlayerMoveDown);
    */



    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown
    .add(playerJump);
    game.input
    .keyboard.addKey(Phaser.Keyboard.ENTER)
    .onDown.add(start);
  }



  /*
  * This function updates the scene. It is called for every new frame.
  */
  function update() {
    game.physics.arcade.overlap(
      player,
      pipes,
      gameOver);

      if (player.y > 400 || player.y < 0) {
        gameOver();
      }

    }


    function clickHandler(event) {
      //game.add.sprite(event.x-20, event.y-15, "flappyBird");
    }

    function gameOver(){
      score = -1;
      game.state.restart ();
    }


    function spaceHandler() {
      game.sound.play("score");
    }

    function changeScore() {
      score = score + 1;
      labelScore.setText(score.toString());
    }
