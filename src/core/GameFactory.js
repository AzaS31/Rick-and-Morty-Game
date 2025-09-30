const ConsoleUI = require("../ui/ConsoleUI");
const MortyBase = require("../morties/MortyBase");
const GameEngine = require("./GameEngine");
const Game = require("./Game");

class GameFactory {
    static create(boxCount, mortyPath) {
        if (!mortyPath || typeof mortyPath !== "string") {
            throw new Error("Morty path must be a non-empty string");
        }

        let MortyClass;
        try {
            MortyClass = require(mortyPath);
        } catch (err) {
            throw new Error(`Cannot load Morty class from file: ${mortyPath}`);
        }

        if (!(MortyClass.prototype instanceof MortyBase)) {
            throw new Error(`Loaded class from ${mortyPath} does not extend MortyBase`);
        }

        const morty = new MortyClass();
        const ui = new ConsoleUI();
        const game = new Game(boxCount);

        return new GameEngine(game, morty, ui);
    }
}

module.exports = GameFactory;
