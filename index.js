/**
 * Created by Mihail on 3/5/2017.
 */
import createjs from 'createjs'

export default class App {
  constructor() {
    console.log('>>> App initialized...')

    this.BALLS_COUNT = 75

    this.init()
  }

  init() {
    let stage = new createjs.Stage('app')
    stage.canvas.width = 800
    stage.canvas.height = 600

    let i = 0
    while(i < this.BALLS_COUNT) {
      let bitmap = new createjs.Bitmap('static/images/ball7b.png')

      bitmap.x = Math.floor(Math.random() * stage.canvas.width)
      bitmap.y = Math.floor(Math.random() * stage.canvas.height)

      console.log('coords:', bitmap.x, bitmap.y)
      bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10)
      stage.addChild(bitmap);
      i++;
    }

    createjs.Ticker.setFPS(60)
    createjs.Ticker.addEventListener('tick', stage)
  }
}

const app = new App()