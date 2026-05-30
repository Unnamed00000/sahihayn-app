const app = document.getElementById('app');
const navButtons = document.querySelectorAll('.bottom-nav button');

const hadiths = [
  { id:'bukhari-1', source:'Сахих аль-Бухари', number:1, book:'Начало Откровения', chapter:'Вера', title:'Дела оцениваются по намерениям', arabic:'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', ru:'Поистине, дела оцениваются только по намерениям, и каждому человеку достанется только то, что он намеревался получить.', en:'Actions are judged by intentions, and every person will receive according to what he intended.' },
  { id:'bukhari-2', source:'Сахих аль-Бухари', number:2, book:'Вера', chapter:'Иман', title:'Ислам построен на пяти основах', arabic:'بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ', ru:'Ислам построен на пяти основах: свидетельстве, молитве, закяте, посте и хадже.', en:'Islam is built upon five pillars.' },
  { id:'muslim-1', source:'Сахих Муслим', number:1, book:'Вера', chapter:'Иман', title:'Вера, ислам и ихсан', arabic:'هَذَا جِبْرِيلُ أَتَاكُمْ يُعَلِّمُكُمْ دِينَكُمْ', ru:'Это был Джибриль, который пришёл к вам, чтобы научить вас вашей религии.', en:'That was Jibril who came to teach you your religion.' },
  { id:'muslim-2', source:'Сахих Муслим', number:2, book:'Намаз', chapter:'Молитва', title:'Значение молитвы', arabic:'الصَّلَاةُ نُورٌ', ru:'Молитва — свет.', en:'Prayer is light.' }
];

const books = [
  { id:'bukhari', title:'Сахих аль-Бухари', count:7275, icon:'ب' },
  { id:'muslim', title:'Сахих Муслим', count:7563, icon:'م' }
];
const chapters = ['Вера','Намаз','Закят','Пост','Хадж','Брак','Торговля','Адаб'];
let state = { page:'home', query:'', currentBook:null };
let audioCtx;
let lastFeedbackAt = 0;

