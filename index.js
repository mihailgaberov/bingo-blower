/**
 * Created by Mihail on 3/5/2017.
 */
import createjs from 'createjs'

export default class App {
  constructor() {
    console.log('>>> App initialized...')
    this.init()
  }

  init() {
    let stage = new createjs.Stage('app');
    stage.canvas.width = 800;
    stage.canvas.height = 600;

    let bitmap = new createjs.Bitmap('static/images/ball7b.png');
    bitmap.x = 100;
    bitmap.y = 100;
    bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    stage.addChild(bitmap);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', stage);
  }
}

const app = new App()