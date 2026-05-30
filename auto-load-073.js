(function(){
  async function startAutoLoad(){
    if(window.__sahihaynAutoLoadStarted)return;
    window.__sahihaynAutoLoadStarted=true;
    try{
      if(typeof loadCollection==='function'){
        await loadCollection('bukhari');
        await loadCollection('muslim');
        if(typeof render==='function')render();
      }
    }catch(e){console.error('Auto load failed',e)}
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(startAutoLoad,250)});
})();