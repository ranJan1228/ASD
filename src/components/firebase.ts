import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCxrlbN_p8Ly8MCUehM1eg8FZOWSd3KWA4",
    authDomain: "autism-skills-training-games.firebaseapp.com",
    projectId: "autism-skills-training-games",
    storageBucket: "autism-skills-training-games.firebasestorage.app",
    messagingSenderId: "205035534082",
    appId: "1:205035534082:web:0985e1360b0a9a6462b41b",
    measurementId: "G-N2WVG7QHQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
