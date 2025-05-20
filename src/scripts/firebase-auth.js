import { app } from "./firebase-config.js"
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Checking if user has signed in or not on Auth State Change.
onAuthStateChanged(auth, (user) => {
  try {
    if (user) {
      console.log("user", user);
    } else {
      console.log("User not signed in.")
    }
  } catch(error) {
    console.log(error);
  }
});

export async function createUserPasswordProvider(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User has signed up successfully.
      console.log(`User created CRED`, userCredential.user);
      console.log(`User created CURR`, auth.currentUser);
      const user = auth.currentUser;
      sendVerificationEmail(user);
      // return true;
      }).catch((error) => {
        console.log(error);
      });
}

export async function signinPasswordProvider(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(`User ${user.email} signed in.`);
      // return true;
    })
    .catch((error) => {
      console.log(error);
      // return false;
    });
}

export async function signinWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          console.log(`User ${user.email} signed in`);
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log("errorCode:", errorCode);
          console.log("error.customData.email", email);
      });
}

export async function sendVerificationEmail(user) {
  sendEmailVerification(user)
    .then(() => {
      // Email verification sent!
      console.log("Email verification sent!");
    }).catch((error) => {
      console.log(error);
    });
}

export async function signUserOut() {
  // Sign out a signed in user.
  signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out");
  }).catch((error) => {
      // An error happened.
      console.error("Sign-out error:", error);
  });
}

