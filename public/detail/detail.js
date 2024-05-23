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

        // Display user details (excluding password)
        const profileDetailsDiv = document.getElementById('profileDetails');
        profileDetailsDiv.innerHTML = `
        <img src="${userData.photo}" alt="Profile Photo">
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Bio:</strong> ${userData.bio}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Public Profile:</strong> ${userData.isPublic ? 'Yes' : 'No'}</p>
            
            
        `;
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
    }
});


