import "firebase/messaging"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { messaging } from "./firebaseConfig"

export const getMessagingToken = async () => {
  let currentToken = ""
  try {
    currentToken = await getToken(messaging, {
      vapidKey: "BNuAGHtCoVT7uh_IUD1Zfe4LkfDDF8xXY6eikjwFXFPEevcUI56Q0L7sWKt2-hotKnNeMEAja3cIKU0_iq9LY8I",
    })
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error)
  }
  return currentToken
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
