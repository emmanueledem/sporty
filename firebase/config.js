// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import Config from "react-native-config";
const firebaseConfig = {
  apiKey: Config.API_KEY,
  authDomain: "sporty-7044c.firebaseapp.com",
  projectId: "sporty-7044c",
  storageBucket: "sporty-7044c.appspot.com",
  messagingSenderId: "738481276862",
  appId: "1:738481276862:web:7729a9da9bd9452d271bef",
  measurementId: "G-M6EMJMC6QS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
