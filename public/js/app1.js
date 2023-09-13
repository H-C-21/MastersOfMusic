const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



const resetPasswordForm = document.getElementById('reset-password-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    resetPasswordForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get input values
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      console.log(password + " " + confirmPassword);
      // Client-side validation
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // If validation passes, you can send the data to your server using fetch or another method
      // Example:
      /*
      fetch('/your-reset-password-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: resetPasswordForm.querySelector('input[type="text"]').value,
          password,
        }),
      })
      .then((response) => {
        // Handle the response from your server
        // You can redirect the user or show a success message here
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
      });
      */
    });

