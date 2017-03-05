/**
 * Created by Mihail on 3/5/2017.
 */
import createjs from 'createjs'

let stage = new createjs.Stage("app")

const circle = new createjs.Shape()
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50)
circle.x = 100
circle.y = 100
stage.addChild(circle)
stage.update()


console.log('Circle: ', circle)
