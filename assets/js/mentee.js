
function loadPage(page) {
  const content = document.getElementById('content');
  switch (page) {
    case 'dashboard':
      content.innerHTML = '<h2>Dashboard</h2><p>Welcome to your dashboard!</p>';
      break;
    case 'profile':
      content.innerHTML = '<h2>Profile</h2><p>Here is your profile information.</p>';
      break;
    case 'notices':
      content.innerHTML = '<h2>Notices</h2><p>Check out the latest notices here.</p>';
      break;
    case 'timetable':
      content.innerHTML = '<h2>Timetable</h2><p>Your timetable will be displayed here.</p>';
      break;
    case 'mail':
      content.innerHTML = '<h2>Mail</h2><p>Access your mail here.</p>';
      break;
    case 'sap':
      window.open('https://kiitportal.kiituniversity.net/irj/portal/', '_blank');
      break;
    default:
      content.innerHTML = '<h2>Welcome</h2><p>Select an option from the sidebar.</p>';
  }
}