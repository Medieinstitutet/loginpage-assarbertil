// ----------------------------------------------------------------------------------------
// Dialogrutan
// ----------------------------------------------------------------------------------------

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
  clearAuthForm(); // Rensa formuläret på innehåll
  changeAuthView("login"); // Visa alltid inloggnings-vyn först
}
