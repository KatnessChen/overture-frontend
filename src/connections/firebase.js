const firebase = require('firebase/app');
require('firebase/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDG0OG5TUq6d17fRZ0il97vhPFfmBCs0pc',
  authDomain: 'overture-1b7b5.firebaseapp.com',
  databaseURL: 'https://overture-1b7b5.firebaseio.com',
  projectId: 'overture-1b7b5',
  storageBucket: 'overture-1b7b5.appspot.com',
  messagingSenderId: '659971003622',
  appId: '1:659971003622:web:88ad0ea7535dc698c85727',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
