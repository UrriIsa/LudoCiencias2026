// Líneas de la terminal que se escriben como si fuera una real.
const LINES = [
  { text: "> iniciando PINGUIN_OS...", cls: "muted" },
  { text: "> comprobando integridad del sistema... FALLO", cls: "" },
  { text: "> intrusión detectada en el laboratorio de ciberseguridad", cls: "" },
  { text: "> bloqueo de emergencia ACTIVADO", cls: "" },
  { text: "", cls: "" },
  { text: "\nQuedaste encerrado en el laboratorio después de horario.", cls: "" },
  { text: "La única salida es a través de la consola central,", cls: "" },
  { text: "y esta exige un código maestro de 4 caracteres.\n", cls: "" },
  { text: "Ese código está dividido en 3 protocolos de seguridad.", cls: "" },
  { text: "Resuélvelos y reconstruye el código para escapar.", cls: "" },
] ; // texto y si tiene una clase asignada, sólo muted al inicio

const bootLog = document.getElementById("bootLog");
const actions = document.getElementById("actions");

function typeLine(lineIndex, charIndex, span) {

  const line = LINES[lineIndex] ; // obtiene la linea que va

  if (charIndex === 0) { // si es el inicio crea el div y si tiene clase ese texto se lo añade
    span = document.createElement("div") ;
    if (line.cls){
        span.className = line.cls ;
    }
    bootLog.appendChild(span) ; //añade el div en el div de bootLog de main
  }

  if (charIndex < line.text.length) { // si aún no acaba el texto
    span.textContent += line.text[charIndex] ; //concatena al div creado el caracter que sigue
    setTimeout(() => typeLine(lineIndex, charIndex + 1, span), 12 + Math.random() * 18) ; //llama recursivo a sí mismo pero con el siguiente caracter con un retraso random
  } else { // si acaba el texto
    if (lineIndex + 1 < LINES.length) { // si aun faltan líneas
      setTimeout(() => typeLine(lineIndex + 1, 0, null), 90) ; //llamada recursiva esperando 90 milisegundos
    } else { //si acabaron las líneas crea una clase cursor que añade al final
      const cursor = document.createElement("span") ; 
      cursor.className = "cursor" ;
      bootLog.appendChild(cursor) ;
      actions.style.display = "flex" ;
    }
  }
}
typeLine(0, 0, null);