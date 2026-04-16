// Configuración inicial del Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//  Definición de los límites del Viewport (Área de recorte)
const X_MIN = 100;
const Y_MIN = 100;
const X_MAX = 350;
const Y_MAX = 320;

//  Definición de Outcodes (Códigos de Región)
const DENTRO = 0;    // 0000
const IZQUIERDA = 1; // 0001
const DERECHA = 2;   // 0010
const ABAJO = 4;     // 0100
const ARRIBA = 8;    // 1000

//  Definición de las líneas
const lineas = [
    { p1: { x: 50, y: 50 },   p2: { x: 400, y: 400 }, nombre: "L1" }, // Cruza diagonalmente
    { p1: { x: 150, y: 150 }, p2: { x: 250, y: 250 }, nombre: "L2" }, // Totalmente dentro
    { p1: { x: 400, y: 50 },  p2: { x: 300, y: 150 }, nombre: "L3" }, // Cruza esquina superior derecha
    { p1: { x: 300, y: 200 }, p2: { x: 450, y: 250 }, nombre: "L4" }  // Sale por la derecha
];

//  Función para definir el código de región
function definirCodigo(x, y) {
    let codigo = DENTRO;
    if (x < X_MIN) codigo |= IZQUIERDA;
    else if (x > X_MAX) codigo |= DERECHA;
    if (y < Y_MIN) codigo |= ARRIBA;
    else if (y > Y_MAX) codigo |= ABAJO;
    return codigo;
}

//  Función para dibujar el Viewport
function drawViewport() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.fillText('Viewport (Área de Recorte)', X_MIN, Y_MIN - 10);
}

//  Función para dibujar una línea simple
function dibujarLinea(p1, p2, color, grosor = 1) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

//  Renderizado inicial: Dibujamos las líneas sin recortar (en gris)
function renderInicial() {
    lineas.forEach(linea => {
        dibujarLinea(linea.p1, linea.p2, '#ccc', 1);
        
        // Dibujamos el nombre de la línea cerca de su P1
        ctx.fillStyle = '#666';
        ctx.fillText(linea.nombre, linea.p1.x, linea.p1.y - 5);
    });
}

// Ejecutamos el dibujo del viewport y las líneas originales
drawViewport();
renderInicial();