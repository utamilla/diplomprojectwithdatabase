document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Функция для обновления usersData из базы данных
    function updateUsersData() {
        fetch('get_users.php')
            .then(response => response.json())
            .then(users => {
                const usersData = {};
                users.forEach(user => {
                    usersData[user.email] = { name: user.name, email: user.email };
                });
                localStorage.setItem('usersData', JSON.stringify(usersData));
            })
            .catch(error => {
                console.error('Error fetching users data:', error);
            });
    }

    // Обновляем usersData при загрузке страницы
    updateUsersData();

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            fetch('login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    window.location.href = 'courses.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});





