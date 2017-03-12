/**
 * Created by Mihail on 3/12/2017.
 */
import createjs from 'createjs'

export default class Ball {
  constructor(stageWidth, stageHeight) {

    let bitmap = new createjs.Bitmap('static/images/ball7b.png')
    bitmap.x = Math.floor(Math.random() * stageWidth)
    bitmap.y = Math.floor(Math.random() * stageHeight)
    bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10)

    return bitmap
  }
}