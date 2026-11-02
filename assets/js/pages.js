(function(){
  var page=document.body.dataset.page, $=function(s){return document.querySelector(s)};
  function byId(id){return BOOKS.filter(function(b){return b.id===id})[0]}
  function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

  if(page==="home"){
    var priced=BOOKS.filter(function(b){return b.price});
    var spot=BOOKS.filter(function(b){return !b.price}).concat(priced);
    $("#featured").innerHTML=spot.map(bookCard).join("");
    var fan=["the-gospel-of-fury","red-right-returning","redeeming-the-dream"];
    ["f1","f2","f3"].forEach(function(c,i){ var b=byId(fan[i]); var el=$(".hero-stage ."+c); if(el&&b){ el.innerHTML=coverImg(b); el.href="book.html#"+b.id; el.setAttribute("aria-label",b.title) } });
  }

  if(page==="store"){
    var state={q:"",cat:"All",sort:"featured"};
    var cats=["All","Fiction","Non-Fiction","Children's Books","Educational","Religion","General"];
    var chips=$("#chips"); chips.innerHTML=cats.map(function(c){return '<button type="button" class="chip" data-cat="'+esc(c)+'">'+esc(c)+'</button>'}).join("");
    function apply(){
      var l=BOOKS.filter(function(b){
        var hay=(b.title+" "+b.sub+" "+b.author+" "+b.cat+" "+b.sub2+" "+b.desc).toLowerCase();
        return (state.cat==="All"||b.cat===state.cat||b.sub2===state.cat)&&(!state.q||hay.indexOf(state.q)>-1)});
      if(state.sort==="az") l.sort(function(a,b){return a.title.localeCompare(b.title)});
      if(state.sort==="new") l.sort(function(a,b){return b.added.localeCompare(a.added)});
      renderBooks($("#all"),l); $("#count").textContent=l.length+(l.length===1?" book":" books");
      Array.prototype.forEach.call(chips.children,function(c){c.classList.toggle("on",c.dataset.cat===state.cat)});
    }
    chips.addEventListener("click",function(e){var c=e.target.closest("[data-cat]"); if(c){state.cat=c.dataset.cat;apply()}});
    $("#q").addEventListener("input",function(e){state.q=e.target.value.trim().toLowerCase();apply()});
    $("#searchform").addEventListener("submit",function(e){e.preventDefault();document.getElementById("catalogue").scrollIntoView({behavior:"smooth"})});
    $("#sort").addEventListener("change",function(e){state.sort=e.target.value;apply()});
    renderBooks($("#sellers"),BOOKS.filter(function(b){return b.tag==="bestseller"||b.tag==="spotlight"}));
    renderBooks($("#arrivals"),BOOKS.slice().sort(function(a,b){return b.added.localeCompare(a.added)}).filter(function(b){return b.price}).slice(0,4));
    var h=decodeURIComponent(location.hash.slice(1)); if(h.indexOf("cat-")===0){state.cat=h.slice(4).replace(/-/g," ").replace(/\b\w/g,function(m){return m.toUpperCase()}).replace("Childrens","Children's").replace("Non Fiction","Non-Fiction")}
    apply();
  }

  if(page==="book"){
    function show(){
      var b=byId(decodeURIComponent(location.hash.slice(1)))||BOOKS[4];
      document.title=b.title+" | Lion Leaf Publishing";
      $("#bk-title").textContent=b.title; $("#bk-crumb").textContent=b.title;
      $("#bk-sub").textContent=b.sub||b.cat; $("#bk-cover").innerHTML=coverImg(b);
      $("#bk-meta").innerHTML=[["Author",b.author||"Lion Leaf Publishing"],["Category",b.cat+(b.sub2?" / "+b.sub2:"")],["Price",b.price||"Ask for price"],["Formats",b.price&&b.price.indexOf("-")>-1?"eBook and print":"See details"]].map(function(m){return '<div><small>'+m[0]+'</small><b>'+esc(m[1])+'</b></div>'}).join("");
      $("#bk-desc").textContent=b.desc;
      var o=$("#bk-order"); o.href="https://wa.me/18339405296?text="+encodeURIComponent("Hello Lion Leaf Publishing, I would like to enquire about this book:\n\nTitle: "+b.title+(b.sub?"\nSubtitle: "+b.sub:"")+(b.author?"\nAuthor: "+b.author:"")+"\nCategory: "+b.cat+(b.sub2?" / "+b.sub2:"")+"\nPrice: "+(b.price||"Ask for price")+"\n\nPlease share the details and ordering options."); o.target="_blank"; o.rel="noopener"; o.textContent="Enquire on WhatsApp";
      var rel=BOOKS.filter(function(x){return x.id!==b.id&&(x.cat===b.cat)}); if(rel.length<4) rel=rel.concat(BOOKS.filter(function(x){return x.id!==b.id&&rel.indexOf(x)<0}));
      renderBooks($("#related"),rel.slice(0,4));
    }
    show(); window.addEventListener("hashchange",function(){show();window.scrollTo({top:0,behavior:"smooth"})});
  }

  if(page==="quote"){
    var h2=decodeURIComponent(location.hash.slice(1)), b2=byId(h2);
    if(b2){ $("#book").value=b2.title; $("#service").value="Book Publishing"; $("#message").value="I'd like to ask about ordering \""+b2.title+"\"." }
    else if(h2){ var s=SERVICES.filter(function(x){return x.slug===h2})[0]; if(s) $("#service").value=s.title }
  }
})();
