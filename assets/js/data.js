/* Local front-end data. Nothing here talks to the live Lion Leaf site.
   COVERS: drop image files into assets/img/books/ using the "local" names below.
   If a local file is missing the page tries "remote" (the original cover URL), then draws a typographic cover. */
var WP = "https://lionleafpublishing.com/wp-content/uploads/";
var BOOKS = [
  {id:"an-eye-for-a-tooth", title:"An Eye For A Tooth", sub:"Five Short Stories About Justice", author:"", cat:"Fiction", sub2:"Adventure", price:"$10.99", added:"2023-12-12", tag:"new",
   local:"assets/img/books/eye.png", remote:WP+"2023/12/1702335081-300x300.png", color:"#6b7280",
   desc:"Five short stories exploring justice, consequence and what people are willing to trade for fairness. A quick, thought-provoking read for fans of short fiction."},
  {id:"a-pound-of-butter", title:"A Pound of Butter", sub:"", author:"", cat:"General", sub2:"", price:"$10.99", added:"2023-12-12", tag:"new",
   local:"assets/img/books/butter.png", remote:WP+"2023/12/1702335054-300x300.png", color:"#b8860b",
   desc:"A Lion Leaf Publishing title now in the book store. Ask us for the full synopsis, available formats and ordering options."},
  {id:"the-almighty-dollar", title:"The Almighty Dollar", sub:"A Psychiatrist Looks at Money (Paperback)", author:"Eugene L. Longenecker, M.D.", cat:"Educational", sub2:"", price:"$14.99", added:"2023-10-24",
   local:"assets/img/books/dollar.png", remote:WP+"2023/10/1698255632-300x300.png", color:"#1d4f91",
   desc:"A psychiatrist's look at how money shapes thinking, relationships and behaviour. Educational reading for anyone curious about the psychology behind the dollar."},
  {id:"the-healing-and-the-miracles-of-christ", title:"The Healing and The Miracles of Christ", sub:"", author:"", cat:"Religion", sub2:"", price:"$2.99 - $19.99", added:"2023-10-07",
   local:"assets/img/books/healing.png", remote:WP+"2023/10/1696676126-300x300.png", color:"#c98ca0",
   desc:"A faith-centred title reflecting on the healings and miracles in the life of Christ. Available in several formats; the price range covers eBook to print."},
  {id:"loving-from-distance", title:"Loving from Distance", sub:"", author:"Betty Wilson", cat:"Fiction", sub2:"Romance", price:"$2.99 - $25.00", added:"2023-10-08", tag:"bestseller",
   local:"assets/img/books/loving.png", remote:WP+"2023/10/1696748512-300x300.png", color:"#6b4a3a",
   desc:"A love story of Brenna Smaller and James Williams, from childhood into adulthood in the suburbs of North Atlanta. They face controversy, but with God at the centre of her life, Brenna stays focused and trusts they will remain a Christian couple."},
  {id:"spoken-meditation-from-the-heart", title:"Spoken Meditation from the Heart", sub:"", author:"", cat:"Religion", sub2:"Inspirational", price:"$3.99 - $8.00", added:"2023-10-07",
   local:"assets/img/books/spoken.png", remote:WP+"2023/10/1696665713-300x300.png", color:"#3b6b8a",
   desc:"A collection of reflective, prayerful meditations written to be read slowly. Available as an affordable eBook or in print."},
  {id:"carson-goes-to-the-dentist", title:"Carson Goes to the Dentist", sub:"", author:"", cat:"Children's Books", sub2:"", price:"$5.99 - $15.00", added:"2023-10-07",
   local:"assets/img/books/carson.png", remote:WP+"2023/10/1696660875-300x300.png", color:"#5b8aa6",
   desc:"A friendly picture-book story that helps young readers feel at ease about their first trips to the dentist."},
  {id:"quimbys-quandary", title:"Quimby's Quandary", sub:"A Psychiatrist's Journey", author:"", cat:"Fiction", sub2:"Adventure", price:"$2.99 - $18.99", added:"2023-09-17",
   local:"assets/img/books/quimby.png", remote:WP+"2023/10/1694939100-300x300.png", color:"#2f5d3a",
   desc:"An adventure story that follows a man on a long, reflective journey. Available in eBook and print."},
  {id:"the-journey-of-a-catholic", title:"The Journey of a Catholic", sub:"", author:"", cat:"Religion", sub2:"", price:"$2.99 - $19.99", added:"2023-09-04",
   local:"assets/img/books/catholic.png", remote:WP+"2023/10/1693849177-1024x785-1-300x300.png", color:"#8a5a3a",
   desc:"A personal account of a life of Catholic faith. Available in eBook and print."},
  {id:"the-gospel-of-fury", title:"The Gospel of Fury", sub:"The World of Make Believe", author:"Ignatius Benjamin Fury", cat:"Fiction", sub2:"", price:"", added:"2023-08-01", tag:"spotlight",
   desc:"Fourth edition (2023). Featured on the Lion Leaf Publishing home page. Contact us for details and pricing.", local:"assets/img/books/gospel.png", full:1, color:"#4a2a14"},
  {id:"red-right-returning", title:"Red Right Returning", sub:"", author:"John G. Werner, II", cat:"Fiction", sub2:"", price:"", added:"2023-08-01", tag:"spotlight",
   desc:"Featured on the Lion Leaf Publishing home page. Contact us for details and pricing.", local:"assets/img/books/red.png", full:1, color:"#1f2937"},
  {id:"redeeming-the-dream", title:"Redeeming the Dream", sub:"The Rise of Black Americans from Slavery to Presidency", author:"Nat Sowah", cat:"Non-Fiction", sub2:"", price:"", added:"2023-08-01", tag:"spotlight",
   desc:"Featured on the Lion Leaf Publishing home page. Contact us for details and pricing.", local:"assets/img/books/redeeming.png", full:1, color:"#8b6f47"}
];

