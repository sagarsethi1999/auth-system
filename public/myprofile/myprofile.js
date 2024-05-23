document.addEventListener('DOMContentLoaded', function() {
    // Get authentication token from local storage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
        // If token doesn't exist, redirect the user to the login page
        window.location.href = 'login.html';
        return;
    }

    // Get logged-in user's ID from local storage
    const userId = localStorage.getItem('userId');

    // Fetch user details with authentication token
    axios.get(`http://localhost:3000/api/users/${userId}`, {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        // Handle successful response
        const userData = response.data;
        displayUserProfile(userData);
    })
    .catch(error => {
        // Handle error response
        console.error('Error fetching user details:', error);
        // If there's an error fetching user details (e.g., unauthorized), redirect to login page
        window.location.href = 'login.html';
    });

    // Function to display user profile
    function displayUserProfile(userData) {
        const profileDetailsDiv = document.getElementById('profileDetails');
        profileDetailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Bio:</strong> ${userData.bio}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Public Profile:</strong> ${userData.isPublic ? 'Yes' : 'No'}</p>
        `;
    }

    // Edit button functionality
    const editButton = document.getElementById('editButton');
    editButton.addEventListener('click', function() {
        // Redirect to edit profile page
        window.location.href = '../editprofile/editprofile.html';
    });

});
