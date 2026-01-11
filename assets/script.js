const translations = {
    'ru': { 'nav_home': 'Главная', 'nav_fun': 'Приколы', 'nav_about': 'О нас', 'hero_title': 'Добро пожаловать', 'hero_desc': 'Выбирай раздел и погнали!', 'about_text': 'Тут информация о проекте XWW.' },
    'uk': { 'nav_home': 'Головна', 'nav_fun': 'Приколи', 'nav_about': 'Про нас', 'hero_title': 'Ласкаво просимо', 'hero_desc': 'Обирай розділ та погнали!', 'about_text': 'Тут інформація про проект XWW.' },
    'en': { 'nav_home': 'Home', 'nav_fun': 'Fun', 'nav_about': 'About', 'hero_title': 'Welcome', 'hero_desc': 'Pick a section and let\'s go!', 'about_text': 'Here is information about the XWW project.' }
};

// Функция для загрузки шапки
async function initHeader() {
    const headerElement = document.querySelector('header');
    if (!headerElement) return;

    try {
        const response = await fetch('/assets/header.html');
        const headerHtml = await response.text();
        headerElement.innerHTML = headerHtml;
        applyTranslation(localStorage.getItem('selectedLang') || 'ru');
    } catch (err) {
        console.error("Ошибка загрузки шапки:", err);
    }
}

// ДОБАВЛЯЕМ ФУНКЦИЮ ДЛЯ ФУТЕРА
async function initFooter() {
    const appElement = document.getElementById('app');
    if (!appElement) return;

    try {
        const response = await fetch('/assets/footer.html');
        const footerHtml = await response.text();
        // Вставляем футер сразу после основного контента
        appElement.insertAdjacentHTML('afterend', footerHtml);
    } catch (err) { console.error("Ошибка загрузки футера:", err); }
}

async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('404');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Заменяем только контент
        document.getElementById('page-content').innerHTML = doc.getElementById('page-content').innerHTML;
        document.title = doc.title;
        
        window.scrollTo(0, 0);
        applyTranslation(localStorage.getItem('selectedLang') || 'ru');
    } catch (err) {
        window.location.href = url;
    }
}

document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        const url = link.getAttribute('href');
        if (window.location.pathname !== url) {
            history.pushState(null, null, url);
            loadPage(url);
        }
    }
});

window.addEventListener('popstate', () => loadPage(window.location.pathname));

// Логика языка
function toggleLangMenu() { 
    const options = document.getElementById('lang-options');
    if(options) options.classList.toggle('show'); 
}

function selectLang(lang) {
    localStorage.setItem('selectedLang', lang);
    applyTranslation(lang);
    const options = document.getElementById('lang-options');
    if(options) options.classList.remove('show');
}

function applyTranslation(lang) {
    const btn = document.getElementById('current-lang');
    if (btn) btn.textContent = lang.toUpperCase();
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
    });
}

// ПРИ ЗАГРУЗКЕ: сначала загружаем шапку, потом переводим
window.addEventListener('DOMContentLoaded', () => {
    initHeader();
	initFooter()
});

window.onclick = e => {
    if (!e.target.matches('.lang-btn')) {
        const dropdown = document.getElementById('lang-options');
        if (dropdown) dropdown.classList.remove('show');
    }
}