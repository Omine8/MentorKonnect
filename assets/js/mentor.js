function loadPage(page) {
  const content = document.getElementById('content');
  
  switch (page) {
    case 'dashboard':
      content.innerHTML = '<h2>Dashboard</h2><p>Welcome to your dashboard!</p>';
      break;

        case 'students':
      content.innerHTML = `
        <div class="students-container">
          <h2>👩‍🎓 Mentee List</h2>

          <!-- Search Mentor ID -->
          <div class="form-group">
            <label for="mentorIdSearch">Search by Mentor ID:</label>
            <input type="number" id="mentorIdSearch" placeholder="Enter Mentor ID">
            <button type="button" id="searchMenteesBtn">Search</button>
          </div>

          <div id="menteesStatus" style="margin:10px 0; color:blue;"></div>

          <table class="mentee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Address</th>
                <th>Parent Name</th>
                <th>Parent Contact</th>
                <th>Contact No</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Hostel</th>
                <th>CGPA</th>
              </tr>
            </thead>
            <tbody id="studentsList">
              <tr><td colspan="12">Enter a Mentor ID and click "Search"</td></tr>
            </tbody>
          </table>
        </div>
      `;

      // Fetch mentees function
      const fetchMenteesBySearch = async () => {
        const mentorId = document.getElementById("mentorIdSearch").value.trim();
        const statusDiv = document.getElementById("menteesStatus");
        const tableBody = document.getElementById("studentsList");

        if (!mentorId) {
          tableBody.innerHTML = "<tr><td colspan='12' style='color:red;'>⚠️ Please enter a Mentor ID</td></tr>";
          return;
        }

        statusDiv.textContent = `⏳ Fetching mentees for Mentor ID: ${mentorId}...`;

        try {
          const response = await fetch(`http://localhost:8080/api/mentor/mentees?mentorId=${mentorId}`);
          if (response.ok) {
            const data = await response.json();
            if (!data.length) {
              tableBody.innerHTML = `<tr><td colspan='12'>No mentees found for Mentor ID: ${mentorId}</td></tr>`;
            } else {
              tableBody.innerHTML = data.map(m => `
                <tr>
                  <td>${m.id}</td>
                  <td>${m.name}</td>
                  <td>${m.email}</td>
                  <td>${m.rollNumber || ''}</td>
                  <td>${m.address || ''}</td>
                  <td>${m.parentName || ''}</td>
                  <td>${m.parentContact || ''}</td>
                  <td>${m.contactNumber || ''}</td>
                  <td>${m.department || ''}</td>
                  <td>${m.semester || ''}</td>
                  <td>${m.hostelDetails || ''}</td>
                  <td>${m.cgpa || ''}</td>
                </tr>
              `).join('');
            }
            statusDiv.textContent = `✅ Fetched ${data.length} mentee(s)`;
          } else {
            const errText = await response.text();
            tableBody.innerHTML = `<tr><td colspan='12' style='color:red;'>Error: ${errText}</td></tr>`;
            statusDiv.textContent = '';
          }
        } catch (err) {
          tableBody.innerHTML = `<tr><td colspan='12' style='color:red;'>Failed to fetch mentees: ${err.message}</td></tr>`;
          statusDiv.textContent = '';
        }
      };

      // Attach click event
      setTimeout(() => {
        const searchBtn = document.getElementById("searchMenteesBtn");
        if (searchBtn) searchBtn.addEventListener("click", fetchMenteesBySearch);
      }, 100);

      break;


    case 'notices':
      content.innerHTML = '<h2>Notices</h2><p>Here are your notices.</p>';
      break;

    case 'timetable':
      content.innerHTML = '<h2>Timetable</h2><p>Your timetable is displayed here.</p>';
      break;

    case 'mail':
      content.innerHTML = `
        <div class="mail-container">
          <h2>📧 Send Mail to Mentees</h2>
          
          <!-- Manual Mentor ID Input -->
          <div class="form-group">
            <label for="mentorIdInput">Mentor ID (manual entry):</label>
            <input type="number" id="mentorIdInput" name="mentorId" placeholder="Enter mentor ID" value="101">
            <button type="button" id="fetchMenteesBtn" class="fetch-btn">Fetch Mentees</button>
          </div>

          <div id="backendStatus" style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">
            <strong>Backend Status:</strong> Checking...
          </div>

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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th> <!-- ✅ New column -->
                </tr>
              </thead>
              <tbody id="menteeList">
                <tr><td colspan="5">Enter a Mentor ID and click "Fetch Mentees"</td></tr>
              </tbody>
            </table>

            <button type="submit" class="send-btn">Send Mail</button>
          </form>
          <p id="status" class="status-msg"></p>
          
          <!-- Debug button -->
          <button onclick="testApiManually()" style="background: #ff9800; margin-top: 20px; padding: 10px; border: none; border-radius: 4px; color: white; cursor: pointer;">
            Test API Manually (Debug)
          </button>
        </div>
      `;

      // ✅ First check if backend is running
      const checkBackendStatus = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/mentor/health', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (response.ok) {
            const result = await response.text();
            document.getElementById('backendStatus').innerHTML = 
              '<strong>Backend Status:</strong> <span style="color:green;">✅ Connected - ' + result + '</span>';
          } else {
            document.getElementById('backendStatus').innerHTML = 
              '<strong>Backend Status:</strong> <span style="color:red;">❌ Error (Status: ' + response.status + ')</span>';
          }
        } catch (error) {
          document.getElementById('backendStatus').innerHTML = 
            '<strong>Backend Status:</strong> <span style="color:red;">❌ Cannot connect to backend: ' + error.message + '</span>' +
            '<br><small>Check browser console for details</small>';
          console.error('Backend connection error:', error);
        }
      };
      setTimeout(checkBackendStatus, 100);

      // ✅ Manual mentor ID fetch functionality
      setTimeout(() => {
        const fetchMenteesBtn = document.getElementById('fetchMenteesBtn');
        const mentorIdInput = document.getElementById('mentorIdInput');
        
        if (fetchMenteesBtn && mentorIdInput) {
          fetchMenteesBtn.addEventListener('click', async function() {
            const mentorId = mentorIdInput.value.trim();
            
            if (!mentorId) {
              document.getElementById("menteeList").innerHTML =
                "<tr><td colspan='5' style='color:red;'>⚠️ Please enter a Mentor ID</td></tr>";
              return;
            }
            
            await fetchMenteesByMentorId(mentorId);
          });
        }
      }, 200);

      // ✅ Function to fetch mentees by mentor ID
      const fetchMenteesByMentorId = async (mentorId) => {
        try {
          document.getElementById("menteeList").innerHTML =
            "<tr><td colspan='5'>Loading mentees for Mentor ID: " + mentorId + "...</td></tr>";
          
          const response = await fetch(`http://localhost:8080/api/mentor/mentees?mentorId=${mentorId}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
            },
          });
          
          console.log("Response status:", response.status);
          const menteeList = document.getElementById("menteeList");
          
          if (response.ok) {
            const data = await response.json();
            console.log("Mentees data received:", data);
            
            if (!data || data.length === 0) {
              menteeList.innerHTML = `<tr><td colspan='5'>No mentees found for mentor ID: ${mentorId}</td></tr>`;
            } else {
              menteeList.innerHTML = data.map(m => `
                <tr>
                  <td><input type="checkbox" class="mentee-check" value="${m.email}"></td>
                  <td>${m.id}</td>
                  <td>${m.name}</td>
                  <td>${m.email}</td>
                  <td class="mail-status"></td> <!-- ✅ Placeholder for status -->
                </tr>
              `).join("");
            }
          } else {
            const errorText = await response.text();
            console.error("Server error:", errorText);
            menteeList.innerHTML = `<tr><td colspan='5' style="color:red;">Server Error: ${errorText}</td></tr>`;
          }

          // ✅ Select All logic
          setTimeout(setupSelectAllCheckbox, 100);

        } catch (error) {
          console.error("Fetch error:", error);
          document.getElementById("menteeList").innerHTML =
            "<tr><td colspan='5' style='color:red;'>" +
            "⚠️ Failed to connect to server: " + error.message + "<br>" +
            "Check: 1. Backend running 2. CORS configured 3. URL correct</td></tr>";
        }
      };

      function setupSelectAllCheckbox() {
        const selectAll = document.getElementById("selectAll");
        if (selectAll) {
          selectAll.addEventListener("change", function () {
            document.querySelectorAll(".mentee-check").forEach((cb) => {
              cb.checked = selectAll.checked;
            });
          });

          document.querySelectorAll(".mentee-check").forEach((cb) => {
            cb.addEventListener("change", () => {
              const all = document.querySelectorAll(".mentee-check").length;
              const checked = document.querySelectorAll(".mentee-check:checked").length;
              selectAll.checked = all === checked;
            });
          });
        }
      }

      // ✅ Setup mail form submission
      setTimeout(() => {
        const form = document.getElementById("mailForm");
        if (!form) {
          console.error("Mail form not found!");
          return;
        }

        form.addEventListener("submit", async function (e) {
          e.preventDefault();
          console.log("Form submitted!");

          const subject = document.getElementById("subject").value.trim();
          const message = document.getElementById("message").value.trim();
          const selectedMails = Array.from(
            document.querySelectorAll(".mentee-check:checked")
          ).map((cb) => cb.value);

          const statusMsg = document.getElementById("status");
          if (!statusMsg) {
            console.error("Status message element not found!");
            return;
          }

          // Validation
          if (selectedMails.length === 0) {
            statusMsg.textContent = "⚠️ Please select at least one mentee.";
            statusMsg.style.color = "red";
            return;
          }
          if (!subject || !message) {
            statusMsg.textContent = "⚠️ Please fill in both subject and message.";
            statusMsg.style.color = "red";
            return;
          }

          // Show loading
          statusMsg.textContent = "⏳ Sending emails...";
          statusMsg.style.color = "blue";

          try {
            console.log("Attempting to send emails to:", selectedMails);
            
            const response = await fetch(
              "http://localhost:8080/api/mentor/notify-mentees",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  subject: subject,
                  message: message,
                  recipients: selectedMails
                }),
              }
            );

            console.log("Response status:", response.status);
            
            if (response.ok) {
              const results = await response.json();
              statusMsg.textContent = "📩 Mail results:";
              statusMsg.style.color = "black";

              // Update each row with result
              document.querySelectorAll(".mentee-check").forEach((cb) => {
                const email = cb.value;
                const row = cb.closest("tr");
                if (results[email]) {
                  let statusCell = row.querySelector(".mail-status");
                  statusCell.textContent = results[email];
                  statusCell.style.color = results[email].startsWith("✅") ? "green" : "red";
                }
              });

              // Reset subject & message
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
            console.error("Fetch error details:", error);
            statusMsg.textContent = "⚠️ Error connecting to server: " + error.message;
            statusMsg.style.color = "red";
          }
        });
      }, 300);

      // ✅ Debug function
      window.testApiManually = async function() {
        try {
          console.log("Testing API manually...");
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
          console.log("API Test Result:", result);
        } catch (error) {
          alert("API Test Error: " + error.message);
          console.error("API Test Error:", error);
        }
      };

      break;

    case 'sap':
      window.open('https://kiitportal.kiituniversity.net/irj/portal/', '_blank');
      break;

    default:
      content.innerHTML = '<h2>Welcome</h2><p>Select an option from the sidebar.</p>';
  }
}
