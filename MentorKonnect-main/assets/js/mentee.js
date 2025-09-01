import { renderMenteeTimetablePage } from './timetable.js';
import { renderMyMentorPage } from './mentor_profile.js';
import { renderMenteeProfile } from './mentee_profile.js';   
import { renderMenteeLeavePage } from './LeaveRequest.js';
import { renderMenteeIssuesPage } from './issues.js';

if (!localStorage.getItem("menteeId")) {
  window.alert("You are not Authorized to access this page");
  window.location.href = "../../index.html";
}

function loadPage(page) {
  const content = document.getElementById('content');

  switch (page) {
    case 'dashboard':
      content.innerHTML = '<h2>COMING SOON!!!</h2>';
       break;
    case 'profile':
      renderMenteeProfile(content);
      break;

    case 'mentor':
      renderMyMentorPage(content);
      break;
      
    case 'issues':
      renderMenteeIssuesPage(content);
      break;

    case 'leave':
      renderMenteeLeavePage(content);
      break;

    case 'chat':
      content.innerHTML = '<h2>Chat</h2><p>COMING SOON!!!</p>';
      break;
    

    case 'timetable':
       import('./timetable.js').then(mod => mod.renderMenteeTimetablePage(content));
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
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '../../index.html';
    });
  }
});
