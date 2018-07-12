window.onload = (()=>{
  const seccionLogin = document.getElementById("sectionLogin");
  const seccionCenter = document.getElementById("sectionCenter")
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      seccionLogin.style.display="none";
      seccionCenter.style.display="block";
      //console.log("user > "+JSON.stringify(user));
    }else{
      //seccionLogin.style.display="block";
      //seccionCenter.style.display="none";
    }
  });
  // lo que ingresa un usuario
  const boton = document.getElementById('btn');
  boton.addEventListener('click', ()=> {
    // aca guardo el comentario ingresado
    let comments = document.getElementById('comment').value;

    // limpiar el textarea
    document.getElementById('comment').value = ' ';

    // contenedor donde dejaré mis comentarios en html
    const cont = document.getElementById('cont');

    // crear un div contenetor
    const newComments = document.createElement('div');
    // validar que el texarea tenga un comentario
    if (comments.length === 0 || comments === null) {
      return alert('Debes ingresar un mensaje');    
    } 
    // crear checkbox
    const chck = document.createElement('input');
    chck.type = 'checkbox';
    // crear icono corazon
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'heart');
    // crear icono basura
    const trash = document.createElement('i');
    trash.classList.add('fas', 'fa-trash', 'trash');
    // nodos de texto del texarea
    let textNewComment = document.createTextNode(comments);

    const contenedorElemento = document.createElement('p');
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(chck);
    newComments.appendChild(trash);
    newComments.appendChild(heart);
    newComments.appendChild(contenedorElemento);

    cont.appendChild(newComments);
  });
});

//=========================================================================================
const seccionLogin = document.getElementById("sectionLogin");
const seccionCenter = document.getElementById("sectionCenter");
const seccionRegistro = document.getElementById("registroUser");

//================================================================
//Funcionalidad Login

  //login con facebook
const logFb = document.getElementById("loginFb");
logFb.addEventListener('click',()=>{
  let provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithRedirect(provider).then(function(result) {
  let token = result.credential.accessToken; //se obtiene el token de OAuth de Facebook
  let user = result.user; //info del usuario logado
 ///document.getElementById("login").style.display = "none";
 //document.getElementById("center").style.display = "block";

}).catch(function(error) {
  let errorCode = error.code;
  let errorMessage = error.message;
  let email = error.email;
  let credential = error.credential;
});
});// fin evento click del boton login Facebook

  //login con Google
  const logGoogle = document.getElementById("loginGm");
  logGoogle.addEventListener('click',()=>{
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
      let token = result.credential.accessToken; //se obtiene el token de OAuth de google
      let user = result.user; //info del usuario logado
      
      
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });
  });// fin evento click del boton login Google  

  //logout
window.logout=(()=>{
  firebase.auth().signOut()
  .then(()=>{
    console.log("chao");
  })
  .catch();
});

//logarse con email normal
const emailUser = document.getElementById("inputCorreo").value;
const passwordUser = document.getElementById("inputPass").value;
const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener('click',()=>{
  firebase.auth().signInWithEmailAndPassword(emailUser,passwordUser)
    
    .catch((error)=>{
      console.log("Error de Firebase > "+ error.code);
      console.log("Error de Firebase > mensaje"+error.message);
    });
})

//link a formulario para registrar usuario nuevo
const btnFormRegister = document.getElementById("registrate");
btnFormRegister.addEventListener('click',()=>{
  seccionRegistro.classList.remove('registro');
  seccionLogin.style.display="none";
  seccionCenter.style.display="none";
})

const btnReturnLogin = document.getElementById("loginBack");
btnReturnLogin.addEventListener('click',()=>{
  seccionRegistro.classList.remove('none');
  seccionLogin.style.display="block";
  seccionCenter.style.display="none";
})

//registro de usuario
const btnRegister = document.getElementById("btnRegistrarse");
btnRegister.addEventListener('click',()=>{
  //Registro de usuario nuevo
const nombreNewUser = document.getElementById("inputName").value;
const emailNewUser = document.getElementById("inputEmailUser").value;
const passNewUser = document.getElementById("inputPassUser").value;

  firebase.auth().createUserWithEmailAndPassword(emailNewUser,passNewUser)
  .then(()=>{
    console.log("Usuario Registrado");
  })
  .catch((error)=>{
    console.log("Error de Firebase > "+error.code);
    console.log("Error de Firebase > mensaje"+error.message);
  });
})

