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

  p.feint = function() {
    createjs.Tween.get(this.headBitmap)
      .to({scaleX: -1},1)
      .wait(1000)
      .to({scaleX: 1},1)
      .wait(1000)
    createjs.Ticker.setFPS(30)
  }

  window.Pitcher = createjs.promote(Pitcher, "Container")
}())
