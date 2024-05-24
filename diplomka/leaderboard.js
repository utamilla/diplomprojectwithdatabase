document.addEventListener('DOMContentLoaded', () => {
    const leaderboardContainer = document.getElementById('top-users-list');

    // Function to get all user XP and details from localStorage
    function fetchUsersAndDisplayLeaderboard() {
        const usersData = JSON.parse(localStorage.getItem('usersData') || '{}');
        let leaderboardData = [];

        // Iterate over the usersData to fetch each user's XP
        for (let [email, userData] of Object.entries(usersData)) {
            const xpKey = 'currentXP_' + email;
            const userXP = parseInt(localStorage.getItem(xpKey), 10) || 0;  // Get XP, default to 0 if not found
            leaderboardData.push({
                name: userData.name,
                xp: userXP
            });
        }

        // Sort by XP in descending order
        leaderboardData.sort((a, b) => b.xp - a.xp);

        // Display the leaderboard
        displayLeaderboard(leaderboardData);
    }

    // Function to display the leaderboard on the page
    function displayLeaderboard(data) {
        let rank = 1; // Initialize rank counter
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${rank}. ${user.name} - ${user.xp} XP`; // Include rank before the name
            leaderboardContainer.appendChild(listItem);
            rank++; // Increment rank for the next user
        });
    }

    fetchUsersAndDisplayLeaderboard();
});

document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    const leaderboardTitle = document.getElementById('leaderboard-title');

    const titles = {
        'en': 'Top Users by XP',
        'ru': 'Топ пользователей по XP',
        'kk': 'XP бойынша үздік қолданушылар'
    };

    // Function to update the leaderboard title based on the selected language
    function updateLeaderboardTitle() {
        const selectedLanguage = languageSelector.value;
        leaderboardTitle.textContent = titles[selectedLanguage];
    }

    // Event listener for changes in the language selector
    languageSelector.addEventListener('change', updateLeaderboardTitle);

    // Initial update on page load
    updateLeaderboardTitle();
});


    







