class Ball extends createjs.Container {
  constructor(ballBitmap) {
    super()

    this.ballBitmap = ballBitmap
    this.isMoving = false
    this.flyToward
    this.flyEnergy
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
      .call(() => {
        scorer.evaluateFly(this.x, this.y)
      })
    createjs.Ticker.setFPS(60)
  }

  fly(toward, energy) {
    this.flyToward = toward
    this.flyEnergy = energy

    let handleTick = (event) => {
      this.x += this.flyToward.x * this.flyEnergy
      this.y += this.flyToward.y * this.flyEnergy
      this.flyEnergy *= 0.99

      let gp = this.localToGlobal(0, 0)
      if (this.flyEnergy < 0.1 ||
        gp.x > stage.canvas.width || gp.x < 0 ||
        gp.y > stage.canvas.height || gp.y < 0) {
        if (this.flyEnergy === 0) return 0

        this.flyEnergy = 0
        this.visible = false
        this.isMoving = false
        createjs.Ticker.removeEventListener("tick", handleTick)
        scorer.evaluateFly(this.x, this.y)
      }
    }
    createjs.Ticker.addEventListener("tick", handleTick)
  }

}

window.Ball = createjs.promote(Ball, "Container")
