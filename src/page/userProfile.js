let UserProfile = {

    render : async () => {
        let view =  /*html*/`
            <h1>USER PROFILE</h1>
            <form name = "formUpdateProfile">
                <input
                    type = "text"
                    name = "userName"
                    placeholder = "Escribe tu nombre de usuario"
                />   <!-- required -->
                <input 
                    type="submit" 
                    value="Cambiar perfil"
                />
            </form>
        `
        return view
    }
    , after_render: async () => {
        const formRegister = document.forms.formUpdateProfile;
        formRegister.addEventListener("submit", () => {
            event.preventDefault();
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName : formRegister["userName"].value
            }).then(() => {
                // Update successful.
                console.log("Update successful");
            }).catch(error => {
                // An error happened.
                console.log("An error happened");
            });
                       
        });
    }
}
export default UserProfile;