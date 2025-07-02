/* global self, importScripts, firebase */

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCSmbppUh8bHK4AlAI5yVcyJY_K55PS0eo",
    authDomain: "srsn-6d8b2.firebaseapp.com",
    projectId: "srsn-6d8b2",
    storageBucket: "srsn-6d8b2.firebasestorage.app",
    messagingSenderId: "849260549693",
    appId: "1:849260549693:web:a953482f1932f837a5fc54",
    measurementId: "G-52KKZ1V86G"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification?.title || payload.data?.title || 'Notification';
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || '',
        icon: 'Logo.svg' // optional icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
