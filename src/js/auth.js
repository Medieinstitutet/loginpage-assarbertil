import { updateHeaderState } from "./header.js";

//
// Hanterar authentication logik
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
// Sjukt osäker sak att skicka med till användarna när det funkar så här men oh well
export const setAuthState = bool => {
  console.log(bool ? "Inloggad" : "Utloggad");
  localStorage.setItem("authenticated", JSON.stringify(bool));
  loggedIn = bool;
};

// Logik för inloggnignsformuläret
const authSubmit = e => {
  e.preventDefault();

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
