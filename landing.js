

function loadPage(page) {
    switch (page) {
        case 'student':
            window.location.href = 'student_signup.html';
            break;
        case 'mentor':
            window.location.href = 'mentor_signup.html';
            break;
    }
}