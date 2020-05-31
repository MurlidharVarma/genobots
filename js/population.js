/**
 * Murlidhar Varma
 * Population Class - Keeps track of bot creation and evaluation generations
 */
class Population{

    // Construct population using size, 
    // lifespan of bots, 
    // target that bots to follow and the size of the target
    constructor(populationSize, lifeSpan, target, targetRadius){
        this.populationSize = populationSize;
        this.lifeSpan = lifeSpan;
        this.target = target;
        this.targetRadius = targetRadius;
        
        // to keep track if the population has reached its lifespace
        // and if its time to generate new population through evolution
        // imagine counter act age 
        // each frame of render increments the counter until 
        // lifespan is reached and the counter resets to zero
        this.counter = -1;

        // if all the bots in the generation is dead i.e. reached thier lifespan
        this.populationDead = false;

        this.generationCount = 0;
        this.mutationCount = 0;
        this.bestFitness = 0;

        // store the gene of population for reproduction
        this.genePool = []

        // to check if all the bots in the population is able to hit the target.
        this.isAllPopulationHitTheTarget = false;

        // keep track of how many bots in the generation hit the target
        this.botTargetHitCount = 0;

        // collection of bots in a generation
        this.bots = [];

        // Creating bots based on the population size
        // Assigning each bot with random generation of DNA sequence.
        for(let i=0; i < this.populationSize; i++){
            this.bots[i] = new Bot(100, height/2, new dna(this.lifeSpan), this.target, this.targetRadius);
        }

        // keep track of bot size.
        this.count = this.bots.length;
    }

    // Method to show all bots in the population
    // called each time for a frame
    show(){

        // if all the bots in the population hit the target do nothing.
        if(this.isAllPopulationHitTheTarget){
            return;
        }

        // if all the bots in the population is dead do nothing
        if(this.populationDead){
            return;
        }

        // if age of population reached its lifespace
        if(this.counter >= this.lifeSpan){
            // declare population as dead
            this.populationDead = true;

            // evaluate the fitness of each bot in the population
            this.evaluateFitness();

            // do selection from the population based on the bot fitness value
            // and generate the next generation or population
            this.doSelection();

            // reset age
            this.counter = -1;

            // make population alive since a new generation population has been created
            this.populationDead = false;

            // increment generation count
            this.generationCount++;
        }

        // increase the age of population
        this.counter++;

        // apply the force stored in the gene of each bots dna for the frame based on population age
        for(let i=0; i < this.populationSize; i++){
            this.bots[i].applyForce(this.bots[i].dna.gene[this.counter]);
            this.bots[i].update()
            this.bots[i].show();
        }
    }

    // method to evaluate the fitness of each bots in the population
    evaluateFitness(){
        // make the genePool empty
        this.genePool = [];

        // to record the best fitness score from the generation
        let recordFitness = 0;

        // to keep track of count of bots that has maximum fitness
        // i.e. in other words were able to reach the target.
        let fullFitnessScoreBotCount = 0;

        // loop to evaluate each bot's fitness 
        // and to find the best fitness score amongst all the bots in population
        for(let i=0; i < this.populationSize; i++){
            // evaluate bot's fitness
            this.bots[i].evaluateFitness();

            // find the best fitness score
            if(this.bots[i].fitness > recordFitness){
                recordFitness = this.bots[i].fitness;
            }

            // if the bot had achieved max fitness score, increment the counter
            if(this.bots[i].fitness == 100){
                fullFitnessScoreBotCount++;
            }
        }

        // no of bots with max fitness score is nothing but who managed to hit the target
        this.botTargetHitCount = fullFitnessScoreBotCount;

        // if all the bots were able to hit the target,
        // then overall goal is achieved and the evolution process can be terminated
        if(fullFitnessScoreBotCount == this.bots.length){
            this.isAllPopulationHitTheTarget = true;
        }

        // Sort the bot based on the fitness. This is optional. not needed.
        this.bots.sort((a,b) => b.fitness - a.fitness);

        // Add the bot's gene to genePool with the bot gene with max fitness score 
        // added more than the least so that the probability of picking the most 
        // fit is more than the least fit.
        for(let i=0; i < this.populationSize; i++){           
            for(let p=0; p < this.bots[i].fitness; p++){
                this.genePool.push(this.bots[i].dna);
            }
        }

        this.bestFitness = recordFitness;
    }

    // to facilitate parent selection process and create bots for next generation
    // Reproduction happens here
    doSelection(){

        // clear out all the bots in the population
        this.bots = [];

        // for the population size
        for(let i=0; i < this.populationSize; i++){

            // choose random parents from the genePool
            let parent1DNA = random(this.genePool);
            let parent2DNA = random(this.genePool);

            // cross the gene sequence from the dna
            // 50% genes from parent 1 and remaing 50% from parent 2
            let newDNA = parent1DNA.cross(parent2DNA);

            // see if mutation is required (1% of time mutation is introduced) on new DNA
            newDNA = this.doMutation(newDNA);

            // create a child bot for next generation
            this.bots[i] = new Bot(100, height/2, newDNA, this.target, this.targetRadius);
        }

        this.count = this.bots.length;
    }

    // method to do mutation
    doMutation(newDNA){
        // if a number is picked between 0 and 1 and its is less than 0.01 (means 1% chance),
        // then mutate 
        if(random(1) <0.01){

            // increment mutation count
            this.mutationCount++;

            // let the dna with random genes is created
            return new dna(this.lifeSpan, null);
        }
        // else dont mutate and return the same new DNA
        else{
            return newDNA;
        }
    }

}
