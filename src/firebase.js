import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCSmbppUh8bHK4AlAI5yVcyJY_K55PS0eo",
  authDomain: "srsn-6d8b2.firebaseapp.com",
  projectId: "srsn-6d8b2",
  storageBucket: "srsn-6d8b2.firebasestorage.app",
  messagingSenderId: "849260549693",
  appId: "1:849260549693:web:a953482f1932f837a5fc54",
  measurementId: "G-52KKZ1V86G"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async (currentUserId, currentRole) => {
  try {
    const savedToken = localStorage.getItem("fcm_token");
    const savedUserId = localStorage.getItem("fcm_user");
    const savedRole = localStorage.getItem("fcm_role");

    if (savedToken && savedUserId === currentUserId && savedRole === currentRole) {
      console.log("🔁 Reusing existing FCM token");
      return savedToken;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("🔒 Notification permission denied.");
      return null;
    }

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    await navigator.serviceWorker.ready;

    const token = await getToken(getMessaging(), {
      vapidKey: "BEZtUmQWzzCHC5Gp5Pj4i5BVcIn0z8kizpvCYFu_rRGGG8UVWKwZoTmVoORF4Qk2QyHZR1-riSp9yMuRl4_5jWY",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("New FCM token:", token);
      localStorage.setItem("fcm_token", token);
      localStorage.setItem("fcm_user", currentUserId);
      localStorage.setItem("fcm_role", currentRole);
      return token;
    }
  } catch (err) {
    console.error("Token error:", err);
    return null;
  }
};


// Optional: for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  alert(`${payload.notification?.title}\n${payload.notification?.body}`);
});
