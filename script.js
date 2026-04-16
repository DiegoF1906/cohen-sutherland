// Configuración inicial del Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definición de los límites del Viewport
const X_MIN = 100;
const Y_MIN = 100;
const X_MAX = 350;
const Y_MAX = 320;

// Definición de Outcodes (Códigos de Región) en español
// Usamos potencias de 2 para operaciones de bits
const DENTRO = 0;    // 0000
const IZQUIERDA = 1; // 0001
const DERECHA = 2;   // 0010
const ABAJO = 4;     // 0100
const ARRIBA = 8;    // 1000

console.log("Outcodes definidos: DENTRO(0), IZQUIERDA(1), DERECHA(2), ABAJO(4), ARRIBA(8)");

function drawViewport() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
    
    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.fillText('Viewport (Área de Recorte)', X_MIN, Y_MIN - 10);
}
/**
 * Determina el código de región para un punto (x, y)
 */
function definirCodigo(x, y) {
    let codigo = DENTRO; // Empezamos asumiendo que está dentro

    if (x < X_MIN) {
        codigo |= IZQUIERDA; // Bitwise OR para activar el bit de izquierda
    } else if (x > X_MAX) {
        codigo |= DERECHA;   // Activa bit de derecha
    }

    if (y < Y_MIN) {
        codigo |= ARRIBA;    // En canvas, Y menor es "más arriba"
    } else if (y > Y_MAX) {
        codigo |= ABAJO;     // En canvas, Y mayor es "más abajo"
    }
    return codigo;
}

// Prueba rápida en consola
console.log("Punto (50, 50) código:", definirCodigo(50, 50).toString(2).padStart(4, '0'));
drawViewport();
