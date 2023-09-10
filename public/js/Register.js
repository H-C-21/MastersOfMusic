
// const register = document.getElementById('btn');

// register.onclick = function () {
//     const pswrd = document.getElementById('password');
//     const confpassword = document.getElementById('confirm password');
//     console.log(pswrd.value);
//     console.log(confpassword.value);
//     if (pswrd !== confpassword) {
//         window.alert('your password did not  match ');
//         console.log('password doesnot match');
//     }
// }



function validateForm() {
    var fullname = document.getElementById("full_name").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
    var email = document.getElementById("email").value;


    if (fullname == "") {
        alert(" full Name must be filled out");
        return false;
    }
    if (username == "") {
        alert(" Username must be filled out");
        return false;
    }
    if (email == "") {
        alert(" Email must be filled out");
        return false;
    }
    if (password == "") {
        alert(" Password must be filled out");
        return false;
    }
    if (confirmPassword == "") {
        alert(" Confirm Password must be filled out");
        return false;
    }


    if (password.length < 4) {
        alert("Password must be at least 4 characters long");
        return false;
    }

    if (password.length > 10) {
        alert("Password must not be greater than 10 characters long");
        return false;
    }


    if (confirmPassword != password) {
        alert("Passwords do not match");
        return false;
    }


    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return false;
    }


    return true;
}

