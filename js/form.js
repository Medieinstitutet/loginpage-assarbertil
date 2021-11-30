// ---------------------
// Inloggningsformuläret
// ---------------------

// Hänvisa till element
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");

function loginSubmit(event) {
  event.preventDefault();

  const usersInStorage = JSON.parse(localStorage.getItem("users"));

  if (
    // Här kollar vi om användaren finns i listan
    usersInStorage.some(
      user =>
        user.username === usernameInput.value &&
        user.password === passwordInput.value
    )
  ) {
    console.log("Rätt namn & lösenord");
    setAuthState(true);
    closeDialog();
  } else {
    console.log("Fel namn eller lösenord");
  }
}
authForm.addEventListener("submit", loginSubmit);
