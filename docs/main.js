window.onload = (() => {
  const seccionLogin = document.getElementById('sectionLogin');
  const seccionCenter = document.getElementById('sectionCenter');
  const seccionMuro = document.getElementById('sectionMuro');
  const inputEmailUser = document.getElementById('inputCorreo');
  inputEmailUser.value = '';
  const inputPasswordUser = document.getElementById('inputPass');
  inputPasswordUser.value = '';

  document.getElementsByTagName('input').value = '';
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      seccionLogin.style.display = 'none';
      seccionMuro.style.display = 'block';
      seccionCenter.style.display = 'block';
      // console.log("user > "+JSON.stringify(user));
    } else {
      seccionLogin.style.display = 'block';
      seccionMuro.style.display = 'none';
      seccionCenter.style.display = 'none';
    }
  });
  /*
  // lo que ingresa un usuario
  const boton = document.getElementById('btn');
  boton.addEventListener('click', () => {
    // aca guardo el comentario ingresado
    let commentsTxt = document.getElementById('comment').value;

    // limpiar el textarea
    document.getElementById('comment').value = ' ';

    // contenedor donde dejaré mis comentarios en html
    const cont = document.getElementById('cont');

    // crear un div contenetor
    const newComments = document.createElement('div');
    // validar que el texarea tenga un comentario
    if (commentsTxt.length === 0 || commentsTxt === null) {
      return alert('Debes ingresar un mensaje');
    }
    // crear icono de comentarios
    const comments = document.createElement('i');
    comments.classList.add('fas', 'fa-comments', 'comments');
    // crear icono corazon
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'heart');
    // crear icono basura
    const trash = document.createElement('i');
    trash.classList.add('fas', 'fa-trash', 'trash');
    trash.onclick(removeTxt());
    // nodos de texto del texarea
    let textNewComment = document.createTextNode(commentsTxt);

    const contenedorElemento = document.createElement('p');
    contenedorElemento.appendChild(textNewComment);

    newComments.appendChild(trash);
    newComments.appendChild(heart);
    newComments.appendChild(comments);
    newComments.appendChild(contenedorElemento);

    cont.appendChild(newComments);
  });*/
});// fin de window onload

// ============================================================SECCIONES DEL DOM===================================================
const seccionLogin = document.getElementById('sectionLogin');
const seccionCenter = document.getElementById('sectionCenter');
const seccionRegistro = document.getElementById('registroUser');
const seccionMuro = document.getElementById('sectionMuro');
// ==========================================================FUNCIONALIDAD LOGIN====================================================

// LOGIN CON FACEBOOK
const logFb = document.getElementById("loginFb");
logFb.addEventListener('click',()=>{
let provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithRedirect(provider).then(function(result) {
  let token = result.credential.accessToken; //se obtiene el token de OAuth de Facebook
  let user = result.user; //info del usuario logado
  console.log(user);
 ///document.getElementById("login").style.display = "none";
 //document.getElementById("center").style.display = "block";
 seccionLogin.style.display="none";
 seccionMuro.style.display="block";
 seccionCenter.style.display="block";
 
}).catch(function(error) {
  seccionLogin.style.display="block";
 seccionMuro.style.display="none";
 seccionCenter.style.display="none";
});
});// fin evento click del boton login Facebook

// LOGIN CON GOOGLE
const logGoogle = document.getElementById('loginGm');
logGoogle.addEventListener('click', () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    let token = result.credential.accessToken; // se obtiene el token de OAuth de google
    let user = result.user; // info del usuario logado
  }).catch(function(error) {
    seccionLogin.style.display = 'block';
    seccionMuro.style.display = 'none';
    seccionCenter.style.display = 'none';
  });
});// fin evento click del boton login Google  


// LOGARSE CON EMAIL NORMAL

