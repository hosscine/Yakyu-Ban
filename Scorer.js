class Scorer extends createjs.Container {
  constructor() {
    super()

    this.score = 0
    this.remainingBall = 10
    this.setup()
  }

  setup() {
    let background = this.addChild(new createjs.Shape())
    background.graphics.beginFill("black")
      .drawRoundRect(-100, -100, 100, 100, 20, 20)
    background.alpha = 0.5

    let scoreText = this.addChild(
      new createjs.Text(this.score + "点", "20px arial", "white"))
    scoreText.regX = scoreText.getMeasuredWidth() / 2
    scoreText.x = -50
    scoreText.y = -40

    let remainText = this.addChild(
      new createjs.Text(this.remainingBall + "球", "20px arial", "white"))
    remainText.regX = remainText.getMeasuredWidth() / 2
    remainText.x = -50
    remainText.y = -80
  }

  evaluateFly(x, y) {

  }
}

window.Scorer = createjs.promote(Scorer, "Container")
