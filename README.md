# Expression Calculator
A claculator that resolves math expressions with custom references, database storage, and user account management.

## Versioning
- 1.0.0 Project initialisation.

## Features
- Type a math expression with custom references to values. 
  Expression: (25 {apples} * 100 {unit price}) + (10 {oranges} * 20 {unit price})
  Result: 2,700
- List evaluted expressions like chat messages.
- Save evaluated expression to DB with for specific user.
- User account management (Providers: Password, Google).

## Stack
- HTML, CSS, JS
- Firebase (Authentication, Firestore)
- NPM, Parcel

## Firebase Data & Config
Project ID: expressioncal

npm install firebase
npm install -g firebase-tools

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXf12eBsccKUn2Iiwbvx1azSSkJkGReOI",
  authDomain: "expressioncal.firebaseapp.com",
  projectId: "expressioncal",
  storageBucket: "expressioncal.firebasestorage.app",
  messagingSenderId: "232300139247",
  appId: "1:232300139247:web:7b99655e91742abea5811a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

### Firestore Data Structure
users (collection)
  └── {uid} (document)
        └── email: "user@example.com" // optional metadata

        expressions (subcollection)
          └── {expressionId} (document)
                └── expression: "2 + 3 * (4 - 1)"
                └── timestamp: <Firebase timestamp>

### Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Match the users collection (optional profile access)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Subcollection: expressions under a user
      match /expressions/{expressionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}

## UI Components
- view-cal (main view)
  - card-evaluated
  - card-expr
- view-auth (sign in, sign up)

## Bugs
[-] onAuthStateChanged in firebase-auth.js executes twice. According to research this is a common known bug.

## TODOS
[-] Implement Authentication:
    Password & Google provider signup/signin/verify/signout done. Run through the code and refactor. Test authentication.
[-] Implement eval view.
[-] Setup Firestore.
[x] Figure out data models.