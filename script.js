const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
if(menu&&links){menu.addEventListener('click',()=>links.classList.toggle('open'));links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))}

const nav=document.querySelector('.nav');
const updateNav=()=>{if(nav)nav.classList.toggle('scrolled',window.scrollY>18)};
window.addEventListener('scroll',updateNav,{passive:true});updateNav();

// Scroll reveal + staggered motion across every page.
const motionTargets=[
  '.page-hero .container','.hero-grid','.trust','.section-head','.cards','.solution-grid','.process','.equip-grid','.stats','.split','.checklist','.faq','.contact-grid','.cta-box','.footer-grid'
];
motionTargets.forEach(sel=>document.querySelectorAll(sel).forEach((el,i)=>{
  if(el.classList.contains('cards')||el.classList.contains('solution-grid')||el.classList.contains('process')||el.classList.contains('equip-grid')||el.classList.contains('stats')||el.classList.contains('checklist')) el.classList.add('stagger');
  else el.classList.add('reveal');
}));

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}});
},{threshold:.12,rootMargin:'0px 0px -45px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger').forEach(el=>observer.observe(el));

// Small pointer parallax for the hero dashboard.
const visual=document.querySelector('.hero-visual');
if(visual&&window.matchMedia('(pointer:fine)').matches){
 visual.addEventListener('pointermove',e=>{
  const r=visual.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  visual.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*4}deg) translateY(-4px)`;
 });
 visual.addEventListener('pointerleave',()=>{visual.style.transform=''});
}

// Count-up animation for stat/metric values that begin with a number.
const countEls=[...document.querySelectorAll('.stat b,.metric b')];
const countObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target, raw=el.textContent.trim();
  const m=raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if(!m){countObserver.unobserve(el);return;}
  const end=parseFloat(m[1]), suffix=m[2], duration=1000, start=performance.now();
  const tick=now=>{const p=Math.min((now-start)/duration,1), eased=1-Math.pow(1-p,3);el.textContent=(Number.isInteger(end)?Math.round(end*eased):((end*eased).toFixed(1)))+suffix;if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);countObserver.unobserve(el);
 });
},{threshold:.7});
countEls.forEach(el=>countObserver.observe(el));

const form=document.getElementById('enquiryForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Shubham Tech and IT Solutions,%0A%0AName: ${d.get('name')}%0ACompany: ${d.get('company')}%0APhone: ${d.get('phone')}%0AEmail: ${d.get('email')}%0AService: ${d.get('service')}%0AMessage: ${d.get('message')}`;window.open('https://wa.me/916263462048?text='+msg,'_blank')})}


// Screenshot-style header: highlight the current page and provide a simple search focus.
(()=>{
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 document.querySelectorAll('.screenshot-links a').forEach(a=>{
   const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
   if(href===current || (current==='' && href==='index.html')) a.classList.add('active');
 });
 const search=document.querySelector('.screenshot-search');
 if(search){search.addEventListener('click',()=>{
   const target=document.querySelector('main input, .form input, input[type="search"], textarea');
   if(target){target.scrollIntoView({behavior:'smooth',block:'center'});target.focus();}
   else window.location.href='contact.html';
 });}
})();
