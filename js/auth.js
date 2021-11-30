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
// setAuthState("namn") för att logga in
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

//
// Registrera konton / Logga in
//

function register() {
  // Plocka ut alla användare från "databasen"
  const usersInStorage = JSON.parse(localStorage.getItem("users"));

  // Kolla först att användarnamnet inte redan finns i listan
  if (usersInStorage.some(user => user.username === usernameInput.value)) {
    errorMessage.innerText = "Användaren finns redan";
    console.log("Finn");
    return;
  }

  // Lägg sen till vår nya användare i listan
  usersInStorage.push({
    username: usernameInput.value,
    password: passwordInput.value,
  });

  // Och sätt sist tillbaka den uppdaterade listan i localStorage
  localStorage.setItem("users", JSON.stringify(usersInStorage));

  setAuthState(usernameInput.value);
  closeDialog();
}

function logIn(username, password) {
  const usersInStorage = JSON.parse(localStorage.getItem("users"));

  // Här kollar vi om användaren finns i listan
  if (
    usersInStorage.some(
      user => user.username === username && user.password === password
    )
  ) {
    // Finns den, sätt inloggningen i localStorage och returnera true
    setAuthState(usernameInput.value);
    return true;
  } else {
    // Annars returnera false
    return false;
  }
}
