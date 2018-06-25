class Bat extends createjs.Container {
  constructor(batBitmap) {
    super()

    this.batBitmap = batBitmap
    this.setup()
  }

  setup() {
    this.batBitmap.scaleX = this.batBitmap.scaleY = 1 / 2

    this.addChild(this.batBitmap)

    this.batBitmap.x = this.getBounds().width
    this.batBitmap.y = -this.getBounds().height / 2
    this.batBitmap.rotation = 55
  }

  throw(startX, startY, endX, endY) {
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

window.Bat = createjs.promote(Bat, "Container")
