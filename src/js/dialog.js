//
// Hanterar state för dialogrutan
//

// Hänvisa till alla element
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialog-content");
const closeButton = document.getElementById("dialog-close");

// Används för att stänga dialogrutan med ESC-knappen
const escClose = e => e.key === "Escape" && closeDialog();

// Användas för att stänga dialogrutan när man klickar utanför
const outsideClickClose = e =>
  !dialogContent.contains(e.target) && closeDialog();

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
