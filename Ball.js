class Ball extends createjs.Container {
  constructor(ballBitmap) {
    super()

    this.ballBitmap = ballBitmap
    this.isMoving = false
    this.moveAngle
    this.moveEnergy
    this.setup()
  }

  setup() {
    this.ballBitmap.scaleX = this.ballBitmap.scaleY = 1 / 10
    this.visible = false

    this.addChild(this.ballBitmap)

    this.regX = this.getBounds().width / 2 // addChild後にgetBoundsする
    this.regY = this.getBounds().height / 2
  }

  throw (startX, startY, endX, endY) {
    this.x = startX
    this.y = startY
    this.visible = true
    this.isMoving = true

    createjs.Tween.removeTweens(this)
    createjs.Tween.get(this)
      .wait(50)
      .to({
        x: endX,
        y: endY
      }, 1000)
      .call(() => {
        this.isMoving = false
      })
    createjs.Ticker.setFPS(60)
  }

  fly(angle, energy) {
    this.moveAngle = angle
    this.moveEnergy = energy

    let handleTick = (event) => {
      this.x += this.moveAngle.x * this.moveEnergy
      this.y += this.moveAngle.y * this.moveEnergy
      this.moveEnergy *= 0.99
      if (this.moveEnergy < 0.1) {
        this.moveEnergy = 0
        this.visible = false
        this.isMoving = false
        createjs.Ticker.removeEventListener("tick", handleTick)
      }
    }
    createjs.Ticker.addEventListener("tick", handleTick)
  }

}

window.Ball = createjs.promote(Ball, "Container")
