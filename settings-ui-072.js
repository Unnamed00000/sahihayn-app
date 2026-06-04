(function(){
  const T={
    ru:{settings:'Настройки',installGuide:'Инструкция по установке приложения',openGuide:'Открыть инструкцию',shareApp:'Поделиться приложением',forceUpdate:'Форс обновление',shareText:'Сахихайн — Сахих аль-Бухари и Сахих Муслим в одном приложении',copied:'Ссылка скопирована',close:'Закрыть',language:'Язык приложения',theme:'Тема',themeBtn:'🌙 / ☀️ Переключить тему',light:'Светлая',dark:'Тёмная',sound:'Звук и вибрация',haptic:'Вибрация кнопок',touchSound:'Звуки при касании',voice:'Озвучивание хадисов',db:'База хадисов',feedback:'Обратная связь',feedbackText1:'Если что-то не работает, вы нашли ошибку или хотите предложить улучшение, свяжитесь с нами.',feedbackText2:'Мы рассматриваем сообщения и исправляем ошибки в новых обновлениях.',contactLabel:'Email для связи:',contactValue:'скоро появится',about:'О приложении',b:'Сахих аль-Бухари',m:'Сахих Муслим'},
    en:{settings:'Settings',installGuide:'App installation guide',openGuide:'Open guide',shareApp:'Share app',forceUpdate:'Force update',shareText:'Sahihayn — Sahih al-Bukhari and Sahih Muslim in one app',copied:'Link copied',close:'Close',language:'App language',theme:'Theme',themeBtn:'🌙 / ☀️ Toggle theme',light:'Light',dark:'Dark',sound:'Sound and vibration',haptic:'Button vibration',touchSound:'Touch sounds',voice:'Hadith voice reading',db:'Hadith database',feedback:'Feedback',feedbackText1:'If something does not work, you find an error, or want to suggest an improvement, please contact us.',feedbackText2:'We review messages and fix errors in new updates.',contactLabel:'Contact email:',contactValue:'coming soon',about:'About',b:'Sahih al-Bukhari',m:'Sahih Muslim'},
    ka:{settings:'პარამეტრები',installGuide:'აპლიკაციის დაყენების ინსტრუქცია',openGuide:'ინსტრუქციის გახსნა',shareApp:'აპლიკაციის გაზიარება',forceUpdate:'იძულებითი განახლება',shareText:'საჰიჰაინი — საჰიჰ ალ-ბუხარი და საჰიჰ მუსლიმი ერთ აპლიკაციაში',copied:'ბმული დაკოპირდა',close:'დახურვა',language:'აპლიკაციის ენა',theme:'თემა',themeBtn:'🌙 / ☀️ თემის შეცვლა',light:'ღია',dark:'მუქი',sound:'ხმა და ვიბრაცია',haptic:'ღილაკების ვიბრაცია',touchSound:'შეხების ხმა',voice:'ჰადისების გახმოვანება',db:'ჰადისების ბაზა',feedback:'უკუკავშირი',feedbackText1:'თუ რამე არ მუშაობს, შეცდომა იპოვეთ ან გაუმჯობესების შეთავაზება გსურთ, დაგვიკავშირდით.',feedbackText2:'ჩვენ განვიხილავთ შეტყობინებებს და ვასწორებთ შეცდომებს ახალ განახლებებში.',contactLabel:'საკონტაქტო ელფოსტა:',contactValue:'მალე დაემატება',about:'აპლიკაციის შესახებ',b:'საჰიჰ ალ-ბუხარი',m:'საჰიჰ მუსლიმი'},
    ar:{settings:'الإعدادات',installGuide:'دليل تثبيت التطبيق',openGuide:'فتح الدليل',shareApp:'مشاركة التطبيق',forceUpdate:'تحديث إجباري',shareText:'الصحيحان — صحيح البخاري وصحيح مسلم في تطبيق واحد',copied:'تم نسخ الرابط',close:'إغلاق',language:'لغة التطبيق',theme:'المظهر',themeBtn:'🌙 / ☀️ تغيير المظهر',light:'فاتح',dark:'داكن',sound:'الصوت والاهتزاز',haptic:'اهتزاز الأزرار',touchSound:'أصوات اللمس',voice:'قراءة الأحاديث صوتياً',db:'قاعدة الأحاديث',feedback:'التواصل',feedbackText1:'إذا كان هناك شيء لا يعمل، أو وجدت خطأً، أو أردت اقتراح تحسين، يرجى التواصل معنا.',feedbackText2:'نراجع الرسائل ونصلح الأخطاء في التحديثات الجديدة.',contactLabel:'البريد الإلكتروني للتواصل:',contactValue:'قريباً',about:'حول التطبيق',b:'صحيح البخاري',m:'صحيح مسلم'}
  };

  const APP_URL='https://unnamed00000.github.io/sahihayn-app/';
  let audioCtx=null;

  function lang(){return localStorage.getItem('sahihayn:lang')||'ru'}
  function tr(){return T[lang()]||T.ru}
  function on(k){return localStorage.getItem(k)!=='off'}
  function cnt(n){try{return typeof loadedBookCount==='function'?loadedBookCount(n):0}catch(e){return 0}}
  function total(n){try{return typeof EXPECTED==='object'&&EXPECTED[n]?EXPECTED[n]:(n==='bukhari'?7277:7368)}catch(e){return n==='bukhari'?7277:7368}}
  function brand(){return lang()==='en'?'Sahihayn':(lang()==='ka'?'საჰიჰაინი':(lang()==='ar'?'الصحيحان':'Сахихайн'))}
  function isLight(){return localStorage.getItem('sahihayn:theme')==='light'||document.body.classList.contains('light')}
  function setThemeMode(light){
    document.body.classList.toggle('light',!!light);
    localStorage.setItem('sahihayn:theme',light?'light':'dark');
  }
  function applyThemeMode(){document.body.classList.toggle('light',localStorage.getItem('sahihayn:theme')==='light')}
  window.setThemeMode=setThemeMode;

  window.forceUpdateSahihayn=async function(){
    try{if('caches'in window){const keys=await caches.keys();await Promise.all(keys.map(k=>caches.delete(k)));}}catch(e){}
    try{if(navigator.serviceWorker){const regs=await navigator.serviceWorker.getRegistrations();await Promise.all(regs.map(r=>r.update()));}}catch(e){}
    location.replace(location.pathname+'?force='+Date.now());
  }

  function playTouchSound(){
    if(!on('sahihayn:touchSound'))return;
    try{
      audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
      const osc=audioCtx.createOscillator();
      const gain=audioCtx.createGain();
      osc.type='sine';
      osc.frequency.value=650;
      gain.gain.setValueAtTime(0.045,audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.055);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime+0.06);
    }catch(e){}
  }

  document.addEventListener('click',function(e){
    if(e.target.closest('button,.bottom-nav button,.switch-row,select'))playTouchSound();
  },true);

  window.shareSahihaynApp=async function(){
    const d=tr();
    const text=d.shareText+'\n'+APP_URL;
    try{
      if(navigator.share){
        await navigator.share({title:brand(),text:d.shareText,url:APP_URL});
        return;
      }
      if(navigator.clipboard){
        await navigator.clipboard.writeText(text);
        alert(d.copied);
        return;
      }
    }catch(e){return;}
    prompt(d.copied,APP_URL);
  }

  window.openInstallGuide=function(){
    const d=tr();
    const old=document.getElementById('installGuideModal');
    if(old) old.remove();

    document.body.insertAdjacentHTML(
      'beforeend',
      '<div id="installGuideModal" style="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.94);display:flex;flex-direction:column;padding:14px;box-sizing:border-box">'+
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">'+
          '<b style="color:#f6d66b;font-size:18px">'+d.installGuide+'</b>'+
          '<button onclick="closeInstallGuide()" style="border:1px solid rgba(246,214,107,.55);background:#111;color:#f6d66b;border-radius:14px;padding:10px 14px;font:inherit">✕ '+d.close+'</button>'+
        '</div>'+
        '<div style="flex:1;overflow:auto;text-align:center;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y pinch-zoom">'+
          '<img src="images/install-guide.png?v=080" alt="'+d.installGuide+'" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 10px 40px rgba(0,0,0,.55)">'+
        '</div>'+
      '</div>'
    );
  }

  window.closeInstallGuide=function(){
    const m=document.getElementById('installGuideModal');
    if(m) m.remove();
  }

  function closeSettings(){try{state.page='home';render()}catch(e){try{setPage('home')}catch(_){try{home()}catch(__){}}}}
  window.closeSettings=closeSettings;

  function settings2(){
    const d=tr();
    app.innerHTML='<section class="screen settings-screen"><button class="settings-close" onclick="closeSettings()" aria-label="'+d.close+'">×</button><h2>'+d.settings+'</h2>'+ 
    '<article class="setting-card"><h3>📱 '+d.installGuide+'</h3><button class="gold-btn" onclick="openInstallGuide()">📱 '+d.openGuide+'</button><button class="gold-btn" onclick="shareSahihaynApp()" style="margin-top:10px">↗️ '+d.shareApp+'</button><button class="gold-btn" onclick="forceUpdateSahihayn()" style="margin-top:10px">⟳ '+d.forceUpdate+'</button></article>'+ 
    '<article class="setting-card"><h3>'+d.language+'</h3><div class="select-wrap"><select class="language-select styled-select" onchange="localStorage.setItem(\'sahihayn:lang\',this.value);render()"><option value="ru" '+(lang()==='ru'?'selected':'')+'>Русский</option><option value="en" '+(lang()==='en'?'selected':'')+'>English</option><option value="ka" '+(lang()==='ka'?'selected':'')+'>ქართული</option><option value="ar" '+(lang()==='ar'?'selected':'')+'>العربية</option></select></div></article>'+ 
    '<article class="setting-card"><h3>'+d.theme+'</h3><label class="theme-toggle"><span>'+d.dark+'</span><input type="checkbox" '+(isLight()?'checked':'')+' onchange="setThemeMode(this.checked)"><i></i><span>'+d.light+'</span></label></article>'+ 
    '<article class="setting-card"><h3>'+d.sound+'</h3><label class="switch-row"><span>'+d.haptic+'</span><input type="checkbox" '+(on('sahihayn:haptic')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:haptic\',this.checked?\'on\':\'off\')"><i></i></label><label class="switch-row"><span>'+d.voice+'</span><input type="checkbox" '+(on('sahihayn:voice')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:voice\',this.checked?\'on\':\'off\')"><i></i></label><label class="switch-row"><span>'+d.touchSound+'</span><input type="checkbox" '+(on('sahihayn:touchSound')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:touchSound\',this.checked?\'on\':\'off\')"><i></i></label></article>'+ 
    '<article class="setting-card"><h3>'+d.db+'</h3><p>'+d.b+': '+cnt('bukhari')+' / '+total('bukhari')+'</p><p>'+d.m+': '+cnt('muslim')+' / '+total('muslim')+'</p></article>'+ 
    '<article class="setting-card"><h3>'+d.feedback+':</h3><p>'+d.feedbackText1+'</p><p>'+d.feedbackText2+'</p><p class="muted"><b>'+d.contactLabel+'</b> '+d.contactValue+'</p></article>'+ 
    '<article class="setting-card" style="text-align:center"><h3>'+d.about+'</h3><h2>'+brand()+'</h2><p class="muted">Version 0.8.5</p><p>© 2026 Adam Margoev<br>All Rights Reserved</p></article></section>';
  }

  function hook(){if(typeof window.settings==='function')window.settings=settings2}
  applyThemeMode();
  document.addEventListener('DOMContentLoaded',function(){applyThemeMode();hook();});
  document.addEventListener('click',function(){setTimeout(hook,20)});
})();
