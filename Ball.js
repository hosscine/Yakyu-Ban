(function() {

  function Ball(bitmap) {
    this.ballBitmap = bitmap

    this.Container_constructor()
    this.setup()
  }
  var p = createjs.extend(Ball, createjs.Container)

  p.setup = function() {
    this.ballBitmap.scaleX = this.ballBitmap.scaleY = 1 / 10
    this.visible = false

    this.addChild(this.ballBitmap)

    this.regX = this.getBounds().width / 2 // addChild後にgetBoundsする
    this.regY = this.getBounds().height / 2
  }

  p.throw = function(startX, startY, endX, endY) {
    this.x = startX
    this.y = startY
    this.visible = true

console.log(this)
    createjs.Tween.removeTweens(this)
    createjs.Tween.get(this)
      .wait(50)
      .to({
        x: endX,
        y: endY
      }, 1000)
    createjs.Ticker.setFPS(30)
  }

  window.Ball = createjs.promote(Ball, "Container")
}())
