const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const X_MIN = 100;
const Y_MIN = 100;
const X_MAX = 350;
const Y_MAX = 320;

const DENTRO = 0;
const IZQUIERDA = 1;
const DERECHA = 2;
const ABAJO = 4;
const ARRIBA = 8;

let lineas = [];

function definirCodigo(x, y) {
    let codigo = DENTRO;
    if (x < X_MIN) codigo |= IZQUIERDA;
    else if (x > X_MAX) codigo |= DERECHA;
    if (y < Y_MIN) codigo |= ARRIBA;
    else if (y > Y_MAX) codigo |= ABAJO;
    return codigo;
}

function dibujarLinea(p1, p2, color = 'black', grosor = 2) {
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function cohenSutherland(p1, p2) {
    let x1 = p1.x, y1 = p1.y;
    let x2 = p2.x, y2 = p2.y;

    let codigo1 = definirCodigo(x1, y1);
    let codigo2 = definirCodigo(x2, y2);

    while (true) {

        if ((codigo1 | codigo2) === 0) {
            break;
        } 
        
        else if ((codigo1 & codigo2) !== 0) {
            return null;
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
                x1 = x; y1 = y;
                codigo1 = definirCodigo(x1, y1);
            } else {
                x2 = x; y2 = y;
                codigo2 = definirCodigo(x2, y2);
            }
        }
    }

    return { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } };
}

function drawViewport() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawViewport();

    lineas.forEach(l => {
        const res = cohenSutherland(l.p1, l.p2);

        if (res) {
            dibujarLinea(res.p1, res.p2, 'green', 3);
        }
    });
}

function agregarLinea() {
    const x1 = parseFloat(document.getElementById("x1").value);
    const y1 = parseFloat(document.getElementById("y1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const y2 = parseFloat(document.getElementById("y2").value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert("Ingresa valores válidos");
        return;
    }

    lineas.push({
        p1: { x: x1, y: y1 },
        p2: { x: x2, y: y2 }
    });

    render();
}

function limpiarCanvas() {
    lineas = [];
    render();
}

// Inicialización
render();