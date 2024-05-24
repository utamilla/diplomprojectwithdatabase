document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

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

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            console.log('Form submitted'); // Отладочное сообщение

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            if (!name.trim()) {
                name = 'Guest';
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);

            fetch('register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response received:', data); // Отладочное сообщение
                if (data.status === 'success') {
                    // Сохраняем данные пользователя в localStorage
                    updateUsersData();
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    } else {
        console.log('Registration form not found'); // Отладочное сообщение
    }
});


