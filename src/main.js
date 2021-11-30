const users = [
  { username: "Janne", password: "test" },
  { username: "Assar", password: "kattmat" },
];

const headerAuth = document.getElementById("header-auth");

const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("form-username");
const passwordInput = document.getElementById("form-password");

authForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  localStorage.setItem("user", JSON.stringify({ username, password }));
  console.log("done");
});
