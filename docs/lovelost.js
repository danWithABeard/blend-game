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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL3NyYy9tYWluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAvKiogQ2FudmFzIHNldHVwICovXG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKTtcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIC8qKiBSZXF1aXJlZCBHYW1lcGxheSBWYXJpYWJsZXMgKi9cbiAgdmFyIHBsYXllclNpemUgPSAyMCxcbiAgcGFydG5lclggPSBjYW52YXMud2lkdGggLyAyLFxuICBwYXJ0bmVyWSA9IGNhbnZhcy5oZWlnaHQgLyAyLFxuICBwbGF5ZXJYID0gMzAsXG4gIHBsYXllclkgPSAxMCxcbiAgcmVsYXRpb25zaGlwU3RhcnRlZCA9IGZhbHNlLFxuICBjb25uZWN0ZWQgPSBmYWxzZSxcbiAgcGFydG5lck1vdmVTcGVlZCA9IDEuMjUsXG4gIHBsYXllck1vdmVTcGVlZCA9IDE7XG5cbiAgdmFyIGRpZmZYID0gTWF0aC5hYnMocGxheWVyWCAtIHBhcnRuZXJYKTtcbiAgdmFyIGRpZmZZID0gTWF0aC5hYnMocGxheWVyWSAtIHBhcnRuZXJZKTtcblxuICAvKiogS2V5Ym9hcmQgRXZlbnQgTGlzdGVuZXJzIGZvciBXQVNELCBaUVNELCBvciBBUlJPVyBrZXlzICovXG4gIHU9ZD1sPXI9MDtvbmtleWRvd249b25rZXl1cD1lPT50b3BbJ2x1cmRsKmQqbCp1cip1J1soZS53aGljaCszKSUyMF1dPWUudHlwZVszXTwndSdcblxuICBmdW5jdGlvbiBtb3ZlUGFydG5lcigpIHtcbiAgICBpZiAocmVsYXRpb25zaGlwU3RhcnRlZCAmJiByID09PSBmYWxzZSAmJiBsID09PSBmYWxzZSAmJiB1ID09PSBmYWxzZSAmJiBkID09PSBmYWxzZSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHBhcnRuZXJYIDwgY2FudmFzLndpZHRoIC8gMiAmJiBwYXJ0bmVyWCA+IDApIHtcbiAgICAgICAgICBwYXJ0bmVyWCAtPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnRuZXJYID49IGNhbnZhcy53aWR0aCAvIDIgJiYgcGFydG5lclggPCBjYW52YXMud2lkdGggLSBwbGF5ZXJTaXplKSB7XG4gICAgICAgICAgcGFydG5lclggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0bmVyWSA8IGNhbnZhcy5oZWlnaHQgLyAyICYmIHBhcnRuZXJZID4gMCkge1xuICAgICAgICAgIHBhcnRuZXJZIC09MTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJ0bmVyWSA+PSBjYW52YXMuaGVpZ2h0IC8gMiAmJiBwYXJ0bmVyWSA8IGNhbnZhcy5oZWlnaHQgLSBwbGF5ZXJTaXplKSB7XG4gICAgICAgICAgcGFydG5lclkgKz0xO1xuICAgICAgICB9XG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbnZhc0NvbGxpc2lvbkRldGVjdGlvbigpIHtcbiAgICAvKiogQ2hhbmdlIHBsYXllciBwb3NpdGlvbnMgaWYgdGhlIHBsYXllciBpcyBtb3ZpbmcgdGhlIHBsYXllciB3aXRoIHRoZSBrZXlib2FyZCAqL1xuICAgIGlmIChyICYmIHBsYXllclggPCBjYW52YXMud2lkdGggLSBwbGF5ZXJTaXplKSB7XG4gICAgICBwbGF5ZXJYICs9IDE7XG4gICAgICBpZiAoY29ubmVjdGVkKSB7XG4gICAgICAgIHBhcnRuZXJYICs9IHBhcnRuZXJNb3ZlU3BlZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGwgJiYgcGxheWVyWCA+IDApIHtcbiAgICAgIHBsYXllclggLT0gMTtcbiAgICAgIGlmIChjb25uZWN0ZWQpIHtcbiAgICAgICAgcGFydG5lclggLT0gcGFydG5lck1vdmVTcGVlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodSAmJiBwbGF5ZXJZID4gMCkge1xuICAgICAgcGxheWVyWSAtPSAxO1xuICAgICAgaWYgKGNvbm5lY3RlZCkge1xuICAgICAgICBwYXJ0bmVyWSAtPSBwYXJ0bmVyTW92ZVNwZWVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkICYmIHBsYXllclkgPCBjYW52YXMuaGVpZ2h0IC0gcGxheWVyU2l6ZSkge1xuICAgICAgcGxheWVyWSArPSAxO1xuICAgICAgaWYgKGNvbm5lY3RlZCkge1xuICAgICAgICBwYXJ0bmVyWSArPSBwYXJ0bmVyTW92ZVNwZWVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRpZmZYID0gcGxheWVyWCAtIHBhcnRuZXJYO1xuICAgIGRpZmZZID0gcGxheWVyWSAtIHBhcnRuZXJZO1xuXG4gICAgaWYgKCFjb25uZWN0ZWQgJiYgKHBhcnRuZXJYIDwgMCB8fCBwYXJ0bmVyWCArIHBsYXllclNpemUgPiBjYW52YXMud2lkdGggfHwgcGFydG5lclkgPCAwIHx8IHBhcnRuZXJZICsgcGxheWVyU2l6ZSA+IGNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICBnYW1lT3ZlcigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnRuZXJDb2xsaXNpb25EZXRlY3Rpb24oKSB7XG4gICAgdmFyIG92ZXJsYXBYID0gcGxheWVyU2l6ZSAtIE1hdGguYWJzKGRpZmZYKTtcbiAgICB2YXIgb3ZlcmxhcFkgPSBwbGF5ZXJTaXplIC0gTWF0aC5hYnMoZGlmZlkpO1xuXG4gICAgaWYgKCBkaWZmWCA+PSAwICYmIGRpZmZYIDwgcGxheWVyU2l6ZSAmJiBkaWZmWSA+PSAwICYmIGRpZmZZIDwgcGxheWVyU2l6ZSApIHsgLyoqIFBPUyBYIFBPUyBZICovXG4gICAgICBkcmF3T3ZlcmxhcChwbGF5ZXJYLCBwbGF5ZXJZLCBvdmVybGFwWCwgb3ZlcmxhcFkpO1xuICAgIH0gZWxzZSBpZiAoZGlmZlggPD0gMCAmJiBkaWZmWCA+IC1wbGF5ZXJTaXplICYmIGRpZmZZID49IDAgJiYgZGlmZlkgPCBwbGF5ZXJTaXplKSB7IC8qKiBORUcgWCBQT1MgWSAqL1xuICAgICAgZHJhd092ZXJsYXAocGxheWVyWCArIE1hdGguYWJzKGRpZmZYKSwgcGxheWVyWSwgb3ZlcmxhcFgsIG92ZXJsYXBZKTtcbiAgICB9IGVsc2UgaWYgKGRpZmZYID49IDAgJiYgZGlmZlggPCBwbGF5ZXJTaXplICYmIGRpZmZZIDw9IDAgJiYgZGlmZlkgPiAtcGxheWVyU2l6ZSkgeyAvKiogUE9TIFggTkVHIFkgKi9cbiAgICAgIGRyYXdPdmVybGFwKHBsYXllclgsIHBsYXllclkgKyBNYXRoLmFicyhkaWZmWSksIG92ZXJsYXBYLCBvdmVybGFwWSk7XG4gICAgfSBlbHNlIGlmIChkaWZmWCA8PSAwICYmIGRpZmZYID4gLXBsYXllclNpemUgJiYgZGlmZlkgPD0gMCAmJiBkaWZmWSA+IC1wbGF5ZXJTaXplKSB7IC8qKiBORUcgWCBORUcgWSAqL1xuICAgICAgZHJhd092ZXJsYXAocGxheWVyWCArIE1hdGguYWJzKGRpZmZYKSwgcGxheWVyWSArIE1hdGguYWJzKGRpZmZZKSwgb3ZlcmxhcFgsIG92ZXJsYXBZKTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcmxhcFggPiA0ICYmIG92ZXJsYXBZID4gNCkge1xuICAgICAgY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgIHJlbGF0aW9uc2hpcFN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0U4NTQzRCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbWVEZWJ1Z2dlcigpIHtcbiAgICBjb25zb2xlLmxvZygnZ2FtZURlYnVnZ2VyIGlzIE9OIScpO1xuICAgIGN0eC5mb250ID0gJzEycHggQXJpYWwnO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI0ZFNUY1NSc7XG4gICAgY3R4LmZpbGxUZXh0KCdDb25uZWN0ZWQgJyArIGNvbm5lY3RlZCwgMjAsIDIwKTtcbiAgICBjdHguZmlsbFRleHQoJ1BsYXllcjogWCAnICsgcGxheWVyWCArICcgWSAnICsgcGxheWVyWSwgMjAsIDMyKTtcbiAgICBjdHguZmlsbFRleHQoJ1BhcnRuZXI6IFggJyArIHBhcnRuZXJYICsgJyBZICcgKyBwYXJ0bmVyWSwgMjAsIDQ0KTtcbiAgICBjdHguZmlsbFRleHQoJ2RpZmZYICcgKyBkaWZmWCwgMjAsIDU2KTtcbiAgICBjdHguZmlsbFRleHQoJ2RpZmZZICcgKyBkaWZmWSwgMjAsIDY4KTtcbiAgfVxuXG4gIC8qKiBSdW4gdGhlIGVuZCBnYW1lIHN0YXRlICovXG4gIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgLy8gZmFkZU91dENhbnZhcygyMzgsIDIzOCwgMjM4KTtcbiAgICBkcmF3RW5kVGV4dCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmFkZU91dENhbnZhcyhyLGcsYikge1xuICAgIHZhciBzdGVwcyA9IDUwLCBkciA9ICgxNyAtIHIpIC8gc3RlcHMsIGRnID0gKDE3IC0gZykgLyBzdGVwcywgZGIgPSAoMTcgLSBiKSAvIHN0ZXBzLCBpID0gMCxcbiAgICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb2xvciA9ICdyZ2IoJyArIE1hdGgucm91bmQociArIGRyICogaSkgKyAnLCcgKyBNYXRoLnJvdW5kKGcgKyBkZyAqIGkpICsgJywnICsgTWF0aC5yb3VuZChiICsgZGIgKiBpKSArICcpJztcblxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuXG4gICAgICAgICAgaSsrO1xuXG4gICAgICAgICAgaWYgKGkgPT09IHN0ZXBzKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDMwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdFbmRUZXh0KCkge1xuICAgIGN0eC5mb250ID0gJzE2cHggQXJpYWwnO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwOTVERCc7XG4gICAgY3R4LmZpbGxUZXh0KCdcXCdUaXMgYmV0dGVyIHRvIGhhdmUgbG92ZWQgYW5kIGxvc3QsIFRoYW4gbmV2ZXIgdG8gaGF2ZSBsb3ZlZCBhdCBhbGwnLCAyMCwgY2FudmFzLmhlaWdodCAvIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1BsYXllcigpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QocGxheWVyWCwgcGxheWVyWSwgcGxheWVyU2l6ZSwgcGxheWVyU2l6ZSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMjJBOUQ1JztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQYXJ0bmVyKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdChwYXJ0bmVyWCwgcGFydG5lclksIHBsYXllclNpemUsIHBsYXllclNpemUpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI0RCRDU2RSc7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3T3ZlcmxhcCh4LCB5LCB3LCBoKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHgsIHksIHcsIGgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI0U4NTQzRCc7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckNhbnZhcygpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3KCkge1xuICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgZHJhd1BsYXllcigpO1xuICAgIGRyYXdQYXJ0bmVyKCk7XG4gICAgLy8gZ2FtZURlYnVnZ2VyKCk7XG4gICAgcGFydG5lckNvbGxpc2lvbkRldGVjdGlvbigpO1xuICAgIGNhbnZhc0NvbGxpc2lvbkRldGVjdGlvbigpO1xuICAgIG1vdmVQYXJ0bmVyKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgZHJhdygpO1xufSkoKTtcbiJdfQ==
