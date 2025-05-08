// Lorenz Attractor Parameters
let a = 10;     // sigma
let b = 28;     // rho
let c = 8/3;    // beta

// position
let x = 0.1;
let y = 0;
let z = 0;

let scale = 10;

let points = [];
let maxPoints = 50000;

// rotation angle around the y axis
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 255);
  
  points.push(createVector(x, y, z));
}

function draw() {}
  background(0);
  
  // allows control of camera through mouse
  orbitControl(3, 3, 3);
  
  rotateY(angle);
  angle += 0.001;
  
  // lorenz equations
  let dt = 0.01;
  let dx = a * (y - x) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;
  
  x += dx;
  y += dy;
  z += dz;
  
  points.push(createVector(x, y, z));
  
  if (points.length > maxPoints) {
    points.shift();
  }
  
  noFill();
  strokeWeight(2);
  
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    
    let hue = (i * 0.5) % 255;
    stroke(hue, 255, 255);
    
    vertex(p.x * scale, p.y * scale, p.z * scale);
  }
  endShape();


// adjust canvas when resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // reset
  if (key === 'r' || key === 'R') {
    points = [];
    x = 0.1;
    y = 0;
    z = 0;
  }
  
  // Adjust parameters
  if (key === '1') a += 0.1;  // inc sigma
  if (key === '2') a -= 0.1;  // dec sigma
  if (key === '3') b += 0.1;  // inc rho
  if (key === '4') b -= 0.1;  // dec rho
  if (key === '5') c += 0.1;  // inc beta
  if (key === '6') c -= 0.1;  // dec beta
  
  console.log(`Sigma: ${a}, Rho: ${b}, Beta: ${c}`);
}