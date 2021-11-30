const users = [
  { username: "Janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

// Initiera databas i local storage om den inte finns
if (!localStorage.getItem("users") || !localStorage.getItem("user")) {
  localStorage.setItem("users", JSON.stringify(users));
  setAuthState(false);
}

// Användas för att logga in eller ut en användare
// setAuthState("<namn>") för att logga in
// setAuthState(false) för att logga ut
function setAuthState(user) {
  console.log(user ? "Inloggad" : "Utloggad");
  localStorage.setItem("user", JSON.stringify(user));
  authStateChanged();
}

// Hjälper mig hålla koden fin när många saker händer när man loggar in/ut
function authStateChanged() {
  updateHeaderState();
  updateContentView();
}
