document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('mentorForm');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // stop normal form submission

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

    if (!valid) return;

    // ✅ Send to Spring Boot backend
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const user = await response.json();
      alert("Login successful! Welcome " + user.email);

      // redirect based on role
      if (user.userType === "MENTOR") {
        window.location.href = "../dashboards/mentor/mentor.html";
      } else if (user.userType === "MENTEE") {
        window.location.href = "../dashboards/mentee/mentee.html";
      }

    } catch (err) {
      console.error(err);
      showError(passwordInput, "Invalid email or password.");
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
