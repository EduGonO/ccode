let touchX = -1;
let touchY = -1;
let ellipseColor;
let t = 0; // time variable


function setup() {
  //let canvas = createCanvas(windowWidth, 100);
  //canvas.parent('code');
  var canvasDiv = document.getElementById('code');
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  var sketchCanvas = createCanvas(width,height);
  console.log(sketchCanvas);
  sketchCanvas.parent("code");
  colorMode(HSB, 255);
  background(15, 30, 50);
  drawA();
}

function draw() {
  background(15, 30, 50);
  if (touchX >= 0 && touchY >= 0) {
    noStroke();
    fill(ellipseColor, map(touchY, 0, height, 255, 0), 255);
    ellipse(touchX, touchY, 40);
    
    // Adjust ellipse color based on its x position
    ellipseColor = map(touchX, 0, width, 0, 255);

    if (mouseIsPressed === true) {
      drawA();
    }
  }
}




function drawA() {
  background(10, 10); // translucent background (creates trails)

  //fill(random(255), random(255), random(255));
  
  // make a x and y grid of ellipses
  for (let x = -100; x <= width+150; x = x + 10) {
    for (let y = -100; y <= height+150; y = y + 10) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, 3 * PI, 1 * PI, true);
      const yAngle = map(mouseY, 0, height, 1 * PI, 3 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width+0.7) + yAngle * (y / height+0.7);


      // unos interesantes el 10 es distance of wave
      // each particle moves in a circle
      const myX = x + 10 * cos(2 * PI * t + angle);
      const myY = y + 10 * sin(2 * PI * t + angle);

      //const c = color(random(255), random(255), random(255));
      //fill(c);
      ellipse(myX, myY, 5); // draw particle
    }
  }
  t = t + 0.01; // update time
}





function touchStarted() {
  touchX = mouseX;
  touchY = mouseY;
  ellipseColor = map(touchX, 0, width, 0, 255);
}

function touchMoved() {
  touchX = mouseX;
  touchY = mouseY;
}

function touchEnded() {
  touchX = -1;
  touchY = -1;
  drawA();
}
