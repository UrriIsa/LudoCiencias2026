// Catálogo de palabras posibles
const PALABRAS = ["SERVIDOR", "LINUS", "ANALISIS", "LAMBDA", "TURING"];

let palabraCorrecta = "";
let codigoCifrado = "";
let intentosRestantes = 3;

/**
 * Función que aplica Cifrado César (Salto 13 / ROT13)
 * Convierte cualquier palabra en su versión cifrada automáticamente.
 */
function cifrarRot13(texto) {
  return texto.split('').map(char => {
    const code = char.charCodeAt(0);
    // Solo aplica transformación a letras mayúsculas A-Z
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + 13) % 26) + 65);
    }
    return char;
  }).join('');
}

/**
 * Inicializa el juego seleccionando una palabra al azar.
 * Usa localStorage para evitar repetir palabras seguidas al reiniciar.
 */
function inicializarJuego() {
  const ultimaPalabra = localStorage.getItem('palabra_cesar_ultima');
  
  // Filtra las palabras para no repetir la última que le tocó si es posible
  let opcionesDisponibles = PALABRAS.filter(p => p !== ultimaPalabra);
  if (opcionesDisponibles.length === 0) opcionesDisponibles = PALABRAS;

  // Selecciona una palabra al azar
  const indiceAzar = Math.floor(Math.random() * opcionesDisponibles.length);
  palabraCorrecta = opcionesDisponibles[indiceAzar];

  // Guarda la palabra seleccionada como última usada
  localStorage.setItem('palabra_cesar_ultima', palabraCorrecta);

  // Calcula el código cifrado para la terminal
  codigoCifrado = cifrarRot13(palabraCorrecta);

  // Inserta el código cifrado en el HTML
  const displayCifrado = document.getElementById('codigo-interceptado');
  if (displayCifrado) {
    displayCifrado.textContent = codigoCifrado;
  }
}

function validarCodigo(event) {
  event.preventDefault();

  const inputElement = document.getElementById('respuesta');
  const feedbackElement = document.getElementById('feedback');
  const attemptsElement = document.getElementById('attempts-text');
  
  const respuestaUsuario = inputElement.value.trim().toUpperCase();

  if (intentosRestantes <= 0) return;

  if (respuestaUsuario === palabraCorrecta) {
    feedbackElement.className = "feedback success";
    feedbackElement.textContent = "[SUCCESS] Código desencriptado con éxito. Cargando Protocolo 3...";
    
    inputElement.disabled = true;
    document.getElementById('btn-submit').disabled = true;

    setTimeout(() => {
      window.location.href = 'juego3.html';
    }, 1500);

  } else {
    intentosRestantes--;
    attemptsElement.textContent = `[SEGURIDAD] Intentos de autenticación restantes: ${intentosRestantes}/3`;

    if (intentosRestantes > 0) {
      feedbackElement.className = "feedback error";
      feedbackElement.textContent = "[ERROR] Palabra clave inválida. Verifique la posición del disco.";
      inputElement.select();
    } else {
      bloquearSistema();
    }
  }
}

function bloquearSistema() {
  document.getElementById('cipher-form').style.display = "none";
  document.getElementById('feedback').textContent = "";
  document.getElementById('lock-overlay').style.display = "block";
}

function reiniciarTodoElSistema() {
  window.location.href = '../main.html';
}

// Ejecutar la inicialización cuando cargue el archivo
inicializarJuego();