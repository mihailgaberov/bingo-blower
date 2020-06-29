import Matter from 'matter-js'

const BALLS_COUNT = 44

export default class App {
  static init () {
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
        width: 550,
        height: 550,
        background: 'transparent'
      }
    })

    const balls = []
    const ballImagePaths = [
      'static/images/1.png',
      'static/images/7.png',
      'static/images/13.png',
      'static/images/17.png',
      'static/images/24.png',
      'static/images/33.png',
      'static/images/44.png',
      'static/images/50.png',
      'static/images/58.png',
      'static/images/66.png',
      'static/images/75.png',
    ]

    const createBall = () => {
      const ball = Bodies.circle(
        300,
        render.canvas.height / 2,
        20, {
          restitution: 1,
          render: {
            sprite: {
              texture: ballImagePaths[Math.round(Math.random() * (ballImagePaths.length - 1))]
            }
          }
        })
      balls.push(ball)
      return ball
    }

    const onRenderTick = () => {
      balls.forEach(ball => {
        if (ball.position.y >= render.canvas.height - 60) {
          Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: .005, y: -0.07 })
        }
        if (ball.position.y < ball.circleRadius) {
          Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.005, y: 0.05 })
        }

        if (ball.position.x < ball.circleRadius) {
          Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.05, y: -0.005 })
        }

        if (ball.position.x > render.canvas.width - 60) {
          Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.05, y: 0.005 })
        }
      })
    }

    // Add the balls to the scene
    for (let i = 0; i < BALLS_COUNT; i++) {
      World.add(engine.world, createBall())
    }

    // Run the engine
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

    const sW = 550
    const sH = 550
    const m = Math.min(sW, sH)
    const rat = 1 / 4.5 * 2
    const r = m * rat
    const pegCount = 64
    const TAU = Math.PI * 2
    for (let i = 0; i < pegCount; i++) {
      const segment = TAU / pegCount
      const angle2 = i / pegCount * TAU + segment / 2
      const x2 = Math.cos(angle2)
      const y2 = Math.sin(angle2)
      const cx2 = x2 * r + sW / 2
      const cy2 = y2 * r + sH / 2
      addRect({
        x: cx2, y: cy2, w: 10 / 1000 * m, h: 300 / 1000 * m, options: {
          angle: angle2, isStatic: true, density: 1, render: {
            fillStyle: 'transparent',
            strokeStyle: 'white',
            lineWidth: 0
          }
        }
      })
    }
    // Build the circle bounds - END

    // Start the blowing with X seconds delay
    setTimeout(() => {
      Events.on(runner, 'tick', onRenderTick)
    }, 3000);
  }
}
App.init()
