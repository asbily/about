// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAnalytics,
  isSupported
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx4cZvr62JgSAa3luzPmy_1JgsPkAtka0",
  authDomain: "asbily-platforms-asbily.firebaseapp.com",
  databaseURL: "https://asbily-platforms-asbily-default-rtdb.firebaseio.com",
  projectId: "asbily-platforms-asbily",
  storageBucket: "asbily-platforms-asbily.firebasestorage.app",
  messagingSenderId: "1050733290592",
  appId: "1:1050733290592:web:06217f9497a38529a64f05",
  measurementId: "G-T9972RSGEB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Google Analytics safely
let analytics = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);

        console.log(
          "Firebase & Google Analytics initialized successfully."
        );
      } else {
        console.debug(
          "Firebase Analytics is not supported in this environment."
        );
      }
    })
    .catch((error) => {
      console.debug(
        "Firebase Analytics support notice:",
        error
      );
    });
}


// Export Firebase
export {
  app,
  analytics,
  firebaseConfig
};
