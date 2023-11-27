let x = 0.01;
let y = 0;
let z = 0;
let sigma = 10;
let rho = 28;
let beta = 8 / 3;
let points = [];
let particleCount = 5000;
let particleSize = 1;

function setup() {
  //createCanvas(windowWidth, windowHeight, WEBGL);
  //createCanvas(1000, 4000, WEBGL);
  //let canvas1 = createCanvas(windowWidth, 420);

  var canvasDiv = document.getElementById('code1');
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  var sketchCanvas = createCanvas(width,height, WEBGL);
  console.log(sketchCanvas);
  sketchCanvas.parent('code1');
  colorMode(HSB, 1);
}

function draw() {
  background(map(sin(frameCount / 100), -1, 1, 0, 1), 1, 1);
  translate(0, 0, -80);
  let dt = 0.01;
  let dx = (lorenz(x + 0.01, y, z).x - lorenz(x, y, z).x) / 0.01;
  let dy = (lorenz(x, y + 0.01, z).y - lorenz(x, y, z).y) / 0.01;
  let dz = (lorenz(x, y, z + 0.01).z - lorenz(x, y, z).z) / 0.01;
  x = x + dx * dt;
  y = y + dy * dt;
  z = z + dz * dt;
  points.push(createVector(x, y, z));
  if (points.length > particleCount) {
    points.splice(0, 1);
  }
  noStroke();
  fill(map(sin(frameCount / 50), -1, 1, 0, 1), 1, 1);
  for (let i = 0; i < points.length; i++) {
    let pos = points[i];
    let angle = map(i, 0, points.length, 0, TWO_PI);
    let radius = 20;
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    let z = pos.z;
    push();
    translate(x, y, z);
    sphere(particleSize);
    pop();
  }
}

function lorenz(x, y, z) {
  let dx = sigma * (y - x);
  let dy = x * (rho - z) - y;
  let dz = x * y - beta * z;
  return createVector(dx, dy, dz);
}

function mousePressed() {
  sigma = map(mouseX, 0, width, 0, 50);
  rho = map(mouseY, 0, height, 0, 100);
}

function mouseDragged() {
  sigma = map(mouseX, 0, width, 0, 50);
  rho = map(mouseY, 0, height, 0, 100);
}

function touchMoved() {
  sigma = map(touchX, 0, width, 0, 50);
  rho = map(touchY, 0, height, 0, 100);
}

function mouseReleased() {
  sigma = 10;
  rho = 28;
}

function touchEnded() {
  sigma = 10;
  rho = 28;
}
