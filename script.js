// Configuración inicial del Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definición de los límites del Viewport
const X_MIN = 100; // Desplazamos un poco para que se vea centrado
const Y_MIN = 100;
const X_MAX = 350; // (100 + 250 de ancho)
const Y_MAX = 320; // (100 + 220 de alto)

function drawViewport() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    // Dibujamos el rectángulo de recorte
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
    
    // Etiqueta para identificar el área
    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.fillText('Viewport (Área de Recorte)', X_MIN, Y_MIN - 10);
}

// Ejecutamos la función
drawViewport();