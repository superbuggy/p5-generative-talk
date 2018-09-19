let increment = 0.1
let rows, columns
let pixelsBetween = 10
let frameRateDisplay

function setup () {
  createCanvas(400, 400)
  background(0, 0, 0)
  rows = floor(height / pixelsBetween)
  columns = floor(width / pixelsBetween)
}

function draw () {
  let yOffset = 0
  for (let y = 0; y < rows; y++) {
    let xOffset = 0
    for (let x = 0; x < rows; x++) {
      let index = (x + y * width) * 4
      let randomness = noise(xOffset, yOffset) * 255
      let vector = p5.Vector.fromAngle(0)
      xOffset += increment
      noStroke()
      // stroke(0)
      fill(randomness)
      rect(x * pixelsBetween, y * pixelsBetween, pixelsBetween, pixelsBetween)
    }
    yOffset += increment
  }
}
console.log(2345)
