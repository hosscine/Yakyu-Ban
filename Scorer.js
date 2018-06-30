class Scorer extends createjs.Container {
  constructor() {
    super()

    this.scoreText
    this.remainText
    this.shadow
    this.restart
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

    this.shadow = new createjs.Shape()
    this.shadow.graphics.beginFill("black")
      .drawRect(0, 0, stage.canvas.width, stage.canvas.height)
    this.shadow.alpha = 0.5

    this.restart = new createjs.Text("もういちど", "30px arial", "white")
    this.restart.regX = this.restart.getMeasuredWidth() / 2
    this.restart.x = stage.canvas.width / 2
    this.restart.y = stage.canvas.height / 2
    this.restart.addEventListener("click", () => {
      this.shadow.visible = false
      this.restart.visible = false
      this.remainingBall = 10
      this.score = 0
    })
  }

  get score() {
    return this._score
  }
  set score(value) {
    this._score = value
    this.scoreText.text = this._score + "点"
    this.scoreText.regX = this.scoreText.getMeasuredWidth() / 2
    this.scoreText.x = -50
  }

  get remainingBall() {
    return this._remainingBall
  }
  set remainingBall(value) {
    this._remainingBall = value
    this.remainText.text = this._remainingBall + "球"
    this.remainText.regX = this.remainText.getMeasuredWidth() / 2
    this.remainText.x = -50
  }

  evaluateFly(x, y) {
    if (Math.abs(x - ground.x) < Math.abs(y - ground.y) &&
      y < ground.y) {
      this.score = this.score + 1
    }
    if(this.remainingBall === 0) this.gameEnd()
  }

  gameEnd() {
    if (!stage.contains(this.shadow)) {
      stage.addChild(this.shadow)
      stage.addChild(this.restart)
    }
    this.shadow.visible = true
    this.restart.visible = true
  }
}

window.Scorer = createjs.promote(Scorer, "Container")
