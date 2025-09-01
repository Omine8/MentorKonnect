export function renderMailPage(content) {
  content.innerHTML = `
    <div>
      <h2>📧 Send Mail to Mentees</h2>
      <form id="mailForm" class="mail-form">
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input type="text" id="subject" name="subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        <h3 style="margin:20px 0 10px; color:black;">👩‍🎓 Select Mentees</h3>
        <table class="mentee-table">
          <thead>
            <tr>
              <th><input type="checkbox" id="selectAll"></th>
              <th>ID</th><th>Name</th><th>Email</th>
            </tr>
          </thead>
          <tbody id="menteeList">
            <tr><td colspan="4">Loading mentees...</td></tr>
          </tbody>
        </table>
        <button type="submit" class="send-btn">Send Mail</button>
      </form>
      <p id="status" class="status-msg"></p>
    </div>
  `;

  const mentorId = localStorage.getItem("mentorId");
  if (mentorId) {
    fetchMenteesByMentorId(mentorId);
  } else {
    document.getElementById("menteeList").innerHTML =
      "<tr><td colspan='4' style='color:red;'>⚠️ No mentorId found in localStorage</td></tr>";
  }

  async function fetchMenteesByMentorId(mentorId) {
    const menteeList = document.getElementById("menteeList");
    menteeList.innerHTML = `<tr><td colspan='4'>Loading mentees for Mentor ID: ${mentorId}...</td></tr>`;
    try {
      const response = await fetch(`http://localhost:8080/api/mentor/mentees?mentorId=${mentorId}`);
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      if (!data.length) {
        menteeList.innerHTML = `<tr><td colspan='4'>No mentees found for mentor ID: ${mentorId}</td></tr>`;
      } else {
        menteeList.innerHTML = data.map(m => `
          <tr>
            <td><input type="checkbox" class="mentee-check" value="${m.email}"></td>
            <td>${m.id}</td>
            <td>${m.name}</td>
            <td>${m.email}</td>
          </tr>
        `).join("");
      }
      setupSelectAllCheckbox();
    } catch (error) {
      menteeList.innerHTML = `<tr><td colspan='4' style="color:red;">⚠️ Failed to connect to server: ${error.message}</td></tr>`;
    }
  }

  function setupSelectAllCheckbox() {
    const selectAll = document.getElementById("selectAll");
    if (!selectAll) return;
    selectAll.addEventListener("change", function () {
      document.querySelectorAll(".mentee-check").forEach(cb => cb.checked = selectAll.checked);
    });
    document.querySelectorAll(".mentee-check").forEach(cb => {
      cb.addEventListener("change", () => {
        const all = document.querySelectorAll(".mentee-check").length;
        const checked = document.querySelectorAll(".mentee-check:checked").length;
        selectAll.checked = all === checked;
      });
    });
  }

  document.getElementById("mailForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const selectedMails = Array.from(document.querySelectorAll(".mentee-check:checked")).map(cb => cb.value);
    const statusMsg = document.getElementById("status");
    if (!selectedMails.length) {
      statusMsg.textContent = "⚠️ Please select at least one mentee.";
      statusMsg.style.color = "red";
      return;
    }
    if (!subject || !message) {
      statusMsg.textContent = "⚠️ Please fill in both subject and message.";
      statusMsg.style.color = "red";
      return;
    }
    statusMsg.textContent = "⏳ Sending emails...";
    statusMsg.style.color = "blue";
    try {
      const response = await fetch(
        "http://localhost:8080/api/mentor/notify-mentees",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject, message, recipients: selectedMails }),
        }
      );
      if (response.ok) {
        statusMsg.textContent = "📩 Mail sent successfully!";
        statusMsg.style.color = "green";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
        document.querySelectorAll(".mentee-check").forEach(cb => cb.checked = false);
        const selectAll = document.getElementById("selectAll");
        if (selectAll) selectAll.checked = false;
      } else {
        const err = await response.text();
        statusMsg.textContent = "❌ Error: " + err;
        statusMsg.style.color = "red";
      }
    } catch (error) {
      statusMsg.textContent = "⚠️ Error connecting to server: " + error.message;
      statusMsg.style.color = "red";
    }
  });

  window.testApiManually = async function() {
    try {
      const response = await fetch('http://localhost:8080/api/mentor/notify-mentees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Test Subject',
          message: 'Test Message',
          recipients: ['test@example.com']
        })
      });
      const result = await response.text();
      alert("API Test Result: " + result + " (Status: " + response.status + ")");
    } catch (error) {
      alert("API Test Error: " + error.message);
    }
  };
}
