//
// Inloggningsformuläret
//

const users = [
  { username: "Janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

// Hänvisa till alla element
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");

// Funktion som kan användas överallt för att logga in eller ut en användare
// Dum sak att skicka med till användarna när det funkar så här men oh well
export const setAuthState = bool => {
  console.log(bool ? "Inloggad" : "Utloggad");
  localStorage.setItem("authenticated", JSON.stringify(bool));
  loggedIn = bool;
};

// Logik för inloggnignsformuläret
const authSubmit = event => {
  event.preventDefault();

  if (
    // Här kollar vi om användaren finns i listan
    users.some(
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
};
authForm.addEventListener("submit", authSubmit);

//
// Dialogrutan
//

// Hänvisa till alla element
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialog-content");
const closeButton = document.getElementById("dialog-close");

// Används för att stänga dialogrutan med ESC-knappen
const escClose = event => event.key === "Escape" && closeDialog();

// Användas för att stänga dialogrutan när man klickar utanför
const outsideClickClose = event =>
  !dialogContent.contains(event.target) && closeDialog();

const closeDialog = () => {
  dialog.classList.add("hidden");
  // Ta bort alla event listeners som är kopplade till dialogrutan
  closeButton.addEventListener("click", closeDialog);
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("click", outsideClickClose);
};

export const openDialog = () => {
  dialog.classList.remove("hidden");
  closeButton.addEventListener("click", closeDialog); // Stänga med stängknappen
  document.addEventListener("keydown", escClose); // Stänga med ESC-knappen
  setTimeout(() => document.addEventListener("click", outsideClickClose), 0); // Stänga genom att klicka utanför
};
