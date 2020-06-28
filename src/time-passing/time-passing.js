// please dont look at this hot mess
$('body').append('<div id="clock"></div>');
var start = new Date(),
  sec = start.getSeconds(),
  min = start.getMinutes() * 60 + sec,
  hour = start.getHours() % 12 * 3600 + min;
sW = $(window).width()/2;
sH = $(window).width()/2;
var Engine = Matter.Engine,
  Composites = Matter.Composites,
  Runner = Matter.Runner,
  Mouse = Matter.Mouse,
  Events = Matter.Events,
  World = Matter.World,
  Common = Matter.Common,
  Vertices = Matter.Vertices,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint,
  Render = Matter.Render,
  Body = Matter.Body,
  Bodies = Matter.Bodies;
var engine = Engine.create($('#clock'));
var render = Render.create({
  element: $('#clock')[0],
  engine: engine,
  options: {
    width: sW,
    height: sH,
    wireframes: false,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false
  }
});
Render.run(render);
hourHand = addRect({ x: sW/2, y: sH/2 , w: 15, h: sW - 20, options: { angle: 0, density: 4, isStatic: true , render: {
      fillStyle: 'black',
      strokeStyle: 'black',
      lineWidth: 10
    }} });
minuteHand = addRect({ x: sW/2, y: sH/2 , w: 15, h: sW - 20, options: { angle: 0, density: 4, isStatic: true , render: {
      fillStyle: 'black',
      strokeStyle: 'black',
      lineWidth: 6
    }} });
secondHand = addRect({ x: sW/2, y: sH/2 , w: 15, h: sW - 20, options: { angle: 0, density: 4, isStatic: true , render: {
      fillStyle: 'black',
      strokeStyle: 'black',
      lineWidth: 3
    }} });
shapeAmount = 12;
shapeSize = sW/40;
var stack = Composites.stack(sW/2 - (shapeAmount/2 * shapeSize),sH/2 - (shapeAmount/2 * shapeSize), shapeAmount/2,shapeAmount/2, 0, 0, function(x, y) {
  return Bodies.circle(x, y, shapeSize, {
    restitution: .5,
    density:.05,
    render: {
      //fillStyle: 'black',
      strokeStyle: 'white',
      lineWidth:0
    }
  });
});
World.add(engine.world, stack);
var stack = Composites.stack(sW/2 - (shapeAmount/2 * shapeSize),sH/2 - (shapeAmount/2 * shapeSize), shapeAmount/2,shapeAmount/2, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, shapeSize*2, shapeSize, {
    restitution: .5,
    density:.05,
    render: {
      //fillStyle: 'black',
      strokeStyle: 'white',
      lineWidth:0
    }
  });
});
World.add(engine.world, stack);
var stack = Composites.stack(sW/2 - (shapeAmount/2 * shapeSize),sH/2 - (shapeAmount/2 * shapeSize), shapeAmount/2,shapeAmount/2, 0, 0, function(x, y) {
  return Bodies.polygon(x, y, 3, shapeSize, {
    restitution: .5,
    density:.05,
    render: {
      //fillStyle: 'black',
      strokeStyle: 'white',
      lineWidth:0
    }
  });
});
World.add(engine.world, stack);
engine.world.gravity.x = 0;
engine.world.gravity.y = .5;
render.options.background = '#ffffff';
m = Math.min(sW, sH);
rat = 1 / 4.5 * 2;
r = m * rat;
parts = [];
pegCount = 64;
TAU = Math.PI * 2;
for(i = 0; i < pegCount; i++) {
  segment = TAU / pegCount;
  angle2 = i / pegCount * TAU + segment / 2;
  x2 = Math.cos(angle2);
  y2 = Math.sin(angle2);
  cx2 = x2 * r + sW/2;
  cy2 = y2 * r + sH/2;
  rect = addRect({ x: cx2, y: cy2, w: 10 / 1000 * m, h: 400 / 1000 * m, options: { angle: angle2, isStatic: true, density: 1, render:{
        fillStyle: 'white',
        strokeStyle: 'white',
        lineWidth: 0
      }  } });
  parts.push(rect);
}
function addBody(...bodies) {
  World.add(engine.world, ...bodies);
}

function addRect({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) {
  body = Bodies.rectangle(x, y, w, h, options);
  addBody(body);
  return body;
}
runner = Engine.run(engine);
hourHand.vertices[0].x = -1;
hourHand.vertices[0].y = 0;
hourHand.vertices[1].x = -5;
hourHand.vertices[1].y = 0;
Body.scale(hourHand, .3, .2);
Body.setVertices(hourHand, hourHand.vertices);
minuteHand.vertices[0].x = -1;
minuteHand.vertices[0].y = 0;
minuteHand.vertices[1].x = -5;
minuteHand.vertices[1].y = 0;
Body.scale(minuteHand, .4, .3);
Body.setVertices(minuteHand, minuteHand.vertices);
secondHand.vertices[0].x = -1;
secondHand.vertices[0].y = 0;
secondHand.vertices[1].x = -5;
secondHand.vertices[1].y = 0;
Body.scale(secondHand, .4, .4);
Body.setVertices(secondHand, secondHand.vertices);
function draw() {
  var now = new Date(),
    diff = Math.abs(start.getTime() - now.getTime()) / 1000,
    degS = (sec + diff) / 60 * 360,
    degM = (min + diff) / 3600 * 360,
    degH = (hour + diff) / 43200 * 360;
  Body.setAngle(hourHand, degH * Math.PI / 180);
  Body.setAngle(minuteHand, degM * Math.PI / 180);
  Body.setAngle(secondHand, (degS * Math.PI) / 180);
  requestAnimationFrame(draw);
}

draw();
var resetBounds = function(){
//Runner.stop(runner);
//	Runner.stop(engine);
//TweenMax.killAll();
//$('#engine canvas').remove();
//cancelAnimationFrame($logoMove);
//setupClock();
};
var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {
  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }
});
function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta);
  } else {
    timeout = false;
    resetBounds();
  }
}
