(function(){
var d=document,root=d.documentElement;root.classList.add('js');
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
try{if(CSS.supports('backdrop-filter','url(#lente)')&&/Chrome\//.test(navigator.userAgent)&&!/Mobile/.test(navigator.userAgent))root.classList.add('lens')}catch(e){}
/* aberto agora (horário de Brasília) */
var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),g={};p.forEach(function(x){g[x.type]=x.value});
var dias={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},dia=dias[g.weekday],min=(+g.hour%24)*60+(+g.minute);
var fim=dia===0?0:dia===6?900:1080,aberto=dia!==0&&min>=450&&min<fim;
var st=d.getElementById('status');
if(st){st.classList.toggle('on',aberto);st.lastElementChild.textContent=aberto?'Aberto agora':(dia===0?'Fechado hoje, abre segunda às 7h30':'Fechado agora')}
d.querySelectorAll('#horas li').forEach(function(li){if(li.dataset.d.split(',').indexOf(String(dia))>-1)li.classList.add('hoje')});
/* mapa só no toque */
var b=d.getElementById('abrir-mapa');
if(b)b.addEventListener('click',function(){var f=d.createElement('iframe');f.src=b.dataset.src;f.title='Mapa da Nathália Salgados';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';b.parentNode.appendChild(f);b.remove()});
if(RM||!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
if(window.Lenis){var l=new Lenis({lerp:.1});l.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){l.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
/* 1. toldo cai ao abrir */
gsap.from('.toldo',{yPercent:-100,duration:1.1,ease:'bounce.out'});
gsap.from('.hero .glass',{y:40,opacity:0,duration:.9,delay:.5,ease:'power3.out'});
/* 2. parallax da foto */
gsap.to('.hero .bg',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
/* 3. troca de fotos fixas */
var im=d.querySelectorAll('.stage img');
if(im.length>1&&matchMedia('(min-width:860px)').matches){var tl=gsap.timeline({scrollTrigger:{trigger:'.sobre .txt',start:'top 55%',end:'bottom 60%',scrub:true}});tl.to(im[1],{opacity:1,duration:1})}
else if(im.length>1){ScrollTrigger.create({trigger:'.stage',start:'top 60%',once:true,onEnter:function(){gsap.to(im[1],{opacity:1,duration:1.2})}})}
})();
