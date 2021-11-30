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

// Ifall ingen användarinfo är sparad i local storage, lägg dit ett falskt värde ändå
!localStorage.getItem("authenticated") &&
  localStorage.setItem("authenticated", false);

// Funktion som kan användas överallt för att logga in eller ut en användare
// Dum sak att skicka med till användarna när det funkar så här men oh well
const setAuthState = bool => {
  console.log(bool ? "Inloggad" : "Utloggad");
  localStorage.setItem("authenticated", JSON.stringify(bool));
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

const openDialog = () => {
  dialog.classList.remove("hidden");
  closeButton.addEventListener("click", closeDialog); // Stänga med stängknappen
  document.addEventListener("keydown", escClose); // Stänga med ESC-knappen
  setTimeout(() => document.addEventListener("click", outsideClickClose), 100); // Stänga genom att klicka utanför

  usernameInput.focus(); // Fokusera på användarnamn-fältet så fort dialogen öppnas
};

//
// Dynamisk header
//

const headerAuth = document.getElementById("header-auth");

// Ska köras när auth state ändras
const updateHeaderState = () => {
  const loggedIn = localStorage.getItem("user");

  if (loggedIn === true) {
    headerAuth.classList.add("btn-ghost");
    headerAuth.innerHTML = "Logga ut";
  } else {
    headerAuth.classList.remove("btn-primary");
    headerAuth.innerHTML = "Logga in";
  }
};

// Kolla om användaren är inloggad varje gång sidan laddas
updateHeaderState();

// Det som körs när knappen i headern klickas
const handleClick = () => {
  const loggedIn = localStorage.getItem("user");

  if (loggedIn === true) {
    setAuthState(false);
  } else {
    openDialog();
  }
};
headerAuth.addEventListener("click", handleClick);
