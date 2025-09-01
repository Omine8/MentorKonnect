export function renderMyMentorPage(content) {
  content.innerHTML = `
    <div class="mentor-profile-card">
      <div id="mentorStatus" style="margin:10px 0; color:blue;"></div>
      <div id="mentorProfileContent">
        <div style="text-align:center; color:#888;">Loading mentor details...</div>
      </div>
    </div>
  `;

  const menteeId = localStorage.getItem("menteeId");
  const statusDiv = document.getElementById("mentorStatus");
  const profileDiv = document.getElementById("mentorProfileContent");

  if (!menteeId) {
    profileDiv.innerHTML = `<div style="color:red;">Mentee ID not found. Please log in again.</div>`;
    return;
  }

  statusDiv.textContent = `⏳ Fetching your mentor details...`;

  fetch(`http://localhost:8080/api/mentees/${menteeId}/mentor`)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(mentor => {
      if (!mentor || !mentor.id) {
        profileDiv.innerHTML = `<div style="color:#888;">No mentor assigned to your account.</div>`;
      } else {
        profileDiv.innerHTML = `
          <div class="profile-header">
            <div class="profile-avatar" title="Mentor">${mentor.gender === "Female" ? "👩‍🏫" : "👨‍🏫"}</div>
            <div>
              <h2 style="margin-bottom:4px;">${mentor.name || 'Mentor Name'}</h2>
              <div style="color:#888;">${mentor.designation || ''} ${mentor.department ? ' - ' + mentor.department : ''}</div>
            </div>
          </div>
          <div class="profile-details">
            <p><strong>Email:</strong> ${mentor.email || ''}</p>
            <p><strong>Contact No:</strong> ${mentor.contactNumber || ''}</p>
            <p><strong>Consultation Hours:</strong> ${mentor.consultationHours || ''}</p>
            <p><strong>Office Location:</strong> ${mentor.officeLocation || ''}</p>
            <p><strong>General Info:</strong> ${mentor.generalInfo || ''}</p>
          </div>
        `;
      }
      statusDiv.textContent = ``;
    })
    .catch(async err => {
      let msg = typeof err.text === "function" ? await err.text() : err.message;
      profileDiv.innerHTML = `<div style="color:red;">Failed to fetch mentor: ${msg}</div>`;
      statusDiv.textContent = '';
    });
}
