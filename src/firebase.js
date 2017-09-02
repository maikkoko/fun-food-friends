import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBjku0706rpKh3IJfmombsxvPz2g8yBbLI",
  authDomain: "fun-food-friends-f1a8a.firebaseapp.com",
  databaseURL: "https://fun-food-friends-f1a8a.firebaseio.com",
  projectId: "fun-food-friends-f1a8a",
  storageBucket: "",
  messagingSenderId: "678428812551"
}
firebase.initializeApp(config)
export default firebase