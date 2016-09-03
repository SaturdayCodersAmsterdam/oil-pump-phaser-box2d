var game = new Phaser.Game(640,480, Phaser.CANVAS, 'world', {
  preload: preload, create: create, update: update, render: render });

var armX = 46;
var armY= 93;
var pumpX = 62;
var pumpY= 168;


function preload() {
    game.load.image('armSprite', 'assets/arm.png');
    game.load.image('pump', 'assets/pump.png');
    game.load.image('weight', 'assets/weight.png');
}


function create() {

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    game.physics.box2d.debugDraw.joints = true;
    game.physics.box2d.gravity.y = 500;
    game.physics.box2d.restitution = 0.7;

    game.physics.box2d.setBoundsToWorld();

    //  Create a static rectangle body for the ground. This gives us something solid to attach our crank to
    var ground = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 470, 0);
    //setRectangle(width, height, offsetX, offsetY, rotation)
    ground.setRectangle(640, 20, 0, 0, 0);
	
	

    //  Tall skinny rectangle body for the crank
	// CONSTRUCTOR new Body(game, sprite, x, y, mass)
	// http://phaser.io/docs/2.4.2/Phaser.Physics.P2.Body.html
    var crank = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 360, 2);
    crankSprite = game.add.sprite( game.world.centerX, 310, 'weight');
    crankSprite.anchor.setTo(0.5, 0.5);
	
	// setCircle
	// http://phaser.io/examples/v2/box2d/circle-body
	crank.setCircle(72);

	// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
	
    //Revolute joint with motor enabled attaching the crank to the ground. This is where all the power for the slider crank comes from
    game.physics.box2d.revoluteJoint(ground, crank, 0, -160, 0, 0, 250, 50, false, -45, 60, true);
	
    //  Tall skinny rectangle body for the arm. Connects the crank to the piston
    var arm = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 360, 2);
    arm.setRectangle(50, 300, 0, 0, 0);
    //revolute joint to attach the crank to the arm
    //game.physics.box2d.revoluteJoint(crank, arm, 0, 0, 0, 135);
	
	// http://phaser.io/examples/v2/box2d/revolute-joint
	// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
	game.physics.box2d.revoluteJoint(crank, arm, 0, 0, 0, 72, 0, 0, true, -45, 45, true);
    //bodyAs.push(arm.body);
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	

    //piston = game.add.sprite( game.world.centerX, 300, 'armSprite');
    //piston.anchor.setTo(0.5, 0.5);
    //game.physics.box2d.enable(piston);
    //  Square body for the piston. This will be pushed up and down by the crank
    //var piston = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 300, 2);
    //piston.setRectangle(40, 40, 0, 0, 0);
    //revolute joint to join the arm and the piston
    //game.physics.box2d.revoluteJoint(arm, piston, 0, -60, 0, 0);
    //prismatic joint between the piston and the ground, this joints purpose is just to restrict the piston from moving on the x axis
    //game.physics.box2d.prismaticJoint(ground, piston, 0, 1, 0, 0, 0, 0);

    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);

	
}



function update () {

}

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

function render() {
    
    game.debug.box2dWorld();
    
}

