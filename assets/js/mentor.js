function loadPage(page) {
  const content = document.getElementById("content");
  switch (page) {
    case "dashboard":
      content.innerHTML = "<h2>Dashboard</h2><p>Welcome to your dashboard!</p>";
      break;
    case "students":
      content.innerHTML = `
    <h2>Students</h2>
    <input type="text" id="searchBox" placeholder="🔍 Search by name, roll no, branch, hostel..." 
           style="padding:8px; width:50%; margin:10px 0; border:1px solid #ccc; border-radius:5px;">
    <table border="1">
      <thead>
        <tr>
          <th>ID Photo</th>
          <th>Roll Number</th>
          <th>Name</th>
          <th>Father's Name</th>
          <th>Course</th>
          <th>Hostel</th>
          <th>CGPA</th>
        </tr>
      </thead>
      <tbody id="data-output"></tbody>
    </table>
  `;
      const oldScript = document.getElementById("students-script");
      if (oldScript) oldScript.remove();
      const script = document.createElement("script");
      script.src = "../../assets/js/students.js";
      script.id = "students-script";
      document.body.appendChild(script);
      break;

    case "notices":
      content.innerHTML = "<h2>Notices</h2><p>Here are your notices.</p>";
      break;
    case "timetable":
      content.innerHTML =
        "<h2>Timetable</h2><p>Your timetable is displayed here.</p>";
      break;
    case "mail":
      content.innerHTML = "<h2>Mail</h2><p>Check your mail here.</p>";
      break;
    case "sap":
      window.open(
        "https://kiitportal.kiituniversity.net/irj/portal/",
        "_blank"
      );
      break;
    default:
      content.innerHTML =
        "<h2>Welcome</h2><p>Select an option from the sidebar.</p>";
  }
}
