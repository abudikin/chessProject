import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApAP3at2FQxJGGRc90l8AmY0YAOfjIp7g",
  authDomain: "chess-auth-22ace.firebaseapp.com",
  databaseURL: "https://chess-auth-22ace-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chess-auth-22ace",
  storageBucket: "chess-auth-22ace.appspot.com",
  messagingSenderId: "396605138661",
  appId: "1:396605138661:web:9ae7f1080fc6196588d60c",
  measurementId: "G-LXXKRNBBPE"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = getDatabase();
export { auth,db };