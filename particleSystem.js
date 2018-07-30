//Series of particle systems using different types of particles

//---------PARTICLE CLASSES----------------

//Base code adapted from "Coding Challenge #78: Simple Particle System" at https://www.youtube.com/watch?v=UcdigVaIYAk
class Particle{

  constructor(origin, velocity, size){
    this.x = origin;
    this.y= origin;
    this.z=origin;
    this.xRotation=0;
    this.vx=random(-velocity,velocity);
    this.vy = random(-velocity,velocity);
    this.vz = random(-velocity,velocity);
    this.myColor=255;
    this.mySize=size;
  }

  setPosition(xVal, yVal, zVal){
    this.x=xVal;
    this.y=yVal;
    this.z=zVal;
  }

  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
  // rotate(this.xRotation);
    sphere(this.mySize);
    pop();
  }

  updatePosition(xVal, yVal, zVal){
    this.x+=xVal;
    this.y+=yVal;
    this.z+=zVal;
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
  //  this.reduceSize();
  }

  reduceSize(){
      if(this.mySize>0){
        this.mySize-=1;
      }
  }

  // Make sure that spheres that are of size 0 get deleted
  finished(){
    return (this.mySize==0 || this.mySize<0);
  }

  setVelocity(xleft, xright, yleft, yright, zleft,zright){
    this.vx=random(-xleft,xright);
    this.vy = random(-yleft,yright);
    this.vz = random(-zleft,zright);
  }

  multVelocity(velocity){
    this.vx=this.vx*velocity;
    this.vy=this.vy*velocity;
    this.vz=this.vz*velocity;
  }
}


//First type of particle: generates particles from center, they go in all directions and reduce in size.
// "Bubbling" effect
class regularParticle extends Particle{
  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
    sphere(this.mySize);
    pop();
  }

  update(){
    //Move particle (all directions) and make it smaller.
    this.updatePosition(this.vx, this.vy, this.vz);
    this.reduceSize();
  }

  reduceSize(){
      if(this.mySize>0){ //If its size is above 0, make smaller
        this.mySize-=1;
      }
  }
}

//Same as regularParticle, but reduces its size much faster.
//sun-like effect: something is simering at its surface
class sunParticle extends Particle{
  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
    sphere(this.mySize);
    pop();
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
    this.reduceSize();
  }

  reduceSize(){
      if(this.mySize>0){
        this.mySize-=4; //Reduce by a larger increment then the regularParticle
      }
  }
}


//Same as regularParticle, but it creates toruses instead of spheres
class torusParticle extends Particle{
  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
    torus(this.mySize);
    pop();
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
    this.reduceSize();
  }
}

//Same as regularParticle, but reduces paticles slower
// Creates a spilar effect while spinning
class windParticle extends Particle{
  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
    sphere(this.mySize);
    pop();
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
    this.reduceSize();
  }
  reduceSize(){
    if (counter==3){ //The counter makes the particles dissapear slower, change value to change speed
      counter=0;
      if(this.mySize>0){
        this.mySize-=1;
      }
    }
    counter++;

  }
  updatePosition(xVal, yVal, zVal){
    this.x+=xVal;
    this.y+=yVal;
    this.z+=zVal;
  }

}



//---------PARTICLE SYSTEM CLASSES----------------


//Basic particle system using regular particles. "bubbling" effect
class ParticleSystem{
  constructor(){
    this.particles =[];
    this.addParticles(10); //Changed the intensity of the bubbling
  }

  addParticles(val){
    for (var i=0;i<val;i++){
      let p=new regularParticle(0,5,50); //Particle of origin 0, velocity 5 and size 50
      this.particles.push(p);
    }

  }

//Adds new particles, removes particles whose size is bellow 0, updates position and shows particles
  show(){
    this.addParticles(2); //CHanges intensity of bubbling
    for (let i=0; i<this.particles.length; i++){
      if (this.particles[i].finished()){
            this.particles.splice(i,1); //remove from array when "finished"
      }
      this.particles[i].update();
      this.particles[i].show();
  }
}

//Changes the speed at which particles scatter by value
  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }
  updatePosition(xVal, yVal, zVal){
    this.x+=xVal;
    this.y+=yVal;
    this.z+=zVal;
  }

}

//Shows nothing. Used to clear dispay during initialization
class emptySystem extends ParticleSystem{

  addParticles(val){
    for (var i=0;i<val;i++){
    }
  }
  show(){
}
}


class sunSystem extends ParticleSystem{
  addParticles(val){
    for (var i=0;i<val;i++){
      let p=new sunParticle(0,5,50);
      this.particles.push(p);
    }
  }
  show(){
    this.addParticles(10);
    for (let i=0; i<this.particles.length; i++){
      if (this.particles[i].finished()){
            this.particles.splice(i,1);
      }
      this.particles[i].update();
      this.particles[i].show();
  }
}

  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }

}


var counter=0;
class windSystem extends ParticleSystem{

  addParticles(val){
    for (var i=0;i<val;i++){
      let p=new windParticle(0,3,50);
      this.particles.push(p);
    }

  }


  show(){

    this.addParticles(1);
    for (let i=0; i<this.particles.length; i++){
      if (this.particles[i].finished()){
            this.particles.splice(i,1);
      }
      this.particles[i].update();
      this.particles[i].show();
  }



}

  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }

}


class woaSystem{
  constructor(){
    this.particles =[];
    this.addParticles(10);
  }

  addParticles(val){
    for (var i=0;i<val;i++){
      let p=new regularParticle(0,5,50);
      this.particles.push(p);
    }

  }


  show(){

    for(var j = 0; j < 5; j++){
     push();
     for(var i = 0; i < 12; i++){
       translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
       rotateZ(frameCount * 0.002);
       push();
       sphere(8, 6, 4);
       pop();
     }
     pop();
   }
   for(var j = 0; j < 5; j++){
    push();
    for(var i = 0; i < 40; i++){
      translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
      rotateZ(frameCount * 0.01);
      rotateY(90);
      rotateX(180);
      push();
      sphere(1,2);
      pop();
    }
    pop();
  }
  for(var j = 0; j < 5; j++){
   push();
   for(var i = 0; i < 20; i++){
     translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
     rotateZ(frameCount * 0.01);
     push();
     sphere(3,2);
     pop();
   }
   pop();
  }
}

  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }
  updatePosition(xVal, yVal, zVal){
    this.x+=xVal;
    this.y+=yVal;
    this.z+=zVal;
  }

}
