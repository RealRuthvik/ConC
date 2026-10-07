import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAod98PBxWemwdTi67ffLS5qN8TvQcTbNg",
  authDomain: "thebettermanbootcamp.firebaseapp.com",
  projectId: "thebettermanbootcamp",
  storageBucket: "thebettermanbootcamp.firebasestorage.app",
  messagingSenderId: "704742834820",
  appId: "1:704742834820:web:81d6ff68d3aa67ad8478d1",
  measurementId: "G-DSTL8SH50Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
