export async function renderMentorProfile(content) {
  content.innerHTML = `
    <div class="mentor-profile-card">
      <div id="mentorStatus" style="margin:10px 0; color:blue;"></div>
      <div id="mentorProfileContent">
        <div style="text-align:center; color:#888;">Loading your profile...</div>
      </div>
    </div>
  `;

  const mentorId = localStorage.getItem("mentorId");
  const statusDiv = content.querySelector("#mentorStatus");
  const profileDiv = content.querySelector("#mentorProfileContent");

  if (!mentorId) {
    profileDiv.innerHTML = `<div style="color:red;">❌ Mentor ID not found. Please log in again.</div>`;
    return null;
  }

  statusDiv.textContent = "⏳ Fetching your profile...";

  try {
    const response = await fetch(`http://localhost:8080/api/mentor/${mentorId}`);
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Failed to fetch");
    }

    const m = await response.json();

    if (!m || Object.keys(m).length === 0) {
      profileDiv.innerHTML = `<div style="color:red;">⚠️ No profile data found for ID ${mentorId}.</div>`;
      return mentorId;
    }

    profileDiv.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar" title="Mentor">${m.gender === "Female" ? "👩‍🏫" : "👨‍🏫"}</div>
        <div>
          <h2 style="margin-bottom:4px;">${m.name ?? '-'}</h2>
          <div style="color:#888;">${m.designation ?? ''} ${m.department ? ' - ' + m.department : ''}</div>
        </div>
      </div>
      <div class="profile-details">
        <p><strong>Email:</strong> ${m.email ?? '-'}</p>
        <p><strong>Contact No:</strong> ${m.contactNumber ?? '-'}</p>
        <p><strong>Consultation Hours:</strong> ${m.consultationHours ?? '-'}</p>
        <p><strong>Office Location:</strong> ${m.officeLocation ?? '-'}</p>
        <p><strong>General Info:</strong> ${m.generalInfo ?? '-'}</p>
      </div>
    `;

    statusDiv.textContent = "";
    return mentorId;

  } catch (err) {
    let msg = typeof err.text === "function" ? await err.text() : err.message;
    profileDiv.innerHTML = `<div style="color:red;">❌ Failed to fetch profile: ${msg}</div>`;
    statusDiv.textContent = '';
    return mentorId;
  }
}
