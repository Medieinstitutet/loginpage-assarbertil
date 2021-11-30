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

function openDialog() {
  dialog.classList.remove("hidden");
  closeButton.addEventListener("click", closeDialog); // Stänga med stängknappen
  document.addEventListener("keydown", escClose); // Stänga med ESC-knappen
  setTimeout(() => document.addEventListener("click", outsideClickClose), 100); // Stänga genom att klicka utanför
  usernameInput.focus(); // Fokusera på användarnamn-fältet så fort dialogen öppnas
}

function closeDialog() {
  dialog.classList.add("hidden");
  // Ta bort alla event listeners som är kopplade till dialogrutan när den stängs
  closeButton.addEventListener("click", closeDialog);
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("click", outsideClickClose);
}

// ----------
// Gränssnitt
// ----------

// ---------------
// Dynamisk header
// ---------------

const headerButton = document.getElementById("header-auth");

// Ska köras när auth state ändras
function updateHeaderState() {
  const loggedIn = JSON.parse(localStorage.getItem("authenticated"));

  if (loggedIn) {
    headerButton.classList.add("btn-ghost");
    headerButton.innerHTML = "Logga ut";
  } else {
    headerButton.classList.remove("btn-ghost");
    headerButton.innerHTML = "Logga in";
  }
}
updateHeaderState(); // Kör för att kolla om användaren är inloggad när sidan laddas

// Körs när knappen i headern klickas
function headerButtonClick() {
  const loggedIn = JSON.parse(localStorage.getItem("authenticated"));

  if (loggedIn) {
    setAuthState(false);
  } else {
    openDialog();
  }
}
headerButton.addEventListener("click", headerButtonClick);

// --------------
// Knappen i hero
// --------------

const heroButton = document.getElementById("hero-button");
heroButton.addEventListener("click", () => openDialog());

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
