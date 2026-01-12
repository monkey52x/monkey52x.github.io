let translations = {};

// Загрузка переводов из внешнего файла
async function loadTranslations() {
    try {
        const response = await fetch('/assets/translations.json');
        translations = await response.json();
        applyTranslation(localStorage.getItem('selectedLang') || 'ru');
    } catch (err) {
        console.error("Ошибка загрузки переводов:", err);
    }
}

async function initHeader() {
    const headerElement = document.querySelector('header');
    if (!headerElement) return;

    try {
        const response = await fetch('/assets/header.html');
        const headerHtml = await response.text();
        headerElement.innerHTML = headerHtml;
        await loadTranslations(); // Грузим переводы СРАЗУ после шапки
    } catch (err) {
        console.error("Ошибка загрузки шапки:", err);
    }
}

function applyTranslation(lang) {
    const btn = document.getElementById('current-lang');
    if (btn) btn.textContent = lang.toUpperCase();
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// SPA Навигация
async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('404');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
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

function toggleLangMenu() { 
    const options = document.getElementById('lang-options');
    if(options) options.classList.toggle('show'); 
}

function selectLang(lang) {
    localStorage.setItem('selectedLang', lang);
    applyTranslation(lang);
    document.getElementById('lang-options')?.classList.remove('show');
}

window.addEventListener('DOMContentLoaded', initHeader);

window.onclick = e => {
    if (!e.target.matches('.lang-btn')) {
        document.getElementById('lang-options')?.classList.remove('show');
    }
}