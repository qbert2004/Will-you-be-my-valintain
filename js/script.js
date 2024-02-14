const audio = new Audio('music/Love.mp3');
const muteButton = document.getElementById('mute-button');
muteButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    muteButton.textContent = 'Mute';
  } else {
    audio.pause();
    muteButton.textContent = 'Unmute';
  }
});
document.addEventListener('DOMContentLoaded', () => {
audio.play();
});
const wrapper = document.querySelector(".wrapper");
  const question = document.querySelector(".question");
  const gif = document.querySelector(".gif");
  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");
  
  yesBtn.addEventListener("click", () => {
  question.innerHTML = "Aaaa, Im happest person";
  gif.src =" https://raw.githubusercontent.com/DzarelDeveloper/Img/main/gif.webp";
  
  });
  noBtn.addEventListener("mouseover", () =>
  {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;
  const randomX = Math.floor(Math.random() *
  maxX);
  const randomY = Math.floor(Math.random() * maxY);
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomly + "px";
  });
  window.requestAnimationFrame = window.requestAnimationFrame || (function () {
  return function (callback, element) {
      var lastTime = element.__lastTime;
      if (lastTime === undefined) lastTime = 0;
      var currTime = Date.now();
      var timeToCall = Math.max(1, 33 - (currTime - lastTime));
      window.setTimeout(callback, timeToCall);
      element.__lastTime = currTime + timeToCall;
  };
})();
window.isDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test((navigator.userAgent || window.opera).toLowerCase());
var loaded = false;
var init = function () {
  if (loaded) return;
  loaded = true;
  var mobile = window.isDevice;
  var userDevice = mobile ? 0.5 : 1;
  var canvas = document.getElementById("chaotic-lines-heart");
  var ctx = canvas.getContext("2d");
  var width = (canvas.width = userDevice * innerWidth);
  var height = (canvas.height = userDevice * innerHeight);
  var ran = Math.random;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
  var heartPosition = function (rad) {
      return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
  };
  var scaleAndTranslate = function (pos, sx, sy, dx, dy) { return [dx + pos[0] * sx, dy + pos[1] * sy]; };
  window.addEventListener("resize", function () {
      width = canvas.width = userDevice * innerWidth;
      height = canvas.height = userDevice * innerHeight;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
  });
  var traceCount = mobile ? 20 : 50;
  var pointsOrigin = [];
  var i;
  var dr = mobile ? 0.3 : 0.1;
  for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
  for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
  for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
  var heartPointsCount = pointsOrigin.length;
  var targetPoints = [];
  var pulse = function (kx, ky) {
      for (i = 0; i < pointsOrigin.length; i++) {
          targetPoints[i] = [];
          targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
          targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
      }
  };
  var e = [];
  for (i = 0; i < heartPointsCount; i++) {
      var x = ran() * width;
      var y = ran() * height;
      e[i] = {
          vx: 0, vy: 0, R: 2, speed: ran() + 5, q: ~~(ran() * heartPointsCount), D: 2 * (i % 2) - 1, force: 0.25 * ran() + 0.75,
          f: "hsla(0, " + ~~(40 * ran() + 60) + "%, " + ~~(60 * ran() + 20) + "%, 0.5)", trace: []
      };
      for (var k = 0; k < traceCount; k++) e[i].trace[k] = { x: x, y: y };
  }
  var config = { traceK: 0.4, timeDelta: 0.01 };
  var time = 0;
  var loop = function () {
      var n = -Math.cos(time);
      pulse((1 + n) * 0.5, (1 + n) * 0.5);
      time += (Math.sin(time) < 0 ? 9 : n > 0.75 ? 0.25 : 1) * config.timeDelta;
      ctx.fillStyle = "#0000001a";
      ctx.fillRect(0, 0, width, height);
      for (i = e.length; i--;) {
          var u = e[i];
          var q = targetPoints[u.q];
          var dx = u.trace[0].x - q[0];
          var dy = u.trace[0].y - q[1];
          var length = Math.sqrt(dx * dx + dy * dy);
          if (10 > length) {
              if (0.95 < ran()) { u.q = ~~(ran() * heartPointsCount); } else {
                  if (0.99 < ran()) u.D *= -1;
                  u.q += u.D;
                  u.q %= heartPointsCount;
                  if (0 > u.q) u.q += heartPointsCount;
              }
          }
          u.vx += (-dx / length) * u.speed;
          u.vy += (-dy / length) * u.speed;
          u.trace[0].x += u.vx;
          u.trace[0].y += u.vy;
          u.vx *= u.force;
          u.vy *= u.force;
          for (k = 0; k < u.trace.length - 1;) {
              var T = u.trace[k];
              var N = u.trace[++k];
              N.x -= config.traceK * (N.x - T.x);
              N.y -= config.traceK * (N.y - T.y);
          }
          ctx.fillStyle = u.f;
          for (k = 0; k < u.trace.length; k++) ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
      }
      window.requestAnimationFrame(loop, canvas);
  };
  loop();
};
var s = document.readyState;
if (s === "complete" || s === "loaded" || s === "interactive") init();
else document.addEventListener("DOMContentLoaded", init, false);
