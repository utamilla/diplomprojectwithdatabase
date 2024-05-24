const achievementsDefinition = {
  earnedHalfXP: { en: "Halfway Hero", ru: "Полуторный герой", kk: "Бір жарым батыр" },
  fullXP: { en: "XP Conqueror", ru: "Покоритель опыта", kk: "XP жаулап алушы" },
  allCoursesCompleted: { en: "Master of Codes", ru: "Мастер кодов", kk: "Кодтар шебері" },
  changedAvatar: { en: "New Face", ru: "Новое лицо", kk: "Жаңа тұлға" },
  startedCppCourse: { en: "C++ Conscript", ru: "C++: Новобранец", kk: "С++ Жаңадан келген" },
  completedCppFirstLesson: { en: "C++ Cadet", ru: "C++ Курсант", kk: "C++ Курсант" },
  completedCppThreeLessons: { en: "C++ Commander", ru: "C++ Командир", kk: "C++ Командир" },
  startedJavaCourse: { en: "Java Journeyman", ru: "Java Путешественник", kk: "Java Саяхатшы" },
  completedJavaFirstLesson: { en: "Java Juggler", ru: "Java Жонглер", kk: "Java Сиқыршы" },
  completedJavaThreeLessons: { en: "Java Jedi", ru: "Java Джедай", kk: "Java Джедай" },
  startedPythonCourse: { en: "Python Pioneer", ru: "Python Пионер", kk: "Python Пионер" },
  completedPythonFirstLesson: { en: "Python Pathfinder", ru: "Python Следопыт", kk: "Python Жол іздеуші" },
  completedPythonThreeLessons: { en: "Python Paladin", ru: "Python Паладин", kk: "Python Жауынгер" },
  completedCppCourse: { en: "C++ Champion", ru: "C++ Чемпион", kk: "C++ Жеңімпаз" },
  completedJavaCourse: { en: "Java Guru", ru: "Java Гуру", kk: "Java Тәлімгер" },
  completedPythonCourse: { en: "Python Prodigy", ru: "Python Вундеркинд", kk: "Python Данышпан" },
};

const achievementTooltips = {
  earnedHalfXP: { en: "Achieved when you've earned 50% of the total possible XP.", ru: "Достигается, когда вы заработали 50% от общего количества опыта.", kk: "Сіз жалпы тәжірибенің 50% тапқан кезде қол жеткізіледі." },
  fullXP: { en: "The reward for earning all XP available in a course.", ru: "Награда за заработанный весь доступный опыт в курсе.", kk: "Курстағы барлық қол жетімді тәжірибе үшін сыйлық." },
  allCoursesCompleted: { en: "A grand accolade for completing all available courses.", ru: "Большая похвала за завершение всех доступных курсов.", kk: "Қолжетімді барлық курстарды аяқтағаны үшін үлкен көркем марапат." },
  changedAvatar: { en: "For daring to change the face of your virtual self.", ru: "За то, что осмелились изменить лицо своего виртуального.", kk: "Виртуалды бет-әлпетін өзгертуге батылы барғаны үшін." },
  startedCppCourse: { en: "For taking your first steps into C++.", ru: "За первые шаги в мир C++.", kk: "C++ курсына бірінші қадамдарыңыз үшін." },
  completedCppFirstLesson: { en: "For mastering the fundamentals of C++.", ru: "За освоение основ C++.", kk: "C++ негіздерін білген үшін." },
  completedCppThreeLessons: { en: "For demonstrating commitment to your C++ journey.", ru: "За демонстрацию преданности в своем пути по C++.", kk: "C++бойынша өз жолында адалдықты көрсеткені үшін." },
  startedJavaCourse: { en: "For embarking on your Java adventure.", ru: "За отправление в ваше приключение в Java.", kk: "Сіздің Java саяхатына барғаныңыз үшін." },
  completedJavaFirstLesson: { en: "For proving your growing Java skills.", ru: "За доказательство ваших растущих навыков Java.", kk: "Сіздің өсіп келе жатқан Java дағдыларыңызды дәлелдеу үшін." },
  completedJavaThreeLessons: { en: "For advancing through the Java course with determination.", ru: "За продвижение по курсу Java с решимостью.", kk: "Java курсын табандылықпен алға жылжытқаны үшін." },
  startedPythonCourse: { en: "For beginning your Python exploration.", ru: "За начало вашего путешествия по Python.", kk: "Python саяхатын бастау үшін." },
  completedPythonFirstLesson: { en: "For conquering the beginning of Python.", ru: "За завоевание начала Python.", kk: "Python бастауын жаулап алғаны үшін." },
  completedPythonThreeLessons: { en: "For your steady progress in the Python course.", ru: "За ваш устойчивый прогресс в курсе Python.", kk: "Сіздің Python-дағы тұрақты жетістіктеріңіз үшін." },
  completedCppCourse: { en: "For achieving mastery over the entire C++ curriculum.", ru: "За достижение мастерства над всем учебным планом по C++.", kk: "C++ бойынша барлық оқу жоспарында шеберлікке қол жеткізгені үшін." },
  completedJavaCourse: { en: "For your exceptional dedication and mastery in Java.", ru: "За ваше исключительное посвящение и мастерство в Java.", kk: "Java-дағы ерекше бастамаңыз бен шеберлігіңіз үшін." },
  completedPythonCourse: { en: "For excelling across all Python lessons and proving your expertise.", ru: "За преуспевание во всех уроках Python и доказательство вашей экспертизы.", kk: "Барлық Python сабақтарында жетістікке жеткені және сіздің сараптамаңыздың дәлелі үшін." },
};

