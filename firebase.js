import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB7P16cdEoCGll_XNOh7ABJrw-0nyZBA6A',
  authDomain: 'clone-d3bc7.firebaseapp.com',
  projectId: 'clone-d3bc7',
  storageBucket: 'clone-d3bc7.appspot.com',
  messagingSenderId: '758481303393',
  appId: '1:758481303393:web:0f22312239707fdfdb7720',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
