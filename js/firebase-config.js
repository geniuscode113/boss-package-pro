const DEFAULT_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

window.firebaseConfig = DEFAULT_CONFIG;

if (typeof firebase !== "undefined") {
  const app = firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(window.firebaseConfig);
  window.firebaseApp = app;
}
