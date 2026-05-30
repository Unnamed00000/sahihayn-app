(function(){
  function lang(){return localStorage.getItem('sahihayn:lang')||'ru'}
  const text={
    ru:{title:'Сборник хадисов',b:'Сахих аль-Бухари',m:'Сахих Муслим',h:'хадисов'},
    en:{title:'Hadith Collection',b:'Sahih al-Bukhari',m:'Sahih Muslim',h:'hadiths'},
    ka:{title:'ჰადისების კრებული',b:'საჰიჰ ალ-ბუხარი',m:'საჰიჰ მუსლიმი',h:'ჰადისი'},
    ar:{title:'مجموعة الأحاديث',b:'صحيح البخاري',m:'صحيح مسلم',h:'حديث'}
  };
  function tr(){return text[lang()]||text.ru}
  function updateHero(){
    const hero=document.querySelector('.hero-card');
    if(!hero)return;
    const d=tr();
    const bCount=(typeof bookCount==='function')?bookCount('bukhari'):7275;
    const mCount=(typeof bookCount==='function')?bookCount('muslim'):7563;
    hero.innerHTML='<h2 class="hero-main-title">'+d.title+'</h2><div class="hero-line"><span>✦</span></div><div class="hero-books"><div>'+d.b+'</div><div>'+d.m+'</div></div><div class="hero-line"><span>✦</span></div><div class="hero-stats"><div>'+d.b+': '+bCount+' '+d.h+'</div><div>'+d.m+': '+mCount+' '+d.h+'</div></div>';
  }
  const originalHome=window.home;
  if(typeof originalHome==='function'){
    window.home=function(){originalHome();updateHero()};
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(updateHero,80)});
})();
