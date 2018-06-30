class Scorer extends createjs.Container {
  constructor() {
    super()

    this.scoreText
    this.remainText
    this.shadow
    this.restartText
    this.modeChangeText
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

    this.restartText = new createjs.Text("もういちど", "bold 30px arial", "white")
    this.restartText.regX = this.restartText.getMeasuredWidth() / 2
    this.restartText.x = stage.canvas.width / 2
    this.restartText.y = stage.canvas.height / 2
    this.restartText.cursor = "pointer"
    this.restartText.addEventListener("click", () => this.restart())

    this.modeChangeText = new createjs.Text("ハードモード", "bold 30px arial", "red")
    this.modeChangeText.regX = this.modeChangeText.getMeasuredWidth() / 2
    this.modeChangeText.x = stage.canvas.width / 2
    this.modeChangeText.y = stage.canvas.height / 3
    this.modeChangeText.cursor = "pointer"
    this.modeChangeText.addEventListener("click", () => {
      if (bat.hardness === 5) {
        bat.hardness = 8
        this.modeChangeText.text = "イージーモード"
        this.modeChangeText.color = "blue"
      } else {
        bat.hardness = 5
        this.modeChangeText.text = "ハードモード"
        this.modeChangeText.color = "red"
      }
      this.restart()
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
    if (this.remainingBall === 0) this.gameEnd()
  }

  gameEnd() {
    if (!stage.contains(this.shadow)) {
      stage.addChild(this.shadow)
      stage.addChild(this.restartText)
      stage.addChild(this.modeChangeText)
    }
    this.shadow.visible = true
    this.restartText.visible = true
    if (bat.hardness !== 5 || this.score > 8) this.modeChangeText.visible = true
    else this.modeChangeText.visible = false
  }

  restart() {
    this.shadow.visible = false
    this.restartText.visible = false
    this.modeChangeText.visible = false
    this.remainingBall = 10
    this.score = 0
  }
}

window.Scorer = createjs.promote(Scorer, "Container")
