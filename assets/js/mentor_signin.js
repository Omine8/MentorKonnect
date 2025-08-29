document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('mentorForm');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');

  form.addEventListener('submit', function (e) {
    let valid = true;
    form.querySelectorAll('.error-msg').forEach(el => el.remove());

    if (!emailInput.value.endsWith('@kiit.ac.in')) {
      showError(emailInput, 'Please enter a valid KIIT email address.');
      valid = false;
    }

    if (passwordInput.value.length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }

    fetch("http://localhost:8080/login", {
      method : "POST", 
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify(data)
    })
    .then(res => {
      if(!res.ok) throw new Error("Signup Failed.");
      return res.json();
    })
    .then(result => {
      alert("Signup Succesfull for " + result.email)
    })
    .catch(err => {
      alert("❌ " + err.message)
    });

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