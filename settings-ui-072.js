(function(){
  const T={
    ru:{settings:'Настройки',language:'Язык приложения',theme:'Тема',themeBtn:'🌙 / ☀️ Переключить тему',sound:'Звук и вибрация',haptic:'Вибрация кнопок',voice:'Озвучивание хадисов',db:'База хадисов',about:'О приложении',b:'Сахих аль-Бухари',m:'Сахих Муслим'},
    en:{settings:'Settings',language:'App language',theme:'Theme',themeBtn:'🌙 / ☀️ Toggle theme',sound:'Sound and vibration',haptic:'Button vibration',voice:'Hadith voice reading',db:'Hadith database',about:'About',b:'Sahih al-Bukhari',m:'Sahih Muslim'},
    ka:{settings:'პარამეტრები',language:'აპლიკაციის ენა',theme:'თემა',themeBtn:'🌙 / ☀️ თემის შეცვლა',sound:'ხმა და ვიბრაცია',haptic:'ღილაკების ვიბრაცია',voice:'ჰადისების გახმოვანება',db:'ჰადისების ბაზა',about:'აპლიკაციის შესახებ',b:'საჰიჰ ალ-ბუხარი',m:'საჰიჰ მუსლიმი'},
    ar:{settings:'الإعدادات',language:'لغة التطبيق',theme:'المظهر',themeBtn:'🌙 / ☀️ تغيير المظهر',sound:'الصوت والاهتزاز',haptic:'اهتزاز الأزرار',voice:'قراءة الأحاديث صوتياً',db:'قاعدة الأحاديث',about:'حول التطبيق',b:'صحيح البخاري',m:'صحيح مسلم'}
  };
  function lang(){return localStorage.getItem('sahihayn:lang')||'ru'}
  function tr(){return T[lang()]||T.ru}
  function on(k){return localStorage.getItem(k)!=='off'}
  function cnt(n){try{return typeof loadedBookCount==='function'?loadedBookCount(n):0}catch(e){return 0}}
  function brand(){return lang()==='en'?'Sahihayn':(lang()==='ka'?'საჰიჰაინი':(lang()==='ar'?'الصحيحان':'Сахихайн'))}
  function settings2(){
    const d=tr();
    app.innerHTML='<section class="screen"><h2>'+d.settings+'</h2>'+
    '<article class="setting-card"><h3>'+d.language+'</h3><div class="select-wrap"><select class="language-select styled-select" onchange="localStorage.setItem(\'sahihayn:lang\',this.value);render()"><option value="ru" '+(lang()==='ru'?'selected':'')+'>Русский</option><option value="en" '+(lang()==='en'?'selected':'')+'>English</option><option value="ka" '+(lang()==='ka'?'selected':'')+'>ქართული</option><option value="ar" '+(lang()==='ar'?'selected':'')+'>العربية</option></select></div></article>'+
    '<article class="setting-card"><h3>'+d.theme+'</h3><button class="gold-btn" onclick="document.body.classList.toggle(\'light\')">'+d.themeBtn+'</button></article>'+
    '<article class="setting-card"><h3>'+d.sound+'</h3><label class="switch-row"><span>'+d.haptic+'</span><input type="checkbox" '+(on('sahihayn:haptic')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:haptic\',this.checked?\'on\':\'off\')"><i></i></label><label class="switch-row"><span>'+d.voice+'</span><input type="checkbox" '+(on('sahihayn:voice')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:voice\',this.checked?\'on\':\'off\')"><i></i></label></article>'+
    '<article class="setting-card"><h3>'+d.db+'</h3><p>'+d.b+': '+cnt('bukhari')+' / 7275</p><p>'+d.m+': '+cnt('muslim')+' / 7563</p></article>'+
    '<article class="setting-card" style="text-align:center"><h3>'+d.about+'</h3><h2>'+brand()+'</h2><p class="muted">Version 0.7.7</p><p>© 2026 Adam Margoev<br>All Rights Reserved</p></article></section>';
  }
  function hook(){if(typeof window.settings==='function')window.settings=settings2}
  document.addEventListener('DOMContentLoaded',hook);
  document.addEventListener('click',function(){setTimeout(hook,20)});
})();