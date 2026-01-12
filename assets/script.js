let translations = {};

// --- ЛОГИКА РАНДОМАЙЗЕРА ---
window.randomizeNumbers = function() {
    const minInput = document.getElementById("minNumber");
    const maxInput = document.getElementById("maxNumber");
    const resultEl = document.getElementById("randomNumber");

    if (!minInput || !maxInput) return;

    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    // Получаем текущий язык для корректного отображения ошибок и меток
    const lang = localStorage.getItem('selectedLang') || 'ru';
    const label = translations[lang]?.["result_label"] || "Случайное число:";

    if (isNaN(min) || isNaN(max)) {
        resultEl.innerText = `${label} (ошибка)`;
        return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    resultEl.innerText = `${label} ${randomNumber}`;
}

window.randomizeFromList = function() {
    const listEl = document.getElementById("inputList");
    const attEl = document.getElementById("attempts");
    const resultEl = document.getElementById("randomListItem");

    if (!listEl || !attEl) return;

    const inputList = listEl.value.trim().split("\n").filter(item => item.trim() !== "");
    const attempts = parseInt(attEl.value);
    
    if (inputList.length === 0 || isNaN(attempts)) return;

    let count = {};
    inputList.forEach(item => count[item.trim()] = 0);

    for (let j = 0; j < attempts; j++) {
        const randomIndex = Math.floor(Math.random() * inputList.length);
        const selectedItem = inputList[randomIndex].trim();
        count[selectedItem]++;
    }

    let result = "Результат:<br>";
    for (let key in count) {
        const percentage = (count[key] / attempts) * 100;
        result += `${key}: ${count[key]} (${percentage.toFixed(2)}%)<br>`;
    }

    resultEl.innerHTML = result;
}

// --- СИСТЕМНАЯ ЛОГИКА (SPA И ПЕРЕВОДЫ) ---

async function loadTranslations() {
    try {
        const response = await fetch('/assets/translations.json');
        translations = await response.json();
        applyTranslation(localStorage.getItem('selectedLang') || 'ru');
    } catch (err) {
        console.error("Ошибка загрузки переводов");
    }
}

async function initHeader() {
    const headerElement = document.querySelector('header');
    if (!headerElement) return;
    try {
        const response = await fetch('/assets/header.html');
        const headerHtml = await response.text();
        headerElement.innerHTML = headerHtml;
        await loadTranslations(); 
    } catch (err) {
        console.error("Ошибка загрузки header.html");
    }
}

// Обновленная функция с поддержкой плейсхолдеров
function applyTranslation(lang) {
    const langData = translations[lang];
    if (!langData) return;

    const btn = document.getElementById('current-lang');
    if (btn) btn.textContent = lang.toUpperCase();

    // 1. Для обычного текста (data-lang)
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langData[key]) {
            el.textContent = langData[key];
        }
    });

    // 2. Для плейсхолдеров в инпутах и textarea (data-lang-placeholder)
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (langData[key]) {
            el.placeholder = langData[key];
        }
    });

    // Обновляем текст результата в рандомайзере, если он уже был сгенерирован
    const resultEl = document.getElementById("randomNumber");
    if (resultEl && resultEl.innerText.includes(':')) {
        const label = langData["result_label"] || "Случайное число:";
        const currentVal = resultEl.innerText.split(':').pop();
        resultEl.innerText = `${label}${currentVal}`;
    }
}

async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('404');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newContent = doc.getElementById('page-content');
        if (newContent) {
            document.getElementById('page-content').innerHTML = newContent.innerHTML;
            document.title = doc.title;
            window.scrollTo(0, 0);
            applyTranslation(localStorage.getItem('selectedLang') || 'ru');
        }
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        const url = link.getAttribute('href');
        history.pushState(null, null, url);
        loadPage(url);
    }
});

window.addEventListener('popstate', () => loadPage(window.location.pathname));

window.toggleLangMenu = function() { 
    document.getElementById('lang-options')?.classList.toggle('show'); 
}

window.selectLang = function(lang) {
    localStorage.setItem('selectedLang', lang);
    applyTranslation(lang);
    document.getElementById('lang-options')?.classList.remove('show');
}

window.addEventListener('DOMContentLoaded', () => {
    initHeader();
});