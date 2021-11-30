// ---------------------
// Inloggningsformuläret
// ---------------------

// Hänvisa till element
const authForm = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");
const submitButton = document.getElementById("form-submit");
const errorMessage = document.getElementById("login-error");
const registerButton = document.getElementById("register-button");

// Skapa en variabel som avgör vilken vy som visas av registrering/inloggning
let authView = "login";

function loginSubmit(event) {
  event.preventDefault();

  if (logIn(usernameInput.value, passwordInput.value)) {
    // Om användaren finns, logga in

    closeDialog();
    changeAuthView("login"); // Sätt authView till login tills nästa gång
  } else {
    if (authView === "login") {
      // Skriv text i felmeddelandet om användaren inte finns
      errorMessage.innerText = "Fel namn eller lösenord";
    } else if (authView === "register") {
      register(); // Registrera användaren istället
      changeAuthView("login"); // Sätt authView till login tills nästa gång
    }
  }
}
authForm.addEventListener("submit", loginSubmit);

// Töm formuläret
function clearAuthForm() {
  usernameInput.value = "";
  passwordInput.value = "";
  errorMessage.innerText = "";
}

function changeAuthView(value) {
  if (value) {
    authView = value;
  } else {
    authView === "register" ? (authView = "login") : (authView = "register");
  }

  // Dölj eventuellt felmeddelande
  errorMessage.innerText = "";

  if (authView === "register") {
    formTitle.innerText = "Registrera konto";
    registerButton.innerText = "Logga in";
    submitButton.innerText = "Registrera";
  } else {
    formTitle.innerText = "Logga in";
    registerButton.innerText = "Skapa konto";
    submitButton.innerText = "Logga in";
  }
}
registerButton.addEventListener("click", event => {
  event.preventDefault();
  changeAuthView();
});
