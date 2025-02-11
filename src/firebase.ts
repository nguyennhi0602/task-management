import firebase from "firebase/app"
import "firebase/messaging"
import { firebaseConfig } from "./firebaseConfig"

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()
  }
}

export const getMessagingToken = async () => {
  let currentToken = ""
  if (!messaging) return
  try {
    currentToken = await messaging.getToken({
      vapidKey: "BNuAGHtCoVT7uh_IUD1Zfe4LkfDDF8xXY6eikjwFXFPEevcUI56Q0L7sWKt2-hotKnNeMEAja3cIKU0_iq9LY8I",
    })
    console.log(currentToken)
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error)
  }
  return currentToken
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })
