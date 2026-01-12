document.addEventListener('click', (e) => {
    // 1. Генератор чисел
    if (e.target.id === 'btn-num') {
        const min = parseInt(document.getElementById('num-min').value);
        const max = parseInt(document.getElementById('num-max').value);
        const display = document.getElementById('number-result');

        if (isNaN(min) || isNaN(max)) {
            display.innerText = "???";
            return;
        }

        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        animateOutput(display, result);
    }

    // 2. Генератор из списка
    if (e.target.id === 'btn-list') {
        const input = document.getElementById('list-input').value.trim();
        const count = parseInt(document.getElementById('list-count').value) || 1;
        const display = document.getElementById('list-result');

        if (!input) {
            display.innerText = "Пусто";
            return;
        }

        const items = input.split('\n').map(item => item.trim()).filter(item => item !== "");
        
        if (items.length === 0) {
            display.innerText = "Пусто";
            return;
        }

        let chosen = [];
        for (let i = 0; i < count; i++) {
            const randomIdx = Math.floor(Math.random() * items.length);
            chosen.push(items[randomIdx]);
        }

        animateOutput(display, chosen.join(', '));
    }
});

// Плавная анимация текста
function animateOutput(el, value) {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        el.innerText = value;
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
    }, 100);
}