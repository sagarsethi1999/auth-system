document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const photo = document.getElementById('photo').value;
      const name = document.getElementById('name').value;
      const bio = document.getElementById('bio').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      // Get the value of the selected admin status radio button
      const isAdmin = document.querySelector('input[name="isAdmin"]:checked').value;

      try {
          // Send registration data to the backend
          const response = await axios.post('http://3.107.51.14:3000/api/users/register', {
              photo,
              name,
              bio,
              phone,
              email,
              password,
              isAdmin
          });

          // Handle success
          alert('Registration successful');
          // Redirect to login page
          window.location.href = '../login/login.html';
      } catch (error) {
          console.error('Error registering user:', error);
          // Handle error
          alert('Registration failed. Please try again.');
      }
  });

  // Function to redirect to login page
  function redirectToLogin() {
      window.location.href = '../login/login.html';
  }
});
