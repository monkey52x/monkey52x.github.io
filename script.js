const translations = {
    'ru': { 'nav_home': 'Главная', 'nav_fun': 'Приколы', 'nav_about': 'О нас', 'hero_title': 'Добро пожаловать', 'hero_desc': 'Выбирай раздел и погнали!' },
    'uk': { 'nav_home': 'Головна', 'nav_fun': 'Приколи', 'nav_about': 'Про нас', 'hero_title': 'Ласкаво просимо', 'hero_desc': 'Обирай розділ та погнали!' },
    'en': { 'nav_home': 'Home', 'nav_fun': 'Fun', 'nav_about': 'About', 'hero_title': 'Welcome', 'hero_desc': 'Pick a section and let\'s go!' }
};

// Динамическая подгрузка контента
async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Странница не найдена');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Заменяем только контент и заголовок
        const newContent = doc.getElementById('page-content').innerHTML;
        document.getElementById('page-content').innerHTML = newContent;
        document.title = doc.title;
        
        // Скролл вверх и перевод
        window.scrollTo(0, 0);
        applyTranslation(localStorage.getItem('selectedLang') || 'ru');
    } catch (err) {
        console.error("Ошибка SPA:", err);
        window.location.href = url; // Резервный переход
    }
}

// Перехват кликов
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

// Кнопка назад в браузере
window.addEventListener('popstate', () => loadPage(window.location.pathname));

// Языковая логика
function toggleLangMenu() { document.getElementById('lang-options').classList.toggle('show'); }

function selectLang(lang) {
    localStorage.setItem('selectedLang', lang);
    applyTranslation(lang);
    document.getElementById('lang-options').classList.remove('show');
}

function applyTranslation(lang) {
    const btn = document.getElementById('current-lang');
    if (btn) btn.textContent = lang.toUpperCase();
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
    });
}

window.onload = () => applyTranslation(localStorage.getItem('selectedLang') || 'ru');

window.onclick = e => {
    if (!e.target.matches('.lang-btn')) {
        const dropdown = document.getElementById('lang-options');
        if (dropdown) dropdown.classList.remove('show');
    }
}