const users = [
  { username: "janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

// Initiera databas i local storage om den inte finns
if (!localStorage.getItem("users") || !localStorage.getItem("user")) {
  resetLocalStorage();
}

function resetLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
  logOut(false);
}

// Användas bakom scenerna för att logga in eller ut en användare
function setAuthState(user) {
  console.log(user ? "Inloggad" : "Utloggad");
  localStorage.setItem("user", JSON.stringify(user));
  authStateChanged();
}

// Alla saker som behöver veta när deras innehåll ska ändras baserat på inloggning
function authStateChanged() {
  updateHeaderState();
  updateContentView();
}

// Funktion för att registrera användare
function register(username, password) {
  // Plocka ut alla användare från "databasen"
  const usersInStorage = JSON.parse(localStorage.getItem("users"));

  // Kolla först att användarnamnet inte redan finns i listan
  if (usersInStorage.some(user => user.username === username)) {
    errorMessage.innerText = "Användaren finns redan";
    return false;
  }

  // Lägg sen till vår nya användare i listan
  usersInStorage.push({
    username: username,
    password: password,
  });

  // Sätt sist tillbaka den uppdaterade listan i localStorage
  localStorage.setItem("users", JSON.stringify(usersInStorage));

  // Logga även in användaren
  setAuthState(usernameInput.value);

  // Visa att allt gick bra
  return true;
}

// Funktion för att logga in användare
function logIn(username, password) {
  const usersInStorage = JSON.parse(localStorage.getItem("users"));

  // Här kollar vi om användaren finns i listan
  if (
    usersInStorage.some(
      user => user.username === username && user.password === password
    )
  ) {
    // Finns användaren, sätt inloggningen i localStorage och returnera true
    setAuthState(usernameInput.value);
    return true;
  } else {
    // Annars returnera false
    return false;
  }
}

// Funktion för att logga ut användare
function logOut() {
  setAuthState(false);
}
