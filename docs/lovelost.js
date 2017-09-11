(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL3NyYy9tYWluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcbiAgLyoqIENhbnZhcyBzZXR1cCAqL1xuICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215Q2FudmFzJyk7XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAvKiogUmVxdWlyZWQgR2FtZXBsYXkgVmFyaWFibGVzICovXG4gIHZhciBwbGF5ZXJTaXplID0gMjAsXG4gIHBhcnRuZXJYID0gY2FudmFzLndpZHRoIC8gMixcbiAgcGFydG5lclkgPSBjYW52YXMuaGVpZ2h0IC8gMixcbiAgcGxheWVyWCA9IDMwLFxuICBwbGF5ZXJZID0gMTAsXG4gIHJlbGF0aW9uc2hpcFN0YXJ0ZWQgPSBmYWxzZSxcbiAgY29ubmVjdGVkID0gZmFsc2UsXG4gIHBhcnRuZXJNb3ZlU3BlZWQgPSAxLjI1LFxuICBwbGF5ZXJNb3ZlU3BlZWQgPSAxLFxuICBwYXJ0bmVyUnVuU3BlZWQgPSAuMDU7XG5cbiAgdmFyIE9WRVJMQVBfQ09MT1IgPSAnI0U4NTQzRCcsIC8vMjMyLDg0LDYxXG4gICAgICBQTEFZRVJfQ09MT1IgPSAnIzIyQTlENScsXG4gICAgICBQQVJUTkVSX0NPTE9SID0gJyNEQkQ1NkUnLFxuICAgICAgQ1VSUkVOVF9CQUNLR1JPVU5EID0ge1xuICAgICAgICByZWQ6IDAsXG4gICAgICAgIGdyZWVuOiAxNDksXG4gICAgICAgIGJsdWU6IDIyMVxuICAgICAgfSxcbiAgICAgIEdPQUxfQkFDS0dST1VORCA9IHtcbiAgICAgICAgcmVkOiAwLFxuICAgICAgICBncmVlbjogMTQ5LFxuICAgICAgICBibHVlOiAyMjFcbiAgICAgIH1cbiAgICAgIEdBTUVfT1ZFUl9DT0xPUiA9ICcjMTExMTExJztcblxuICB2YXIgZGlmZlggPSBNYXRoLmFicyhwbGF5ZXJYIC0gcGFydG5lclgpO1xuICB2YXIgZGlmZlkgPSBNYXRoLmFicyhwbGF5ZXJZIC0gcGFydG5lclkpO1xuXG4gIC8qKiBLZXlib2FyZCBFdmVudCBMaXN0ZW5lcnMgZm9yIFdBU0QsIFpRU0QsIG9yIEFSUk9XIGtleXMgKi9cbiAgdT1kPWw9cj0wO29ua2V5ZG93bj1vbmtleXVwPWU9PnRvcFsnbHVyZGwqZCpsKnVyKnUnWyhlLndoaWNoKzMpJTIwXV09ZS50eXBlWzNdPCd1J1xuXG4gIGZ1bmN0aW9uIG1vdmVQYXJ0bmVyKCkge1xuICAgIGlmIChyZWxhdGlvbnNoaXBTdGFydGVkICYmIHIgPT09IGZhbHNlICYmIGwgPT09IGZhbHNlICYmIHUgPT09IGZhbHNlICYmIGQgPT09IGZhbHNlKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25uZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAocGFydG5lclggPCBjYW52YXMud2lkdGggLyAyICYmIHBhcnRuZXJYID4gMCkge1xuICAgICAgICAgIHBhcnRuZXJYIC09IHBhcnRuZXJSdW5TcGVlZDtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJ0bmVyWCA+PSBjYW52YXMud2lkdGggLyAyICYmIHBhcnRuZXJYIDwgY2FudmFzLndpZHRoIC0gcGxheWVyU2l6ZSkge1xuICAgICAgICAgIHBhcnRuZXJYICs9IHBhcnRuZXJSdW5TcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0bmVyWSA8IGNhbnZhcy5oZWlnaHQgLyAyICYmIHBhcnRuZXJZID4gMCkge1xuICAgICAgICAgIHBhcnRuZXJZIC09IHBhcnRuZXJSdW5TcGVlZDtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJ0bmVyWSA+PSBjYW52YXMuaGVpZ2h0IC8gMiAmJiBwYXJ0bmVyWSA8IGNhbnZhcy5oZWlnaHQgLSBwbGF5ZXJTaXplKSB7XG4gICAgICAgICAgcGFydG5lclkgKz0gcGFydG5lclJ1blNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnRuZXJSdW5TcGVlZCA8IDEpIHsgcGFydG5lclJ1blNwZWVkICs9IC4wMTsgfVxuICAgICAgfSwgMTUwMCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FudmFzQ29sbGlzaW9uRGV0ZWN0aW9uKCkge1xuICAgIC8qKiBDaGFuZ2UgcGxheWVyIHBvc2l0aW9ucyBpZiB0aGUgcGxheWVyIGlzIG1vdmluZyB0aGUgcGxheWVyIHdpdGggdGhlIGtleWJvYXJkICovXG4gICAgaWYgKHIgJiYgcGxheWVyWCA8IGNhbnZhcy53aWR0aCAtIHBsYXllclNpemUpIHtcbiAgICAgIHBsYXllclggKz0gMTtcbiAgICAgIGlmIChjb25uZWN0ZWQpIHtcbiAgICAgICAgcGFydG5lclggKz0gcGFydG5lck1vdmVTcGVlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobCAmJiBwbGF5ZXJYID4gMCkge1xuICAgICAgcGxheWVyWCAtPSAxO1xuICAgICAgaWYgKGNvbm5lY3RlZCkge1xuICAgICAgICBwYXJ0bmVyWCAtPSBwYXJ0bmVyTW92ZVNwZWVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1ICYmIHBsYXllclkgPiAwKSB7XG4gICAgICBwbGF5ZXJZIC09IDE7XG4gICAgICBpZiAoY29ubmVjdGVkKSB7XG4gICAgICAgIHBhcnRuZXJZIC09IHBhcnRuZXJNb3ZlU3BlZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGQgJiYgcGxheWVyWSA8IGNhbnZhcy5oZWlnaHQgLSBwbGF5ZXJTaXplKSB7XG4gICAgICBwbGF5ZXJZICs9IDE7XG4gICAgICBpZiAoY29ubmVjdGVkKSB7XG4gICAgICAgIHBhcnRuZXJZICs9IHBhcnRuZXJNb3ZlU3BlZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlmZlggPSBwbGF5ZXJYIC0gcGFydG5lclg7XG4gICAgZGlmZlkgPSBwbGF5ZXJZIC0gcGFydG5lclk7XG5cbiAgICBpZiAoIWNvbm5lY3RlZCAmJiAocGFydG5lclggPCAwIHx8IHBhcnRuZXJYICsgcGxheWVyU2l6ZSA+IGNhbnZhcy53aWR0aCB8fCBwYXJ0bmVyWSA8IDAgfHwgcGFydG5lclkgKyBwbGF5ZXJTaXplID4gY2FudmFzLmhlaWdodCkpIHtcbiAgICAgIGdhbWVPdmVyKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFydG5lckNvbGxpc2lvbkRldGVjdGlvbigpIHtcbiAgICB2YXIgb3ZlcmxhcFggPSBwbGF5ZXJTaXplIC0gTWF0aC5hYnMoZGlmZlgpO1xuICAgIHZhciBvdmVybGFwWSA9IHBsYXllclNpemUgLSBNYXRoLmFicyhkaWZmWSk7XG5cbiAgICBpZiAoIGRpZmZYID49IDAgJiYgZGlmZlggPCBwbGF5ZXJTaXplICYmIGRpZmZZID49IDAgJiYgZGlmZlkgPCBwbGF5ZXJTaXplICkgeyAvKiogUE9TIFggUE9TIFkgKi9cbiAgICAgIGRyYXdPdmVybGFwKHBsYXllclgsIHBsYXllclksIG92ZXJsYXBYLCBvdmVybGFwWSk7XG4gICAgfSBlbHNlIGlmIChkaWZmWCA8PSAwICYmIGRpZmZYID4gLXBsYXllclNpemUgJiYgZGlmZlkgPj0gMCAmJiBkaWZmWSA8IHBsYXllclNpemUpIHsgLyoqIE5FRyBYIFBPUyBZICovXG4gICAgICBkcmF3T3ZlcmxhcChwbGF5ZXJYICsgTWF0aC5hYnMoZGlmZlgpLCBwbGF5ZXJZLCBvdmVybGFwWCwgb3ZlcmxhcFkpO1xuICAgIH0gZWxzZSBpZiAoZGlmZlggPj0gMCAmJiBkaWZmWCA8IHBsYXllclNpemUgJiYgZGlmZlkgPD0gMCAmJiBkaWZmWSA+IC1wbGF5ZXJTaXplKSB7IC8qKiBQT1MgWCBORUcgWSAqL1xuICAgICAgZHJhd092ZXJsYXAocGxheWVyWCwgcGxheWVyWSArIE1hdGguYWJzKGRpZmZZKSwgb3ZlcmxhcFgsIG92ZXJsYXBZKTtcbiAgICB9IGVsc2UgaWYgKGRpZmZYIDw9IDAgJiYgZGlmZlggPiAtcGxheWVyU2l6ZSAmJiBkaWZmWSA8PSAwICYmIGRpZmZZID4gLXBsYXllclNpemUpIHsgLyoqIE5FRyBYIE5FRyBZICovXG4gICAgICBkcmF3T3ZlcmxhcChwbGF5ZXJYICsgTWF0aC5hYnMoZGlmZlgpLCBwbGF5ZXJZICsgTWF0aC5hYnMoZGlmZlkpLCBvdmVybGFwWCwgb3ZlcmxhcFkpO1xuICAgIH1cblxuICAgIGlmIChvdmVybGFwWCA+IDQgJiYgb3ZlcmxhcFkgPiA0KSB7XG4gICAgICBjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgcGFydG5lclJ1blNwZWVkID0gMC4wNTtcbiAgICAgIHJlbGF0aW9uc2hpcFN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgR09BTF9CQUNLR1JPVU5EID0ge1xuICAgICAgICByZWQ6IDIzMixcbiAgICAgICAgZ3JlZW46IDg0LFxuICAgICAgICBibHVlOiA2MVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnYW1lRGVidWdnZXIoKSB7XG4gICAgY29uc29sZS5sb2coJ2dhbWVEZWJ1Z2dlciBpcyBPTiEnKTtcbiAgICBjdHguZm9udCA9ICcxMnB4IEFyaWFsJztcbiAgICBjdHguZmlsbFN0eWxlID0gT1ZFUkxBUF9DT0xPUjtcbiAgICBjdHguZmlsbFRleHQoJ0Nvbm5lY3RlZCAnICsgY29ubmVjdGVkLCAyMCwgMjApO1xuICAgIGN0eC5maWxsVGV4dCgnUGxheWVyOiBYICcgKyBwbGF5ZXJYICsgJyBZICcgKyBwbGF5ZXJZLCAyMCwgMzIpO1xuICAgIGN0eC5maWxsVGV4dCgnUGFydG5lcjogWCAnICsgcGFydG5lclggKyAnIFkgJyArIHBhcnRuZXJZLCAyMCwgNDQpO1xuICAgIGN0eC5maWxsVGV4dCgnZGlmZlggJyArIGRpZmZYLCAyMCwgNTYpO1xuICAgIGN0eC5maWxsVGV4dCgnZGlmZlkgJyArIGRpZmZZLCAyMCwgNjgpO1xuICAgIGN0eC5maWxsVGV4dCgnQkdfUkVEICcgKyBDVVJSRU5UX0JBQ0tHUk9VTkQucmVkLCAyMCwgODApO1xuICAgIGN0eC5maWxsVGV4dCgnQkdfR1JFRU4gJyArIENVUlJFTlRfQkFDS0dST1VORC5ncmVlbiwgMjAsIDkyKTtcbiAgICBjdHguZmlsbFRleHQoJ0JHX0JMVUUgJyArIENVUlJFTlRfQkFDS0dST1VORC5ibHVlLCAyMCwgMTA0KTtcbiAgfVxuXG4gIC8qKiBSdW4gdGhlIGVuZCBnYW1lIHN0YXRlICovXG4gIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgZHJhd0VuZFRleHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEJhY2tncm91bmRDb2xvcigpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoJyArIENVUlJFTlRfQkFDS0dST1VORC5yZWQgKyAnLCcgKyBDVVJSRU5UX0JBQ0tHUk9VTkQuZ3JlZW4gKyAnLCcgKyBDVVJSRU5UX0JBQ0tHUk9VTkQuYmx1ZSArICcpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhZGVCYWNrZ3JvdW5kQ29sb3IoKSB7XG4gICAgdmFyIHN0ZXBzID0gNTAsXG4gICAgICAgIGRyID0gKENVUlJFTlRfQkFDS0dST1VORC5yZWQgLSBHT0FMX0JBQ0tHUk9VTkQucmVkKSAvIHN0ZXBzLFxuICAgICAgICBkZyA9IChDVVJSRU5UX0JBQ0tHUk9VTkQuZ3JlZW4gLSBHT0FMX0JBQ0tHUk9VTkQuZ3JlZW4pIC8gc3RlcHMsXG4gICAgICAgIGRiID0gKENVUlJFTlRfQkFDS0dST1VORC5ibHVlIC0gR09BTF9CQUNLR1JPVU5ELmJsdWUpIC8gc3RlcHMsXG4gICAgICAgIGkgPSAwO1xuXG4gICAgQ1VSUkVOVF9CQUNLR1JPVU5ELnJlZCA9IE1hdGgucm91bmQoR09BTF9CQUNLR1JPVU5ELnJlZCArIGRyICogaSk7XG4gICAgQ1VSUkVOVF9CQUNLR1JPVU5ELmdyZWVuID0gTWF0aC5yb3VuZChHT0FMX0JBQ0tHUk9VTkQuZ3JlZW4gKyBkZyAqIGkpO1xuICAgIENVUlJFTlRfQkFDS0dST1VORC5ibHVlID0gTWF0aC5yb3VuZChHT0FMX0JBQ0tHUk9VTkQuYmx1ZSArIGRiICogaSk7XG5cbiAgICBzZXRCYWNrZ3JvdW5kQ29sb3IoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdFbmRUZXh0KCkge1xuICAgIGN0eC5mb250ID0gJzE2cHggQXJpYWwnO1xuICAgIGN0eC5maWxsU3R5bGUgPSBQQVJUTkVSX0NPTE9SO1xuICAgIGN0eC5maWxsVGV4dCgnXFwnVGlzIGJldHRlciB0byBoYXZlIGxvdmVkIGFuZCBsb3N0LCBUaGFuIG5ldmVyIHRvIGhhdmUgbG92ZWQgYXQgYWxsJywgMjAsIGNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQbGF5ZXIoKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHBsYXllclgsIHBsYXllclksIHBsYXllclNpemUsIHBsYXllclNpemUpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBQTEFZRVJfQ09MT1I7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3UGFydG5lcigpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QocGFydG5lclgsIHBhcnRuZXJZLCBwbGF5ZXJTaXplLCBwbGF5ZXJTaXplKTtcbiAgICBjdHguZmlsbFN0eWxlID0gUEFSVE5FUl9DT0xPUjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdPdmVybGFwKHgsIHksIHcsIGgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IE9WRVJMQVBfQ09MT1I7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckNhbnZhcygpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3KCkge1xuICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgZHJhd1BsYXllcigpO1xuICAgIGRyYXdQYXJ0bmVyKCk7XG4gICAgZ2FtZURlYnVnZ2VyKCk7XG4gICAgcGFydG5lckNvbGxpc2lvbkRldGVjdGlvbigpO1xuICAgIGNhbnZhc0NvbGxpc2lvbkRldGVjdGlvbigpO1xuICAgIG1vdmVQYXJ0bmVyKCk7XG4gICAgZmFkZUJhY2tncm91bmRDb2xvcigpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIGRyYXcoKTtcbn0pKCk7XG4iXX0=
