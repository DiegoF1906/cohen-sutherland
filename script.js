// 1. Referenciamos el elemento del HTML
const canvas = document.getElementById('miCanvas');

// 2. Obtenemos el contexto de dibujo (en este caso 2D)
const ctx = canvas.getContext('2d');

// Opcional: Definir nuestra ventana de recorte (el rectángulo central)
const xMin = 150, xMax = 450, yMin = 100, yMax = 300;

function inicializarEscena() {
    // Dibujar la ventana de recorte para verla
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
    
    console.log("Canvas listo y ventana de recorte dibujada.");
}

inicializarEscena();