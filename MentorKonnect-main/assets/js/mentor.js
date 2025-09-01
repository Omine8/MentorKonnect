import { renderStudentsPage } from './students.js';
import { renderMailPage } from './mail.js';
import { renderTimetablePage } from './timetable.js';
import { renderMentorLeavePage } from './LeaveRequest.js';
import { renderMentorProfile} from './mentor_profilementor.js'
import { renderMentorIssuesPage } from './issues.js';

if(!localStorage.getItem("mentorId")){
  window.alert("You are not Authorized to access this page");
  window.location.href = "../../index.html";
}


function loadPage(page) {
  const content = document.getElementById('content');
  switch (page) {
    case 'dashboard':
      content.innerHTML = '<h2>Dashboard</h2><p>Welcome to your dashboard!</p>';
      break;

    case 'profile':
      renderMentorProfile(content);
      break;
    case 'students':
      renderStudentsPage(content);
      break;
    case 'issues':
      renderMentorIssuesPage(content);
      break;
    case 'leave':
      renderMentorLeavePage(content);
      break;
    case 'mail':
      renderMailPage(content);
      break;
    case 'chat':
      content.innerHTML = '<h2>Chat</h2><p>COMING SOON!!!</p>';
      break;
    case 'timetable':
      renderTimetablePage(content)
      break;
    case 'sap':
      window.open('https://kiitportal.kiituniversity.net/irj/portal/', '_blank');
      break;
    default:
      content.innerHTML = '<h2>Welcome</h2><p>Select an option from the sidebar.</p>';
  }
}
window.loadPage = loadPage;


document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '../../index.html';
    });
  }
});