(function() {

  function Ground() {
    this.Container_constructor()

    this.label = "OKOK"

    this.setup()
  }
  let p = createjs.extend(Ground, createjs.Container)

  p.setup = function() {
    let glass = new createjs.Shape()
    let dart = new createjs.Shape()
    let leftbox = new createjs.Shape()
    let rightbox = new createjs.Shape()
    let leftline = new createjs.Shape()
    let rightline = new createjs.Shape()
    let homebase = new createjs.Shape()

    glass.graphics.beginFill("green")
      .drawRect(-1000, -2000, 2000, 2500)

    dart.graphics.beginFill("#ac7c4f")
      .moveTo(0, 0)
      .arc(0, 0, 400, -Math.PI * 3 / 4, -Math.PI * 1 / 4, false)
    dart.y = 60

    leftbox.graphics.beginStroke("white")
      .drawRect(-40, -30, 25, 45)
    rightbox.graphics.beginStroke("white")
      .drawRect(15, -30, 25, 45)

    let linelen = 300
    leftline.graphics.beginStroke("white")
      .moveTo(-40, -30)
      .lineTo(-40 - linelen, -30 - linelen)
    rightline.graphics.beginStroke("white")
      .moveTo(40, -30)
      .lineTo(40 + linelen, -30 - linelen)

    homebase.graphics.beginFill("white")
      .moveTo(0, 0)
      .lineTo(-10, -10)
      .lineTo(-10, -20)
      .lineTo(10, -20)
      .lineTo(10, -10)
      .lineTo(0, 0)

    this.addChild(glass, dart,
      leftbox, rightbox, leftline, rightline, homebase)
  }

  window.Ground = createjs.promote(Ground, "Container")
}())
