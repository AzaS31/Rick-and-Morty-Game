# Rick and Morty Monty Hall Simulator

This is a console-based implementation of the Monty Hall problem in Node.js, featuring Rick as the player and different Morty strategies. The game includes detailed statistics to analyze winning probabilities.

## Installation

1. Clone the repository:

```
git clone <https://github.com/AzaS31/Rick-and-Morty-Game>
```

2. Install dependencies:

```
npm install
```

The project uses cli-table3 to display statistics and the built-in crypto module for HMAC generation.


## Running the Game

Run the game using:
```
node src/main.js <boxCount> <mortyPath>
```

Example:
```
node src/main.js 3 ./src/morties/ClassicMorty.js
```

<boxCount> — number of boxes (minimum 3).

<mortyPath> — path to the Morty strategy file (ClassicMorty.js or LazyMorty.js).

## Morty Strategies

ClassicMorty.js — "smart" Morty: considers both Rick's and its own numbers to select the second box strategically.

LazyMorty.js — "lazy" Morty: picks the first available box without any strategy.

## Game Rules

Rick selects a box (first choice).
Morty hides the portal gun according to its strategy.
Rick may make a second choice.
Morty offers the option to stay with the current box or switch.
The round result and statistics are displayed.

## Statistics

After each round, a table shows the results.
Statistics help to evaluate the probability of Rick winning when switching boxes versus staying with the original choice.

## Technologies
Node.js
cli-table3 (for tabular statistics)
Built-in crypto module for HMAC