const LINKEDIN_URL = 'https://www.linkedin.com/in/vishnu-prasath-0352493b4/';

/* ─── CURSOR ─── */
const cur = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx=0, my=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
  setTimeout(()=>{ trail.style.left=mx+'px'; trail.style.top=my+'px'; }, 60);
});
document.querySelectorAll('a, button, .skill-card, .project-card, .linkedin-btn, .nav-monogram, .contact-btn, .scroll-hint').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cur.style.width='28px'; cur.style.height='28px'; });
  el.addEventListener('mouseleave',()=>{ cur.style.width='18px'; cur.style.height='18px'; });
});

/* ─── RAIN ─── */
const rainEl = document.getElementById('rain');
for(let i=0; i<120; i++){
  const d = document.createElement('div');
  d.className = 'drop';
  d.style.left = Math.random()*100 + 'vw';
  d.style.height = (55 + Math.random()*95) + 'px';
  d.style.animationDuration = (0.3 + Math.random()*0.65) + 's';
  d.style.animationDelay = (-Math.random()*2.5) + 's';
  d.style.opacity = (0.5 + Math.random()*0.45);
  d.style.width = (Math.random() > 0.6 ? '2px' : '1.5px');
  rainEl.appendChild(d);
}

/* ─── SCROLL PROGRESS ─── */
const prog = document.getElementById('progress');
window.addEventListener('scroll', ()=>{
  prog.style.width = (window.scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── SCROLL REVEAL ─── */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(!en.isIntersecting) return;
    const el = en.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(()=>{
      el.classList.add('visible');
      const bar = el.querySelector('.skill-bar');
      if(bar) bar.style.width = bar.dataset.width + '%';
      const num = el.querySelector('.stat-num');
      if(num) countUp(num, parseInt(num.dataset.target));
    }, delay);
    io.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.about-card, .skill-card, .project-card, .stat-box, .contact-wrap, .linkedin-card')
  .forEach(el => io.observe(el));

/* ─── COUNT UP ─── */
function countUp(el, target){
  let n=0; const step = Math.ceil(target/50);
  const t = setInterval(()=>{
    n = Math.min(n+step, target);
    el.textContent = n + (target===100 ? '%' : '');
    if(n >= target) clearInterval(t);
  }, 30);
}

/* ─── CONTACT TOGGLE ─── */
function toggleContact(){
  const p = document.getElementById('contactPanel');
  if(p.classList.contains('open')){
    p.classList.remove('show');
    setTimeout(()=>p.classList.remove('open'), 600);
  } else {
    p.classList.add('open');
    setTimeout(()=>p.classList.add('show'), 30);
  }
}

/* ─── HERO PARALLAX ─── */
const batsignal = document.querySelector('.batsignal-circle');
document.addEventListener('mousemove', e=>{
  const dx = (e.clientX/innerWidth - 0.5) * 22;
  const dy = (e.clientY/innerHeight - 0.5) * 22;
  if(batsignal) batsignal.style.transform = `translate(${dx}px,${dy}px)`;
});

/* ─── LINKEDIN REDIRECT ─── */
function goLinkedIn(){
  const overlay = document.getElementById('redirect-overlay');
  const bar = document.getElementById('redirect-bar');

  overlay.classList.add('show');
  requestAnimationFrame(()=> requestAnimationFrame(()=>{
    overlay.classList.add('visible');
    setTimeout(()=>{ bar.style.width = '100%'; }, 60);
    setTimeout(()=>{ window.open(LINKEDIN_URL, '_blank'); }, 2000);
    setTimeout(()=>{
      overlay.classList.remove('visible');
      setTimeout(()=>{
        overlay.classList.remove('show');
        bar.style.transition = 'none';
        bar.style.width = '0';
        setTimeout(()=>{ bar.style.transition = 'width 1.8s cubic-bezier(.4,0,.6,1)'; }, 100);
      }, 500);
    }, 2600);
  }));
}