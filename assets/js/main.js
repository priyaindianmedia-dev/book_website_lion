(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

  /* ---------- generated fallback cover ---------- */
  function drawCover(b){
    var t=b.title, words=t.split(" "), lines=[], cur="";
    words.forEach(function(w){ if((cur+" "+w).trim().length>14){lines.push(cur.trim());cur=w}else cur+=" "+w }); lines.push(cur.trim());
    lines=lines.slice(0,5);
    var c=b.color||"#173B5C", y=150-(lines.length-1)*17;
    var tx=lines.map(function(l,i){return '<text x="100" y="'+(y+i*34)+'" text-anchor="middle" font-family="Georgia,serif" font-size="27" font-weight="700" fill="#fff">'+esc(l)+'</text>'}).join("");
    var sv='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c+'"/><stop offset="1" stop-color="#0f2940"/></linearGradient></defs><rect width="200" height="300" fill="url(#g)"/><rect x="0" y="0" width="10" height="300" fill="rgba(0,0,0,.25)"/><rect x="26" y="26" width="148" height="248" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>'+tx+'<line x1="70" y1="'+(y+lines.length*34)+'" x2="130" y2="'+(y+lines.length*34)+'" stroke="#E86B80" stroke-width="2"/><text x="100" y="262" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#f6d9de">'+esc((b.author||"Lion Leaf Publishing").slice(0,26))+'</text></svg>';
    return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(sv);
  }
  window.coverImg=function(b,cls){
    var first=b.local||b.remote||drawCover(b);
    return '<img class="'+(cls||"")+'" alt="Cover of '+esc(b.title)+'" loading="lazy" src="'+esc(first)+'" data-id="'+b.id+'" data-step="0">';
  };
  document.addEventListener("error",function(e){
    var im=e.target; if(!im||im.tagName!=="IMG"||!im.dataset.id) return;
    var b=BOOKS.filter(function(x){return x.id===im.dataset.id})[0]; if(!b) return;
    var st=+im.dataset.step;
    if(st===0&&b.local&&b.remote){im.dataset.step=1;im.classList.add("zoom");im.src=b.remote}
    else if(st<2){im.dataset.step=2;im.classList.remove("zoom");im.src=drawCover(b)}
  },true);

  window.bookCard=function(b){
    var tag=b.tag?'<span class="tag '+(b.tag==="new"?"new":"")+'">'+(b.tag==="spotlight"?"Spotlight":b.tag==="bestseller"?"Best seller":"New")+'</span>':"";
    var price=b.price?'<span class="price">'+esc(b.price)+'</span>':'<span class="price"><small>Ask for price</small></span>';
    return '<article class="book">'+tag+'<a class="cov" href="book.html#'+b.id+'" aria-label="View details for '+esc(b.title)+'">'+coverImg(b)+'</a><div class="bd"><span class="cat">'+esc(b.cat)+(b.sub2?" / "+esc(b.sub2):"")+'</span><h3><a href="book.html#'+b.id+'" style="color:inherit">'+esc(b.title)+'</a></h3>'+
      '<p class="by">'+esc(b.author||"Lion Leaf Publishing")+'</p><div class="row">'+price+'<a class="btn sm view" href="book.html#'+b.id+'">View Details</a></div></div></article>';
  };
  window.renderBooks=function(el,list){ if(el) el.innerHTML=list.length?list.map(bookCard).join(""):'<div class="empty">No books match your search. Try another title or category.</div>' };

  /* ---------- header: menu + dropdown ---------- */
  var mb=$(".menu-btn"), nav=$(".nav");
  if(mb){ mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)}) }
  $$(".has-dd>button").forEach(function(b){ b.addEventListener("click",function(){var p=b.parentNode,o=p.classList.toggle("open");b.setAttribute("aria-expanded",o)}) });
  document.addEventListener("click",function(e){ $$(".has-dd.open").forEach(function(d){ if(!d.contains(e.target)&&window.innerWidth>980){d.classList.remove("open")} }) });

  /* ---------- video modal ---------- */
  var modal=document.createElement("div"); modal.className="modal"; modal.setAttribute("role","dialog"); modal.setAttribute("aria-modal","true"); modal.setAttribute("aria-label","Video player");
  modal.innerHTML='<div class="box"><button class="x" aria-label="Close video">&times;</button><div class="ratio"></div><div class="cap"><b></b><a class="btn sm" target="_blank" rel="noopener" style="display:none">Watch on YouTube</a></div></div>';
  document.body.appendChild(modal);
  function closeModal(){modal.classList.remove("open");$(".ratio",modal).innerHTML=""}
  modal.addEventListener("click",function(e){if(e.target===modal||e.target.className==="x")closeModal()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal()});
  function openVideo(id){
    var v=VIDEOS[id]; if(!v) return; var r=$(".ratio",modal), a=$(".cap a",modal);
    $(".cap b",modal).textContent=v.title;
    if(v.yt){ r.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+esc(v.yt)+'?autoplay=1&rel=0'+(v.t?'&start='+v.t:'')+'" title="'+esc(v.title)+'" allow="accelerometer;autoplay;encrypted-media;picture-in-picture" allowfullscreen></iframe>'; a.href="https://www.youtube.com/watch?v="+v.yt+(v.t?"&t="+v.t+"s":""); a.style.display="" }
    else { r.innerHTML='<div class="msg"><div><h3 style="color:#fff">Video placeholder</h3><p>This slot is ready for a YouTube video. Add its ID to <b>assets/js/data.js</b> (VIDEOS &rarr; "'+esc(id)+'") and the player appears here.</p></div></div>'; a.style.display="none" }
    modal.classList.add("open"); $(".x",modal).focus();
  }
  window.videoCard=function(id){
    var v=VIDEOS[id]; if(!v) return "";
    var th=v.yt?'<img alt="" loading="lazy" src="https://i.ytimg.com/vi/'+esc(v.yt)+'/hqdefault.jpg">':(v.thumb?'<img alt="" src="'+esc(v.thumb)+'">':"");
    var ph=(v.yt||v.thumb)?"":'<span class="ph"><b>'+esc(v.title.length>44?v.title.slice(0,42)+"...":v.title)+'</b>Thumbnail placeholder</span>';
    return '<button type="button" class="vid" data-video="'+id+'"><span class="tn">'+th+ph+'<span class="play"></span></span><span class="info"><h3>'+esc(v.title)+'</h3><p>'+esc(v.desc)+'</p>'+(v.yt?"":'<span class="badge-ph">Placeholder - add YouTube ID</span>')+'</span></button>';
  };
  $$("[data-videos]").forEach(function(el){ el.innerHTML=el.dataset.videos.split(",").map(videoCard).join("") });
  document.addEventListener("click",function(e){ var b=e.target.closest&&e.target.closest("[data-video]"); if(b){ if(b.tagName==="A") e.preventDefault(); openVideo(b.dataset.video) } });

  /* ---------- reveal ---------- */
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.08});
    $$(".reveal").forEach(function(el){io.observe(el)});
  } else $$(".reveal").forEach(function(el){el.classList.add("in")});

  /* ---------- WhatsApp: forms + floating button ---------- */
  var WA="18339405296";
  function waUrl(t){ return "https://wa.me/"+WA+"?text="+encodeURIComponent(t) }
  function fieldLabel(el){ var l=el.id&&document.querySelector('label[for="'+el.id+'"]'); return l?l.textContent.trim():(el.name||"Field") }
  function formMessage(f){
    var page=document.body.dataset.page, head=page==="quote"?"New quote request - Lion Leaf Publishing":"New enquiry - Lion Leaf Publishing";
    var lines=[head,""];
    $$("input,select,textarea",f).forEach(function(el){
      if(el.type==="submit"||el.type==="hidden") return; var v=(el.value||"").trim();
      if(!v||(el.tagName==="SELECT"&&el.selectedIndex===0&&/^choose/i.test(el.options[0].text))) return;
      lines.push(fieldLabel(el)+": "+v) });
    return lines.join("\n");
  }
  $$("form[data-demo]").forEach(function(f){
    f.addEventListener("submit",function(e){ e.preventDefault();
      var m=$(".form-msg",f)||f.parentNode.querySelector(".form-msg");
      if(f.classList.contains("form")){
        var url=waUrl(formMessage(f)), w=window.open(url,"_blank"); if(w){ try{w.opener=null}catch(x){} }
        if(m){ m.innerHTML='Opening WhatsApp with your message. If it did not open, <a href="'+url+'" target="_blank" rel="noopener">tap here to send it on WhatsApp</a>.'; m.classList.add("show") }
        if(!w) window.location.href=url;
      } else if(m){ m.textContent=f.dataset.demo; m.classList.add("show") }
    });
  });
  var wa=document.createElement("a"); wa.className="wa-float"; wa.href=waUrl("Hello Lion Leaf Publishing, I would like to know more about your services."); wa.target="_blank"; wa.rel="noopener"; wa.setAttribute("aria-label","Chat with Lion Leaf Publishing on WhatsApp");
  wa.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#fff" d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.18 1.6 6L4 28l7.15-1.87a12 12 0 0 0 4.89 1.04C22.67 27.17 28 21.77 28 15.14 28 8.4 22.68 3 16.04 3zm0 22.1c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-4.24 1.1 1.13-4.13-.2-.32a9.9 9.9 0 0 1-1.52-5.28c0-5.5 4.5-9.97 10.04-9.97 5.52 0 10.02 4.47 10.02 9.97 0 5.5-4.5 9.97-9.98 9.97zm5.5-7.46c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35z"/></svg>';
  document.body.appendChild(wa);
  /* rail arrows: move by whole cards so snap lands on complete cards */
  function railStep(r){ var c=r.querySelector(".book"); if(!c) return r.clientWidth; var g=parseFloat(getComputedStyle(r).columnGap||getComputedStyle(r).gap)||0; var w=c.getBoundingClientRect().width+g; return Math.max(1,Math.round((r.clientWidth+g)/w))*w }
  $$(".rail-ctl button").forEach(function(b){ b.addEventListener("click",function(){ var r=document.getElementById(b.dataset.rail); r.scrollBy({left:(b.dataset.dir==="next"?1:-1)*railStep(r),behavior:"smooth"}) }) });
  $$(".rail-bar").forEach(function(bar){ var r=document.getElementById(bar.dataset.rail), f=bar.firstElementChild; if(!r||!f) return;
    function upd(){ var max=r.scrollWidth-r.clientWidth, vis=r.clientWidth/r.scrollWidth; f.style.width=(Math.max(vis,.12)*100)+"%"; f.style.marginLeft=(max>0?(r.scrollLeft/max)*(1-Math.max(vis,.12))*100:0)+"%" }
    r.addEventListener("scroll",upd,{passive:true}); window.addEventListener("resize",upd); setTimeout(upd,60); setTimeout(upd,600) });
})();
