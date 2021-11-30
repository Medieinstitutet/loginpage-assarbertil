// Registrerade användare
const users = [
  { username: "Janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

// Hänvisa till alla element
const headerAuth = document.getElementById("header-auth");
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");

// Kolla om användaren är inloggad varje gång sidan laddas
if (localStorage.getItem("user")) {
  headerAuth.classList.add("btn-ghost");
  headerAuth.innerHTML = "Logga ut";
}

// Kör denna när authentication state har ändrats
const updateHeaderState = () => {
  if (localStorage.getItem("user")) {
    headerAuth.classList.add("btn-ghost");
  } else {
    headerAuth.classList.remove("btn-ghost");
  }
};

const onAuthSubmit = e => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  localStorage.setItem("user", JSON.stringify({ username, password }));
  updateHeaderState();
};

authForm.addEventListener("submit", onAuthSubmit);
