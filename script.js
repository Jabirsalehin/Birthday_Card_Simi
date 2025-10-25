// script.js - confetti + hearts + popup
(function(){
  // canvas setup
  const confettiCanvas = document.getElementById('confettiCanvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  const heartsCanvas = document.getElementById('heartsCanvas');
  const heartsCtx = heartsCanvas.getContext('2d');

  function fitCanvas(){
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
  }
  fitCanvas();
  window.addEventListener('resize', fitCanvas);

  // confetti
  const confettiCount = 120;
  const confettis = [];
  function rand(min,max){return Math.random()*(max-min)+min}
  function brightColor(){
    const r = Math.floor(rand(120,255));
    const g = Math.floor(rand(100,255));
    const b = Math.floor(rand(100,255));
    return `rgb(${r},${g},${b})`;
  }
  function createConfetti(init=true){
    return { 
      x: rand(0,innerWidth), 
      y: init?rand(0,innerHeight):-rand(10,200), 
      size:rand(6,18), 
      speed:rand(1,4), 
      angle:rand(0,Math.PI*2), 
      spin:rand(-0.12,0.12), 
      color:brightColor() 
    };
  }
  for(let i=0;i<confettiCount;i++) confettis.push(createConfetti(true));
  function updateConfetti(){
    confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettis.forEach(c=>{
      c.y += c.speed;
      c.angle += c.spin;
      c.x += Math.sin(c.angle)*1.4;
      if(c.y>innerHeight+30) Object.assign(c, createConfetti(false));
      confettiCtx.save();
      confettiCtx.translate(c.x+c.size/2,c.y+c.size/2);
      confettiCtx.rotate(c.angle*20);
      confettiCtx.fillStyle = c.color;
      confettiCtx.fillRect(-c.size/2,-c.size*0.3,c.size,c.size*0.6);
      confettiCtx.restore();
    });
    requestAnimationFrame(updateConfetti);
  }
  updateConfetti();

  // hearts
  const hearts = [];
  const heartCount = 20;
  function createHeart(){
    return { 
      x: rand(0,innerWidth), 
      y: innerHeight+rand(0,200), 
      size: rand(10,28), 
      speed: rand(0.6,1.6), 
      angle: rand(0,Math.PI*2), 
      spin: rand(-0.03,0.03) 
    };
  }
  for(let i=0;i<heartCount;i++) hearts.push(createHeart());
  function drawHeartPath(ctx, size){
    ctx.beginPath();
    const s = size;
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(-s/2,-s/2,-s,s/3,0,s);
    ctx.bezierCurveTo(s,-s/3,s/2,-s/2,0,0);
    ctx.closePath();
  }
  function updateHearts(){
    heartsCtx.clearRect(0,0,heartsCanvas.width,heartsCanvas.height);
    hearts.forEach(h=>{
      h.y -= h.speed;
      h.angle += h.spin;
      h.x += Math.sin(h.angle)*0.6;
      if(h.y < -60) Object.assign(h, createHeart());
      heartsCtx.save();
      heartsCtx.translate(h.x,h.y);
      heartsCtx.rotate(Math.sin(h.angle)*Math.PI/8);
      const g = heartsCtx.createLinearGradient(0,-h.size,0,h.size
