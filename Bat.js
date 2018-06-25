class Bat extends createjs.Container {
  constructor(batBitmap, defaultRotation) {
    super()

    this.batBitmap = batBitmap
    this.defaultRotation = defaultRotation
    this.setup()
  }

  setup() {
    this.batBitmap.scaleX = this.batBitmap.scaleY = 1 / 2

    this.addChild(this.batBitmap)

    this.batBitmap.x = this.getBounds().width
    this.batBitmap.y = -this.getBounds().height / 2
    this.batBitmap.rotation = 55
    this.rotation = this.defaultRotation
  }

  swing(rotation) {
    if (this.rotation != this.defaultRotation) return 0
    
    createjs.Tween.get(this)
      .to({
        rotation: rotation
      }, 250)
      .wait(1000)
      .to({
        rotation: this.defaultRotation
      }, 1)
    createjs.Ticker.setFPS(60)
  }
}

window.Bat = createjs.promote(Bat, "Container")
