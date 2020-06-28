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
        width: 500,
        height: 500,
        background: 'transparent'
        // background: 'static/images/blower.png'
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
      console.log('y:', ballC.position.y);
      console.log('h:', render.canvas.height);
      if (ballC.position.y >= render.canvas.height - 60) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: .005, y: -0.05 })
      }

      if (ballC.position.y < ballC.circleRadius) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: -0.005, y: 0.05 })
      }

      if (ballC.position.x < ballC.circleRadius) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: 0.05, y: -0.005 })
      }
      if (ballC.position.x > render.canvas.width - 60) {
        Body.applyForce(ballC, { x: ballC.position.x, y: ballC.position.y }, { x: -0.05, y: 0.005 })
      }
    }
    Events.on(runner, 'tick', onRenderTick)
    World.add(engine.world, [ballC])

    Engine.run(engine)
    Render.run(render)

    /**
     * Build the circle bounds - BEGIN
     * */
    const addBody = (...bodies) => {
      World.add(engine.world, ...bodies)
    }

    const addRect = ({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) => {
      const body = Bodies.rectangle(x, y, w, h, options)
      addBody(body)
      return body
    }

    const sW = 500;
    const sH = 500;
    const m = Math.min(sW, sH);
    const rat = 1 / 4.5 * 2;
    const r = m * rat;
    const pegCount = 64;
    const TAU = Math.PI * 2;
    for (let i = 0; i < pegCount; i++) {
      const segment = TAU / pegCount;
      const angle2 = i / pegCount * TAU + segment / 2;
      const x2 = Math.cos(angle2);
      const y2 = Math.sin(angle2);
      const cx2 = x2 * r + sW / 2;
      const cy2 = y2 * r + sH / 2;
      addRect({
        x: cx2, y: cy2, w: 10 / 1000 * m, h: 300 / 1000 * m, options: {
          angle: angle2, isStatic: true, density: 1, render: {
            fillStyle: 'transparent',
            strokeStyle: 'white',
            lineWidth: 0
          }
        }
      });
    }
    // Build the circle bounds - END
  }
}

const app = new App()