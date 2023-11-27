let palette;
let g;






function setup() {
  var canvasDiv = document.getElementById('codeNew');
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  var sketchCanvas = createCanvas(width,height, WEBGL);
  console.log(sketchCanvas);
  sketchCanvas.parent('codeNew');
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  palette = shuffle(random(colorScheme).colors);
  frameRate(30);
  g = createGraphics(width, height);
  g.angleMode(DEGREES);
  noSmooth();
  background(15, 30, 50);
  draw();
}

function draw() {
  //added scale of .5 
  scale(0.5);
  clear();
  g.clear();
  // move offset
  let offset = width / 80;
  let margin = 0;
  let cells = 10;
  //move /2 again
  let d = (width - offset * 2 - margin * (cells - 1)) / cells / 2;
  randomSeed(231008);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let colors = shuffle(palette.concat());
      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      if (random(100) > 50) {
        drawFreqLine(x, y, x + d, y + d, colors, g);
      } else {
        drawFreqLine(x + d, y, x, y + d, colors, g);
      }
    }
  }
  background(0, 0, 90);
  // image(g,0,0);
  blendMode(MULTIPLY);
  let num = 10;
  for (let i = 0; i < num; i++) {
    let h = g.get();
    h.resize(
      (m = int(map(sin((i * 360) / num + 5 * frameCount), -1, 1, 100, width))),
      (m * height) / width
    );
    push();
    translate(
      width / 2 + (cos(frameCount * 5 + (i / num) * 360) * width) / 8,
      height / 2 + (sin(frameCount * 3 + (i / num) * 360) * height) / 8
    );
    rotate((i * 360) / 4 + 45 + frameCount);
    imageMode(CENTER);
    scale(tan(((i * 90) / num + frameCount / 3) % 90)) * 1;
    let nx = sin((i * 90) / num + frameCount / 5) * 100;
    let ny = cos((i * 90) / num + frameCount / 6) * 100;
    image(h, nx, ny, width, height);
    pop();
  }
}

function drawFreqLine(x1, y1, x2, y2, colors, target = this) {
  let d = dist(x1, y1, x2, y2);
  let a = atan2(y2 - y1, x2 - x1);
  let h1 = random(1, 5) * (random() > 0.5 ? -1 : 1);
  let h2 = random(1, 5) * (random() > 0.5 ? -1 : 1);
  let f1 = map(sin(x1 + y1 * width + frameCount * h1), -1, 1, 0, 1);
  let f2 = map(cos(x2 + y2 * width + frameCount * h2), -1, 1, 0, 1);
  f1 = easeInOutCirc(f1);
  f2 = easeInOutCirc(f2);
  let s1 = d * f1;
  let s2 = d * f2;
  let t = dist(s1, 0, s2, 0) / d;
  target.push();
  target.translate(x1, y1);
  target.rotate(a);
  target.noFill();
  target.stroke(colors[0]);
  target.strokeWeight(d / 10 / 2*f2*f1);
  let ld = d;
  target.strokeCap(SQUARE);
  // target.drawingContext.setLineDash([d/2]);
  // target.drawingContext.lineDashOffset = (d/2)*2*t;
  target.line(s1, 0, s2, 0);
  // line(0, 0, d*t, 0);

  target.push();
  target.translate(s1, 0);
  target.rotate((45+f1*360));
  target.rectMode(CENTER);
  target.fill(colors[1]);
  target.noStroke();
  target.rect(0,0,(d / 10) * (1 - f1) / sqrt(2));
  target.pop();

  target.push();
  target.translate(s2, 0);
  target.rotate((45+f2*360));
  target.rectMode(CENTER);
  target.fill(colors[2]);
  target.noStroke();
  // added /2
  target.rect(0,0,(d / 10) * (1-f1) / sqrt(2)/2);
  target.pop();

  target.pop();
}

let colorScheme = [
  {
    name: "Benedictus",
    colors: ["#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8"],
  },
  {
    name: "Cross",
    colors: ["#D962AF", "#58A6A6", "#8AA66F", "#F29F05", "#F26D6D"],
  },
  {
    name: "Demuth",
    colors: ["#222940", "#D98E04", "#F2A950", "#BF3E21", "#F2F2F2"],
  },
  {
    name: "Hiroshige",
    colors: ["#1B618C", "#55CCD9", "#F2BC57", "#F2DAAC", "#F24949"],
  },
  {
    name: "Hokusai",
    colors: ["#074A59", "#F2C166", "#F28241", "#F26B5E", "#F2F2F2"],
  },
  {
    name: "Hokusai Blue",
    colors: ["#023059", "#459DBF", "#87BF60", "#D9D16A", "#F2F2F2"],
  },
  {
    name: "Java",
    colors: ["#632973", "#02734A", "#F25C05", "#F29188", "#F2E0DF"],
  },
  {
    name: "Kandinsky",
    colors: ["#8D95A6", "#0A7360", "#F28705", "#D98825", "#F2F2F2"],
  },
  {
    name: "Monet",
    colors: ["#4146A6", "#063573", "#5EC8F2", "#8C4E03", "#D98A29"],
  },
  {
    name: "Nizami",
    colors: ["#034AA6", "#72B6F2", "#73BFB1", "#F2A30F", "#F26F63"],
  },
  {
    name: "Renoir",
    colors: ["#303E8C", "#F2AE2E", "#F28705", "#D91414", "#F2F2F2"],
  },
  {
    name: "VanGogh",
    colors: ["#424D8C", "#84A9BF", "#C1D9CE", "#F2B705", "#F25C05"],
  },
  {
    name: "Mono",
    colors: ["#D9D7D8", "#3B5159", "#5D848C", "#7CA2A6", "#262321"],
  },
  {
    name: "RiverSide",
    colors: ["#906FA6", "#025951", "#252625", "#D99191", "#F2F2F2"],
  },
];
function easeInOutCirc(x) {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

function easeInOutElastic(x) {
  const c5 = (2 * Math.PI) / 4.5;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}


















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
