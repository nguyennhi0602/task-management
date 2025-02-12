import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getMessaging } from "firebase/messaging"

export const firebaseConfig = {
  apiKey: "AIzaSyCkoOatPXZHOtmBpY-RIfF8LDNib6eRwOg",
  authDomain: "react-app-demo-de963.firebaseapp.com",
  projectId: "react-app-demo-de963",
  storageBucket: "react-app-demo-de963.firebasestorage.app",
  messagingSenderId: "624357459944",
  appId: "1:624357459944:web:320e1fc89997944a3ec65d",
  measurementId: "G-PMHWTSB89T",
}

export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)
export const db = getFirestore(app)
