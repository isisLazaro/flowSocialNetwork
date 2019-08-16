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
// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// FirebaseUI config.
const uiConfig = {
    // signInSuccessUrl: 'loggedin.html',
    signInSuccessUrl: '#/userHome',
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none'
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    //tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    /* privacyPolicyUrl: function() {   
    window.location.assign('<your-privacy-policy-url>');
    } */
};

// Initialize the FirebaseUI Widget using Firebase.
//const ui = firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
//ui.start('#firebaseui-auth-container', uiConfig);

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