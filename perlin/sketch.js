let increment = 0.1
let rows, columns
let pixelsBetween = 10
let timeOffset = 0

let frameRateDisplay = document.createElement('p')
document.body.appendChild(frameRateDisplay)

function setup () {
  createCanvas(400, 400)
  background(0, 0, 0)
  rows = floor(height / pixelsBetween)
  columns = floor(width / pixelsBetween)
}

function draw () {
  background(255)
  let yOffset = 0
  for (let y = 0; y < rows; y++) {
    let xOffset = 0
    for (let x = 0; x < rows; x++) {
      let index = (x + y * width) * 4
      let angle = noise(xOffset, yOffset, timeOffset) * TWO_PI
      let vector = p5.Vector.fromAngle(angle)
      xOffset += increment

      stroke(0)
      push()
      translate(x * pixelsBetween, y * pixelsBetween)
      rotate(vector.heading())
      line(0, 0, pixelsBetween, 0)
      pop()
    }
    yOffset += increment
    timeOffset += 0.004
  }

  frameRateDisplay.innerHTML = floor(frameRate())
}
console.log(2345)
