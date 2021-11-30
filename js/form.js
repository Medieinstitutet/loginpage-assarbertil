// ---------------------
// Inloggningsformuläret
// ---------------------

// Hänvisa till element
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");
const submitButton = document.getElementById("form-submit");
const errorMessage = document.getElementById("login-error");

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
    setAuthState(usernameInput.value);
    closeDialog();
  } else {
    console.log("Fel namn eller lösenord");
    // Skriv text i elementet för felmeddelanden
    errorMessage.innerText = "Fel namn eller lösenord";
  }
}
authForm.addEventListener("submit", loginSubmit);

// Töm formuläret
function clearAuthForm() {
  usernameInput.value = "";
  passwordInput.value = "";
  errorMessage.innerText = "";
}
