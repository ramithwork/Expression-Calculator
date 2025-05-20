import { createUserPasswordProvider } from "./firebase-auth";

const signinBtn = document.getElementById("signin");
const signupBtn = document.getElementById("signup");

signupBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;
  if (createUserPasswordProvider(email, password)) {
    console.log("User created and returned true.");
  } else {
    console.log("User NOT created and returned false.");
  }
});

signinBtn.addEventListener("click", function(e) {
  e.preventDefault();
});

