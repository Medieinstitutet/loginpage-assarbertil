const users = [
  { username: "Janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

// Initiera databas i local storage om den inte finns
if (!localStorage.getItem("users") || !localStorage.getItem("authenticated")) {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("authenticated", false);
}

// --------------------
// Logik för inloggning
// --------------------

// Hjälper för att hålla koden ren när många saker händer när man loggar in/ut
function authStateChanged() {
  updateHeaderState();
  updateContentView();
}

// Användas för att logga in eller ut en användare
/* function setAuthState(bool) {
  console.log(bool ? "Inloggad" : "Utloggad");
  localStorage.setItem("authenticated", JSON.stringify(bool));
  authStateChanged();
}
 */

const setAuthState = bool => {
  console.log(bool ? "Inloggad" : "Utloggad");
  localStorage.setItem("authenticated", JSON.stringify(bool));
  authStateChanged();
};
