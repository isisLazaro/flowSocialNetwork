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
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false},
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
            customParameters: {
                // Forces account selection even when one accountis available.
                prompt: 'select_account'
            }
        },
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult:function (authResult, redirectUrl) {
            const usuario = {
                uid    : authResult.user.uid,
                nombre : authResult.user.displayName,
                email  : authResult.user.email,
                foto   : authResult.user.photoURL
            }
            db.collection("usuarios").doc(authResult.user.uid).set(usuario)
            console.log(usuario);
            //console.log(authResult.additionalUserInfo);
            return true
        }
    },
    signInSuccessUrl: '#/userHome'
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    //tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    /* privacyPolicyUrl: function() {   
    window.location.assign('<your-privacy-policy-url>');
    } */
};

const saveData = user => {
    let usuario = {
        uid    : user.uid,
        nombre : user.displayName,
        email  : user.email,
        foto   : user.photoURL
    }
    db.collection(usuarios).doc(user.uid).set(usurario)
}
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