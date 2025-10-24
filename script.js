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
    return { x: rand(0,innerWidth), y: init?rand(0,innerHeight):-rand(10,200), size:rand(6,18), speed:rand(1,4), angle:rand(0,Math.PI*2), spin:rand(-0.12,0.12), color:brightColor() };
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
    return { x: rand(0,innerWidth), y: innerHeight+rand(0,200), size: rand(10,28), speed: rand(0.6,1.6), angle: rand(0,Math.PI*2), spin: rand(-0.03,0.03) };
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
      const g = heartsCtx.createLinearGradient(0,-h.size,0,h.size);
      g.addColorStop(0,'rgba(255,140,180,0.95)');
      g.addColorStop(1,'rgba(255,80,140,0.8)');
      heartsCtx.fillStyle = g;
      drawHeartPath(heartsCtx,h.size);
      heartsCtx.fill();
      heartsCtx.restore();
    });
    requestAnimationFrame(updateHearts);
  }
  updateHearts();

  // popup button
  const popupBtn = document.getElementById('popupBtn');
  const wishText = document.querySelector('.wish-text').innerText.trim();
  popupBtn.addEventListener('click', ()=> {
    // small styled modal instead of alert
    const modal = document.createElement('div');
    modal.setAttribute('role','dialog');
    modal.style.position='fixed';
    modal.style.left=0; modal.style.top=0; modal.style.width='100%'; modal.style.height='100%';
    modal.style.display='grid'; modal.style.placeItems='center';
    modal.style.background='rgba(2,6,23,0.6)';
    modal.style.zIndex=9999;
    const box = document.createElement('div');
    box.style.maxWidth='720px'; box.style.width='90%';
    box.style.background='linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))';
    box.style.border='1px solid rgba(255,255,255,0.08)';
    box.style.padding='22px'; box.style.borderRadius='12px'; box.style.color='#fff';
    const p = document.createElement('pre');
    p.style.whiteSpace='pre-wrap'; p.style.fontFamily='inherit'; p.style.fontSize='1rem';
    p.innerText = wishText;
    const close = document.createElement('button');
    close.innerText='Close';
    close.style.marginTop='14px';
    close.style.padding='10px 14px';
    close.style.border='none';
    close.style.borderRadius='10px';
    close.style.background='linear-gradient(135deg,#ff66cc,#ff99bb)';
    close.style.cursor='pointer';
    close.onclick = ()=> document.body.removeChild(modal);
    box.appendChild(p); box.appendChild(close); modal.appendChild(box);
    document.body.appendChild(modal);
  });

})();
