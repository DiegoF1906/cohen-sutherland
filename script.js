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

        if ((codigo1 | codigo2) === 0) {
            aceptada = true;
            break;
        } 
        
        else if ((codigo1 & codigo2) !== 0) {
            break; 
        } 
        
        else {
            let codigoFuera = codigo1 !== 0 ? codigo1 : codigo2;
            let x, y;

            if (codigoFuera & ARRIBA) {
                x = x1 + (x2 - x1) * (Y_MIN - y1) / (y2 - y1);
                y = Y_MIN;
            } 
            else if (codigoFuera & ABAJO) {
                x = x1 + (x2 - x1) * (Y_MAX - y1) / (y2 - y1);
                y = Y_MAX;
            } 
            else if (codigoFuera & DERECHA) {
                y = y1 + (y2 - y1) * (X_MAX - x1) / (x2 - x1);
                x = X_MAX;
            } 
            else if (codigoFuera & IZQUIERDA) {
                y = y1 + (y2 - y1) * (X_MIN - x1) / (x2 - x1);
                x = X_MIN;
            }

            if (codigoFuera === codigo1) {
                x1 = x; 
                y1 = y;
                codigo1 = definirCodigo(x1, y1);
            } else {
                x2 = x; 
                y2 = y;
                codigo2 = definirCodigo(x2, y2);
            }
        }
    }

    return aceptada
        ? { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } }
        : null;
}

function drawViewport() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);

    ctx.fillStyle = 'blue';
    ctx.font = '10px Arial';

    // Etiqueta superior izquierda
    ctx.fillText(`(${X_MIN}, ${Y_MIN})`, X_MIN - 40, Y_MIN - 5);

    // Etiqueta inferior derecha
    ctx.fillText(`(${X_MAX}, ${Y_MAX})`, X_MAX + 5, Y_MAX + 15);
}

function renderFinal() {
    lineas.forEach(linea => {
        const resultado = cohenSutherland(linea.p1, linea.p2);

        if (resultado) {
            dibujarLinea(resultado.p1, resultado.p2, '#2ecc71', 3);

            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(resultado.p1.x, resultado.p1.y, 3, 0, Math.PI * 2);
            ctx.arc(resultado.p2.x, resultado.p2.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

// Inicialización
drawViewport();
renderFinal();