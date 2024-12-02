// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBo9Qg54Cvbdxc8Shp_WJLBgczVcWp9dtc",
    authDomain: "cybernoter-c0921.firebaseapp.com",
    projectId: "cybernoter-c0921",
    storageBucket: "cybernoter-c0921.firebasestorage.app",
    messagingSenderId: "371285618454",
    appId: "1:371285618454:web:fe3eef3a10c71028e3ea37"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
