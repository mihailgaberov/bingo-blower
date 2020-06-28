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
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Runner = Matter.Runner,
      Events = Matter.Events

    const engine = Engine.create()
    const runner = Runner.run(engine)

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        wireframes: false,
        background: 'static/images/blower.png'
      }
    })
    const ballC = Bodies.circle(render.canvas.width / 2, 10, 20, {
      restitution: 1,
      render: {
        sprite: {
          texture: 'static/images/ball7b.png'
        }
      }
    })
    const onRenderTick = () => {
      if (ballC.position.y > render.canvas.height - ballC.circleRadius) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: .005, y: -0.05 })
      }

      if (ballC.position.y < ballC.circleRadius) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: -0.005, y: 0.05 })
      }

      if (ballC.position.x < ballC.circleRadius) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: 0.05, y: -0.005 })
      }
      if (ballC.position.x > render.canvas.width - ballC.circleRadius) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: -0.05, y: 0.005 })
      }
    }
    Events.on(runner, 'tick', onRenderTick)
    World.add(engine.world, [ballC])

    Engine.run(engine)
    Render.run(render)
  }
}

const app = new App()