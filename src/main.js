(function() {
  /** Canvas setup */
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  /** Required Gameplay Variables */
  var playerSize = 20,
  partnerX = canvas.width / 2,
  partnerY = canvas.height / 2,
  playerX = 30,
  playerY = 10,
  relationshipStarted = false,
  connected = false,
  partnerMoveSpeed = 1.25,
  playerMoveSpeed = 1,
  partnerRunSpeed = .05;

  var OVERLAP_COLOR = '#E8543D', //232,84,61
      PLAYER_COLOR = '#22A9D5',
      PARTNER_COLOR = '#DBD56E',
      CURRENT_BACKGROUND = {
        red: 0,
        green: 149,
        blue: 221
      },
      GOAL_BACKGROUND = {
        red: 0,
        green: 149,
        blue: 221
      }
      GAME_OVER_COLOR = '#111111';

  var diffX = Math.abs(playerX - partnerX);
  var diffY = Math.abs(playerY - partnerY);

  /** Keyboard Event Listeners for WASD, ZQSD, or ARROW keys */
  u=d=l=r=0;onkeydown=onkeyup=e=>top['lurdl*d*l*ur*u'[(e.which+3)%20]]=e.type[3]<'u'

  function movePartner() {
    if (relationshipStarted && r === false && l === false && u === false && d === false) {
      setTimeout(function() {
        connected = false;

        if (partnerX < canvas.width / 2 && partnerX > 0) {
          partnerX -= partnerRunSpeed;
        } else if (partnerX >= canvas.width / 2 && partnerX < canvas.width - playerSize) {
          partnerX += partnerRunSpeed;
        }

        if (partnerY < canvas.height / 2 && partnerY > 0) {
          partnerY -= partnerRunSpeed;
        } else if (partnerY >= canvas.height / 2 && partnerY < canvas.height - playerSize) {
          partnerY += partnerRunSpeed;
        }

        if (partnerRunSpeed < 1) { partnerRunSpeed += .01; }
      }, 1500);
    }
  }

  function canvasCollisionDetection() {
    /** Change player positions if the player is moving the player with the keyboard */
    if (r && playerX < canvas.width - playerSize) {
      playerX += 1;
      if (connected) {
        partnerX += partnerMoveSpeed;
      }
    }

    if (l && playerX > 0) {
      playerX -= 1;
      if (connected) {
        partnerX -= partnerMoveSpeed;
      }
    }

    if (u && playerY > 0) {
      playerY -= 1;
      if (connected) {
        partnerY -= partnerMoveSpeed;
      }
    }

    if (d && playerY < canvas.height - playerSize) {
      playerY += 1;
      if (connected) {
        partnerY += partnerMoveSpeed;
      }
    }

    diffX = playerX - partnerX;
    diffY = playerY - partnerY;

    if (!connected && (partnerX < 0 || partnerX + playerSize > canvas.width || partnerY < 0 || partnerY + playerSize > canvas.height)) {
      gameOver();
    }
  }

  function partnerCollisionDetection() {
    var overlapX = playerSize - Math.abs(diffX);
    var overlapY = playerSize - Math.abs(diffY);

    if ( diffX >= 0 && diffX < playerSize && diffY >= 0 && diffY < playerSize ) { /** POS X POS Y */
      drawOverlap(playerX, playerY, overlapX, overlapY);
    } else if (diffX <= 0 && diffX > -playerSize && diffY >= 0 && diffY < playerSize) { /** NEG X POS Y */
      drawOverlap(playerX + Math.abs(diffX), playerY, overlapX, overlapY);
    } else if (diffX >= 0 && diffX < playerSize && diffY <= 0 && diffY > -playerSize) { /** POS X NEG Y */
      drawOverlap(playerX, playerY + Math.abs(diffY), overlapX, overlapY);
    } else if (diffX <= 0 && diffX > -playerSize && diffY <= 0 && diffY > -playerSize) { /** NEG X NEG Y */
      drawOverlap(playerX + Math.abs(diffX), playerY + Math.abs(diffY), overlapX, overlapY);
    }

    if (overlapX > 4 && overlapY > 4) {
      connected = true;
      partnerRunSpeed = 0.05;
      relationshipStarted = true;
      GOAL_BACKGROUND = {
        red: 232,
        green: 84,
        blue: 61
      }
    } else {
      connected = false;
    }
  }

  function gameDebugger() {
    console.log('gameDebugger is ON!');
    ctx.font = '12px Arial';
    ctx.fillStyle = OVERLAP_COLOR;
    ctx.fillText('Connected ' + connected, 20, 20);
    ctx.fillText('Player: X ' + playerX + ' Y ' + playerY, 20, 32);
    ctx.fillText('Partner: X ' + partnerX + ' Y ' + partnerY, 20, 44);
    ctx.fillText('diffX ' + diffX, 20, 56);
    ctx.fillText('diffY ' + diffY, 20, 68);
    ctx.fillText('BG_RED ' + CURRENT_BACKGROUND.red, 20, 80);
    ctx.fillText('BG_GREEN ' + CURRENT_BACKGROUND.green, 20, 92);
    ctx.fillText('BG_BLUE ' + CURRENT_BACKGROUND.blue, 20, 104);
  }

  /** Run the end game state */
  function gameOver() {
    clearCanvas();
    drawEndText();
  }

  function setBackgroundColor() {
    document.body.style.backgroundColor = 'rgb(' + CURRENT_BACKGROUND.red + ',' + CURRENT_BACKGROUND.green + ',' + CURRENT_BACKGROUND.blue + ')';
  }

  function fadeBackgroundColor() {
    var steps = 50,
        dr = (CURRENT_BACKGROUND.red - GOAL_BACKGROUND.red) / steps,
        dg = (CURRENT_BACKGROUND.green - GOAL_BACKGROUND.green) / steps,
        db = (CURRENT_BACKGROUND.blue - GOAL_BACKGROUND.blue) / steps,
        i = 0;

    CURRENT_BACKGROUND.red = Math.round(GOAL_BACKGROUND.red + dr * i);
    CURRENT_BACKGROUND.green = Math.round(GOAL_BACKGROUND.green + dg * i);
    CURRENT_BACKGROUND.blue = Math.round(GOAL_BACKGROUND.blue + db * i);

    setBackgroundColor();
  }

  function drawEndText() {
    ctx.font = '16px Arial';
    ctx.fillStyle = PARTNER_COLOR;
    ctx.fillText('\'Tis better to have loved and lost, Than never to have loved at all', 20, canvas.height / 2);
  }

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerSize, playerSize);
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  function drawPartner() {
    ctx.beginPath();
    ctx.rect(partnerX, partnerY, playerSize, playerSize);
    ctx.fillStyle = PARTNER_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  function drawOverlap(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = OVERLAP_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    clearCanvas();
    drawPlayer();
    drawPartner();
    gameDebugger();
    partnerCollisionDetection();
    canvasCollisionDetection();
    movePartner();
    fadeBackgroundColor();
    requestAnimationFrame(draw);
  }

  draw();
})();
