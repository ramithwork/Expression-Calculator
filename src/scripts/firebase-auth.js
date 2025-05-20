import { app } from "./firebase-config.js"
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"

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
  try {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User has signed up successfully.
        console.log(`User created CRED`, userCredential.user);
        console.log(`User created CURR`, auth.currentUser);
        const user = auth.currentUser;
        sendVerificationEmail(user);
    return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
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