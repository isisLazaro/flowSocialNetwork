const Register = {
    render : async () => {
        const view = /*html*/ `
            <h1>REGISTRO</h1>
            <form name = "formRegister">
                <input
                    type = "text"
                    name = "userName"
                    placeholder = "Escribe tu nombre de usuario"
                    required
                />
                <input 
                    type = "email"
                    id = "email"
                    name = "email"
                    placeholder="Ingresa tu correo electrónico"
                    required
                />
                <input 
                    type = "password"
                    id = "password" 
                    name = "password" 
                    placeholder = "Contraseña (mayor o igual a 6 caracteres)"
                    required
                />
                <input 
                    type="submit" 
                    value="Crear cuenta"
                />
             </form>
        `
        return view
    },
    after_render : async () => {
        const formRegister = document.forms.formRegister;
        formRegister.addEventListener("submit", () => {
            event.preventDefault();
            let auth = firebase.auth();
            auth.createUserWithEmailAndPassword(formRegister["email"].value, formRegister["password"].value)
            .then(() => {
                console.log("BIENVENIDO");
                //toogleModal();
                //alert("¡Bienvenido, gracias por registrarte!. \nAhora inicia sesión con tu cuenta");
                //console.log(firebase.auth());
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,"|",errorMessage);
                if (errorCode == "auth/weak-password") {
                    alert("La contraseña debe ser de al menos 6 caracteres");
                }
                else if (errorCode == "auth/email-already-in-use") {
                    alert("La dirección de correo ya está registrada");
                }
                else{
                    alert(errorMessage);
                }       
            });
            auth.signOut();
            auth.onAuthStateChanged(user => {
                if (user) {
                    // User is signed in.
                    console.log("User is signed in");
                } else {
                    // No user is signed in.
                    console.log("No user is signed in");
                }
            });
        });
    }
}
export default Register;