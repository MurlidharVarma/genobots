# genobots
Visualize how the genetic algorithm comes to play into finding a target.

At a high-level the algorigth follows below steps
1. The yellow rectangles are bots and the Magenta circle is the Target where we need all the bots to reach (eventually).
1. A population of bots initially spawned without any sense of direction.
1. In each generation, based on each bots closeness to target (magenta circle) a fitness score is assigned to bots.
1. Two bots in a generation is picked to reproduce next generation bot and each generation reproduce same populatation for bots for next generation. Bots with higher fitness is set on higher probability to be picked for reproduction.
1. One percent of time a mutation is introduced while reproducing bot.
1. Newly evolved bots population continues to appear in each generation until a generation comes where all the bots learns to hits the target.

## Try it yourself: 
https://murlidharvarma.github.io/genobots

Hope you like it!

## Preview
![Alt text](/preview.gif?raw=true "Preview")
![Alt text](/preview2.png?raw=true "Preview")

## Watch one full end-to-end evolution below:

![Alt text](/preview3.gif?raw=true "Preview")

