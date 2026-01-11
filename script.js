// Контент страниц
const pages = {
    'home': `
        <section class="hero content-fade">
            <h1 data-lang="hero_title">Добро пожаловать</h1>
            <p data-lang="hero_desc">Выбирай раздел и погнали!</p>
            <div class="game-grid">
                <div class="game-card rust" onclick="navigateTo('rust')">
                    <div class="card-content"><h2>RUST</h2></div>
                </div>
                <div class="game-card mc" onclick="navigateTo('minecraft')">
                    <div class="card-content"><h2>MINECRAFT</h2></div>
                </div>
                <div class="game-card unturned" onclick="navigateTo('unturned')">
                    <div class="card-content"><h2>UNTURNED</h2></div>
                </div>
            </div>
        </section>`,
    'fun': `
        <div class="glass-panel content-fade">
            <h1 data-lang="nav_fun">Приколы</h1>
            <p data-lang="fun_text">Здесь будут самые смешные моменты и мемы!</p>
            <button class="btn-back" onclick="navigateTo('home')">← Назад</button>
        </div>`,
    'about': `
        <div class="glass-panel content-fade">
            <h1 data-lang="nav_about">О нас</h1>
            <p data-lang="about_text">Информацию с Google Sites переносим сюда. Я создаю крутой контент!</p>
            <button class="btn-back" onclick="navigateTo('home')">← Назад</button>
        </div>`,
    'rust': `
        <div class="glass-panel content-fade">
            <h1>RUST</h1>
            <p>Контент про Rust скоро будет здесь!</p>
            <button class="btn-back" onclick="navigateTo('home')">← Назад</button>
        </div>`
};

// Переводы
const translations = {
    'ru': { 'nav_home': 'Главная', 'nav_fun': 'Приколы', 'nav_about': 'О нас', 'hero_title': 'Добро пожаловать', 'hero_desc': 'Выбирай раздел и погнали!', 'fun_text': 'Здесь будут самые смешные моменты и мемы!', 'about_text': 'Информацию с Google Sites переносим сюда.' },
    'uk': { 'nav_home': 'Головна', 'nav_fun': 'Приколи', 'nav_about': 'Про нас', 'hero_title': 'Ласкаво просимо', 'hero_desc': 'Обирай розділ та погнали!', 'fun_text': 'Тут будуть найсмішніші моменти та меми!', 'about_text': 'Інформацію з Google Sites переносимо сюди.' },
    'en': { 'nav_home': 'Home', 'nav_fun': 'Fun', 'nav_about': 'About', 'hero_title': 'Welcome', 'hero_desc': 'Pick a section and let\'s go!', 'fun_text': 'Funny moments and memes go here!', 'about_text': 'Migrating everything from Google Sites.' }
};

// Функция навигации БЕЗ перезагрузки
function navigateTo(pageId) {
    const content = pages[pageId] || pages['home'];
    const app = document.getElementById('app-content');
    
    app.innerHTML = content; // Меняем контент
    
    // Обновляем URL в браузере (без .html)
    window.history.pushState({page: pageId}, "", `/${pageId === 'home' ? '' : pageId}`);
    
    // Применяем текущий язык к новому контенту
    const currentLang = localStorage.getItem('selectedLang') || 'ru';
    applyTranslation(currentLang);
}

// Логика языка
function toggleLangMenu() { document.getElementById('lang-options').classList.toggle('show'); }

function selectLang(lang) {
    localStorage.setItem('selectedLang', lang);
    applyTranslation(lang);
    document.getElementById('lang-options').classList.remove('show');
}

function applyTranslation(lang) {
    document.getElementById('current-lang').textContent = lang.toUpperCase();
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
}

// Слушаем кнопку "Назад" в браузере
window.onpopstate = (event) => {
    if (event.state && event.state.page) navigateTo(event.state.page);
};

// Первая загрузка
window.onload = () => {
    navigateTo('home');
};