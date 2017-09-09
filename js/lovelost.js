(function() {
  /** Canvas */
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  /** player */
  var playerSize = 20,
  partnerX = canvas.width / 2,
  partnerY = canvas.height / 2,
  playerX = 30,
  playerY = 10,
  rightPressed = false,
  leftPressed = false,
  upPressed = false,
  downPressed = false,
  relationshipStarted = false,
  connected = false;

  /** Keyboard Event Listeners */
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.keyCode == '39') {
      rightPressed = true;
    } else if (e.keyCode == '37') {
      leftPressed = true;
    } else if (e.keyCode == '38') {
      upPressed = true;
    } else if (e.keyCode == '40') {
      downPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == '39') {
      rightPressed = false;
    } else if (e.keyCode == '37') {
      leftPressed = false;
    } else if (e.keyCode == '38') {
      upPressed = false;
    } else if (e.keyCode == '40') {
      downPressed = false;
    }
  }

  function movePartner() {
    if (relationshipStarted && rightPressed === false && leftPressed === false && upPressed === false && downPressed === false) {
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
    /** Change player positions if the player is moving the player with the keyboard or mouse */
    if (rightPressed && playerX < canvas.width - playerSize) {
      playerX += 1;
      if (connected) {
        partnerX +=1.25;
      }
    }

    if (leftPressed && playerX > 0) {
      playerX -= 1;
      if (connected) {
        partnerX -=1.25;
      }
    }

    if (upPressed && playerY > 0) {
      playerY -= 1;
      if (connected) {
        partnerY -=1.25;
      }
    }

    if (downPressed && playerY < canvas.height - playerSize) {
      playerY += 1;
      if (connected) {
        partnerY +=1.25;
      }
    }

    if (!connected && (partnerX < 0 || partnerX + playerSize > canvas.width || partnerY < 0 || partnerY + playerSize > canvas.height)) {
      gameOver();
    }
  }

  function partnerCollisionDetection() {
    if (playerX > partnerX && playerY > partnerY && playerX < partnerX + playerSize && playerY < partnerY + playerSize) {
      // console.log('top left');
      drawOverlap(playerX, playerY, 5, 5);
      relationshipStarted = true;
    } else if (playerX + playerSize > partnerX && playerY > partnerY && playerX + playerSize < partnerX + playerSize && playerY < partnerY + playerSize) {
      // console.log('top right');
      drawOverlap(playerX + playerSize - 5, playerY, 5, 5);
      relationshipStarted = true;
    } else if (playerX + playerSize > partnerX && playerY + playerSize > partnerY && playerX + playerSize < partnerX + playerSize && playerY + playerSize < partnerY + playerSize) {
      // console.log('bottom right');
      drawOverlap(playerX + playerSize - 5, playerY + playerSize - 5, 5, 5);
      relationshipStarted = true;
    } else if (playerX > partnerX && playerY + playerSize > partnerY && playerX < partnerX + playerSize && playerY + playerSize < partnerY + playerSize) {
      // console.log('bottom left');
      drawOverlap(playerX, playerY + playerSize - 5, 5, 5);
      relationshipStarted = true;
    } else {
      connected = false;
    }



    var diffX = Math.abs(playerX - partnerX);
    var diffY = Math.abs(playerY - partnerY);

    if ( diffX > 4 && diffX < playerSize && diffY > 4 && diffY < playerSize) {
      connected = true;
    }
  }

  function gameDebugger() {
    console.log('player coordinates are ')
  }

  /** Run the end game state */
  function gameOver() {
    alert('\'Tis better to have loved and lost, Than never to have loved at all');
    document.location.reload();
  }

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerSize, playerSize);
    ctx.fillStyle = '#111111';
    ctx.fill();
    ctx.closePath();
  }

  function drawPartner() {
    ctx.beginPath();
    ctx.rect(partnerX, partnerY, playerSize, playerSize);
    ctx.fillStyle = '#336699';
    ctx.fill();
    ctx.closePath();
  }

  function drawOverlap(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = '#ff0000';
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
