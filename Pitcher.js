class Pitcher extends createjs.Container {
  constructor(headBitmap, bodyBitmap, ball, bat) {
    super()

    this.headBitmap = headBitmap
    this.bodyBitmap = bodyBitmap
    this.ball = ball
    this.bat = bat
    this.isSetUp = false
    this.setup()
  }

  setup() {
    this.addChild(this.bodyBitmap, this.headBitmap)

    this.headBitmap.regX = this.headBitmap.getBounds().width / 2
    this.headBitmap.regY = this.headBitmap.getBounds().height / 2
    this.bodyBitmap.regX = this.bodyBitmap.getBounds().width / 2
    this.bodyBitmap.regY = this.bodyBitmap.getBounds().height / 2
    this.bodyBitmap.y = 180
  }

  get pitchingReady() {
    return (!this.bat.isMoving && !this.ball.isMoving && !this.isSetUp)
  }

  pitching(startX, startY, endX, endY) {
    // console.log(this.pitchingReady)
    this.isSetUp = true
    let tween = createjs.Tween.get(this.headBitmap)
    tween.to({
        scaleX: -1
      }, 1)
      .wait(1000)
      .to({
        scaleX: 1
      }, 1)
      .wait(1000)
      .call(() => this.ball.throw(...arguments))
    tween.call(() => this.handleComplete())
    createjs.Ticker.setFPS(10)
  }

  handleComplete() {
    this.isSetUp = false
  }
}

window.Pitcher = createjs.promote(Pitcher, "Container")
