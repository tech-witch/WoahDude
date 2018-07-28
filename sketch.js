
var angle=0;
var yRotation=5;
var zRotation=5;
var title;



function setup() {
  var canvas = createCanvas(windowWidth, windowHeight/10*8, WEBGL);

  mySystem = new emptySystem();

  background(0);
  var x = 0;
  var y = 100;
  canvas.id("myCanvas");

  canvas.position(x, y);

  var button = createButton('GET HIGH');
  button.mousePressed(showSystem1);

  var button2 = createButton('CLOSE UR EYES');
  button2.mousePressed(showSystem2);

  var button3 = createButton('THINK HARDER');
  button3.mousePressed(showSystem3);

  sunSystem=new sunSystem();
  sunSystem2=new windSystem();
  sunSystem3=new woaSystem();


  title= createP("");
}


function showSystem1(){
  mySystem=sunSystem;
  title.html("YOU'RE HIGH. WOAH REMEMBER JESSICA? SHE'S HOT. <BR>  DAMN, UR HEART IS BEATING FAST.");
}
function showSystem2(){
  mySystem=sunSystem2;
  title.html("BRAINS ARE CRAZY. WHAT DOES A SINGLE MOLECULE OF OXYTOCIN LOOK LIKE? CAREFUL THERE BRO, YOU'RE GETTING DIZY.");
}
function showSystem3(){
  mySystem=sunSystem3;
  title.html("DAMN, WE'RE LIKE SO SMALL IN THE UNIVERSE. AND LIKE, THERE'S JESSICA. AND THERE'S U. SKYLAR. CAPTAIN OF THE FOOTBALL TEAM. WHAT ARE THE CHANCES UR ATOMS WOULD EVER CROSS PATHS? WOAH DUDE.");
}


function draw() {



  let fov = PI/3; //Field of view
  let cameraZ = (height/2)/tan(fov/2);
  perspective(fov,width/height, cameraZ/10, cameraZ*10);

  let x = map(mouseX,0,width,-200,200);
  let y = map(mouseY,0,height,-200,200);


  push();

  directionalLight(200,20,20,1,0,0);
  directionalLight(0,10,2,0,1,-0.5);
  background(255);

  specularMaterial(0);

    rotateX(angle);
    rotateY(angle*yRotation);
    rotateZ(angle*zRotation);
    angle+=0.002;

    mySystem.show();

  pop();

  mySystem.updateParticleScatter(1.05);

}
