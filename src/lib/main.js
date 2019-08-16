// Initiate firebase auth.
const initFirebaseAuth = () => {
    // Listen to auth state changes.
    //firebase.auth().onAuthStateChanged(authStateObserver);
    firebase.auth().onAuthStateChanged(user => {
        // Triggers when the auth state change for instance when the user signs-in or signs-out.
        if (user) { // User is signed in!
            console.log("conectado");
            const routes = {
                '/' : UserHome
                ,'/userprofile' : UserProfile
            };
        }
        else{ // User is signed out!
            const routes = {
                '/'          : Home
                ,'/login'    : Login
                ,'/register' : Register
            };
            console.log("no conectado");
        }
        return routes;
    });
}


//initFirebaseAuth();