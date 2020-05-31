let width, height;
let population;

let target, targetRadius = 100;
let popCountP, generationP, mutationP, bestFitP, botTargetHitCountP;

function setup(){
    calcCanvasSize();

    CANVAS = createCanvas(width, height);
    CANVAS.parent('canvas-container');
    target = createVector(width-100, height/2);
    population = new Population(30, 100, target, targetRadius/2);
    generationP = createP();
    botTargetHitCountP = createP();
    bestFitP = createP();
    mutationP = createP();
    popCountP = createP();
    // noLoop();
    frameRate(30);
}

function draw(){
    background(0);
    fill('magenta');
    circle(target.x, target.y, targetRadius);
    population.show();
    if(population.isAllPopulationHitTheTarget){
        textSize(24);
        fill('white')
        text(`All bots learned to hit the target after ${population.generationCount} generations`, 20, 100);
    }
    generationP.elt.innerHTML = `Generation: ${population.generationCount}`;
    botTargetHitCountP.elt.innerHTML = `Bots hit target (some bots overlap on top of each other): ${population.botTargetHitCount}`;
    bestFitP.elt.innerHTML = `Best Fitness: ${population.bestFitness}`;
    mutationP.elt.innerHTML = `Mutation: ${population.mutationCount}`;
    popCountP.elt.innerHTML = `Population: ${population.count}`;
}

function calcCanvasSize(){
    width = 600;
    height = 400;
}
// function configChange(){
//     angleIncrement = parseInt(document.querySelector("#angleIncrement").value);
//     NO_OF_SPIRALS = parseInt(document.querySelector("#curveNumbers").value);
//     STROKE_WEIGHT = parseInt(document.querySelector("#thickness").value);

//     document.querySelector("#curveNumbersValue").innerText = document.querySelector("#curveNumbers").value;
//     document.querySelector("#thicknessValue").innerText = document.querySelector("#thickness").value;
//     document.querySelector("#angleIncrementValue").innerText = document.querySelector("#angleIncrement").value;
//     FRAME_RATE=60;
//     calcCanvasSize();
//     resizeCanvas(width,height)
//     redraw();
//   }