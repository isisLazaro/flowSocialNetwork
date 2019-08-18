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
    const postsBoard = document.getElementById("posts");

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
    
    const deletePost = id => {
      const div = document.getElementBy(id);
      // If an element for that message exists, delete it.
      if (div) {
        div.parentNode.removeChild(div);
      }
    }

    const createAndInsertPost = (id, timestamp) => {
      const container = document.createElement('div');
      container.innerHTML = 
        '<div class="message-container">' +
          '<div class="spacing"><div class="pic"></div></div>' +
          '<div class="message"></div>' +
          '<div class="name"></div>' +
        '</div>';
      const div = container.firstChild;
      div.setAttribute('id', id);

      // If timestamp is null, assume it's a brand new message.
      timestamp = timestamp ? timestamp.toMillis() : Date.now();
      div.setAttribute('timestamp', timestamp);

      // figure out where to insert new message CHECK
      const existingMessages = postsBoard.children;
      if (existingMessages.length === 0) {
        postsBoard.appendChild(div);
      } else {
        let messageListNode = existingMessages[0];

        while (messageListNode) {
          const messageListNodeTime = messageListNode.getAttribute('timestamp');

          if (!messageListNodeTime) {
            throw new Error(
              `Child ${messageListNode.id} has no 'timestamp' attribute`
            );
          }

          if (messageListNodeTime > timestamp) {
            break;
          }

          messageListNode = messageListNode.nextSibling;
        }

        postsBoard.insertBefore(div, messageListNode);
      }

      return div;
    } 

    // Displays a post in the UI.
    const displayPost = (id, timestamp, name, text, picUrl, imageUrl) => {
      const div = document.getElementById(id) || createAndInsertPost(id, timestamp);
      div.querySelector('.name').textContent = name;
      let messageElement = div.querySelector('.message');
      
      // message is text.
      messageElement.textContent = text;
      // Replace all line breaks by <br>.
      messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
      // Show the card fading-in and scroll to view the new message.
      setTimeout(() => {div.classList.add('visible')}, 1);
      postsBoard.scrollTop = postsBoard.scrollHeight;
      postsBoard.focus();
    }

    const loadPosts = () => { 
      // Loads posts history and listens for upcoming ones.
      
      // Create the query to load the last 20 posts listen for new ones.
      const query = firebase.firestore()
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .limit(20);  
    
      // Start listening to the query.
      query.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'removed') {
            deletePost(change.doc.id);
          } else {
            var message = change.doc.data();
            displayPost(change.doc.id, message.timestamp, message.name,
                          message.text, message.profilePicUrl, message.imageUrl);
                          //TODO:
          }
        });
      });
    }

    loadPosts();
  }
}
export default UserHome;