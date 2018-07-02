class Pitcher extends createjs.Container {
  constructor(headBitmap, bodyBitmap, pitchingBitmap, ball, bat) {
    super()

    this.headBitmap = headBitmap
    this.bodyBitmap = bodyBitmap
    this.pitchingBitmap = pitchingBitmap
    this.ball = ball
    this.bat = bat
    this.isSetUp = false
    this.setup()
  }

  setup() {
    this.addChild(this.bodyBitmap, this.headBitmap, this.pitchingBitmap)

    this.headBitmap.regX = this.headBitmap.getBounds().width / 2
    this.headBitmap.regY = this.headBitmap.getBounds().height / 2
    this.bodyBitmap.regX = this.bodyBitmap.getBounds().width / 2
    this.bodyBitmap.regY = this.bodyBitmap.getBounds().height / 2
    this.bodyBitmap.y = 180

    this.pitchingBitmap.x = -130
    this.pitchingBitmap.scaleX = this.pitchingBitmap.scaleY = 0.9
    this.pitchingBitmap.visible = false
  }

  get pitchingReady() {
    return !this.bat.isMoving && !this.ball.isMoving && !this.isSetUp
  }

  pitching(startX, startY, endX, endY) {
    this.isSetUp = true
    this.headBitmap.visible = this.bodyBitmap.visible = true
    this.pitchingBitmap.visible = false

    let tween = createjs.Tween.get(this.headBitmap)
    tween.wait(1000)
      .to({
        scaleX: -1
      }, 1)
      .wait(1000)
      .to({
        scaleX: 1
      }, 1)
      .wait(1000)
      .call(() => this.ball.throw(...arguments))
      .call(() => {
        this.isSetUp = false
        this.headBitmap.visible = this.bodyBitmap.visible = false
        this.pitchingBitmap.visible = true
      })
    createjs.Ticker.setFPS(10)
  }
}

window.Pitcher = createjs.promote(Pitcher, "Container")
