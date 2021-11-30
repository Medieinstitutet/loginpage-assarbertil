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

// Variabel som avgör vilken vy som visas av registrering/inloggning
let authView = "login";

function loginSubmit(event) {
  event.preventDefault();

  // Om vi är på inloggningsskärmen, testa att logga in
  if (authView === "login") {
    if (logIn(usernameInput.value, passwordInput.value)) {
      closeDialog();
      changeAuthView("login"); // Sätt authView till login tills nästa gång
    } else {
      errorMessage.innerText = "Fel användarnamn eller lösenord";
      passwordInput.value = "";
    }
  }

  // Om vi är på registreringsskärmen, testa att registrera
  if (authView === "register") {
    if (register(usernameInput.value, passwordInput.value)) {
      closeDialog();
      changeAuthView("login"); // Sätt authView till login tills nästa gång
    } else {
      errorMessage.innerText = "Användarnamnet är upptaget";
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
  }

  if (authView === "login") {
    formTitle.innerText = "Logga in";
    registerButton.innerText = "Skapa konto";
    submitButton.innerText = "Logga in";
  }

  usernameInput.focus(); // Fokusera på användarnamn-fältet när vy byts
}
registerButton.addEventListener("click", event => {
  event.preventDefault();
  changeAuthView();
});
