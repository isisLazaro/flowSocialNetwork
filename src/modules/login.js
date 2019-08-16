let Login = {
    render : async () => {
        let view =  /*html*/`
            <h1>Inicia Sesión</h1>
            <div id = "firebaseui-auth-container"></div>
        `
        return view
    }
    , after_render: async () => {
        // Initialize the FirebaseUI Widget using Firebase.
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);
    }
}
export default Login;