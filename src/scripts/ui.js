import { createUserPasswordProvider, signinPasswordProvider, signUserOut, signinWithGoogle } from "./firebase-auth";

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