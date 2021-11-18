
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User  } from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_GOOGLE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_GOOGLE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_GOOGLE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_GOOGLE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_GOOGLE_FIREBASE_APP_ID
    };
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let currentUser: User | null = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        currentUser = user;
    } else {
        // User is signed out
        currentUser = null;
    }
});

 export const register = (userData: {username: string, password: string}) => {
    createUserWithEmailAndPassword(auth, userData.username, userData.password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User logged in")
        })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User not logged in", errorMessage)
    });
}

 export const login = (userData: {username: string, password: string}) => {
     console.log("INSIDE LOGIN")
    signInWithEmailAndPassword(auth, userData.username, userData.password)
        .then((userCredential) => {
        const user = userCredential.user;
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        });
}

 
export const logout = () => {
    console.log("INSIDE LOGOUT")
    auth.signOut().then(result => {
        console.log("Successfully logged out")
    }).catch(error => {
        console.log("Error while logging out")
    })
}

export const getCurrentUser = () => {
    return currentUser;
}