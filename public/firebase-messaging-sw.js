importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCkoOatPXZHOtmBpY-RIfF8LDNib6eRwOg",
  authDomain: "react-app-demo-de963.firebaseapp.com",
  projectId: "react-app-demo-de963",
  storageBucket: "react-app-demo-de963.firebasestorage.app",
  messagingSenderId: "624357459944",
  appId: "1:624357459944:web:320e1fc89997944a3ec65d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Customize the icon as needed
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
