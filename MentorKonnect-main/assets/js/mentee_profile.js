export function renderMenteeProfile(content) {
  content.innerHTML = `
    <div class="mentee-profile-card">
      <div id="menteeStatus" style="margin:10px 0; color:blue;"></div>
      <div id="menteeProfileContent">
        <div style="text-align:center; color:#888;">Loading your profile...</div>
      </div>
    </div>
  `;

  const profileDiv = document.getElementById("menteeProfileContent");
  const menteeId = localStorage.getItem("menteeId");

  if (!menteeId) {
    profileDiv.innerHTML = `<div style="color:red;">❌ No menteeId found in localStorage. Please log in again.</div>`;
    return;
  }

  fetch(`http://localhost:8080/api/mentees/${menteeId}`)
    .then(async response => {
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to fetch");
      }
      return response.json();
    })
    .then(m => {
      if (!m || Object.keys(m).length === 0) {
        profileDiv.innerHTML = `<div style="color:red;">⚠️ No profile data found for ID ${menteeId}.</div>`;
        return;
      }

      profileDiv.innerHTML = `
        <div class="profile-header">
          <div class="profile-avatar" title="Mentee">${m.gender === "Male" ? "👨‍🎓" : "👩‍🎓"}</div>
          <div>
            <h2 style="margin-bottom:4px;">${m.name ?? '-'}</h2>
            <div style="color:#888;">${m.department ?? ''} ${m.semester ? ' - Semester ' + m.semester : ''}</div>
          </div>
        </div>
        <div class="profile-details">
          <p><strong>Email:</strong> ${m.email ?? '-'}</p>
          <p><strong>Roll Number:</strong> ${m.rollNumber ?? '-'}</p>
          <p><strong>Contact No:</strong> ${m.contactNumber ?? '-'}</p>
          <p><strong>Address:</strong> ${m.address ?? '-'}</p>
          <p><strong>Parent Name:</strong> ${m.parentName ?? '-'}</p>
          <p><strong>Parent Contact:</strong> ${m.parentContact ?? '-'}</p>
          <p><strong>Hostel:</strong> ${m.hostelDetails ?? '-'}</p>
          <p><strong>CGPA:</strong> ${m.cgpa ?? '-'}</p>
        </div>
      `;
    })
    .catch(err => {
      profileDiv.innerHTML = `<div style="color:red;">⚠️ Failed to fetch profile for ID ${menteeId}.<br><small>${err.message}</small></div>`;
    });
}
