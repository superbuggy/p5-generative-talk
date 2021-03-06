let increment = 0.1
let rows, columns
let pixelsBetween = 10
let timeOffset = 0

let particles = []
let flowField = []

let frameRateDisplay = document.createElement('p')
document.body.appendChild(frameRateDisplay)

function setup () {
  createCanvas(400, 400)
  // background(0, 0, 0)
  rows = floor(height / pixelsBetween)
  columns = floor(width / pixelsBetween)
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle()
  }
}

function draw () {
  // background(255)
  let yOffset = 0
  for (let y = 0; y < rows; y++) {
    let xOffset = 0
    for (let x = 0; x < rows; x++) {
      let angle = noise(xOffset, yOffset, timeOffset) * TWO_PI
      let vector = p5.Vector.fromAngle(angle)
      vector.setMag(0.05)
      let flowFieldIndex = x + y * columns
      flowField[flowFieldIndex] = vector
      xOffset += increment

      // stroke(190)
      // strokeWeight(1)
      // push()
      // translate(x * pixelsBetween, y * pixelsBetween)
      // rotate(vector.heading())
      // line(0, 0, pixelsBetween, 0)
      // pop()
    }
    yOffset += increment
    timeOffset += 0.001
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField)
    particles[i].update()
    particles[i].show()
  }

  frameRateDisplay.innerHTML = floor(frameRate())
}

class Particle {
  constructor () {
    this.position = createVector(random(width), random(height))
    this.velocity = createVector(0, 0)
    // this.velocity = p5.Vector.random2D()
    this.acceleration = createVector(0, 0)
    this.MAX_SPEED = 4
  }

  update () {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.MAX_SPEED)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
    this.edges()
  }

  applyForce (force) {
    this.acceleration.add(force)
  }

  show () {
    // stroke(frameCount % 255, frameCount % 155 + 100, random(255))
    stroke(0, frameCount % 155 + 100, 0, frameCount % 155 + 100)
    strokeWeight(1)
    point(this.position.x, this.position.y)
  }

  edges () {
    if (this.position.x > width) this.position.x = 0
    if (this.position.y > height) this.position.y = 0
    if (this.position.x < 0) this.position.x = width
    if (this.position.y < 0) this.position.y = height
  }

  follow (vectors) {
    let x = floor(this.position.x / pixelsBetween)
    let y = floor(this.position.y / pixelsBetween)
    let index = x + y * columns
    let force = vectors[index]
    this.applyForce(force)
  }
}
