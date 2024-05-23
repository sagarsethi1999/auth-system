document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    axios.post('http://3.107.51.14:3000/api/users/login', { 
      email: email,
      password: password
    })
    .then((response) => {
      const token = response.data.token;
      const userId = response.data.userId;
      console.log(token);
      console.log(userId);
     
      if (token && userId) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          window.location.href = '../profile/profile.html';
      } else {
          alert('Invalid email or password');
      }
  })

  
  .catch(error => {
    console.error('Error logging in:', error);
  });
});
