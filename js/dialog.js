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
  usernameInput.focus(); // Fokusera på användarnamn-fältet så fort dialogen öppnas
  closeButton.addEventListener("click", closeDialog); // Stänga med stängknappen
  dialog.addEventListener("keydown", escClose); // Stänga med ESC-knappen
  setTimeout(() => dialog.addEventListener("click", outsideClickClose), 0); // Stänga genom att klicka utanför
}

function closeDialog() {
  dialog.classList.add("hidden");
  // Ta bort alla event listeners som är kopplade till dialogrutan när den stängs
  closeButton.removeEventListener("click", closeDialog);
  dialog.removeEventListener("keydown", escClose);
  dialog.removeEventListener("click", outsideClickClose);
  clearAuthForm(); // Rensa formuläret på innehåll
  changeAuthView("login"); // Visa alltid inloggnings-vyn först
}
