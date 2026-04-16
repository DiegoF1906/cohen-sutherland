// Configuración inicial del Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definición de los límites del Viewport
const X_MIN = 0;
const Y_MIN = 0;
const X_MAX = 250;
const Y_MAX = 220;

console.log(`Viewport definido: X(${X_MIN}, ${X_MAX}), Y(${Y_MIN}, ${Y_MAX})`);