import { createUserPasswordProvider, signinPasswordProvider, signUserOut, signinWithGoogle } from "./firebase-auth.js";

const signinBtn = document.getElementById("signin");
const signupBtn = document.getElementById("signup");
const signoutBtn = document.getElementById("signout");
const googleSigninBtn = document.getElementById("google-signin");

signupBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;
  // if (createUserPasswordProvider(email, password)) {
  //   console.log("User created and returned true.");
  // } else {
  //   console.log("User NOT created and returned false.");
  // }
  createUserPasswordProvider(email, password);
});

signinBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;
  // if (signinPasswordProvider(email, password)) {
  //   console.log("User signed in and returned true.");
  // } else {
  //   console.log("User did NOT sign in and returned false.");
  // }
  signinPasswordProvider(email, password);
});

googleSigninBtn.addEventListener("click", function(e) {
  e.preventDefault();
  signinWithGoogle();
});

signoutBtn.addEventListener("click", function(e){
  e.preventDefault();
  signUserOut();
});

export function updateAccount(email) {
  const accountLink = document.getElementById("account");
  if (email) {
    accountLink.textContent = email;
    signoutBtn.style.display = "inline-block";
  } else {
    accountLink.textContent = "Sign In";
    signoutBtn.style.display = "none";
  }
}

