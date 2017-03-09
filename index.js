/**
 * Created by Mihail on 3/5/2017.
 */
import createjs from 'createjs'


export default class App {
  constructor() {
    console.log('>>> App intialized...')
    this.init()
  }

  init() {
    let el = document.createElement('img');
    el.src = 'assets/images/ball3.jpg';
    document.body.appendChild(el);

    let stage = new createjs.Stage('app');
    stage.canvas.width = 800;
    stage.canvas.height = 600;

    let bitmap = new createjs.Bitmap('assets/ball7b.png');
    bitmap.x = 100;
    bitmap.y = 100;
    bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    stage.addChild(bitmap);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', stage);
  }
}

const app = new App()