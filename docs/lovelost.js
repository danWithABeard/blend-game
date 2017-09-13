(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      partnerRunSpeed = .05,
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
  u=d=l=r=0;onkeydown=onkeyup=e=>top['lurdl*d*l*ur*u'[(e.which+3)%20]]=e.type[3]<'u'

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

        if (partnerRunSpeed < 1) { partnerRunSpeed += .01; }
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL3NyYy9tYWluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG4gIC8qKiBDYW52YXMgc2V0dXAgKi9cbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpO1xuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgLyoqIFJlcXVpcmVkIEdhbWVwbGF5IFZhcmlhYmxlcyAqL1xuICB2YXIgcGFydG5lclggPSBjYW52YXMud2lkdGggLyAyLFxuICAgICAgcGFydG5lclkgPSBjYW52YXMuaGVpZ2h0IC8gMixcbiAgICAgIHBsYXllclggPSAzMCxcbiAgICAgIHBsYXllclkgPSAxMCxcbiAgICAgIHJlbGF0aW9uc2hpcFN0YXJ0ZWQgPSBmYWxzZSxcbiAgICAgIGNvbm5lY3RlZCA9IGZhbHNlLFxuICAgICAgcGFydG5lclJ1blNwZWVkID0gLjA1LFxuICAgICAgcmVsYXRpb25zaGlwVGltZWxpbmUgPSAwO1xuICAgICAgZmluYWxCcmVha1VwVGV4dCA9IG51bGwsXG4gICAgICBkaWZmWCA9IE1hdGguYWJzKHBsYXllclggLSBwYXJ0bmVyWCksXG4gICAgICBkaWZmWSA9IE1hdGguYWJzKHBsYXllclkgLSBwYXJ0bmVyWSk7XG5cbiAgLyoqIEdhbWVwbGF5IENvbnN0YW50cyAqL1xuICB2YXIgUExBWUVSX1NJWkUgPSAyMCxcbiAgICAgIFBMQVlFUl9NT1ZFX1NQRUVEID0gMSxcbiAgICAgIFBBUlRORVJfTU9WRV9TUEVFRCA9IDEuMjUsXG4gICAgICBPVkVSTEFQX0NPTE9SID0gJyNEREUwODQnLFxuICAgICAgUExBWUVSX0NPTE9SID0gJyM5MzkzOTMnLFxuICAgICAgUEFSVE5FUl9DT0xPUiA9ICcjMjJBOUQ1JyxcbiAgICAgIEdBTUVfT1ZFUl9DT0xPUiA9ICcjMTExMTExJztcblxuICAvKiogRW5kIEdhbWUgVGV4dCAqL1xuICB2YXIgYnJlYWt1cExpbmVzID0gW1xuICAgICdJIGp1c3QgbmVlZCBzb21lIHNwYWNlLicsXG4gICAgJ0l04oCZcyBub3QgeW91LCBpdOKAmXMgbWUuJyxcbiAgICAnTGV04oCZcyBzdGlsbCBiZSBmcmllbmRzLicsXG4gICAgJ0kgdGhpbmsgd2Ugc2hvdWxkIHNlZSBvdGhlciBwZW9wbGUuJyxcbiAgICAnSSBjYW7igJl0IG1ha2UgeW91IGhhcHB5LicsXG4gICAgJ0kgcmVhbGx5IGp1c3QgbmVlZCB0byB3b3JrIG9uIG15c2VsZi4nLFxuICAgICdJIGRvbuKAmXQgcmVhbGx5IHNlZSBhIGZ1dHVyZSB0b2dldGhlci4nXG4gIF07XG5cbiAgLyoqIEtleWJvYXJkIEV2ZW50IExpc3RlbmVycyBmb3IgV0FTRCwgWlFTRCwgb3IgQVJST1cga2V5cy4gVGhhbmtzLCBTdWJ6ZXkhIGh0dHBzOi8veGVtLmdpdGh1Yi5pby9hcnRpY2xlcy8janNnYW1lc2lucHV0cyovXG4gIHU9ZD1sPXI9MDtvbmtleWRvd249b25rZXl1cD1lPT50b3BbJ2x1cmRsKmQqbCp1cip1J1soZS53aGljaCszKSUyMF1dPWUudHlwZVszXTwndSdcblxuICBmdW5jdGlvbiBtb3ZlUGFydG5lcigpIHtcbiAgICBpZiAocmVsYXRpb25zaGlwU3RhcnRlZCAmJiAhciAmJiAhbCAmJiAhdSAmJiAhZCApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBzZXRCYWNrZ3JvdW5kQ29sb3IoR0FNRV9PVkVSX0NPTE9SKTtcblxuICAgICAgICBpZiAocGFydG5lclggPCBjYW52YXMud2lkdGggLyAyICYmIHBhcnRuZXJYID4gMCkge1xuICAgICAgICAgIHBhcnRuZXJYIC09IHBhcnRuZXJSdW5TcGVlZDtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJ0bmVyWCA+PSBjYW52YXMud2lkdGggLyAyICYmIHBhcnRuZXJYIDwgY2FudmFzLndpZHRoIC0gUExBWUVSX1NJWkUpIHtcbiAgICAgICAgICBwYXJ0bmVyWCArPSBwYXJ0bmVyUnVuU3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydG5lclkgPCBjYW52YXMuaGVpZ2h0IC8gMiAmJiBwYXJ0bmVyWSA+IDApIHtcbiAgICAgICAgICBwYXJ0bmVyWSAtPSBwYXJ0bmVyUnVuU3BlZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAocGFydG5lclkgPj0gY2FudmFzLmhlaWdodCAvIDIgJiYgcGFydG5lclkgPCBjYW52YXMuaGVpZ2h0IC0gUExBWUVSX1NJWkUpIHtcbiAgICAgICAgICBwYXJ0bmVyWSArPSBwYXJ0bmVyUnVuU3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydG5lclJ1blNwZWVkIDwgMSkgeyBwYXJ0bmVyUnVuU3BlZWQgKz0gLjAxOyB9XG4gICAgICB9LCAxNTAwKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hhbmdlIHBsYXllciBwb3NpdGlvbnMgaWYgdGhlIHBsYXllciBpcyBtb3ZpbmcgdGhlIHBsYXllciB3aXRoIHRoZSBrZXlib2FyZCAqL1xuICBmdW5jdGlvbiBjYW52YXNDb2xsaXNpb25EZXRlY3Rpb24oKSB7XG4gICAgaWYgKHIgJiYgcGxheWVyWCA8IGNhbnZhcy53aWR0aCAtIFBMQVlFUl9TSVpFKSB7XG4gICAgICBwbGF5ZXJYICs9IFBMQVlFUl9NT1ZFX1NQRUVEO1xuICAgICAgaWYgKGNvbm5lY3RlZCkge1xuICAgICAgICBwYXJ0bmVyWCArPSBQQVJUTkVSX01PVkVfU1BFRUQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGwgJiYgcGxheWVyWCA+IDApIHtcbiAgICAgIHBsYXllclggLT0gUExBWUVSX01PVkVfU1BFRUQ7XG4gICAgICBpZiAoY29ubmVjdGVkKSB7XG4gICAgICAgIHBhcnRuZXJYIC09IFBBUlRORVJfTU9WRV9TUEVFRDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodSAmJiBwbGF5ZXJZID4gMCkge1xuICAgICAgcGxheWVyWSAtPSBQTEFZRVJfTU9WRV9TUEVFRDtcbiAgICAgIGlmIChjb25uZWN0ZWQpIHtcbiAgICAgICAgcGFydG5lclkgLT0gUEFSVE5FUl9NT1ZFX1NQRUVEO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkICYmIHBsYXllclkgPCBjYW52YXMuaGVpZ2h0IC0gUExBWUVSX1NJWkUpIHtcbiAgICAgIHBsYXllclkgKz0gUExBWUVSX01PVkVfU1BFRUQ7XG4gICAgICBpZiAoY29ubmVjdGVkKSB7XG4gICAgICAgIHBhcnRuZXJZICs9IFBBUlRORVJfTU9WRV9TUEVFRDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaWZmWCA9IHBsYXllclggLSBwYXJ0bmVyWDtcbiAgICBkaWZmWSA9IHBsYXllclkgLSBwYXJ0bmVyWTtcblxuICAgIGlmICghY29ubmVjdGVkICYmIChwYXJ0bmVyWCA8IDAgfHwgcGFydG5lclggKyBQTEFZRVJfU0laRSA+IGNhbnZhcy53aWR0aCB8fCBwYXJ0bmVyWSA8IDAgfHwgcGFydG5lclkgKyBQTEFZRVJfU0laRSA+IGNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICBnYW1lT3ZlcigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnRuZXJDb2xsaXNpb25EZXRlY3Rpb24oKSB7XG4gICAgdmFyIG92ZXJsYXBYID0gUExBWUVSX1NJWkUgLSBNYXRoLmFicyhkaWZmWCk7XG4gICAgdmFyIG92ZXJsYXBZID0gUExBWUVSX1NJWkUgLSBNYXRoLmFicyhkaWZmWSk7XG5cbiAgICBpZiAoIGRpZmZYID49IDAgJiYgZGlmZlggPCBQTEFZRVJfU0laRSAmJiBkaWZmWSA+PSAwICYmIGRpZmZZIDwgUExBWUVSX1NJWkUgKSB7IC8qKiBQT1MgWCBQT1MgWSAqL1xuICAgICAgZHJhd092ZXJsYXAocGxheWVyWCwgcGxheWVyWSwgb3ZlcmxhcFgsIG92ZXJsYXBZKTtcbiAgICB9IGVsc2UgaWYgKGRpZmZYIDw9IDAgJiYgZGlmZlggPiAtUExBWUVSX1NJWkUgJiYgZGlmZlkgPj0gMCAmJiBkaWZmWSA8IFBMQVlFUl9TSVpFKSB7IC8qKiBORUcgWCBQT1MgWSAqL1xuICAgICAgZHJhd092ZXJsYXAocGxheWVyWCArIE1hdGguYWJzKGRpZmZYKSwgcGxheWVyWSwgb3ZlcmxhcFgsIG92ZXJsYXBZKTtcbiAgICB9IGVsc2UgaWYgKGRpZmZYID49IDAgJiYgZGlmZlggPCBQTEFZRVJfU0laRSAmJiBkaWZmWSA8PSAwICYmIGRpZmZZID4gLVBMQVlFUl9TSVpFKSB7IC8qKiBQT1MgWCBORUcgWSAqL1xuICAgICAgZHJhd092ZXJsYXAocGxheWVyWCwgcGxheWVyWSArIE1hdGguYWJzKGRpZmZZKSwgb3ZlcmxhcFgsIG92ZXJsYXBZKTtcbiAgICB9IGVsc2UgaWYgKGRpZmZYIDw9IDAgJiYgZGlmZlggPiAtUExBWUVSX1NJWkUgJiYgZGlmZlkgPD0gMCAmJiBkaWZmWSA+IC1QTEFZRVJfU0laRSkgeyAvKiogTkVHIFggTkVHIFkgKi9cbiAgICAgIGRyYXdPdmVybGFwKHBsYXllclggKyBNYXRoLmFicyhkaWZmWCksIHBsYXllclkgKyBNYXRoLmFicyhkaWZmWSksIG92ZXJsYXBYLCBvdmVybGFwWSk7XG4gICAgfVxuXG4gICAgaWYgKG92ZXJsYXBYID4gNCAmJiBvdmVybGFwWSA+IDQpIHtcbiAgICAgIGNvbm5lY3RlZCA9IHRydWU7XG4gICAgICBwYXJ0bmVyUnVuU3BlZWQgPSAwLjA1O1xuICAgICAgcmVsYXRpb25zaGlwU3RhcnRlZCA9IHRydWU7XG4gICAgICBzZXRCYWNrZ3JvdW5kQ29sb3IoT1ZFUkxBUF9DT0xPUik7XG4gICAgICByZWxhdGlvbnNoaXBUaW1lbGluZSsrO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGF0aW9uc2hpcF9fdGltZScpLnRleHRDb250ZW50ID0gTWF0aC5jZWlsKHJlbGF0aW9uc2hpcFRpbWVsaW5lIC8gMTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29ubmVjdGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2FtZURlYnVnZ2VyKCkge1xuICAgIGNvbnNvbGUubG9nKCdnYW1lRGVidWdnZXIgaXMgT04hJyk7XG4gICAgY3R4LmZvbnQgPSAnMTJweCBBcmlhbCc7XG4gICAgY3R4LmZpbGxTdHlsZSA9IE9WRVJMQVBfQ09MT1I7XG4gICAgY3R4LmZpbGxUZXh0KCdDb25uZWN0ZWQgJyArIGNvbm5lY3RlZCwgMjAsIDIwKTtcbiAgICBjdHguZmlsbFRleHQoJ1BsYXllcjogWCAnICsgcGxheWVyWCArICcgWSAnICsgcGxheWVyWSwgMjAsIDMyKTtcbiAgICBjdHguZmlsbFRleHQoJ1BhcnRuZXI6IFggJyArIHBhcnRuZXJYICsgJyBZICcgKyBwYXJ0bmVyWSwgMjAsIDQ0KTtcbiAgICBjdHguZmlsbFRleHQoJ2RpZmZYICcgKyBkaWZmWCwgMjAsIDU2KTtcbiAgICBjdHguZmlsbFRleHQoJ2RpZmZZICcgKyBkaWZmWSwgMjAsIDY4KTtcbiAgfVxuXG4gIC8qKiBSdW4gdGhlIGVuZCBnYW1lIHN0YXRlICovXG4gIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgZHJhd0VuZFRleHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEJhY2tncm91bmRDb2xvcihjb2xvcikge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gIH1cblxuICBmdW5jdGlvbiBwaWNrUmFuZG9tQnJlYWt1cExpbmUoKSB7XG4gICAgaWYgKCFmaW5hbEJyZWFrVXBUZXh0KSB7XG4gICAgICB2YXIgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKChicmVha3VwTGluZXMubGVuZ3RoIC0gMSkpKTtcbiAgICAgIGZpbmFsQnJlYWtVcFRleHQgPSBicmVha3VwTGluZXNbcmFuZG9tTnVtXTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbmFsQnJlYWtVcFRleHQ7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3RW5kVGV4dCgpIHtcbiAgICBjdHguZm9udCA9ICcxNnB4IEFyaWFsJztcbiAgICBjdHguZmlsbFN0eWxlID0gUEFSVE5FUl9DT0xPUjtcbiAgICBjdHguZmlsbFRleHQoIHBpY2tSYW5kb21CcmVha3VwTGluZSgpLCAyMCwgY2FudmFzLmhlaWdodCAvIDIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IEdBTUVfT1ZFUl9DT0xPUjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQbGF5ZXIoKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHBsYXllclgsIHBsYXllclksIFBMQVlFUl9TSVpFLCBQTEFZRVJfU0laRSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFBMQVlFUl9DT0xPUjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQYXJ0bmVyKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdChwYXJ0bmVyWCwgcGFydG5lclksIFBMQVlFUl9TSVpFLCBQTEFZRVJfU0laRSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFBBUlRORVJfQ09MT1I7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3T3ZlcmxhcCh4LCB5LCB3LCBoKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHgsIHksIHcsIGgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBPVkVSTEFQX0NPTE9SO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhdygpIHtcbiAgICBjbGVhckNhbnZhcygpO1xuICAgIGRyYXdQbGF5ZXIoKTtcbiAgICBkcmF3UGFydG5lcigpO1xuICAgIC8vIGdhbWVEZWJ1Z2dlcigpO1xuICAgIHBhcnRuZXJDb2xsaXNpb25EZXRlY3Rpb24oKTtcbiAgICBjYW52YXNDb2xsaXNpb25EZXRlY3Rpb24oKTtcbiAgICBtb3ZlUGFydG5lcigpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIGRyYXcoKTtcbn0pKCk7XG4iXX0=
