// ---------------------
// Inloggningsformuläret
// ---------------------

const users = [
  { username: "Janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

// Initiera databas i local storage
if (!localStorage.getItem("users") || !localStorage.getItem("authenticated")) {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("authenticated", false);
}

// Hänvisa till element
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");

// Användas för att logga in eller ut en användare
// Dum sak att skicka med till användarna men oh well
function setAuthState(bool) {
  console.log(bool ? "Inloggad" : "Utloggad");
  localStorage.setItem("authenticated", JSON.stringify(bool));
}

// Logik för inloggnignsformuläret
function authSubmit(event) {
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
    console.log("Rätt lösenord");
    setAuthState(true);
    updateHeaderState();
  } else {
    console.log("Fel lösenord");
  }
}
authForm.addEventListener("submit", authSubmit);

// -----------
// Dialogrutan
// -----------

// Hänvisa till alla element
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialog-content");
const closeButton = document.getElementById("dialog-close");

// Används för att stänga dialogrutan med ESC-knappen
function escClose(event) {
  event.key === "Escape" && closeDialog();
}

// Användas för att stänga dialogrutan när man klickar utanför
function outsideClickClose(event) {
  !dialogContent.contains(event.target) && closeDialog();
}

function closeDialog() {
  dialog.classList.add("hidden");
  // Ta bort alla event listeners som är kopplade till dialogrutan
  closeButton.addEventListener("click", closeDialog);
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("click", outsideClickClose);
}

function openDialog() {
  dialog.classList.remove("hidden");
  closeButton.addEventListener("click", closeDialog); // Stänga med stängknappen
  document.addEventListener("keydown", escClose); // Stänga med ESC-knappen
  setTimeout(() => document.addEventListener("click", outsideClickClose), 100); // Stänga genom att klicka utanför
  usernameInput.focus(); // Fokusera på användarnamn-fältet så fort dialogen öppnas
}

// ---------------
// Dynamisk header
// ---------------

const headerAuth = document.getElementById("header-auth");

// Ska köras när auth state ändras
function updateHeaderState() {
  const loggedIn = localStorage.getItem("user");

  if (loggedIn === true) {
    headerAuth.classList.add("btn-ghost");
    headerAuth.innerHTML = "Logga ut";
  } else {
    headerAuth.classList.remove("btn-primary");
    headerAuth.innerHTML = "Logga in";
  }
}
updateHeaderState(); // Kör för att koll om användaren är inloggad varje gång sidan laddas

// Det som körs när knappen i headern klickas
function handleClick() {
  const loggedIn = localStorage.getItem("user");

  if (loggedIn === true) {
    setAuthState(false);
  } else {
    openDialog();
  }
}
headerAuth.addEventListener("click", handleClick);
