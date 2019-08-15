const firebaseConfig = {
    apiKey: "AIzaSyAsQpWY0Ahrlh7k7qlwX7guYJCZN3msj_U",
    authDomain: "together-click-5a5dd.firebaseapp.com",
    databaseURL: "https://together-click-5a5dd.firebaseio.com",
    projectId: "together-click-5a5dd",
    storageBucket: "together-click-5a5dd.appspot.com",
    messagingSenderId: "134852128441",
    appId: "1:134852128441:web:b5711605e6ce435f"
};
// Initialize firebase
firebase.initializeApp(firebaseConfig);

/*  firebase.auth().onAuthStateChanged(user => {
    console.log(window.user);
    if (user) {
        // User is signed in.
        console.log("User is signed in");
        
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        
    }
}); */