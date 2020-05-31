# genobots
Visualize how genetic algorithm come to play while seeking a target.

A high-level description of algorithm given below
1. Yellow rectangles are the Bots and magenta circle is the Target where we need all the bots to reach (eventually).
1. A population of bots initially spawned without any sense of direction.
1. In each generation, based on each bot's closeness to target (magenta circle) a fitness score is assigned to bots.
1. Two bots in a generation is picked to reproduce next generation bot and each generation reproduces a new populatation for bots for next generation. Bots with higher fitness is set on higher probability to be picked for reproduction.
1. One percent of time a mutation is introduced while reproducing the bot.
1. Newly evolved bots continues to appear in each generation until a generation comes where all the bots learns to hits the target.

## Try it yourself: 
https://murlidharvarma.github.io/genobots

Hope you like it!

## Preview
![Alt text](/preview.gif?raw=true "Preview")
![Alt text](/preview2.png?raw=true "Preview")

## Watch full end-to-end evolution below:

![Alt text](/preview3.gif?raw=true "Preview")

