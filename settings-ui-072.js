(function(){
  const T={
    ru:{settings:'Настройки',installGuide:'Инструкция по установке приложения',openGuide:'Открыть инструкцию',shareApp:'Поделиться приложением',shareText:'Сахихайн — Сахих аль-Бухари и Сахих Муслим в одном приложении',copied:'Ссылка скопирована',close:'Закрыть',language:'Язык приложения',theme:'Тема',themeBtn:'🌙 / ☀️ Переключить тему',sound:'Звук и вибрация',haptic:'Вибрация кнопок',voice:'Озвучивание хадисов',db:'База хадисов',feedback:'Обратная связь',feedbackText1:'Если что-то не работает, вы нашли ошибку или хотите предложить улучшение, свяжитесь с нами.',feedbackText2:'Мы рассматриваем сообщения и исправляем ошибки в новых обновлениях.',contactLabel:'Email для связи:',contactValue:'скоро появится',about:'О приложении',b:'Сахих аль-Бухари',m:'Сахих Муслим'},
    en:{settings:'Settings',installGuide:'App installation guide',openGuide:'Open guide',shareApp:'Share app',shareText:'Sahihayn — Sahih al-Bukhari and Sahih Muslim in one app',copied:'Link copied',close:'Close',language:'App language',theme:'Theme',themeBtn:'🌙 / ☀️ Toggle theme',sound:'Sound and vibration',haptic:'Button vibration',voice:'Hadith voice reading',db:'Hadith database',feedback:'Feedback',feedbackText1:'If something does not work, you find an error, or want to suggest an improvement, please contact us.',feedbackText2:'We review messages and fix errors in new updates.',contactLabel:'Contact email:',contactValue:'coming soon',about:'About',b:'Sahih al-Bukhari',m:'Sahih Muslim'},
    ka:{settings:'პარამეტრები',installGuide:'აპლიკაციის დაყენების ინსტრუქცია',openGuide:'ინსტრუქციის გახსნა',shareApp:'აპლიკაციის გაზიარება',shareText:'საჰიჰაინი — საჰიჰ ალ-ბუხარი და საჰიჰ მუსლიმი ერთ აპლიკაციაში',copied:'ბმული დაკოპირდა',close:'დახურვა',language:'აპლიკაციის ენა',theme:'თემა',themeBtn:'🌙 / ☀️ თემის შეცვლა',sound:'ხმა და ვიბრაცია',haptic:'ღილაკების ვიბრაცია',voice:'ჰადისების გახმოვანება',db:'ჰადისების ბაზა',feedback:'უკუკავშირი',feedbackText1:'თუ რამე არ მუშაობს, შეცდომა იპოვეთ ან გაუმჯობესების შეთავაზება გსურთ, დაგვიკავშირდით.',feedbackText2:'ჩვენ განვიხილავთ შეტყობინებებს და ვასწორებთ შეცდომებს ახალ განახლებებში.',contactLabel:'საკონტაქტო ელფოსტა:',contactValue:'მალე დაემატება',about:'აპლიკაციის შესახებ',b:'საჰიჰ ალ-ბუხარი',m:'საჰიჰ მუსლიმი'},
    ar:{settings:'الإعدادات',installGuide:'دليل تثبيت التطبيق',openGuide:'فتح الدليل',shareApp:'مشاركة التطبيق',shareText:'الصحيحان — صحيح البخاري وصحيح مسلم في تطبيق واحد',copied:'تم نسخ الرابط',close:'إغلاق',language:'لغة التطبيق',theme:'المظهر',themeBtn:'🌙 / ☀️ تغيير المظهر',sound:'الصوت والاهتزاز',haptic:'اهتزاز الأزرار',voice:'قراءة الأحاديث صوتياً',db:'قاعدة الأحاديث',feedback:'التواصل',feedbackText1:'إذا كان هناك شيء لا يعمل، أو وجدت خطأً، أو أردت اقتراح تحسين، يرجى التواصل معنا.',feedbackText2:'نراجع الرسائل ونصلح الأخطاء في التحديثات الجديدة.',contactLabel:'البريد الإلكتروني للتواصل:',contactValue:'قريباً',about:'حول التطبيق',b:'صحيح البخاري',m:'صحيح مسلم'}
  };

  const APP_URL='https://unnamed00000.github.io/sahihayn-app/';

  function lang(){return localStorage.getItem('sahihayn:lang')||'ru'}
  function tr(){return T[lang()]||T.ru}
  function on(k){return localStorage.getItem(k)!=='off'}
  function cnt(n){try{return typeof loadedBookCount==='function'?loadedBookCount(n):0}catch(e){return 0}}
  function brand(){return lang()==='en'?'Sahihayn':(lang()==='ka'?'საჰიჰაინი':(lang()==='ar'?'الصحيحان':'Сахихайн'))}

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

  function settings2(){
    const d=tr();
    app.innerHTML='<section class="screen"><h2>'+d.settings+'</h2>'+ 
    '<article class="setting-card"><h3>📱 '+d.installGuide+'</h3><button class="gold-btn" onclick="openInstallGuide()">📱 '+d.openGuide+'</button><button class="gold-btn" onclick="shareSahihaynApp()" style="margin-top:10px">↗️ '+d.shareApp+'</button></article>'+ 
    '<article class="setting-card"><h3>'+d.language+'</h3><div class="select-wrap"><select class="language-select styled-select" onchange="localStorage.setItem(\'sahihayn:lang\',this.value);render()"><option value="ru" '+(lang()==='ru'?'selected':'')+'>Русский</option><option value="en" '+(lang()==='en'?'selected':'')+'>English</option><option value="ka" '+(lang()==='ka'?'selected':'')+'>ქართული</option><option value="ar" '+(lang()==='ar'?'selected':'')+'>العربية</option></select></div></article>'+ 
    '<article class="setting-card"><h3>'+d.theme+'</h3><button class="gold-btn" onclick="document.body.classList.toggle(\'light\')">'+d.themeBtn+'</button></article>'+ 
    '<article class="setting-card"><h3>'+d.sound+'</h3><label class="switch-row"><span>'+d.haptic+'</span><input type="checkbox" '+(on('sahihayn:haptic')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:haptic\',this.checked?\'on\':\'off\')"><i></i></label><label class="switch-row"><span>'+d.voice+'</span><input type="checkbox" '+(on('sahihayn:voice')?'checked':'')+' onchange="localStorage.setItem(\'sahihayn:voice\',this.checked?\'on\':\'off\')"><i></i></label></article>'+ 
    '<article class="setting-card"><h3>'+d.db+'</h3><p>'+d.b+': '+cnt('bukhari')+' / 7275</p><p>'+d.m+': '+cnt('muslim')+' / 7563</p></article>'+ 
    '<article class="setting-card"><h3>'+d.feedback+':</h3><p>'+d.feedbackText1+'</p><p>'+d.feedbackText2+'</p><p class="muted"><b>'+d.contactLabel+'</b> '+d.contactValue+'</p></article>'+ 
    '<article class="setting-card" style="text-align:center"><h3>'+d.about+'</h3><h2>'+brand()+'</h2><p class="muted">Version 0.8.1</p><p>© 2026 Adam Margoev<br>All Rights Reserved</p></article></section>';
  }

  function hook(){if(typeof window.settings==='function')window.settings=settings2}
  document.addEventListener('DOMContentLoaded',hook);
  document.addEventListener('click',function(){setTimeout(hook,20)});
})();