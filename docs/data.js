/** **************************************MENU**************************************************/
// funcionalidad del side Menú
function toggleMenu() { // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
  if (sideMenu.className.indexOf('menu_closed') >= 0) { // primero revisamos si la clase d-none esta
    openMenu(); // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
  } else {
    closeMenu(); // si no esta la clase, le indicamos que cierre el menu
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed'); // quitando clase display-none
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed'); // añadimos la clase display-none
  sideMenu.classList.remove('menu_open');
}
/** **************************************FIN MENU**************************************************/

// LOGOUT
window.logout = (() => {
  firebase.auth().signOut()
    .then(() => {
      console.log('chao');
    })
    .catch();
});

// Funcion para guardar publicaciones


function saveMessage() {
  const currentUser = firebase.auth().currentUser;
  const commentText = comment.value;
  const newMessageKey = firebase.database().ref().child('posts').push().key;
  firebase.database().ref(`posts/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    text: commentText,    
  });
  newFunction();
}
// Buscar mensajes desde data
firebase.database().ref('posts')
  .limitToLast(2)
  .on('child_added', (newMessage) => {
    if (comment.value !== '') {
      cont.innerHTML += `
  <div id='${newMessage.key}'><img src ="icono/Perfil-usuario.svg"> ${newMessage.val().creatorName}
                ${newMessage.val().text} <i class="far fa-heart" data-id="plusone" onclick="toggleStar()"></i> <i class="fas fa-trash" data-id="${newMessage.key}" onclick="deleteButtonClicked(event)"></i></div>
            `
      ;
    } else {
      
    }
  });

function newFunction() {
  // Limpiar el textarea
  document.getElementById('comment').value = '';  
  // mensaje de error
  const commentText = comment.value; 
  if (commentText === '') {
    errorTxt.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert"> Error: Debes ingresar un comentarios </div>';    
  };
}
function otherFunction() {
  comment.addEventListener('click', ()=>{
    // Hara que desaparesca mensaje de error
    errorTxt.innerHTML = '<div id=" errorTxt"></div>';
  })
  ;
};

// Funcion eliminar publicacion
function deleteButtonClicked(event) {
  event.stopPropagation();
  const postsID = event.target.getAttribute('data-id');
  const postsRef = firebase.database().ref('posts').child(postsID);
  postsRef.remove();
  cont.removeChild(cont.childNodes[0] && cont.childNodes[1]);
}

// Funcion me gusta
function toggleStar(postRef, uid) {  
  postRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}

