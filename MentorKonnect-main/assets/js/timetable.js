export function renderTimetablePage(content) {
  content.innerHTML = `
    <div class="timetable-container">
      <h2>📅 My Timetable</h2>
      <div id="timetableStatus" style="margin:10px 0; color:blue;"></div>
      
      <!-- Upload Section -->
      <div class="upload-section" style="margin-bottom:15px;">
        <input type="file" id="timetableFile" accept="image/*" />
        <button id="uploadBtn" type="button">Upload / Update Timetable</button>
      </div>

      <!-- Display Timetable -->
      <div id="timetableDisplay" style="margin-top:20px; text-align:center;">
        <p>Loading timetable...</p>
      </div>
    </div>
  `;

  const mentorId = localStorage.getItem("mentorId");
  const statusDiv = document.getElementById("timetableStatus");
  const timetableDisplay = document.getElementById("timetableDisplay");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("timetableFile");

  if (!mentorId) {
    timetableDisplay.innerHTML = "<p style='color:red;'>Mentor ID not found. Please log in again.</p>";
    return;
  }

  function fetchTimetable() {
    statusDiv.textContent = "⏳ Fetching your timetable...";
    fetch(`http://localhost:8080/api/mentor/${mentorId}/timetable`)
      .then(response => {
        if (!response.ok) throw new Error("No timetable found");
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        timetableDisplay.innerHTML = `
          <img src="${url}" alt="Timetable" 
               style="max-width:100%; border:1px solid #ccc; border-radius:8px;" />
        `;
        statusDiv.textContent = "✅ Timetable loaded.";
      })
      .catch(() => {
        timetableDisplay.innerHTML = `<p style="color:red;">⚠️ No timetable uploaded yet.</p>`;
        statusDiv.textContent = "";
      });
  }

  uploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select an image file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    statusDiv.textContent = "⏳ Uploading image, please wait...";
    timetableDisplay.innerHTML = `<p style="color:blue;">Uploading...</p>`;
    uploadBtn.disabled = true;

    fetch(`http://localhost:8080/api/mentor/${mentorId}/timetable`, {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error("Upload failed");
        return response.json();
      })
      .then(data => {
        statusDiv.textContent = data.message || "✅ Timetable uploaded successfully!";
        uploadBtn.disabled = false;
        fetchTimetable();
      })
      .catch(err => {
        statusDiv.textContent = "❌ Upload failed: " + err.message;
        uploadBtn.disabled = false;
      });
  });

  fetchTimetable();
  
}

export async function renderMenteeTimetablePage(container) {
  const menteeId = localStorage.getItem("menteeId");
  let mentorId = null;

  try {
    const mentorRes = await fetch(`http://localhost:8080/api/mentees/${menteeId}/mentor-id`);
    if (!mentorRes.ok) throw new Error("Failed to fetch mentorId");
    
    const mentorData = await mentorRes.json();
    mentorId = mentorData.mentorId;
    const timetableRes = await fetch(`http://localhost:8080/api/timetables/mentor/${mentorId}`);
    if (!timetableRes.ok) throw new Error("Failed to fetch timetable");

    const timetableBlob = await timetableRes.blob();
    const imageUrl = URL.createObjectURL(timetableBlob);

    container.innerHTML = `
      <h2>Timetable</h2>
      <img src="${imageUrl}" alt="Mentor's Timetable"
        style="max-width:100%; border:1px solid #ddd; border-radius:8px;" />
    `;
  } catch (err) {
    console.error("Error loading timetable:", err);
    container.innerHTML = `
      <p>Could not load timetable of mentorId <b>${mentorId || "?"}</b> 
      (Mentor of menteeId <b>${menteeId}</b>).</p>
    `;
  }
}

