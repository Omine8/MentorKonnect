document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('studentForm');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelectorAll('input[type="password"]')[0];
  const confirmInput = form.querySelectorAll('input[type="password"]')[1];

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
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

    if (passwordInput.value !== confirmInput.value) {
      showError(confirmInput, 'Passwords do not match.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const studentData = {
      email: emailInput.value,
      password: passwordInput.value

    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/student/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        throw new Error("Signup failed! Please try again.");
      }

      const data = await response.json();
      alert("Signup successful! Welcome " + data.email);

      window.location.href = "/dashboards/mentee.html";

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
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