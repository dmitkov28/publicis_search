// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAwK4c4L_KXFwKmK8sM5K_bkXBBhvcfni4",
    authDomain: "natural-potion-357012.firebaseapp.com",
    projectId: "natural-potion-357012",
    storageBucket: "natural-potion-357012.appspot.com",
    messagingSenderId: "100600166079",
    appId: "1:100600166079:web:bee33c3f4086f647e5380a",
    measurementId: "G-LZTYNQKL3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
const db = getFirestore(app)
const auth = getAuth(app);


export { db, auth}