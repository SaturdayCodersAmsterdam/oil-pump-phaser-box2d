var game = new Phaser.Game(640,480, Phaser.CANVAS, 'world', {
  preload: preload, create: create, update: update, render: render });


function preload() {
    game.load.image('arm', 'assets/arm.png');
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
	var crank = game.add.sprite( game.world.centerX, 310, 'weight');
	crank.anchor.setTo(0.5, 0.5);
    game.physics.box2d.enable(crank);
	crank.body.setCircle(crank.width / 2);
    //Revolute joint with motor enabled attaching the crank to the ground. This is where all the power for the slider crank comes from
    game.physics.box2d.revoluteJoint(ground, crank, 0, -80, 0, 0, 250, 50, true);
    
    //  Tall skinny rectangle body for the arm. Connects the crank to the piston
    var arm = game.add.sprite( game.world.centerX, game.world.centerY, 'pump');
    game.physics.box2d.enable(arm);
    arm.body.setRectangle(10, 179, 0, 0, 0);
	//arm.anchor.setTo(0, 0.5);
    //revolute joint to attach the crank to the arm
    game.physics.box2d.revoluteJoint(crank, arm, 0, -30, 0, 60);
    
	
	//  Square body for the piston. This will be pushed up and down by the crank
    var piston = game.add.sprite( 0, 310, 'arm');
	game.physics.box2d.enable(piston);
    piston.body.setRectangle(301, 112, 150, 0, 0);
	piston.anchor.setTo(0, 0.5);
    //revolute joint to join the arm and the piston
	// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
    game.physics.box2d.revoluteJoint(arm, piston, 0, -112, 0, 0);
    //prismatic joint between the piston and the ground, this joints purpose is just to restrict the piston from moving on the x axis
    game.physics.box2d.prismaticJoint(ground, piston, 0, 1, 0, 0, 0, 0);
    


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

