class Scorer extends createjs.Container {
  constructor() {
    super()

    this.scoreText
    this.remainText
    this._score = 0
    this._remainingBall = 10
    this.setup()
  }

  setup() {
    let background = this.addChild(new createjs.Shape())
    background.graphics.beginFill("black")
      .drawRoundRect(-100, -100, 100, 100, 20, 20)
    background.alpha = 0.5

    this.scoreText = this.addChild(
      new createjs.Text(this._score + "点", "20px arial", "white"))
    this.scoreText.regX = this.scoreText.getMeasuredWidth() / 2
    this.scoreText.x = -50
    this.scoreText.y = -40

    this.remainText = this.addChild(
      new createjs.Text(this._remainingBall + "球", "20px arial", "white"))
    this.remainText.regX = this.remainText.getMeasuredWidth() / 2
    this.remainText.x = -50
    this.remainText.y = -80
  }

  set score(value){
    this._score = value
    this.scoreText.text = this._score + "点"
    this.scoreText.regX = this.scoreText.getMeasuredWidth() / 2
    this.scoreText.x = -50
  }

  set remainingBall(value){
    this._remainingBall = value
    this.remainText.text = this._remainingBall + "球"
    this.remainText.regX = this.remainText.getMeasuredWidth() / 2
    this.remainText.x = -50
  }

  evaluateFly(x, y) {

  }
}

window.Scorer = createjs.promote(Scorer, "Container")
