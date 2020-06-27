// import createjs from 'createjs'
// import Ball from './src/Ball'
import Matter from 'matter-js'

export default class App {
  constructor () {
    console.log('>>> App initialized...')

    this.BALLS_COUNT = 75

    this.initMatter()

    // this.init()
  }

  /*init() {
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
  }*/

  initMatter () {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies

    const engine = Engine.create()

    const render = Render.create({
      // element: document.body,
      canvas: canvas,
      engine: engine,
      options: {
        width: 800,
        height: 400,
        wireframes: false
      }
    })

    const boxA = Bodies.rectangle(400, 200, 80, 80, { restitution: 1 })
    const ballA = Bodies.circle(380, 100, 40, { restitution: 1 })
    const ballB = Bodies.circle(460, 10, 40, 10)
    const ballC = Bodies.circle(460, 10, 20,  {
      restitution: 1,
      render: {
        sprite: {
          texture: "static/images/ball7b.png"
        }
      }
    })
    const ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true })

    console.log('>>> ballA: ', ballA.position.y)
    if (ballA.position.y > 300 - ballA.circleRadius) {
      console.log('>>> kaboom')
    }

    World.add(engine.world, [boxA, ballA, ballB, ballC, ground])

    Engine.run(engine)
    Render.run(render)
  }
}

const app = new App()