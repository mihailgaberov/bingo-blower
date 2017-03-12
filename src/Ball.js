/**
 * Created by Mihail on 3/12/2017.
 */
import createjs from 'createjs'

export default class Ball {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight
    this.xSpeed = 5;
    this.ySpeed = 5;

    this.bitmap = new createjs.Bitmap('static/images/ball7b.png')
    this.bitmap.x = Math.floor(Math.random() * stageWidth)
    this.bitmap.y = Math.floor(Math.random() * stageHeight)
    this.bitmap.shadow = new createjs.Shadow('#00000', 5, 5, 10)

    createjs.Ticker.setFPS(60)
    createjs.Ticker.addEventListener('tick', this.move.bind(this))
    return this
  }

  move() {
    console.log('>>> move mada faka move!')
    this.bitmap.x = this.bitmap.x + this.xSpeed
    this.bitmap.y = this.bitmap.y + this.ySpeed


    if((this.bitmap.y) < 0)
      this.ySpeed = -this.ySpeed;

    if((this.bitmap.y + (40)) > this.stageHeight)
      this.ySpeed = -this.ySpeed

    if((this.bitmap.x) < 0)
      this.xSpeed = -this.xSpeed;


    if((this.bitmap.x + (40)) > this.stageWidth)
      this.xSpeed = -this.xSpeed;
  }
}