class Ball extends createjs.Container {
  constructor(ballBitmap) {
    super()

    this.ballBitmap = ballBitmap
    // this.hitBox
    this.setup()
  }

  setup() {
    this.ballBitmap.scaleX = this.ballBitmap.scaleY = 1 / 10
    this.visible = false

    this.addChild(this.ballBitmap)

    this.regX = this.getBounds().width / 2 // addChild後にgetBoundsする
    this.regY = this.getBounds().height / 2

    // this.hitBox = this.addChild(new createjs.Shape())
    // this.hitBox.graphics.beginFill("black").drawCircle(this.regX, this.regY, 18)
    // this.hitBox.visible = false
  }

  throw (startX, startY, endX, endY) {
    this.x = startX
    this.y = startY
    this.visible = true

    createjs.Tween.removeTweens(this)
    createjs.Tween.get(this)
      .wait(50)
      .to({
        x: endX,
        y: endY
      }, 1000)
    createjs.Ticker.setFPS(30)
  }
}

window.Ball = createjs.promote(Ball, "Container")
