const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const X_MIN = 100;
const Y_MIN = 100;
const X_MAX = 350;
const Y_MAX = 320;

const DENTRO = 0;    // 0000
const IZQUIERDA = 1; // 0001
const DERECHA = 2;   // 0010
const ABAJO = 4;     // 0100
const ARRIBA = 8;    // 1000

const lineas = [
    { p1: { x: 50, y: 50 },   p2: { x: 400, y: 400 }, nombre: "L1" },
    { p1: { x: 150, y: 150 }, p2: { x: 250, y: 250 }, nombre: "L2" },
    { p1: { x: 400, y: 50 },  p2: { x: 300, y: 150 }, nombre: "L3" },
    { p1: { x: 300, y: 200 }, p2: { x: 450, y: 250 }, nombre: "L4" }
];

function definirCodigo(x, y) {
    let codigo = DENTRO;
    if (x < X_MIN) codigo |= IZQUIERDA;
    else if (x > X_MAX) codigo |= DERECHA;
    if (y < Y_MIN) codigo |= ARRIBA;
    else if (y > Y_MAX) codigo |= ABAJO;
    return codigo;
}

function cohenSutherland(p1, p2) {
    let x1 = p1.x, y1 = p1.y;
    let x2 = p2.x, y2 = p2.y;

    let codigo1 = definirCodigo(x1, y1);
    let codigo2 = definirCodigo(x2, y2);
    let aceptada = false;

    while (true) {
        // CASO 1: Aceptación Trivial (Ambos puntos dentro: 0000 | 0000 = 0)
        if ((codigo1 | codigo2) === 0) {
            aceptada = true;
            break;
        } 
        
        // El bucle se rompe aquí por ahora hasta el siguiente commit
        break; 
    }

    return aceptada ? { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } } : null;
}

function drawViewport() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
}

drawViewport();