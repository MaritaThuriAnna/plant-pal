importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB6_GIfQ88Oyjk7N-GYmmZDuahBOsSPe30",
  authDomain: "plant-pal-a09e7.firebaseapp.com",
  projectId: "plant-pal-a09e7",
  messagingSenderId: "829406171483",
  appId: "1:829406171483:web:5f401e3a35a4106a56ca7e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});