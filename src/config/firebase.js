// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEkSe8FbiUujIbD0ka8ABwH-sLnmdWD98",
    authDomain: "digiclinik-live.firebaseapp.com",
    databaseURL: "https://digiclinik-live-default-rtdb.firebaseio.com",
    projectId: "digiclinik-live",
    storageBucket: "digiclinik-live.appspot.com",
    messagingSenderId: "45270920197",
    appId: "1:45270920197:web:a860110cea4a824a8b006c",
    measurementId: "G-9L3FFCEDXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)