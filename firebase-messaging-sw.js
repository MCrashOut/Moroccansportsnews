importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDl3HcQUr7Nd0oJOpsSmx77mTi7U4PyR0w",
    authDomain: "moroccansportshub.firebaseapp.com",
    projectId: "moroccansportshub",
    storageBucket: "moroccansportshub.firebasestorage.app",
    messagingSenderId: "1081971044275",
    appId: "1:1081971044275:web:3f04c81f88ee26a9d365c6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "https://github.com/MCrashOut/Moroccansportsnews/blob/main/favicon.png/icon.png?raw=true"
    });
});
