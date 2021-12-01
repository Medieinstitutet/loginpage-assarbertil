// ------
// Header
// ------

const headerButton = document.getElementById("header-auth");

// Ska köras när auth state ändras
function updateHeaderState() {
  const loggedIn = JSON.parse(localStorage.getItem("user"));

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
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    logOut();
  } else {
    openDialog();
  }
}
headerButton.addEventListener("click", headerButtonClick);

// -------------------
// Sidan för inloggade
// -------------------

function updateContentView() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Element
  const hero = document.getElementById("hero");
  const loggedInView = document.getElementById("login-greeting");
  const greetingTitle = document.getElementById("greeting-title");
  const localStorageDump = document.getElementById("local-storage-dump");
  const resetButton = document.getElementById("reset-button");
  const heroButton = document.getElementById("hero-button");

  if (user) {
    // Lägg in användarens namn
    greetingTitle.innerHTML = `Välkommen, ${user}.`;

    // Visa inloggad-sidan
    hero.classList.add("hidden");
    loggedInView.classList.remove("hidden");

    // Knapp för att återställa local storage
    resetButton.addEventListener("click", () => resetLocalStorage());

    // Visa local storage på skärmen
    const parsedLocalStorage = JSON.parse(localStorage.getItem("users"));
    localStorageDump.innerText = JSON.stringify(parsedLocalStorage, null, 2);

    // Ta bort eventlisteners från den andra vyn
    heroButton.removeEventListener("click", () => openDialog());
  } else {
    // Visa utloggad-sidan
    hero.classList.remove("hidden");
    loggedInView.classList.add("hidden");

    // Knappen i hero
    heroButton.addEventListener("click", () => openDialog());

    // Ta bort eventlisteners från den andra vyn
    resetButton.addEventListener("click", () => resetLocalStorage());
  }
}
updateContentView(); // Kör för att kolla om användaren är inloggad när sidan laddas

// Fixa så att knappen där loggar ut också
const greetingButton = document.getElementById("greeting-button");
greetingButton.addEventListener("click", () => logOut());
