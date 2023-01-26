import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   measurementId: "G-E1DNWEWZRV",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBBkiT7d13eBvmWhKq0IyfTOQ-9FBEW3z0",
  authDomain: "blog-site-f7524.firebaseapp.com",
  projectId: "blog-site-f7524",
  storageBucket: "blog-site-f7524.appspot.com",
  messagingSenderId: "303651366509",
  appId: "1:303651366509:web:19b3e82252b2f9dfbc8164",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// const provider = new EmailAuthProvider();

export { auth, db };
