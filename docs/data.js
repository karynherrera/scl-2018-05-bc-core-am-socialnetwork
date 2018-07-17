/** **************************MENU*********************************************/
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
/** *********************FIN MENU**************************************************/


// LOGOUT
window.logout = (() => {
  firebase.auth().signOut()
    .then(() => {
      console.log('chao');
    })
    .catch();
});

/** ******************SECCION PERFIL *********************************************/

// Funcion para guardar publicaciones
function saveMessage() {
  const currentUser = firebase.auth().currentUser;
  const commentText = comment.value;
  const newMessageKey = firebase.database().ref().child('posts').push().key;
  firebase.database().ref(`posts/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName || currentUser.email,
    text: commentText,
    email: currentUser.email,
    starCount: 0
  });
  newFunction();
  otherFunction();
}
// Buscar mensajes desde data
firebase.database().ref('posts')
  //.limitToLast(2)
  .on('child_added', (newMessage) => {
    let userTarget = newMessage.val().creator;
    //console.log(typeof (userTarget));
    cont.innerHTML += `
  <div id='${newMessage.key}'><img src ="icono/Perfil-usuario.svg"> ${newMessage.val().creatorName}
                ${newMessage.val().text}${newMessage.val().starCount} <i class="far fa-heart" data-id="plusone" onclick="toggleStar(event, countRef, uid)"></i> <i class="fas fa-user-plus iconFriend" onclick="window.addFriend('${userTarget}')" ></i> <i class="fas fa-pencil-alt"></i> <i class="fas fa-trash" data-id="${newMessage.key}" onclick="deleteButtonClicked(event)"></i></div>
            `
      ;
  });

function newFunction() {
  // Limpiar el textarea
  document.getElementById('comment').value = '';
  // mensaje de error
  const commentText = comment.value;
  if (commentText === '') {
    //errorTxt.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert"> Error: Debes ingresar un comentarios </div>';    
  };
}
function otherFunction() {
  comment.addEventListener('click', () => {
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
function toggleStar(event) {
  const likeID = event.target.getAttribute('plusone');
  var countRef = firebase.database().ref('posts/' + likeID + '/starCount');    
  countRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[idUser]) {
        post.starCount--;
        post.stars[idUser] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[idUser] = true;
      }
    }
    return post;
  });
}

window.prueba = ((variable) => {
  console.log("Imprime" + variable);
});
// funcion para añadir amigo
window.addFriend = ((userTarget) => {
  console.log(userTarget);
  const allUsersRegister = firebase.database().ref('users/');
  console.log("entró");
  allUsersRegister.on('value', function (snapshot) {
    let arrayUsers = Object.entries(snapshot.val());
    arrayUsers.forEach(idFirebase => {
      idFirebase.forEach(element => {
        if (element.idUser === userTarget) {
          console.log('nombre usuario: ' + element.NameUser + ' id ' + element.EmailUser);
          const newFriendKey = firebase.database().ref().child('friends').push().key;
          firebase.database().ref(`friends/${newFriendKey}`).set({
            idFriend: element.idUser,
            nameFriend: element.NameUser || element.EmailUser,
            emailFriend: element.EmailUser
          });
          
        } 
      })
    });
  });
});
/** ******************************Politica de Privacidad***************************************** */
window.privacyPolicy = (() => {

  const modal = document.getElementById("modalTerms");
  modal.style.display = 'block';

  modal.innerHTML = `
  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
  <span><p>Politica de Privacidad</p>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button></span>
    <p>
    La presente Política de Privacidad establece los términos en que Easyfood usa y
    protege la información que es proporcionada por sus usuarios al momento de
    utilizar su sitio web. Esta compañía está comprometida con la seguridad de los
    datos de sus usuarios. Cuando le pedimos llenar los campos de información
    personal con la cual usted pueda ser identificado, lo hacemos asegurando que
    sólo se empleará de acuerdo con los términos de este documento. Sin embargo,
    esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo
    que le recomendamos y enfatizamos revisar continuamente esta página para
    asegurarse que está de acuerdo con dichos cambios.
    Información que es recogida
    Nuestro sitio web podrá recoger información personal, por ejemplo: Nombre,
    información de contacto como su dirección de correo electrónica e información
    demográfica. Así mismo cuando sea necesario podrá ser requerida información
    específica para procesar algún pedido o realizar una entrega o facturación.
    Uso de la información recogida
    Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio
    posible, particularmente para mantener un registro de usuarios, de pedidos en
    caso que aplique, y mejorar nuestros productos y servicios. Es posible que sean
    enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas
    especiales, nuevos productos y otra información publicitaria que consideremos
    relevante para usted o que pueda brindarle algún beneficio, estos correos
    electrónicos serán enviados a la dirección que usted proporcione y podrán ser
    cancelados en cualquier momento.
    Easyfood está altamente comprometido para cumplir con el compromiso de
    mantener su información segura. Usamos los sistemas más avanzados y los
    actualizamos constantemente para asegurarnos que no exista ningún acceso no
    autorizado.
    Cookies
    Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar
    permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la
    cookie sirve entonces para tener información respecto al tráfico web, y también
    facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies
    es que con ellas las web pueden reconocerte individualmente y por tanto brindarte
    el mejor servicio personalizado de su web.
    Nuestro sitio web emplea las cookies para poder identificar las páginas que son
    visitadas y su frecuencia. Esta información es empleada únicamente para análisis
    estadístico y después la información se elimina de forma permanente. Usted
    puede eliminar las cookies en cualquier momento desde su ordenador. Sin
    embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web,
    estás no dan acceso a información de su ordenador ni de usted, a menos de que
    usted así lo quiera y la proporcione directamente, visitas a una web . Usted puede
    aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores
    aceptan cookies automáticamente pues sirve para tener un mejor servicio web.
    También usted puede cambiar la configuración de su ordenador para declinar las
    cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros
    servicios.
    Enlaces a Terceros
    Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su
    interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya
    no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos
    responsables de los términos o privacidad ni de la protección de sus datos en esos
    otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de
    privacidad por lo cual es recomendable que los consulte para confirmar que usted
    está de acuerdo con estas.
    Control de su información personal
    En cualquier momento usted puede restringir la recopilación o el uso de la
    información personal que es proporcionada a nuestro sitio web. Cada vez que se
    le solicite rellenar un formulario, como el de alta de usuario, puede marcar o
    desmarcar la opción de recibir información por correo electrónico. En caso de que
    haya marcado la opción de recibir nuestro boletín o publicidad usted puede
    cancelarla en cualquier momento.
    Esta compañía no venderá, cederá ni distribuirá la información personal que es
    recopilada sin su consentimiento, salvo que sea requerido por un juez con un
    orden judicial.
    Easyfood Se reserva el derecho de cambiar los términos de la presente Política de
    Privacidad en cualquier momento.</p>
  </div>
  </div>
  </div>`;
});
/** ******************************FIN Politica de Privacidad***************************************** */