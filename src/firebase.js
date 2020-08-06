import firebase from "firebase";
import config from './config/firebaseConfig';

const initializeFirebase = () => Object.keys(config).length && firebase.initializeApp(config);

export default initializeFirebase;