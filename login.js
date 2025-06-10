
  // Redirect on social icon click
  document.querySelector('.fa-facebook-square').addEventListener('click', () => {
    window.open('https://www.facebook.com', '_blank');
  });

  document.querySelector('.fa-google-plus-square').addEventListener('click', () => {
    window.open('https://mail.google.com', '_blank');
  });

  document.querySelector('.fa-twitter-square').addEventListener('click', () => {
    window.open('https://twitter.com', '_blank');
  });

  // Handle login redirect (after successful login)
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent actual form submission

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;


    // Send data to backend
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if (res.ok) {
        // Redirect to charasmash.html
        window.location.href = 'CharaSmash.html';
      } else {
        alert('Invalid email or password');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Server error');
    });
  });

    