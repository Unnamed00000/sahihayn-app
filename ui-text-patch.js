(function(){
  const i18n={
    ru:{brand:'Сахихайн',hero:'Сахихайн',sub:'Сборник хадисов: Сахих аль-Бухари и Сахих Муслим',bukhari:'Сахих аль-Бухари',muslim:'Сахих Муслим'},
    en:{brand:'Sahihayn',hero:'Sahihayn',sub:'Hadith collection: Sahih al-Bukhari and Sahih Muslim',bukhari:'Sahih al-Bukhari',muslim:'Sahih Muslim'},
    ka:{brand:'საჰიჰაინი',hero:'საჰიჰაინი',sub:'ჰადისების კრებული: საჰიჰ ალ-ბუხარი და საჰიჰ მუსლიმი',bukhari:'საჰიჰ ალ-ბუხარი',muslim:'საჰიჰ მუსლიმი'},
    ar:{brand:'الصحيحان',hero:'الصحيحان',sub:'مجموعة الأحاديث: صحيح البخاري وصحيح مسلم',bukhari:'صحيح البخاري',muslim:'صحيح مسلم'}
  };
  function lang(){return localStorage.getItem('sahihayn:lang')||'ru'}
  function tr(){return i18n[lang()]||i18n.ru}
  function apply(){
    const d=tr();
    const brandTitle=document.querySelector('.brand h1');
    const brandSub=document.querySelector('.brand p');
    if(brandTitle) brandTitle.textContent=d.brand;
    if(brandSub){brandSub.textContent='';brandSub.style.display='none'}
    const hero=document.querySelector('.hero-card');
    if(hero){
      const h2=hero.querySelector('h2');
      const ps=hero.querySelectorAll('p');
      if(h2) h2.textContent=d.hero;
      if(ps[0] && !ps[0].classList.contains('muted')) ps[0].textContent=d.sub;
    }
    const cards=document.querySelectorAll('.cover-info h3');
    if(cards[0]) cards[0].textContent=d.bukhari;
    if(cards[1]) cards[1].textContent=d.muslim;
  }
  const observer=new MutationObserver(apply);
  document.addEventListener('DOMContentLoaded',()=>{
    apply();
    observer.observe(document.body,{childList:true,subtree:true});
  });
  window.addEventListener('storage',apply);
  setInterval(apply,800);
})();
