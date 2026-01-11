const translations = {
    'ru': { 'nav_home': 'Главная', 'nav_fun': 'Приколы', 'nav_about': 'О нас', 'hero_title': 'Добро пожаловать', 'hero_desc': 'Выбирай раздел и погнали!', 'about_text': 'Тут информация о проекте XWW.' },
    'uk': { 'nav_home': 'Головна', 'nav_fun': 'Приколи', 'nav_about': 'Про нас', 'hero_title': 'Ласкаво просимо', 'hero_desc': 'Обирай розділ та погнали!', 'about_text': 'Тут інформація про проект XWW.' },
    'en': { 'nav_home': 'Home', 'nav_fun': 'Fun', 'nav_about': 'About', 'hero_title': 'Welcome', 'hero_desc': 'Pick a section and let\'s go!', 'about_text': 'Here is information about the XWW project.' }
};

async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('404');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 1. Обновляем контент страницы
        const newContent = doc.getElementById('page-content');
        if (newContent) {
            document.getElementById('page-content').innerHTML = newContent.innerHTML;
        }

        // 2. ИСПРАВЛЕНИЕ: Если при обновлении пропала шапка, мы берем её из загруженного файла
        const newHeader = doc.querySelector('header');
        const currentHeader = document.querySelector('header');
        if (newHeader && (!currentHeader || currentHeader.innerHTML.trim() === "")) {
             document.body.insertAdjacentHTML('afterbegin', newHeader.outerHTML);
        }
        
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