function createAchievementCard(achievementKey, isAchieved, lang) {
  const card = document.createElement('div');
  card.className = `achievement-card ${isAchieved ? 'achieved' : 'not-achieved'}`;

  const description = document.createElement('p');
  description.className = 'achievement-description';
  description.textContent = achievementsDefinition[achievementKey][lang] || achievementsDefinition[achievementKey].en;
  card.appendChild(description);

  if (achievementTooltips[achievementKey][lang]) {
    const tooltip = document.createElement('span');
    tooltip.className = 'achievement-tooltip';
    tooltip.textContent = achievementTooltips[achievementKey][lang];
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'visibility 0s, opacity 0.5s ease';
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    card.appendChild(tooltip);

    card.onmouseenter = () => {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    };
    card.onmouseleave = () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    };
  }

  return card;
}

document.addEventListener('DOMContentLoaded', function() {
  // Устанавливаем язык по умолчанию на английский
  let currentLang = 'en'; 

  // Получаем текущего пользователя
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('User not logged in.');
    return;
  }

  // Обновляем отображение достижений при загрузке страницы
  getUserAchievements(currentUser.email).then(userAchievements => {
    updateAchievementsDisplay(userAchievements, currentLang);
  });

  // Находим элемент селектора языка
  const languageSelector = document.getElementById('language-selector');
  languageSelector.value = currentLang; // Устанавливаем выбранный язык в селекторе на английский

  // Добавляем обработчик событий для изменения языка
  languageSelector.addEventListener('change', function() {
    currentLang = languageSelector.value; // Обновляем текущий язык
    getUserAchievements(currentUser.email).then(userAchievements => {
      updateAchievementsDisplay(userAchievements, currentLang);
    });
  });
});

function updateAchievementsDisplay(userAchievements, lang) {
  const achievementsList = document.getElementById('achievements-list');
  achievementsList.innerHTML = '';

  Object.keys(achievementsDefinition).forEach(key => {
    const isAchieved = userAchievements && userAchievements[key];
    const card = createAchievementCard(key, isAchieved, lang);
    achievementsList.appendChild(card);
  });
}

function getCurrentUser() {
  const currentUserString = localStorage.getItem('currentUser');
  return currentUserString ? JSON.parse(currentUserString) : null;
}

function getUserAchievements(email) {
  return fetch(`get_achievements.php?email=${email}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching achievements:', error);
      return {};
    });
}

function saveUserAchievements(email, achievements) {
  return fetch('save_achievements.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${encodeURIComponent(email)}&achievements=${encodeURIComponent(JSON.stringify(achievements))}`
  })
  .then(response => response.json())
  .catch(error => {
    console.error('Error saving achievements:', error);
  });
}