/* Videos. Add a YouTube video ID (the part after v=) to "yt" and the thumbnail + embed switch on automatically. */
var VIDEOS = {
  "vincent":{title:"Vincent Radio Interview with Benji Cole", desc:"Vincent J. Tomeo discusses his book The Usefulness of Hippopotamus.", yt:"YWguCFlwPsk", thumb:"assets/img/ph/interview-hippo.jpg", from:"Lion Leaf Press"},
  "mosley":{title:"Living Life with Blinders On: A Book by Dr. Julius Mosley", desc:"A book trailer produced by Lion Leaf Publishing.", yt:"UP4OVoKYhFI", t:77, thumb:"assets/img/ph/trailer-cross.jpg", from:"Lion Leaf Publishing"},
  "int2":{title:"Author interview, episode 2", desc:"Placeholder for the next People of Distinction author interview.", yt:"", ph:1},
  "int3":{title:"Author interview, episode 3", desc:"Placeholder for another author interview.", yt:"", ph:1},
  "trl2":{title:"Cinematic Teaser sample", desc:"Placeholder for a 30-second teaser trailer.", yt:"", ph:1},
  "trl3":{title:"Cinematic Professional sample", desc:"Placeholder for a 90-second professional trailer.", yt:"", ph:1},
  "rad1":{title:"Radio interview sample", desc:"Placeholder for a recorded 30-minute radio interview.", yt:"", thumb:"assets/img/ph/radio-mic.jpg", ph:1},
  "rad2":{title:"Radio interview highlights", desc:"Placeholder for an interview highlight reel.", yt:"", thumb:"assets/img/ph/radio-mic.jpg", ph:1},
  "aud1":{title:"Audiobook sample", desc:"Placeholder for a narrated audiobook sample.", yt:"", ph:1},
  "aud2":{title:"Behind the microphone", desc:"Placeholder for a narration session clip.", yt:"", ph:1},
  "scr1":{title:"From page to screen", desc:"Placeholder for a screenplay development overview.", yt:"", ph:1},
  "prs1":{title:"How an online press release travels", desc:"Placeholder for a press release explainer.", yt:"", ph:1}
};

var SERVICES = [
  {slug:"book-publishing", page:"book-publishing.html", title:"Book Publishing", icon:"book", desc:"Editing, design and publishing support that takes a manuscript to a finished book."},
  {slug:"audio-book", page:"audio-book.html", title:"Audio Book", icon:"headphones", desc:"Turn your book into an audiobook for listeners on the move."},
  {slug:"screen-play", page:"screen-play.html", title:"Screen Play", icon:"film", desc:"Adapt your story into a screenplay with proper structure and format."},
  {slug:"book-fairs", page:"book-fairs.html", title:"Book Fairs", icon:"calendar", desc:"Put your book in front of readers at book fairs and events."},
  {slug:"facebook-ads", page:"facebook-advertising.html", title:"Facebook Ads", icon:"megaphone", desc:"Targeted social campaigns that send readers to your book page."},
  {slug:"radio-interview", page:"radio-interview.html", title:"Radio Interview", icon:"mic", desc:"Live, recorded and archived 30-minute radio interviews."},
  {slug:"screen-writing", page:"screen-writing.html", title:"Screen Writing", icon:"pen", desc:"Original scripts and adaptations written for film and video."},
  {slug:"online-publishing", page:"online-publishing.html", title:"Online Publishing", icon:"pin", desc:"Get your book listed and discoverable on the major online stores."},
  {slug:"press-release", page:"web-press-release.html", title:"Press Release", icon:"globe", desc:"Online, PPC and targeted press release distribution."},
  {slug:"web-design", page:"web-design.html", title:"Web Design", icon:"layout", desc:"Clean, responsive websites designed around your brand."},
  {slug:"targeted-media", page:"targeted-media.html", title:"Targeted Media", icon:"target", desc:"Reach reviewers, reporters and readers who care about your genre."},
  {slug:"website", page:"author-website.html", title:"Author Website", icon:"monitor", desc:"A personal website with a purchase button linked to your book."},
  {slug:"book-trailer", page:"cinematic-book-trailers.html", title:"Book Trailer", icon:"play", desc:"Cinematic trailers of 30, 60 or 90 seconds with voice over."}
];
