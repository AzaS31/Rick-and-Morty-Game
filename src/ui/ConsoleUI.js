const readline = require("readline");
const messages = require("../texts/messages");

class ConsoleUI {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    #askWithValidation(validateFn, prompt = "Rick:") {
        return new Promise(resolve => {
            const ask = () => {
                this.rl.question(`${prompt} `, input => {
                    const { valid, value, errorMessage } = validateFn(input);
                    valid ? resolve(value) : (this.display(errorMessage), ask());
                });
            };
            ask();
        });
    }

    display(message) {
        console.log(message);
    }

    #askNumber(min, max) {
        return this.#askWithValidation(input => {
            const num = parseInt(input, 10);
            if (isNaN(num) || num < min || num >= max) {
                return { valid: false, errorMessage: messages.invalidNumber(min, max) };
            }
            return { valid: true, value: num };
        });
    }

    #switch() {
        return this.#askWithValidation(input => {
            if (input === '0') return { valid: true, value: true };
            if (input === '1') return { valid: true, value: false };
            return { valid: false, errorMessage: messages.invalidSwitch };
        });
    }

    showInitialMessage(boxCount) {
        this.display(messages.initial(boxCount));
    }

    showCommit(commit, round) {
        const roundNum = round === "firstRound" ? 1 : 2;
        this.display(messages.hmac(roundNum, commit.hmac));
    }

    askFirstNumber(min, boxCount) {
        this.display(messages.playerChoicePrompt(boxCount));
        return this.#askNumber(min, boxCount);
    }

    askPlayerGuess(min, boxCount) {
        this.display(messages.hiddenMessage(boxCount));
        return this.#askNumber(min, boxCount);
    }

    showSuggestGenerateSecondNumberMessage() {
        this.display(messages.suggestGenerateSecond);
    }

    askSecondNumber(min, boxCount) {
        this.display(messages.secondFairPrompt(boxCount));
        return this.#askNumber(min, boxCount);
    }

    showKeptBoxes(boxes) {
        this.display(messages.keptBoxes(boxes));
    }

    askSwitch() {
        this.display(messages.switchPrompt);
        return this.#switch();
    }

    showFairNumber(mortyRand, playerNum, boxCount, key, round) {
        this.display(messages.fairNumber(round, mortyRand, key, playerNum, boxCount));
    }

    showRoundResult(secretBox, win) {
        this.display(messages.finalBox(secretBox));
        this.display(messages.roundResult(win));
        this.display(messages.endMessage);
    }

    askPlayAgain() {
        return new Promise(resolve => {
            this.rl.question(`${messages.playAgain} `, answer => resolve(answer));
        });
    }

    close() {
        this.rl.close();
    }
}

module.exports = ConsoleUI;
