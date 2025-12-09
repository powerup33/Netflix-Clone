import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQoBOX_Vy4oe0qmStmKRMMb0tBHFebtEA",
  authDomain: "netflix-clone-9a733.firebaseapp.com",
  projectId: "netflix-clone-9a733",
  storageBucket: "netflix-clone-9a733.firebasestorage.app",
  messagingSenderId: "89486728292",
  appId: "1:89486728292:web:40643a8cb3948be2dc9371"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {  
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };