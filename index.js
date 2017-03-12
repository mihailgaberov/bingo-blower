/**
 * Created by Mihail on 3/5/2017.
 */
import createjs from 'createjs'
import Ball from './src/Ball'

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
      const ball = new Ball(stage.canvas.width, stage.canvas.height)
      stage.addChild(ball.bitmap)
      i++;
    }

    createjs.Ticker.setFPS(60)
    createjs.Ticker.addEventListener('tick', stage)
  }
}

const app = new App()