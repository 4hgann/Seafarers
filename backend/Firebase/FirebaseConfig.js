import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

import FirebaseToken from "../Tokens/FirebaseToken.js"
import FirestoreServiceAccount from "../Tokens/FirestoreServiceAccount.js"

const firebaseConfig = {
  apiKey: FirebaseToken,

  authDomain: "seafarers-f86fe.firebaseapp.com",

  projectId: "seafarers-f86fe",

  storageBucket: "seafarers-f86fe.appspot.com",

  messagingSenderId: "923136591674",

  appId: "1:923136591674:web:8f4567937adcb7bede7203",

  measurementId: "G-W24CPSCBFH",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
