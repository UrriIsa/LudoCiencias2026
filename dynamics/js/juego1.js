// letras que deben de adivinar, pasar de binario a decimal y con ascii a letra
const ROUNDS = [
  { bits: "01000010", letter: "B" },
  { bits: "01011001", letter: "Y" },
  { bits: "01010100", letter: "T" },
  { bits: "01000101", letter: "E" },
] ;

const registersEl = document.getElementById("registers") ;
const feedbackEl = document.getElementById("feedback") ;
const codeRevealEl = document.getElementById("codeReveal") ;
const verifyBtn = document.getElementById("verifyBtn") ;
const continueBtn = document.getElementById("continueBtn") ;
const hintBtn = document.getElementById("hintBtn") ;
const hintPanel = document.getElementById("hintPanel") ;
const asciiGrid = document.getElementById("asciiGrid") ;

// Construir los 4 registros en pantalla
ROUNDS.forEach((round, i) => { //para cada letra crea div, da clase register, le da un id 'reg-n' con n un número
  const wrap = document.createElement("div") ; 
  wrap.className = "register" ;
  wrap.id = `reg-${i}` ;
  wrap.innerHTML = ` 
    <div class="label">REGISTRO ${i + 1}</div>
    <div class="bits">${round.bits}</div>
    <input type="text" maxlength="1" id="input-${i}" autocomplete="off" aria-label="Letra del registro ${i + 1}">
  ` ; //en su lugar añade un label que dice que registro es, los bits y un input para escribir
  registersEl.appendChild(wrap) ;
});

// Construir la tabla de referencia ASCII (A-Z)
for (let code = 65; code <= 90; code++) {
  const cell = document.createElement("div") ;
  cell.textContent = `${String.fromCharCode(code)} = ${code.toString(2).padStart(8, "0")}` ; 
  // con cada número lo pasa a letra, pone '=' y ese número lo pasa a binario y ve que sea de 8 de longitud añadiendo ceros
  asciiGrid.appendChild(cell) ;
}

//evento al botón del hint (tabla Ascii) si está abierto muestra para cerrar, si no, para abrir
hintBtn.addEventListener("click", () => {
  const open = hintPanel.classList.toggle("open") ;
  hintBtn.textContent = open ? "Ocultar tabla ASCII" : "Mostrar tabla ASCII" ;
}) ;

//Evento de verificación
verifyBtn.addEventListener("click", () => {
  let allCorrect = true;

  ROUNDS.forEach((round, i) => { //checa con cada letra
    const input = document.getElementById(`input-${i}`) ;
    const regEl = document.getElementById(`reg-${i}`) ; //tomó el registro y el input
    const value = input.value.trim().toUpperCase() ; // el valor del input a mayusculas y limpia
    const correct = value === round.letter ; // si el valor es el mismo que la letra poner correct verdad

    regEl.classList.remove("ok", "bad") ;
    regEl.classList.add(correct ? "ok" : "bad") ; //Cambia clase por cada registro de letra si está bien o mal
    if (!correct){
        allCorrect = false ; //si no está correcto al menos uno, ya el total es falso
    }
  });

  if (allCorrect) { // si todo bien da el acceso y el fragmento del código
    feedbackEl.textContent = "ACCESO CONCEDIDO — mensaje decodificado correctamente." ;
    feedbackEl.className = "feedback ok" ;
    codeRevealEl.textContent = `FRAGMENTO 1: HOLA` ;
    codeRevealEl.classList.add("show") ;
    continueBtn.style.display = "inline-block" ;
    verifyBtn.disabled = true ; //quita poder verificar de nuevo
    ROUNDS.forEach((_, i) => document.getElementById(`input-${i}`).disabled = true) ; //quita poder editar el input de cada letra 
  } else { //si está mal
    feedbackEl.textContent = "ACCESO DENEGADO — revisa los registros marcados en rojo e inténtalo de nuevo." ;
    feedbackEl.className = "feedback bad" ;
  }
});

// Permitir verificar con Enter desde cualquier input
registersEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") verifyBtn.click() ;
});