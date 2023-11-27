// save this file as sketch.js
// Sketch One
var s = function(p) { // p could be any variable name

  var x = 100;
  var y = 100;

  p.setup = function() {
    p.createCanvas(420, 320);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

var code1 = new p5(s, 'code3');







  // Sketch Two
  var watercolor = function(p) { // p could be any variable name

    let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404", "#000000"];
    let x_values = [], y_values = [], active_states = [];

    p.setup = function() {
      let canvasDiv = document.getElementById('watercolor');
      let width = canvasDiv.offsetWidth;
      let height = canvasDiv.offsetHeight;
      let sketchCanvas = p.createCanvas(width, height);
      console.log(sketchCanvas);
      sketchCanvas.parent("watercolor",{});
      brush.load(p);
      brush.newBrush("watercolor");
      for (let j = 0; j < 2; j++) {
        x_values[j] = [];
        y_values[j] = [];
        active_states[j] = [];
        for (let i = 0; i < 5; i++) {
          x_values[j][i] = p.random(p.width);
          y_values[j][i] = p.random(p.width);
          active_states[j][i] = false;
        }
      }
    };

    p.draw = function() {
      p.background("#e2e7dc");
      p.translate(-p.width / 2, -p.height / 2);
      p.strokeWeight(3);

      for (let j = 0; j < x_values.length; j++) {
        brush.pick("watercolor");
          brush.fill(palette[j],70)
          brush.bleed(0.2)
          brush.beginShape(0)
          for (let i = 0; i < x_values[j].length; i++) {
              stroke(palette[i%palette.length])
              point(x_values[j][i],y_values[j][i])
              brush.vertex(x_values[j][i],y_values[j][i])
          }
          randomSeed(12133)
          brush.endShape(CLOSE)
      }

      noLoop()
  }

  p.mousePressed = function() {
      for (let j = 0; j < x_values.length; j++) {
          for (let i = 0; i < x_values[j].length; i++) {
              if (dist(mouseX,mouseY, x_values[j][i],y_values[j][i]) <= 10) {
                 active_states[j][i] = true;
              }
          } 
      }
  }

  p.mouseDragged = function() {
      loop()
      frameRate(10)
      for (let j = 0; j < x_values.length; j++) {
          for (let i = 0; i < x_values[j].length; i++) {
              if (active_states[j][i] == true) {
                  x_values[j][i] = mouseX
                  y_values[j][i] = mouseY
              }
          }
      }
  }

  p.mouseReleased = function() {
      for (let j = 0; j < x_values.length; j++) {
          for (let i = 0; i < x_values[j].length; i++) {
              if (dist(mouseX,mouseY, x_values[j][i],y_values[j][i]) <= 10) {
              active_states[j][i] = false;
              }
          } 
      } 
  }
};

var waterc = new p5(watercolor, 'watercolor');
































// a ver


// code 1
let lorenzCode = function(p) {
  let x = 0.01;
  let y = 0;
  let z = 0;
  let sigma = 10;
  let rho = 28;
  let beta = 8 / 3;
  let points = [];
  let particleCount = 500;
  let particleSize = 1;

  p.setup = function() {
    //let canvas = p.createCanvas(windowWidth, windowHeight, p.WEBGL);
    let canvasDiv = document.getElementById('code1');
    let width = canvasDiv.offsetWidth;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = p.createCanvas(width, height, p.WEBGL);
    console.log(sketchCanvas);
    sketchCanvas.parent("code1");
    p.colorMode(p.HSB, 1);
  }

  p.draw = function() {
    p.background(p.map(p.sin(p.frameCount / 100), -1, 1, 0, 1), 1, 1);
    p.translate(0, 0, 123)
    let dt = 0.07;
    let dx = (lorenz(x + 0.01, y, z).x - lorenz(x, y, z).x) / 0.01;
    let dy = (lorenz(x, y + 0.01, z).y - lorenz(x, y, z).y) / 0.01;
    let dz = (lorenz(x, y, z + 0.01).z - lorenz(x, y, z).z) / 0.01;
    x = x + dx * dt;
    y = y + dy * dt;
    z = z + dz * dt;
    points.push(p.createVector(x, y, z));
    if (points.length > particleCount) {
      points.splice(0, 1);
    }
    p.noStroke();
    p.fill(p.map(p.sin(p.frameCount / 50), -1, 1, 0, 1), 1, 1);
    for (let i = 0; i < points.length; i++) {
      let pos = points[i];
      let angle = p.map(i, 0, points.length, 0, p.TWO_PI);
      let radius = 20;
      let x = radius * p.cos(angle);
      let y = radius * p.sin(angle);
      let z = pos.z;
      p.push();
      p.translate(x, y, z);
      p.sphere(particleSize);
      p.pop();
    }
  }

  function lorenz(x, y, z) {
    let dx = sigma * (y - x);
    let dy = x * (rho - z) - y;
    let dz = x * y - beta * z;
    return p.createVector(dx, dy, dz);
  }

  p.mousePressed = function() {
    sigma = p.map(p.mouseX, 0, p.width, 0, 50);
    rho = p.map(p.mouseY, 0, p.height, 0, 100);
  }

  p.mouseDragged = function() {
    sigma = p.map(p.mouseX, 0, p.width, 0, 50);
    rho = p.map(p.mouseY, 0, p.height, 0, 100);
  }

  p.touchMoved = function() {
    sigma = p.map(p.touches[0].x, 0, p.width, 0, 50);
    rho = p.map(p.touches[0].y, 0, p.height, 0, 100);
  }

  p.mouseReleased = function() {
    sigma = 10;
    rho = 28;
  }

  p.touchEnded = function() {
    sigma = 10;
    rho = 28;
  };
};    
var lornz = new p5(lorenzCode, 'code1');























// code2
var t = function(p) {

  var x = 100.0;
  var y = 100;
  var speed = 2.5;

  p.setup = function() {
    let canvasDiv = document.getElementById('code2');
    let width = canvasDiv.offsetWidth;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = p.createCanvas(width, height);
    console.log(sketchCanvas);
    sketchCanvas.parent("code2");
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed;
    if (x > p.width) {
      x = 0;
    }
    p.ellipse(x, y, 50, 50);

  };
};
var code2 = new p5(t, 'code2');



















// code3
let sketchWaves = function(p) {
  let touchX = -1;
  let touchY = -1;
  let ellipseColor;
  let t = 0; // time variable

  p.setup = function() {
    let canvasDiv = document.getElementById('code');
    let width = canvasDiv.offsetWidth;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = p.createCanvas(width, height);
    console.log(sketchCanvas);
    sketchCanvas.parent("code");
    p.colorMode(p.HSB, 255);
    p.background(15, 30, 50);
    drawA();
  };

  p.draw = function() {
    p.background(15, 30, 50);
    if (touchX >= 0 && touchY >= 0) {
      p.noStroke();
      p.fill(ellipseColor, p.map(touchY, 0, p.height, 255, 0), 255);
      p.ellipse(touchX, touchY, 40);

      // Adjust ellipse color based on its x position
      ellipseColor = p.map(touchX, 0, p.width, 0, 255);
      drawA();
      /*if (p.mouseIsPressed === true) {
        
      }*/
    }
  };

  function drawA() {
    p.background(10, 10); // translucent background (creates trails)

    // make a x and y grid of ellipses
    for (let x = -100; x <= p.width + 200; x = x + 10) {
      for (let y = -100; y <= p.height + 200; y = y + 10) {
        // starting point of each circle depends on mouse position
        const xAngle = p.map(p.mouseX, 0, p.width, 1 * p.PI, 2 * p.PI, true);
        const yAngle = p.map(p.mouseY, 0, p.height, 3 * p.PI, 4 * p.PI, true);
        // and also varies based on the particle's location
        const angle = xAngle * (x / p.width) + yAngle * (y / p.height);

        // each particle moves in a circle
        const myX = x + 7 * p.cos(2 * p.PI * t + angle);
        const myY = y + 7 * p.sin(3 * p.PI * t + angle);

        p.ellipse(myX, myY, 5); // draw particle
      }
    }
    t = t + 0.01; // update time
  }

  p.touchStarted = function() {
    touchX = p.mouseX;
    touchY = p.mouseY;
    ellipseColor = p.map(touchX, 0, p.width, 0, 255);
  };

  p.touchMoved = function() {
    touchX = p.mouseX;
    touchY = p.mouseY;
  };

  p.touchEnded = function() {
    /*touchX = -1;
    touchY = -1;*/
    touchX = width/2;
    touchY = height/2;
    drawA();
  };
};

let myp5m = new p5(sketchWaves, 'code');














let codeNew = function(p) {
    let palette;
    let g;

    p.setup = function() {
        let canvasDiv = document.getElementById('codeNew');
        let width = canvasDiv.offsetWidth;
        let height = canvasDiv.offsetHeight;
        let sketchCanvas = p.createCanvas(width, height, p.WEBGL);
        sketchCanvas.parent('codeNew');
        p.pixelDensity(1);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.angleMode(p.DEGREES);
        palette = shuffle(random(colorScheme).colors);
        p.frameRate(30);
        g = p.createGraphics(width, height);
        g.angleMode(p.DEGREES);
        p.noSmooth();
    }

    p.draw = function() {
        p.clear();
        g.clear();
        let offset = width / 20;
        let margin = 0;
        let cells = 10;
        let d = (width - offset * 2 - margin * (cells - 1)) / cells;
        p.randomSeed(231008);
        for (let j = 0; j < cells; j++) {
            for (let i = 0; i < cells; i++) {
                let colors = shuffle(palette.concat());
                let x = offset + i * (d + margin);
                let y = offset + j * (d + margin);
                if (p.random(100) > 50) {
                    drawFreqLine(x, y, x + d, y + d, colors, g);
                } else {
                    drawFreqLine(x + d, y, x, y + d, colors, g);
                }
            }
        }
        p.background(0, 0, 90);
        p.blendMode(p.MULTIPLY);
        let num = 10;
        for (let i = 0; i < num; i++) {
            let h = g.get();
            h.resize(
                (m = p.int(p.map(p.sin((i * 360) / num + 5 * p.frameCount), -1, 1, 100, width))),
                (m * height) / width
            );
            p.push();
            p.translate(
                width / 2 + (p.cos(p.frameCount * 5 + (i / num) * 360) * width) / 8,
                height / 2 + (p.sin(p.frameCount * 3 + (i / num) * 360) * height) / 8
            );
            p.rotate((i * 360) / 4 + 45 + p.frameCount);
            p.imageMode(p.CENTER);
            p.scale(p.tan(((i * 90) / num + p.frameCount / 3) % 90)) * 1;
            let nx = p.sin((i * 90) / num + p.frameCount / 5) * 100;
            let ny = p.cos((i * 90) / num + p.frameCount / 6) * 100;
            p.image(h, nx, ny, width, height);
            p.pop();
        }
    }

    function drawFreqLine(x1, y1, x2, y2, colors, target = g) {
        let d = p.dist(x1, y1, x2, y2);
        let a = p.atan2(y2 - y1, x2 - x1);
        let h1 = p.random(1, 5) * (p.random() > 0.5 ? -1 : 1);
        let h2 = p.random(1, 5) * (p.random() > 0.5 ? -1 : 1);
        let f1 = p.map(p.sin(x1 + y1 * width + p.frameCount * h1), -1, 1, 0, 1);
        let f2 = p.map(p.cos(x2 + y2 * width + p.frameCount * h2), -1, 1, 0, 1);
        f1 = easeInOutCirc(f1);
        f2 = easeInOutCirc(f2);
        let s1 = d * f1;
        let s2 = d * f2;
        let t = p.dist(s1, 0, s2, 0) / d;
        target.push();
        target.translate(x1, y1);
        target.rotate(a);
        target.noFill();
        target.stroke(colors[0]);
        target.strokeWeight(d / 10 / 2 * f2 * f1);
        let ld = d;
        target.strokeCap(p.SQUARE);
        target.line(s1, 0, s2, 0);
        target.push();
        target.translate(s1, 0);
        target.rotate((45 + f1 * 360));
        target.rectMode(p.CENTER);
        target.fill(colors[1]);
        target.noStroke();
        target.rect(0, 0, (d / 10) * (1 - f1) / Math.sqrt(2));
        target.pop();
        target.push();
        target.translate(s2, 0);
        target.rotate((-45 + f2 * 360));
        target.rectMode(p.CENTER);
        target.fill(colors[2]);
        target.noStroke();
        target.rect(0, 0, (d / 10) * (1 - f2) / Math.sqrt(2));
        target.pop();
        target.pop();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function random(item) {
        return p.random(item);
    }

    let colorScheme = [
        {
            name: "ice",
            colors: [
                p.color(204, 72, 63),
                p.color(204, 50, 63),
                p.color(204, 28, 63)
            ]
        }
    ];

    function easeInOutCirc(x) {
        return x < 0.5 ? (1 - p.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (p.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    }

    function easeInOutElastic(x) {
        const c5 = (2 * Math.PI) / 4.5;
        return x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5
            ? -(p.pow(2, 20 * x - 10) * p.sin((20 * x - 11.125) * c5)) / 2
            : (p.pow(2, -20 * x + 10) * p.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }

}

let newCodeNew = new p5(codeNew, 'codeNew');










let sketchWall = function(p) {
  p.setup = function() {
    //p.createCanvas(800, 800);
    let canvasDiv = document.getElementById('codeOct13');
    let width = canvasDiv.offsetWidth;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = p.createCanvas(width, height);
    console.log(sketchCanvas);
    sketchCanvas.parent("codeOct13");
  }

  p.draw = function() {
    p.background(220);

    p.randomSeed(0);
    let t = (p.frameCount / 100) % 1;
    let offset = p.width / 15;
    let x = offset;
    let y = offset;
    let d = p.width - offset * 2;
    let min_d = d / 8;
    separateGrid(x, y, d, min_d, t);
  }

  function separateGrid(x, y, d, min_d, t) {
    let sepNum = int(p.random(1, 5));
    let w = d / sepNum;

    for (let i = x; i < x + d - 1; i += w) {
      for (let j = y; j < y + d - 1; j += w) {
        if (p.random(100) < 95 && w > min_d) {
          separateGrid(i, j, w, min_d, t);
        } else {
          p.push();
          drawHatchFillSquare(i + w / 2, j + w / 2, w, t);
          p.pop();
        }
      }
    }
  }

  function drawHatchFillSquare(cx, cy, d, t) {
    p.push();
    p.translate(cx, cy);
    p.rotate((int(p.random(4)) * p.TWO_PI) / 4);
    for (let j = 0; j < 2; j++) {
      let a = (p.random() + t + j / 2) % 1;
      let count = p.map(a, 0, 1, 0, 20);
      p.push();
      p.rotate(j * p.PI);
      p.translate(-d / 2, -d / 2);
      p.noFill();
      p.strokeWeight(1);
      p.strokeCap(p.ROUND);
      p.strokeJoin(p.ROUND);
      if (j % 2 == 0) {
        p.beginShape();
        p.vertex(0, 0);
        for (let i = 0; i < count; i++) {
          let v = (i / count) * d;
          if (i % 2 == 0) {
            p.vertex(v, 0);
            p.vertex(0, v);
          } else {
            p.vertex(0, v);
            p.vertex(v, 0);
          }
        }
        p.vertex(d, 0);
        p.vertex(0, d);
        p.endShape();
      } else {
        p.beginShape();
        p.vertex(0, 0);
        for (let i = 0; i < count; i++) {
          let vStep = (1 / count) * d;
          let v = (i / count) * d;
          let v2 = d - v;
          if (i % 2 == 0) {
            p.vertex(v, v2);
            p.vertex(p.constrain(v + vStep, 0, d), p.constrain(v2 - vStep, 0, d));
          } else {
            p.vertex(v, 0);
            p.vertex(p.constrain(v + vStep, 0, d), 0);
          }
        }
        p.endShape();
      }
      p.pop();
    }
    p.pop();
  }
};

let Oct13 = new p5(sketchWall, 'codeOct13');
