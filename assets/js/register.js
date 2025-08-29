// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAQw0Kg9EXB6YC1uRyPmC1PU99jPLH_ovc",
    authDomain: "mentorkonnect-e4545.firebaseapp.com",
    projectId: "mentorkonnect-e4545",
    storageBucket: "mentorkonnect-e4545.firebasestorage.app",
    messagingSenderId: "367269534175",
    appId: "1:367269534175:web:18749fa28f63ff10194c6a",
    measurementId: "G-8M4KVXWMSQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);