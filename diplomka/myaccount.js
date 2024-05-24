document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userID = currentUser.email || 'defaultUser';

    const userNameElement = document.getElementById('user-name');
    const userIcon = document.querySelector('.user-icon');

    // Fetch user info from the server
    function fetchUserInfo(email, callback) {
        fetch(`get_user_info.php?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                userNameElement.textContent = data.name || 'Guest';
                userIcon.setAttribute('src', data.icon_url || 'icons8-account-100.png');
                callback(data);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
                callback(null);
            });
    }

    fetchUserInfo(userID, (userData) => {
        if (userData) {
            updateAchievements(userData.achievements);
        }
    });

    // Update avatar
    document.getElementById('iconForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const newIconURL = document.getElementById('icon').value;
        if (isValidURL(newIconURL)) {
            updateUserInfo(userID, newIconURL, null, (success) => {
                if (success) {
                    userIcon.setAttribute('src', newIconURL);
                    alert("Icon successfully updated");
                    unlockAchievement(userID, 'changedAvatar');
                } else {
                    alert("Failed to update icon");
                }
            });
        } else {
            alert("Invalid URL. Please try again.");
        }
    });

    // Remove custom avatar and reset to default
    document.getElementById('remove-avatar').addEventListener('click', () => {
        updateUserInfo(userID, 'icons8-account-100.png', null, (success) => {
            if (success) {
                setDefaultAvatar();
            } else {
                alert("Failed to remove avatar");
            }
        });
    });

    function setDefaultAvatar() {
        userIcon.setAttribute('src', 'icons8-account-100.png');
    }

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.setItem('userLoggedIn', 'false');
        setDefaultAvatar();
        window.location.href = 'index.html';  // Redirect to home page
    });

    // Function to validate URL
    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Update user info on the server
    function updateUserInfo(email, iconURL, achievements, callback) {
        const formData = new FormData();
        formData.append('email', email);
        if (iconURL !== null) {
            formData.append('icon_url', iconURL);
        }
        if (achievements !== null) {
            formData.append('achievements', JSON.stringify(achievements));
        }

        fetch('update_user_info.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                callback(data.status === 'success');
            })
            .catch(error => {
                console.error('Error updating user info:', error);
                callback(false);
            });
    }

    // Unlock achievement and update on the server
    function unlockAchievement(email, achievementKey) {
        fetchUserInfo(email, (userData) => {
            if (userData) {
                const achievements = userData.achievements || {};
                if (!achievements[achievementKey]) {
                    achievements[achievementKey] = true;
                    updateUserInfo(email, null, achievements, (success) => {
                        if (success) {
                            alert(`Achievement unlocked: ${achievementsDefinition[achievementKey].en}`);
                        } else {
                            alert("Failed to update achievements");
                        }
                    });
                }
            }
        });
    }
});




























