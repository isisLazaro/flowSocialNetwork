let UserHome = {

    render : async () => {
        let view =  /*html*/`
            <h1>USER HOME</h1>
            <p id = "userName"></p>
            <img id = "userPhoto"/>
        `
        return view
    }
    , after_render: async () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              document.getElementById("userName").innerHTML = `Hola ${user.displayName}`;
              document.getElementById("userPhoto").src = user.photoURL;
            } else {
              // No user is signed in.
            }
          });
    }
}
export default UserHome;