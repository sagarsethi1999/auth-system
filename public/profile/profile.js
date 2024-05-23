document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        window.location.href = '../login/login.html';
        return;
    }

    // Fetch logged-in user's details to show profile photo
    axios.get(`http://localhost:3000/api/users/${userId}`, {
        headers: { 'Authorization': token }
    })
    .then(response => {
        const loggedInUser = response.data;
        document.getElementById('loggedInUserPhoto').src = loggedInUser.photo;
    })
    .catch(error => {
        console.error('Error fetching logged-in user details:', error);
    });

    // Fetch all profiles based on the user role
    axios.get('http://localhost:3000/api/users', {
        headers: { 'Authorization': token }
    })
    .then(response => {
        const profiles = response.data;
        const profilesContainer = document.getElementById('profilesContainer');
        profiles.forEach(profile => {
            const profileCard = document.createElement('div');
            profileCard.className = 'profile-card';

            const profilePhoto = document.createElement('img');
            profilePhoto.src = profile.photo;
            profilePhoto.alt = 'Profile Photo';
            profileCard.appendChild(profilePhoto);

            const profileName = document.createElement('h3');
            profileName.textContent = profile.name;
            profileCard.appendChild(profileName);

            const detailButton = document.createElement('button');
            detailButton.textContent = 'Details';
            detailButton.onclick = () => {
                window.location.href = `../detail/detail.html?id=${profile.id}`;
            };
            profileCard.appendChild(detailButton);

            profilesContainer.appendChild(profileCard);
        });
    })
    .catch(error => {
        console.error('Error loading profiles:', error);
    });

    document.getElementById('myProfileButton').addEventListener('click', () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            window.location.href = `../myprofile/myprofile.html?id=${userId}`;
        } else {
            
            window.location.href = '../login/login.html';
        }
    });

    document.getElementById('signOutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '../login/login.html';
    });
});
