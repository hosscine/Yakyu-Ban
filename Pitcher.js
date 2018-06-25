(function() {

  function Pitcher(headBitmap, bodyBitmap, ball) {
    this.headBitmap = headBitmap
    this.bodyBitmap = bodyBitmap
    this.ball = ball

    this.Container_constructor()
    this.setup()
  }
  var p = createjs.extend(Pitcher, createjs.Container)

  p.setup = function() {
    this.addChild(this.bodyBitmap, this.headBitmap)

    this.headBitmap.regX = this.headBitmap.getBounds().width / 2
    this.headBitmap.regY = this.headBitmap.getBounds().height / 2
    this.bodyBitmap.regX = this.bodyBitmap.getBounds().width / 2
    this.bodyBitmap.regY = this.bodyBitmap.getBounds().height / 2
    this.bodyBitmap.y = 180
  }

  p.pitching = function(startX, startY, endX, endY) {
    createjs.Tween.get(this.headBitmap)
      .to({
        scaleX: -1
      }, 1)
      .wait(1000)
      .to({
        scaleX: 1
      }, 1)
      .wait(1000)
      .call(() => this.ball.throw(...arguments))
    createjs.Ticker.setFPS(10)
  }

  window.Pitcher = createjs.promote(Pitcher, "Container")
}())
