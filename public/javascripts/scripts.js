// client side js functions

function confirmDelete() {
    return confirm('Are you sure you want to delete this?');
}

function comparePasswords() {
    let pw1 = document.querySelector('#password').value;
    let pw2 = document.querySelector('#confirm').value;
    let pwMsg = document.querySelector('#pwMsg');

    if (pw1 != pw2) {
        pwMsg.textContent = 'Passwords do not match';
        pwMsg.className = "text-danger";
        return false;
    } else {
        pwMsg.textContent = '';
        pwMsg.className = '';
        return true;
    }
}

function showHide() {
    //toggle password input type and show/hide icon
    let pw = document.querySelector('#password');
    let icon = document.querySelector('#showHide');

    if (pw.type == 'password') {
        pw.type = 'text';
        icon.classList.remove("fa-solid", "fa-eye");
        icon.classList.add("fa-solid", "fa-eye-slash");
    } else {
        pw.type = 'password';
        icon.classList.remove("fa-solid", "fa-eye-slash");
        icon.classList.add("fa-solid", "fa-eye");

    }
}