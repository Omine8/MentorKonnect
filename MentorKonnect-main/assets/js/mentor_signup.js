document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('mentorForm');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelectorAll('input[type="password"]')[0];
  const confirmInput = form.querySelectorAll('input[type="password"]')[1];

  form.addEventListener('submit', function (e) {
    form.querySelectorAll('.error-msg').forEach(el => el.remove());

    let valid = true;

    if (!emailInput.value.endsWith('@kiit.ac.in')) {
      showError(emailInput, 'Please enter a valid KIIT email address.');
      valid = false;
    }

    if (passwordInput.value.length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters.');
      valid = false;
    }

    if (passwordInput.value !== confirmInput.value) {
      showError(confirmInput, 'Passwords do not match.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '4px';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }
});