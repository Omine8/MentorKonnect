

function loadPage(page) {
    switch (page) {
        case 'student':
            window.location.href = 'auth/student_signup.html';
            break;
        case 'mentor':
            window.location.href = 'auth/mentor_signup.html';
            break;
    }
}