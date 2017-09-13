(function() {
  /** Canvas setup */
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  /** Required Gameplay Variables */
  var partnerX = canvas.width / 2,
      partnerY = canvas.height / 2,
      playerX = 30,
      playerY = 10,
      relationshipStarted = false,
      connected = false,
      partnerRunSpeed = 0.05,
      relationshipTimeline = 0;
      finalBreakUpText = null,
      diffX = Math.abs(playerX - partnerX),
      diffY = Math.abs(playerY - partnerY);

  /** Gameplay Constants */
  var PLAYER_SIZE = 20,
      PLAYER_MOVE_SPEED = 1,
      PARTNER_MOVE_SPEED = 1.25,
      OVERLAP_COLOR = '#DDE084',
      PLAYER_COLOR = '#939393',
      PARTNER_COLOR = '#22A9D5',
      GAME_OVER_COLOR = '#111111';

  /** End Game Text */
  var breakupLines = [
    'I just need some space.',
    'It’s not you, it’s me.',
    'Let’s still be friends.',
    'I think we should see other people.',
    'I can’t make you happy.',
    'I really just need to work on myself.',
    'I don’t really see a future together.'
  ];

  /** Keyboard Event Listeners for WASD, ZQSD, or ARROW keys. Thanks, Subzey! https://xem.github.io/articles/#jsgamesinputs*/
  u=d=l=r=0;onkeydown=onkeyup=function(e){return top['lurdl*d*l*ur*u'[(e.which+3)%20]]=e.type[3]<'u'};

  function movePartner() {
    if (relationshipStarted && !r && !l && !u && !d ) {
      setTimeout(function() {
        connected = false;
        setBackgroundColor(GAME_OVER_COLOR);

        if (partnerX < canvas.width / 2 && partnerX > 0) {
          partnerX -= partnerRunSpeed;
        } else if (partnerX >= canvas.width / 2 && partnerX < canvas.width - PLAYER_SIZE) {
          partnerX += partnerRunSpeed;
        }

        if (partnerY < canvas.height / 2 && partnerY > 0) {
          partnerY -= partnerRunSpeed;
        } else if (partnerY >= canvas.height / 2 && partnerY < canvas.height - PLAYER_SIZE) {
          partnerY += partnerRunSpeed;
        }

        if (partnerRunSpeed < 1) {
          partnerRunSpeed += 0.01;
        }
      }, 1500);
    }
  }

  /** Change player positions if the player is moving the player with the keyboard */
  function canvasCollisionDetection() {
    if (r && playerX < canvas.width - PLAYER_SIZE) {
      playerX += PLAYER_MOVE_SPEED;
      if (connected) {
        partnerX += PARTNER_MOVE_SPEED;
      }
    }

    if (l && playerX > 0) {
      playerX -= PLAYER_MOVE_SPEED;
      if (connected) {
        partnerX -= PARTNER_MOVE_SPEED;
      }
    }

    if (u && playerY > 0) {
      playerY -= PLAYER_MOVE_SPEED;
      if (connected) {
        partnerY -= PARTNER_MOVE_SPEED;
      }
    }

    if (d && playerY < canvas.height - PLAYER_SIZE) {
      playerY += PLAYER_MOVE_SPEED;
      if (connected) {
        partnerY += PARTNER_MOVE_SPEED;
      }
    }

    diffX = playerX - partnerX;
    diffY = playerY - partnerY;

    if (!connected && (partnerX < 0 || partnerX + PLAYER_SIZE > canvas.width || partnerY < 0 || partnerY + PLAYER_SIZE > canvas.height)) {
      gameOver();
    }
  }

  function partnerCollisionDetection() {
    var overlapX = PLAYER_SIZE - Math.abs(diffX);
    var overlapY = PLAYER_SIZE - Math.abs(diffY);

    if ( diffX >= 0 && diffX < PLAYER_SIZE && diffY >= 0 && diffY < PLAYER_SIZE ) { /** POS X POS Y */
      drawOverlap(playerX, playerY, overlapX, overlapY);
    } else if (diffX <= 0 && diffX > -PLAYER_SIZE && diffY >= 0 && diffY < PLAYER_SIZE) { /** NEG X POS Y */
      drawOverlap(playerX + Math.abs(diffX), playerY, overlapX, overlapY);
    } else if (diffX >= 0 && diffX < PLAYER_SIZE && diffY <= 0 && diffY > -PLAYER_SIZE) { /** POS X NEG Y */
      drawOverlap(playerX, playerY + Math.abs(diffY), overlapX, overlapY);
    } else if (diffX <= 0 && diffX > -PLAYER_SIZE && diffY <= 0 && diffY > -PLAYER_SIZE) { /** NEG X NEG Y */
      drawOverlap(playerX + Math.abs(diffX), playerY + Math.abs(diffY), overlapX, overlapY);
    }

    if (overlapX > 4 && overlapY > 4) {
      connected = true;
      partnerRunSpeed = 0.05;
      relationshipStarted = true;
      setBackgroundColor(OVERLAP_COLOR);
      relationshipTimeline++;
      document.getElementById('relationship__time').textContent = Math.ceil(relationshipTimeline / 100);
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
  }

  /** Run the end game state */
  function gameOver() {
    clearCanvas();
    drawEndText();
  }

  function setBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  function pickRandomBreakupLine() {
    if (!finalBreakUpText) {
      var randomNum = Math.floor(Math.random() * ((breakupLines.length - 1)));
      finalBreakUpText = breakupLines[randomNum];
    }
    return finalBreakUpText;
  }

  function drawEndText() {
    ctx.font = '16px Arial';
    ctx.fillStyle = PARTNER_COLOR;
    ctx.fillText( pickRandomBreakupLine(), 20, canvas.height / 2);
    document.getElementById('myCanvas').style.backgroundColor = GAME_OVER_COLOR;
  }

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  function drawPartner() {
    ctx.beginPath();
    ctx.rect(partnerX, partnerY, PLAYER_SIZE, PLAYER_SIZE);
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
    // gameDebugger();
    partnerCollisionDetection();
    canvasCollisionDetection();
    movePartner();
    requestAnimationFrame(draw);
  }

  draw();
})();
