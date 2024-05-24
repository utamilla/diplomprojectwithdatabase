// script.js
document.addEventListener('DOMContentLoaded', function() {
    const sticker = document.getElementById("sticker");
    const words = document.getElementById("inspiring-words");

    if (sticker && words) {
        sticker.addEventListener("mouseover", function() {
            const phrases = {
                'en': ["Inspiration!", "You can do it!", "Program dreams!", "Take a step!"],
                'ru': ["Вдохновение!", "Ты можешь это сделать!", "Запрограммируй мечты!", "Сделай шаг!"],
                'kk': ["Мотивация!", "Сен мұны істей аласың!", "Армандарды бағдарламалаңыз!", "Қадам жаса!"]
            };

            const langSelector = document.getElementById('language-selector');
            const lang = langSelector.options[langSelector.selectedIndex].value;
            const randomIndex = Math.floor(Math.random() * phrases[lang].length);
            words.textContent = phrases[lang][randomIndex];
            words.classList.remove("hidden");
        });
    }
});

