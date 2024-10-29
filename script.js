// Configuracion de Firebase

const firebaseConfig = {
  apiKey: "AIzaSyB7kyS5STUFhPl8yir5VSt5rfvz4OVNLMM",
  authDomain: "datos-de-un-formulario.firebaseapp.com",
  projectId: "datos-de-un-formulario",
  storageBucket: "datos-de-un-formulario.appspot.com",
  messagingSenderId: "960384597762",
  appId: "1:960384597762:web:1a0a734c4b23fa5a0b8c1b",
  measurementId: "G-NCRTMDNYEQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // Validar correo electrónico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; // Patron de validacion
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un mail valido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    // Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    if ( contrasenaEntrada.value.length < 8) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // Si todos los campos son validos enviar formulario

    if ( !errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        // El backend recibe la info
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });


        
        
    }


});