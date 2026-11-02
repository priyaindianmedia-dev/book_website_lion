/* Home hero book carousel: swipe, mouse drag, arrows, dots, keyboard. */
(function(){
  var root=document.getElementById("hxSlider"); if(!root) return;
  var track=root.querySelector(".hx-track"), slides=track.children, n=slides.length;
  var dots=document.querySelectorAll(".hx-dots button"), count=document.querySelector(".hx-count");
  var i=0, startX=0, startY=0, dx=0, down=false, moved=false, locked=null, w=root.clientWidth;
  function set(px,anim){ track.classList.toggle("dragging",!anim); track.style.transform="translate3d("+(-i*w+px)+"px,0,0)" }
  function go(k){ i=(k+n)%n; dx=0; set(0,true); ui() }
  function ui(){ Array.prototype.forEach.call(dots,function(d,k){ d.classList.toggle("on",k===i); d.setAttribute("aria-selected",k===i) }); if(count) count.textContent=(i+1)+" / "+n;
    Array.prototype.forEach.call(slides,function(s,k){ s.setAttribute("aria-hidden",k===i?"false":"true"); Array.prototype.forEach.call(s.querySelectorAll("a"),function(a){ a.tabIndex=k===i?0:-1 }) }) }
  function resize(){ w=root.clientWidth; set(0,false); requestAnimationFrame(function(){track.classList.remove("dragging")}) }
  window.addEventListener("resize",resize);
  root.querySelector(".prev").addEventListener("click",function(e){e.stopPropagation();go(i-1)});
  root.querySelector(".next").addEventListener("click",function(e){e.stopPropagation();go(i+1)});
  Array.prototype.forEach.call(dots,function(d,k){ d.addEventListener("click",function(){go(k)}) });
  root.addEventListener("keydown",function(e){ if(e.key==="ArrowLeft"){go(i-1);e.preventDefault()} if(e.key==="ArrowRight"){go(i+1);e.preventDefault()} });

  function onDown(e){ if(e.target.closest(".hx-arrow")) return; if(e.pointerType==="mouse"&&e.button!==0) return; down=true; moved=false; locked=null; startX=e.clientX; startY=e.clientY; dx=0; w=root.clientWidth }
  function onMove(e){ if(!down) return; var mx=e.clientX-startX, my=e.clientY-startY;
    if(locked===null && (Math.abs(mx)>6||Math.abs(my)>6)) locked=Math.abs(mx)>Math.abs(my)?"x":"y";
    if(locked!=="x") return; moved=true; root.classList.add("drag");
    var edge=(i===0&&mx>0)||(i===n-1&&mx<0)?.35:1; dx=mx*edge; set(dx,false); if(e.cancelable) e.preventDefault() }
  function onUp(){ if(!down) return; down=false; root.classList.remove("drag");
    if(locked==="x"){ var th=Math.min(90,w*.15); if(dx<-th&&i<n-1) i++; else if(dx>th&&i>0) i--; }
    dx=0; set(0,true); ui() }
  root.addEventListener("pointerdown",onDown);
  window.addEventListener("pointermove",onMove,{passive:false});
  window.addEventListener("pointerup",onUp); window.addEventListener("pointercancel",onUp);
  /* a drag must not count as a click on the book link */
  root.addEventListener("click",function(e){ if(moved){ e.preventDefault(); e.stopPropagation(); moved=false } },true);
  root.addEventListener("dragstart",function(e){e.preventDefault()});
  ui(); set(0,false); requestAnimationFrame(function(){track.classList.remove("dragging")});
})();
