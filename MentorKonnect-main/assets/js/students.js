export function renderStudentsPage(content) {
  content.innerHTML = `
    <div class="students-container">
      <h2>👩‍🎓 My Mentees</h2>
      <div id="menteesStatus" style="margin:10px 0; color:blue;"></div>
      <table class="mentee-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Roll No</th>
            <th>Address</th><th>Parent Name</th><th>Parent Contact</th>
            <th>Contact No</th><th>Department</th><th>Semester</th>
            <th>Hostel</th><th>CGPA</th>
          </tr>
        </thead>
        <tbody id="studentsList">
          <tr><td colspan="12">Loading your mentees...</td></tr>
        </tbody>
      </table>
    </div>
  `;

  const mentorId = localStorage.getItem("mentorId");
  const statusDiv = document.getElementById("menteesStatus");
  const tableBody = document.getElementById("studentsList");

  if (!mentorId) {
    tableBody.innerHTML = "<tr><td colspan='12' style='color:red;'>Mentor ID not found. Please log in again.</td></tr>";
    return;
  }

  statusDiv.textContent = `⏳ Fetching your mentees...`;
  fetch(`http://localhost:8080/api/mentor/mentees?mentorId=${mentorId}`)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
      if (!data.length) {
        tableBody.innerHTML = `<tr><td colspan='12'>No mentees found for your account.</td></tr>`;
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
    })
    .catch(async err => {
      let msg = typeof err.text === "function" ? await err.text() : err.message;
      tableBody.innerHTML = `<tr><td colspan='12' style='color:red;'>Failed to fetch mentees: ${msg}</td></tr>`;
      statusDiv.textContent = '';
    });
}