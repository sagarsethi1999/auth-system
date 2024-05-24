document.addEventListener('DOMContentLoaded', async function() {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id');
    const token = localStorage.getItem('token');

    try {
        // Fetch user details with authorization header
        const response = await axios.get(`http://3.107.51.14:3000/api/users/detail/${userId}`, {
            headers: {
                Authorization: token
            }
        });
        const userData = response.data;

        // Update profile details dynamically
        const profileDetailsDiv = document.getElementById('profileDetails');
        profileDetailsDiv.innerHTML = `
            <div class="profile-card">
                <div class="profile-header">
                    <img src="${userData.photo}" alt="Profile Photo" class="profile-photo">
                    <h2 class="profile-name">${userData.name}</h2>
                </div>
                <div class="profile-info">
                    <p class="profile-bio"><strong>Bio:</strong> ${userData.bio}</p>
                    <p class="profile-phone"><strong>Phone:</strong> ${userData.phone}</p>
                    <p class="profile-email"><strong>Email:</strong> ${userData.email}</p>
                    <p class="profile-public"><strong>Public Profile:</strong> ${userData.isPublic ? 'Yes' : 'No'}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
    }
});
