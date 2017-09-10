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
  playerMoveSpeed = 1;

  var diffX = Math.abs(playerX - partnerX);
  var diffY = Math.abs(playerY - partnerY);

  /** Keyboard Event Listeners for WASD, ZQSD, or ARROW keys */
  u=d=l=r=0;onkeydown=onkeyup=e=>top['lurdl*d*l*ur*u'[(e.which+3)%20]]=e.type[3]<'u'

  function movePartner() {
    if (relationshipStarted && r === false && l === false && u === false && d === false) {
      setTimeout(function() {
        connected = false;

        if (partnerX < canvas.width / 2 && partnerX > 0) {
          partnerX -= 1;
        } else if (partnerX >= canvas.width / 2 && partnerX < canvas.width - playerSize) {
          partnerX += 1;
        }

        if (partnerY < canvas.height / 2 && partnerY > 0) {
          partnerY -=1;
        } else if (partnerY >= canvas.height / 2 && partnerY < canvas.height - playerSize) {
          partnerY +=1;
        }
      }, 500);
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
      relationshipStarted = true;
      document.body.style.backgroundColor = '#E8543D';
    } else {
      connected = false;
    }
  }

  function gameDebugger() {
    console.log('gameDebugger is ON!');
    ctx.font = '12px Arial';
    ctx.fillStyle = '#FE5F55';
    ctx.fillText('Connected ' + connected, 20, 20);
    ctx.fillText('Player: X ' + playerX + ' Y ' + playerY, 20, 32);
    ctx.fillText('Partner: X ' + partnerX + ' Y ' + partnerY, 20, 44);
    ctx.fillText('diffX ' + diffX, 20, 56);
    ctx.fillText('diffY ' + diffY, 20, 68);
  }

  /** Run the end game state */
  function gameOver() {
    clearCanvas();
    // fadeOutCanvas(238, 238, 238);
    drawEndText();
  }

  function fadeOutCanvas(r,g,b) {
    var steps = 50, dr = (17 - r) / steps, dg = (17 - g) / steps, db = (17 - b) / steps, i = 0,
        interval = setInterval(function() {
          color = 'rgb(' + Math.round(r + dr * i) + ',' + Math.round(g + dg * i) + ',' + Math.round(b + db * i) + ')';

          document.getElementById('myCanvas').style.backgroundColor = color;

          i++;

          if (i === steps) {
            clearInterval(interval);
          }
        }, 30);
  }

  function drawEndText() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('\'Tis better to have loved and lost, Than never to have loved at all', 20, canvas.height / 2);
  }

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerSize, playerSize);
    ctx.fillStyle = '#22A9D5';
    ctx.fill();
    ctx.closePath();
  }

  function drawPartner() {
    ctx.beginPath();
    ctx.rect(partnerX, partnerY, playerSize, playerSize);
    ctx.fillStyle = '#DBD56E';
    ctx.fill();
    ctx.closePath();
  }

  function drawOverlap(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = '#E8543D';
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
