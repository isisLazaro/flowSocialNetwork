let UserHome = {
  render : async () => {
    let view =  /*html*/`
      <div>
        <button id = "logout">Cerrar Sesión</button>
        <h1>USER HOME</h1>
        <p id = "userName"></p>
        <img id = "userPhoto"/>
      </div>

      <!-- Post container -->
      <div id="post-card">
        <form id="post-form">
          <label for="post">Escribe algo...</label>
          <input 
            type="text" 
            id="post-input" 
            autocomplete="off">
          <input 
            id = "submit-button" 
            disabled 
            type = "submit"
            value = "Enviar"
          />
        </form>
        <div id="posts">
        </div>
      </div>
    `
    return view
  }

  ,after_render: async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) { // User is signed in.
        document.getElementById("userName").innerHTML = `Hola ${user.displayName}`;
        document.getElementById("userPhoto").src = user.photoURL;
        document.getElementById("logout").addEventListener("click", () => {
          firebase.auth().signOut();
          window.location = '#/';
        })
      } 
      else {
        // No user is signed in.
      }
    });

    const postForm    = document.getElementById("post-form");
    const postInput   = document.getElementById("post-input");
    const submitButton = document.getElementById("submit-button");

    const submitButtonFn = () => {
      if (postInput.value) {
        submitButton.removeAttribute('disabled');
      } 
      else {
        submitButton.setAttribute('disabled', 'true');
      }
    };

    const savePost = (postText) => {
      // Add a new message entry to the Firebase database.
      return firebase.firestore().collection('posts').add({
        name: firebase.auth().currentUser.displayName,
        text: postText,
        profilePicUrl: firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
      });
    };

    postInput.addEventListener("keyup", submitButtonFn);
    postInput.addEventListener("change", submitButtonFn);
    postForm.addEventListener("submit", event => {
      event.preventDefault();
      if (postInput.value) {
        savePost(postInput.value).then(() => {
          postInput.value = '';
          // postInput.parentNode.MaterialTextfield.boundUpdateClassesHandler();
          submitButtonFn();
        });
      }
    });
  }
}
export default UserHome;