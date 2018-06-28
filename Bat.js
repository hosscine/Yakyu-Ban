class Bat extends createjs.Container {
  constructor(batBitmap, defaultRotation, targetBall) {
    super()

    this.batBitmap = batBitmap
    this.defaultRotation = defaultRotation
    // this.defaultRotation = 0
    this.targetBall = targetBall
    this.hitBox
    this.isMoving = false

    this.setup()
  }

  setup() {
    this.batBitmap.scaleX = this.batBitmap.scaleY = 1 / 2

    this.addChild(this.batBitmap)

    this.hitBox = this.addChild(new createjs.Shape())
    let b = this.batBitmap.getBounds()
    this.hitBox.graphics.beginFill("black")
      .drawRect(b.x, b.y, b.width, b.height/12)
    // this.hitbox.graphics
    this.hitBox.setBounds(this.batBitmap.getBounds())
    this.hitBox.visible = false

    this.rotation = this.defaultRotation
  }

  swing(rotation) {
    if (this.isMoving) return 0
      this.isMoving = true
    let tween = createjs.Tween.get(this)
    tween.to({
        rotation: rotation
      }, 250)
      .wait(1000)
      .to({
        rotation: this.defaultRotation
      }, 500)
      .call(this.handleComplete)
    tween.addEventListener("change", () => this.handleChange())
    createjs.Ticker.setFPS(60)
  }


  handleChange(event) {
    let point = this.targetBall.localToLocal(0, 0, this.hitBox)
     console.log(point)

    if (this.hitBox.hitTest(point.x, point.y)) {
      createjs.Tween.removeTweens(this.targetBall)
      // console.log(createjs.Tween.get(this.targetBall))
      console.log("hoge")
      // alert("hoge")
    }

  }

  handleComplete() {
    this.isMoving = false
  }
}

window.Bat = createjs.promote(Bat, "Container")
