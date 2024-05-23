document.addEventListener('DOMContentLoaded', async function() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
        // Redirect to login page if user ID or token is missing
        window.location.href = '../login/login.html';
        return;
    }

    const editProfileForm = document.getElementById('editProfileForm');
    const toggleVisibilityButton = document.getElementById('toggleVisibilityButton');

    try {
        // Fetch user details
        const response = await axios.get(`http://3.107.51.14:3000/api/users/${userId}`, {
            headers: { Authorization: token }
        });
        const userData = response.data;

        // Populate form with user details
        document.getElementById('name').value = userData.name;
        document.getElementById('bio').value = userData.bio;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('photo').value = userData.photo; // Set photo value from backend

        // Set initial visibility state
        toggleVisibilityButton.textContent = userData.isPublic ? 'Make Profile Private' : 'Make Profile Public';

        // Handle form submission
        editProfileForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            // Get updated user details from form
            const updatedUserData = {
                name: document.getElementById('name').value,
                bio: document.getElementById('bio').value,
                phone: document.getElementById('phone').value,
                photo: document.getElementById('photo').value
            };
            // Update user details
            await axios.put(`http://3.107.51.14:3000/api/users/${userId}`, updatedUserData, {
                headers: { Authorization: token }
            });
            alert('Profile updated successfully');
            // Redirect back to profile page
            window.location.href = '../profile/profile.html';
        });
        


        // Handle profile visibility toggle
        toggleVisibilityButton.addEventListener('click', async function() {
            const newVisibility = !userData.isPublic;
            const visibilityText = newVisibility ? 'public' : 'private';
            const confirmation = confirm(`Are you sure you want to make your profile ${visibilityText}?`);
            if (confirmation) {
                // Update profile visibility
                await axios.put(`http://3.107.51.14:3000/api/users/${userId}/visibility`, { isPublic: newVisibility }, {
                    headers: { Authorization: token }
                });
                // Update button text
                toggleVisibilityButton.textContent = newVisibility ? 'Make Profile Private' : 'Make Profile Public';
                alert(`Profile visibility set to ${visibilityText}`);
            }
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
    }
});