const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', () => {
  const emailUser = document.getElementById('inputCorreo').value;
  const passwordUser = document.getElementById('inputPass').value;
  firebase.auth().signInWithEmailAndPassword(emailUser, passwordUser)

    .catch((error) => {
      const inputEmailUser = document.getElementById('inputCorreo');
      inputEmailUser.value = '';
      const inputPasswordUser = document.getElementById('inputPass');
      inputPasswordUser.value = '';
      const alertLogin = document.getElementById('alertPassword');
      const msjErrorFirebase = error.message;
      if (msjErrorFirebase === 'The email address is badly formatted.') {
        alertLogin.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert"> Error: El formato del Email ingresado es incorrecta, ingrese correo como: myEmail@easyfood.com </div>';
      } else if (msjErrorFirebase === 'The password is invalid or the user does not have a password.') {
        alertLogin.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert"> Error: Password Invalido, Ingrese un password de 6 o más caracteres </div>';
      }
      console.log('Error de Firebase > ' + error.code);
      console.log('Error de Firebase > mensaje' + error.message);
    });
});

const inputEmailUser = document.getElementById('inputCorreo');
inputEmailUser.addEventListener('click', () => {
  inputEmailUser.value = '';
  const alertLogin = document.getElementById('alertPassword');
  alertLogin.innerHTML = '<div id="alertPassword"></div>';
});
const inputPasswordUser = document.getElementById('inputPass');
inputPasswordUser.addEventListener('click', () => {
  inputPasswordUser.value = '';
  const alertLogin = document.getElementById('alertPassword');
  alertLogin.innerHTML = '<div id="alertPassword"></div>';
});
// LINK A FORMULARIO PARA REGISTRAR NUEVO USUARIO
const btnFormRegister = document.getElementById('registrate');
btnFormRegister.addEventListener('click', () => {
  seccionRegistro.style.display = 'block';
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'none';
});
// LINK PARA REGRESAR A LA SECCION DE LOGIN
const btnReturnLogin = document.getElementById('loginBack');
btnReturnLogin.addEventListener('click', () => {
  seccionLogin.style.display = 'block';
  seccionCenter.style.display = 'none';
  seccionRegistro.style.display = 'none';
  const alertReg = document.getElementById('alertRegister');
  alertReg.innerHTML = '<div id="alertPassword"></div>';
});

// REGISTRO DE USUARIO NUEVO
const btnRegister = document.getElementById("btnRegistrarse");

btnRegister.addEventListener('click',()=>{
  const checkbox = document.getElementById('aceptTerm');
console.log(checkbox.value);
const alertReg = document.getElementById('alertRegister');
alertReg.innerHTML=`<div id="alertPassword"></div>`;

const nombreNewUser = document.getElementById("inputName").value;
const emailNewUser = document.getElementById("inputEmailUser").value;
const passNewUser = document.getElementById("inputPassUser").value;

const inputNombreNewUser = document.getElementById("inputName");
inputNombreNewUser.value="";
const inputEmailNewUser = document.getElementById("inputEmailUser");
inputEmailNewUser.value="";
const inputPassNewUser = document.getElementById("inputPassUser");
inputPassNewUser.value="";

if(checkbox.value ==='off'){
    alertRegister.innerHTML=`<div class="alert alert-danger alertConteiner" role="alert">Tiene que aceptar los Terminos y Condiciones de Uso </div>`; 
}else {
firebase.auth().createUserWithEmailAndPassword(emailNewUser,passNewUser)
  .then(()=>{
  console.log("Usuario Registrado");
  seccionLogin.style.display="none";
  seccionCenter.style.display="block";
  seccionRegistro.style.display="none";
  })
  .catch((error)=>{
    seccionLogin.style.display="none";
    seccionCenter.style.display="none";
    seccionRegistro.style.display="block";
    alertRegister.innerHTML=`<div class="alert alert-danger alertConteiner" role="alert"> ${error} </div>`;
    console.log("Error de Firebase > "+error.code);
    console.log("Error de Firebase > mensaje"+error.message);
  });
}
})
const checkbox = document.getElementById('aceptTerm');
checkbox.addEventListener('click',()=>{
  checkbox.value="on"
  const alertReg = document.getElementById('alertRegister');
  alertReg.innerHTML=`<div id="alertPassword"></div>`;
})

