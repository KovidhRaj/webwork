  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    // Select the female character button
    const femaleButton = document.querySelector('.female-character');

    // Add click event to redirect to female.html
    femaleButton.addEventListener('click', () => {
      window.location.href = 'female.html';
    });
  });

      document.addEventListener('DOMContentLoaded', () => {
        const maleButton = document.querySelector('.male-character');
        maleButton.addEventListener('click', () => {
          window.location.href = 'male.html';
        });
      });
