(function(){
  const T={
    ru:{title:'Сборник хадисов',b:'Сахих аль-Бухари',m:'Сахих Муслим',h:'хадисов'},
    en:{title:'Hadith Collection',b:'Sahih al-Bukhari',m:'Sahih Muslim',h:'hadiths'},
    ka:{title:'ჰადისების კრებული',b:'საჰიჰ ალ-ბუხარი',m:'საჰიჰ მუსლიმი',h:'ჰადისი'},
    ar:{title:'مجموعة الأحاديث',b:'صحيح البخاري',m:'صحيح مسلم',h:'حديث'}
  };
  function lang(){return localStorage.getItem('sahihayn:lang')||'ru'}
  function tr(){return T[lang()]||T.ru}
  function count(c){try{return typeof bookCount==='function'?bookCount(c):(c==='bukhari'?7275:7563)}catch(e){return c==='bukhari'?7275:7563}}
  function hero(){const d=tr();return '<div class="hero-card"><h2 class="hero-main-title">'+d.title+'</h2><div class="hero-line"><span>✦</span></div><div class="hero-books"><div>'+d.b+'</div><div>'+d.m+'</div></div><div class="hero-line"><span>✦</span></div><div class="hero-stats"><div>'+d.b+': '+count('bukhari')+' '+d.h+'</div><div>'+d.m+': '+count('muslim')+' '+d.h+'</div></div></div>'}
  function patch(){
    if(window.__heroHomePatched)return;
    if(typeof window.home==='function'&&typeof window.coverCard==='function'){
      window.home=function(){app.innerHTML='<section class="screen">'+hero()+'<div class="books">'+coverCard('bukhari')+coverCard('muslim')+'</div></section>'};
      window.__heroHomePatched=true;
      if(typeof state==='object'&&state.page==='home')window.home();
    }
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(patch,50)});
  document.addEventListener('click',function(){setTimeout(patch,30)});
  window.addEventListener('storage',function(){if(typeof state==='object'&&state.page==='home')setTimeout(function(){home()},30)});
})();