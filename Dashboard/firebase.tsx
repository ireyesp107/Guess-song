// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSEwE4wpXSgQRcw0ga4U8tTpcBi88NihI",
  authDomain: "my-song-project-31.firebaseapp.com",
  projectId: "my-song-project-31",
  storageBucket: "my-song-project-31.appspot.com",
  messagingSenderId: "620244902520",
  appId: "1:620244902520:web:17a3cc995b63c33821438d",
  measurementId: "G-K4NLJR0VLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        console.log(result)

        // localStorage.setItem("name", name)
        // localStorage.setItem("email", email)

    }).catch((error) => {
        console.log(error)
    })
}