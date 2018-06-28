class Bat extends createjs.Container {
  constructor(batBitmap, defaultRotation, targetBall) {
    super()

    this.batBitmap = batBitmap
    this.defaultRotation = defaultRotation
    this.targetBall = targetBall
    this.hitBox
    this.isMoving = false

    this.setup()
  }

  setup() {
    this.batBitmap.scaleX = this.batBitmap.scaleY = 1 / 2

    this.addChild(this.batBitmap)

    this.batBitmap.x = this.getBounds().width
    this.batBitmap.y = -this.getBounds().height / 2
    this.batBitmap.rotation = 55
    this.rotation = this.defaultRotation

    this.hitBox = stage.addChild(new createjs.Shape())
    let b = this.batBitmap.getBounds()
    this.hitBox.graphics.beginFill("black")
    .drawRect(b.width / 2 + 30, b.height + 35, 110, 10)
    // this.hitBox = new createjs.Rectangle(b.width / 2 + 30, b.height + 35, 110, 10)
    this.hitBox.visible = false
// console.log(this.hitBox.)
  }

  swing(rotation) {
    // Collision Check
    if (this.rotation != this.defaultRotation) {
      let point = this.targetBall.localToLocal(0, 0, this)
      console.log(point)
      console.log(this.hitBox.hitTest(point.x, point.y))
      if (this.hitBox.hitTest(point.x, point.y)) {
        createjs.Tween.removeTweens(this.targetBall)
      }

      // Motion Tween
    } else {
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
        tween.addEventListener("change", this.handleChange)
        // tween.addEventListener("complete", this.handleComplete)
      createjs.Ticker.setFPS(60)
    }
  }

  handleChange(event){
    // console.log(1)
  }

  handleComplete(){
    this.isMoving = false
  }
}

window.Bat = createjs.promote(Bat, "Container")
