const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxIterationInput = document.getElementById("maxIteration");
    maxIterationInput.addEventListener("input", draw);

const w = canvas.width;
const h = canvas.height;

let maxIteration = 1;
const startColor = [60, 0, 120];
const endColor = [255, 255, 255];

window.onload = (event) => {
    context.translate(w/2, h/2);
    context.scale(1, -1);
    draw();
}

function draw() {
    context.clearRect(-w/2, -h/2, w, h);
    maxIteration = maxIterationInput.value;
    for (let i = -w/2; i < w/2; i++) {
        for (let j = -h/2; j < h/2; j++) {
            plotPixel(i, j);
        }
    }
}

function plotPixel(pX, pY) {
    const x0 = (pX/w+0.5) * 2.47 - 2.00;
    const y0 = (pY/h+0.5) * 2.24 - 1.12;

    let x = 0.0;
    let y = 0.0;
    let iteration = 0;

    while (x**2 + y**2 <= 4 && iteration < maxIteration) {
            let xtemp = x**2 - y**2 + x0;
            y = 2*x*y + y0;
            x = xtemp;
            iteration++;
    }
    context.save()
    context.beginPath();
    context.fillStyle = getColor(iteration);
    context.fillRect(pX, pY, 1, 1);
    context.closePath();
    context.restore();
}

function getColor(n) {
    const x = n/maxIteration;
    const red = Math.floor(x * startColor[0] + (1-x) * endColor[0]);
    const green = Math.floor(x * startColor[1] + (1-x) * endColor[1]);
    const blue = Math.floor(x * startColor[2] + (1-x) * endColor[2]);
    return "rgb("+red.toString()+" "+green.toString()+" "+blue.toString()+")";
}