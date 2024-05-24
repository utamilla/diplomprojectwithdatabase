document.addEventListener('DOMContentLoaded', function() {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userID = currentUser.email || 'defaultUser';
    const userIconKey = 'customIconURL_' + userID; // Unique key for user icon
    const userIcon = document.querySelector('.user-icon');

    // Translations for alert messages
    const alertTranslations = {
        en: {
            pleaseLogIn: "Please log in to start the course",
            startingCourse: "Starting the course: "
        },
        ru: {
            pleaseLogIn: "Пожалуйста, войдите, чтобы начать курс",
            startingCourse: "Начало курса: "
        },
        kk: {
            pleaseLogIn: "Курсқа қатысу үшін тіркеліңіз",
            startingCourse: "Курсты бастау: "
        }
    };

    function getTranslation(key) {
        const selectedLanguage = document.getElementById('language-selector').value;
        return alertTranslations[selectedLanguage][key];
    }

    // Function to update or set default avatar based on login status
    function updateAvatar() {
        // Check if user is logged out
        if (localStorage.getItem('userLoggedIn') === 'false') {
            setDefaultAvatar();
        } else {
            const userIconURL = localStorage.getItem(userIconKey);
            if (userIconURL) {
                userIcon.setAttribute('src', userIconURL);
            } else {
                setDefaultAvatar();
            }
        }
    }

    function setDefaultAvatar() {
        userIcon.setAttribute('src', 'icons8-account-100.png'); // Default avatar
    }

    // Initialize the avatar on page load
    updateAvatar();

    const courses = document.querySelectorAll(".course");
    const courseInfos = document.querySelectorAll(".course-info");

    // Hide all course information initially and setup event listeners for courses
    courseInfos.forEach(info => info.style.display = "none");
    courses.forEach(course => {
        course.addEventListener("click", function() {
            courseInfos.forEach(info => info.style.display = "none");
            this.querySelector(".course-info").style.display = "block";
        });
    });

    // Handle course start buttons
    const startCourseButtons = document.querySelectorAll('.start-course');
    startCourseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (localStorage.getItem('userLoggedIn') !== 'true') {
                e.preventDefault();
                alert(getTranslation('pleaseLogIn'));
                window.location.href = 'login.html';
            } else {
                alert(getTranslation('startingCourse') + this.getAttribute('data-course'));
                window.location.href = this.getAttribute('data-course') + '.html';
            }
        });
    });

    // Account Link Logic
    const myAccountLink = document.getElementById('my-account');
    myAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (localStorage.getItem('userLoggedIn') === 'true' && localStorage.getItem('currentUser')) {
            window.location.href = 'my-account.html';
        } else {
            window.location.href = 'login.html';
        }
    });

    // Logout Button Logic
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function() {
        // Set userLoggedIn flag to false
        localStorage.setItem('userLoggedIn', 'false');
        // Reset user icon to default when logging out
        setDefaultAvatar();
        // Remove user-specific icon from localStorage
        // Redirect to the index page
        window.location.href = 'index.html';  
    });
});










