/**
 * Murlidhar Varma
 * Bot class represent a bot
 */
class Bot{

    // To create a bot need its position, DNA, target it has to chase and size of the target
    constructor(posX, posY, dna, target, targetRadius){
        // position vector
        this.pos = createVector(posX, posY);

        // velocity vector - initialized with zero
        this.vel = createVector()

        // acceleration vector - initialized with zero
        this.acc = createVector();

        // target information
        this.target = target;
        this.targetRadius = targetRadius;

        // bot information
        this.clr = color('yellow');
        this.dna = dna;
        this.fitness = 0;
    }

    update(){
        // If the bot reached the target
        // set its fitness to max value i.e. 100
        if( this.pos.x >= (this.target.x - this.targetRadius) &&
            this.pos.x <= (this.target.x + this.targetRadius) &&
            this.pos.y >= (this.target.y - this.targetRadius) &&
            this.pos.y <= (this.target.y + this.targetRadius)){

            this.fitness = 100;
            return;
        }

        // if the bot went outside the boundary 
        // set the fitness to 0 
        if( this.pos.x >= width ||
            this.pos.x <= -10 ||
            this.pos.y >= height ||
            this.pos.y <= 0){

            this.fitness = 0;
            return;
        }

        // add velocity vector to position so that bot moves
        this.pos.add(this.vel);

        // add acceleration vector to velocity
        this.vel.add(this.acc);

        // reset the acceleration to zero - 
        // as acceleration (force when mass = 1) is applied in each frame rendered
        this.acc.setMag(0);
    }

    // Apply the force vector passed as parameter to the bot.
    // here assumption is mass of bot = 1
    // Force = mass x acceleration
    // Force = 1 x acceleration
    // Force = acceleration
    applyForce(force){
        this.acc.add(force);
    }

    // Draw the bot on the screen
    show(){
        push();
            translate(this.pos.x, this.pos.y);
            stroke(this.clr);
            strokeWeight(1)
            noFill();
            rotate(this.vel.heading())
            rect(0, 0, 20, 5);
        pop();
    }

    // Calculate the fitness of the bot based on the closeness of the target
    evaluateFitness(){
        // calcuate the distance of bot from target.
        let distanceFromTarget = dist(this.target.x, this.target.y, this.pos.x, this.pos.y);

        // The farther the distance then lower the fitness need to be
        // hence mapping the distance (0 - 1000) to fitness score (100 - 0)
        // i.e. a bot with zero distance to target will get 100 as fitness score
        distanceFromTarget = map(distanceFromTarget, 0, 1000, 100, 0);

        // if the bot is evaluated to be having fitness 100 already 
        // then then dont assigne this calculated fitness score
        if(this.fitness != 100)
            this.fitness = distanceFromTarget;
    }

}