// import { initializeApp } from 'firebase/app';

// // Optionally import the services that you want to use
// import { } from "firebase/auth";
// //import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// //import {...} from "firebase/functions";
// //import {...} from "firebase/storage";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// };

// initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOG2a8PcBXbMeHYPoBXZ7eU2bUt-PoPRg',
  authDomain: 'devpoi.firebaseapp.com',
  projectId: 'devpoi',
  storageBucket: 'devpoi.appspot.com',
  messagingSenderId: '812549016667',
  appId: '1:812549016667:web:9dbda17ad85c1c2dae037e',
  measurementId: 'G-WBRBHEE866',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firestoreService = getFirestore(app);
const authService = getAuth(app);
const storageService = getStorage(app);

export { firestoreService, authService, storageService };
