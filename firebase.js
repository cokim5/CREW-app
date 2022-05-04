// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";


// import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuMUMyseBX_wmpIC2c-6JTzRXmg6gn_LU",
  authDomain: "frostyapp-auth.firebaseapp.com",
  projectId: "frostyapp-auth",
  storageBucket: "frostyapp-auth.appspot.com",
  messagingSenderId: "624680952854",
  appId: "1:624680952854:web:dcf8c2e4c3edbf29c3c137",
  measurementId: "G-EHJ5XPN5JR",
  databaseURL: "https://frostyapp-auth-default-rtdb.firebaseio.com",
  // storageBucket: "frostyapp-auth.appspot.com"
};

// Initialize Firebase
// const storage = getStorage(firebaseApp);

let app;
if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps();
}
const auth = getAuth(app);
const database = getDatabase(app);
export {auth, database};

// get(child(dbref, `users/${auth.currentUser.uid}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//      const location = snapshot.val().location;
//      if (location === "") {
//        navigation.navigate("SignUp")
//      }
//   } else {
//     alert("No data found");
//   }
// }).catch((error) => {
//   alert("unsuccessful, error"+error)
// })

// var userId = getAuth().currentUser.uid;
//       set(ref(database, 'users/' + userId), {
//             location: "",
//             preference: "",
//             priceRange: "",
//             isDefault: false,
//       })
 