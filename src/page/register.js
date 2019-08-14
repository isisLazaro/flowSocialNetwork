const Register = {
    render : async () => {
        const view = /*html*/ `
            <h1>REGISTRO</h1>
            <form name = "formRegister">
                <input 
                    type="email"
                    id = "email"
                    name = "email"
                    placeholder="Ingresa tu correo electrónico"
                    required
                />
                <input 
                    type = "password"
                    id = "password" 
                    name = "password" 
                    placeholder = "contraseña (mayor o igual a 6 caracteres)"
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
            firebase.auth()
                .createUserWithEmailAndPassword(
                    formRegister["email"].value, formRegister["password"].value)
                .then(
                    () => {
                        console.log("BIENVENIDO");
                        //console.log(auth.UserCredential);
                        //toogleModal();
                        alert("¡Bienvenido, gracias por registrarte!. \nAhora inicia sesión con tu cuenta");
                    }
                )
                .catch(
                    error => {
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
                    }
                );
            }
        );
    }
}
export default Register;