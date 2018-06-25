(function() {

  function Pitcher(headBitmap, bodyBitmap) {
    this.headBitmap = headBitmap
    this.bodyBitmap = bodyBitmap

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

  p.throw = function(startX, startY, endX, endY) {
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

  window.Pitcher = createjs.promote(Pitcher, "Container")
}())
