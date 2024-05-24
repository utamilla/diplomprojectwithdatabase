document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init(); // Delay the AOS initialization
        } else {
            console.error('AOS is not defined. Make sure AOS is included in your project.');
        }
    }, 100); // Delay by milliseconds

    const lang = 'en'; // Default language set to English
    updateXPFromServer(); // Update the XP circle from the server

    const languageSelector = document.getElementById('language-selector');
    languageSelector.value = lang; // Set default selection to English

    // Update XP display initially with the default language
    updateXPDisplay(getCurrentXPPercentage(), lang);

    // Handle language change
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = languageSelector.value;
        updateXPDisplay(getCurrentXPPercentage(), selectedLanguage);
    });
});

function updateXPFromServer() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userID = currentUser.email || 'defaultUser';
    fetch(`get_user_xp.php?email=${encodeURIComponent(userID)}`)
        .then(response => response.json())
        .then(data => {
            const percent = (data.xp / 100) * 100; // Assuming max XP is 100
            updateXPDisplay(percent, 'en');
        })
        .catch(error => {
            console.error('Error fetching XP data:', error);
        });
}

function getCurrentXPPercentage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userID = currentUser.email ? currentUser.email.trim() : 'defaultUser';
    const xpKey = 'currentXP_' + userID;
    const currentXP = parseFloat(localStorage.getItem(xpKey) || '0');
    const maxXP = 100;
    return (currentXP / maxXP) * 100;
}

function updateXPDisplay(percent, lang) {
    const xpCircleProgress = document.querySelector('.xp-circle-progress');
    const xpCircleText = document.querySelector('.xp-circle-text');
    const circumference = Math.PI * (18 * 2);
    const offset = ((100 - percent) / 100) * circumference;

    xpCircleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    xpCircleProgress.style.strokeDashoffset = offset;
    xpCircleText.textContent = `${percent.toFixed(2)}%`;

    updateLevel(percent, lang);
}

function updateLevel(percent, lang) {
    const xpLevel = document.getElementById('xpLevel');
    if (percent < 33) {
        xpLevel.textContent = translateLevel('Beginner', lang);
    } else if (percent < 66) {
        xpLevel.textContent = translateLevel('Experienced', lang);
    } else {
        xpLevel.textContent = translateLevel('Master', lang);
    }
}

function translateLevel(level, lang) {
    const levels = {
        'Beginner': { en: 'Level: Beginner', ru: 'Уровень: Новичок', kk: 'Деңгей: Жаңа Бастаушы' },
        'Experienced': { en: 'Level: Experienced', ru: 'Уровень: Опытный', kk: 'Деңгей: Тәжірибелі' },
        'Master': { en: 'Level: Master', ru: 'Уровень: Мастер', kk: 'Деңгей: Шебер' }
    };
    return levels[level][lang] || levels[level]['en'];
}


















