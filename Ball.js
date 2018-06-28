class Ball extends createjs.Container {
  constructor(ballBitmap) {
    super()

    this.ballBitmap = ballBitmap
    this.isMoving = false
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
      .call(this.handleComplete)
    createjs.Ticker.setFPS(30)
  }

  handleComplete(){
    this.isMoving = false
  }
}

window.Ball = createjs.promote(Ball, "Container")
