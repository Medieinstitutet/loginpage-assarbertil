import { setAuthState } from "./auth.js";
import { openDialog } from "./dialog.js";

//
// Hanterar state för knappen i header
//

const loggedIn = localStorage.getItem("user");

const headerAuth = document.getElementById("header-auth");

// Ska köras när auth state ändras
export const updateHeaderState = () => {
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
  if (loggedIn === true) {
    setAuthState(false);
  } else {
    openDialog();
  }
};
headerAuth.addEventListener("click", handleClick);
