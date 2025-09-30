class Game {
    #boxCount;
    #secretBox;
    #playerFirstNumber;
    #playerSecondNumber;
    #playerGuess;
    #finalBox;

    constructor(boxCount) {
        if (!Number.isInteger(boxCount) || boxCount < 3) {
            throw new Error(`Invalid boxCount: ${boxCount}`);
        }
        this.#boxCount = boxCount;
        this.#secretBox = null;
        this.#playerFirstNumber = null;
        this.#playerSecondNumber = null;
        this.#playerGuess = null;
    }

    #validateBoxIndex(value, fieldName) {
        if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value >= this.#boxCount) {
            throw new Error(`Invalid ${fieldName} value: ${value}`);
        }
    }

    get boxCount() {
        return this.#boxCount;
    }

    get secretBox() {
        return this.#secretBox;
    }

    set secretBox(value) {
        this.#validateBoxIndex(value, "secretBox");
        this.#secretBox = value;
    }

    get playerFirstNumber() {
        return this.#playerFirstNumber;
    }

    set playerFirstNumber(value) {
        this.#validateBoxIndex(value, "playerFirstNumber");
        this.#playerFirstNumber = value;
    }

    get playerSecondNumber() {
        return this.#playerSecondNumber;
    }

    set playerSecondNumber(value) {
        this.#validateBoxIndex(value, "playerSecondNumber");
        this.#playerSecondNumber = value;
    }

    get playerGuess() {
        return this.#playerGuess;
    }

    set playerGuess(value) {
        this.#validateBoxIndex(value, "playerGuess");
        this.#playerGuess = value;
    }

    get finalBox() {
        return this.#finalBox;
    }

    setFinalBox(boxesToKeep, switchChoice) {
        if (!Array.isArray(boxesToKeep) || boxesToKeep.length !== 2) {
            throw new Error(`boxesToKeep must contain exactly 2 boxes`);
        }

        if (switchChoice) {
            this.#finalBox = boxesToKeep.find(b => b !== this.#playerGuess);
        } else {
            this.#finalBox = this.#playerGuess;
        }
    }

    isPlayerWinner() {
        return this.#finalBox === this.#secretBox;
    }

    reset() {
        this.#secretBox = null;
        this.#playerFirstNumber = null;
        this.#playerSecondNumber = null;
        this.#playerGuess = null;
        this.#finalBox = null;
    }
}

module.exports = Game;