function pref(key, fallback='on'){ return localStorage.getItem('sahihayn:'+key) || fallback; }
function setPref(key, value){ localStorage.setItem('sahihayn:'+key, value); }
function getFavorites(){ return JSON.parse(localStorage.getItem('sahihayn:favorites') || '[]'); }
function setFavorites(items){ localStorage.setItem('sahihayn:favorites', JSON.stringify(items)); }
function isFav(id){ return getFavorites().includes(id); }
function saveLast(id){ localStorage.setItem('sahihayn:last', id); }
function tapSound(kind='tap'){
  if(pref('sounds') === 'off') return;
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;
    osc.type = 'sine';
    osc.frequency.value = kind === 'ok' ? 920 : 620;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(now); osc.stop(now + 0.075);
  }catch(e){}
}
function tapFeel(kind='tap'){
  const now = Date.now();
  if(now - lastFeedbackAt < 140) return;
  lastFeedbackAt = now;
  if(pref('haptic') !== 'off' && navigator.vibrate) navigator.vibrate(28);
  tapSound(kind);
}
function toggleFav(id){
  const favs = getFavorites();
  setFavorites(favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]);
  renderHadith(id);
}
function setPage(page){
  state.page = page;
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.page === page));
  render();
}
function render(){
  if(state.page === 'home') renderHome();
  if(state.page === 'search') renderSearch();
  if(state.page === 'favorites') renderFavorites();
  if(state.page === 'settings') renderSettings();
}
function renderHome(){
  const lastId = localStorage.getItem('sahihayn:last');
  const last = hadiths.find(h => h.id === lastId);
  app.innerHTML = `<section class="screen"><div class="hero-card"><div class="calligraphy">صحيح</div><h2>Сахихайн</h2><p>Сахих аль-Бухари и Сахих Муслим в одном приложении</p></div><div class="books">${books.map(book => `<article class="book-card" onclick="tapFeel();openBook('${book.id}')"><div class="book-icon">${book.icon}</div><div><h3>${book.title}</h3><p class="muted">${book.count} хадисов</p></div><button class="gold-btn">Открыть разделы</button></article>`).join('')}</div>${last ? `<h3>Последний прочитанный</h3><article class="hadith-card" onclick="tapFeel();renderHadith('${last.id}')"><b>${last.source} ${last.number}</b><p>${last.title}</p><p class="muted">${last.ru.slice(0,80)}...</p></article>` : ''}<div class="features"><div class="feature">🔍 Умный поиск</div><div class="feature">⭐ Избранное</div><div class="feature">🔖 Последний хадис</div><div class="feature">🌙 Темы</div></div></section>`;
}
function openBook(bookId){
  state.currentBook = bookId;
  const book = books.find(b => b.id === bookId);
  app.innerHTML = `<section class="screen"><button class="small-btn" onclick="renderHome()">← Назад</button><h2>${book.title}</h2><p class="muted">Разделы по книгам</p><div class="chapter-list">${chapters.map(ch => `<article class="chapter-card" onclick="tapFeel();openChapter('${bookId}','${ch}')"><span>${ch}</span><span>›</span></article>`).join('')}</div></section>`;
}
function openChapter(bookId, chapter){
  const source = bookId === 'bukhari' ? 'Сахих аль-Бухари' : 'Сахих Муслим';
  const list = hadiths.filter(h => h.source === source && (h.chapter === chapter || h.book === chapter));
  app.innerHTML = `<section class="screen"><button class="small-btn" onclick="openBook('${bookId}')">← Назад</button><h2>${chapter}</h2><p class="muted">${source}</p><div class="chapter-list">${(list.length ? list : hadiths.filter(h => h.source === source)).map(h => hadithItem(h)).join('')}</div></section>`;
}
function hadithItem(h){ return `<article class="hadith-card" onclick="tapFeel();renderHadith('${h.id}')"><b>${h.source} ${h.number}</b><p>${h.title}</p><p class="muted">${h.ru.slice(0,90)}...</p></article>`; }
function renderHadith(id){
  const h = hadiths.find(x => x.id === id);
  saveLast(id);
  app.innerHTML = `<section class="screen"><button class="small-btn" onclick="render()">← Назад</button><h2>${h.source} ${h.number}</h2><p class="muted">${h.book}</p><article class="hadith-card"><h3>${h.title}</h3><div class="arabic">${h.arabic}</div><hr><p><b>Перевод русский</b></p><p class="translation">${h.ru}</p><p><b>English</b></p><p class="translation muted">${h.en}</p><div class="actions"><button class="small-btn" onclick="toggleFav('${h.id}')">${isFav(h.id) ? '★ В избранном' : '☆ В избранное'}</button><button class="small-btn" onclick="shareHadith('${h.id}')">📤 Поделиться</button><button class="small-btn" onclick="speakHadith('${h.id}')">🎧 Слушать</button></div></article></section>`;
}
function renderSearch(){
  const results = hadiths.filter(h => `${h.source} ${h.title} ${h.ru} ${h.book}`.toLowerCase().includes(state.query.toLowerCase()));
  app.innerHTML = `<section class="screen"><h2>Поиск хадисов</h2><input class="search-input" placeholder="Например: намерения, вера, намаз" value="${state.query}" oninput="state.query=this.value;renderSearch()"><div class="chapter-list">${results.map(hadithItem).join('') || '<p class="empty">Ничего не найдено</p>'}</div></section>`;
}
function renderFavorites(){
  const list = hadiths.filter(h => getFavorites().includes(h.id));
  app.innerHTML = `<section class="screen"><h2>Избранные хадисы</h2><div class="chapter-list">${list.map(hadithItem).join('') || '<p class="empty">Пока нет избранных хадисов</p>'}</div></section>`;
}
function renderSettings(){
  app.innerHTML = `<section class="screen"><h2>Настройки</h2><article class="setting-card"><h3>Тема</h3><p class="muted">Тёмная и светлая тема</p><button class="gold-btn" onclick="toggleTheme()">🌙 / ☀️ Переключить тему</button></article><article class="setting-card"><h3>Звуки и отклик</h3><p class="muted">Один короткий звук и один отклик на одно касание.</p><button class="gold-btn" onclick="toggleSounds()">${pref('sounds') === 'off' ? '🔇 Включить звуки' : '🔊 Выключить звуки'}</button><br><br><button class="gold-btn" onclick="toggleHaptic()">${pref('haptic') === 'off' ? '📳 Включить отклик' : '📴 Выключить отклик'}</button><br><br><button class="small-btn" onclick="tapFeel('ok')">Проверить</button></article><article class="setting-card"><h3>Офлайн</h3><p class="muted">База хадисов готовится к офлайн-работе.</p></article></section>`;
}
function toggleTheme(){ document.body.classList.toggle('light'); setPref('theme', document.body.classList.contains('light') ? 'light' : 'dark'); }
function toggleSounds(){ setPref('sounds', pref('sounds') === 'off' ? 'on' : 'off'); renderSettings(); }
function toggleHaptic(){ setPref('haptic', pref('haptic') === 'off' ? 'on' : 'off'); renderSettings(); }
function shareHadith(id){ const h = hadiths.find(x => x.id === id); const text = `${h.source} ${h.number}\n${h.title}\n\n${h.ru}`; if(navigator.share) navigator.share({title:h.title,text}); else navigator.clipboard.writeText(text).then(() => alert('Хадис скопирован')); }
function speakHadith(id){ const h = hadiths.find(x => x.id === id); speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(h.ru)); }

navButtons.forEach(btn => btn.addEventListener('click', () => setPage(btn.dataset.page)));
document.getElementById('searchBtn').addEventListener('click', () => setPage('search'));
document.addEventListener('click', e => { if(e.target.closest('button')) tapFeel(); }, { capture:true });
if(pref('theme','dark') === 'light') document.body.classList.add('light');
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
renderHome();
