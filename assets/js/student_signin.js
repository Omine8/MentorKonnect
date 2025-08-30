document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('studentForm');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // always stop default POST
    let valid = true;

    // Clear old errors
    form.querySelectorAll('.error-msg').forEach(el => el.remove());

    // Email validation
    if (!emailInput.value.endsWith('@kiit.ac.in')) {
      showError(emailInput, 'Please enter a valid KIIT email address.');
      valid = false;
    }

    // Password validation
    if (passwordInput.value.length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters.');
      valid = false;
    }

    if (valid) {
      // ✅ Send to backend via fetch
      fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      })
      .then(res => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then(user => {
        console.log("Login successful:", user);
        alert("Login successful! Welcome " + user.email);

        if (user.userType === "MENTEE") {
          window.location.href = "../dashboards/mentee/mentee.html";
        } else if (user.userType === "MENTOR") {
          window.location.href = "../dashboards/mentor/mentor.html";
        }
      })
      .catch(err => {
        console.error(err);
        alert("Invalid credentials or server error.");
      });
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
