// --------------
// Knappen i hero
// --------------

const heroButton = document.getElementById("hero-button");
heroButton.addEventListener("click", () => openDialog());

// ------
// Header
// ------

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

// -------------------
// Sidan för inloggade
// -------------------

function updateContentView() {
  const loggedIn = JSON.parse(localStorage.getItem("authenticated"));

  // Element
  const hero = document.getElementById("hero");
  const loggedInView = document.getElementById("login-greeting");

  if (loggedIn) {
    // Visa inloggad-sidan
    hero.classList.add("hidden");
    loggedInView.classList.remove("hidden");
  } else {
    // Visa utloggad-sidan
    hero.classList.remove("hidden");
    loggedInView.classList.add("hidden");
  }
}
updateContentView(); // Kör för att kolla om användaren är inloggad när sidan laddas

// Fixa så att knappen där loggar ut också
const greetingButton = document.getElementById("greeting-button");
greetingButton.addEventListener("click", () => setAuthState(false));
