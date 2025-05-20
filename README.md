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

## Data Models

expcal 
  expressions
    key

## Firebase Data
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

## UI Components
- view-cal (main view)
  - card-evaluated
  - card-expr
- view-auth (sign in, sign up)

