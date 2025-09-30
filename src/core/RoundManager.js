const ProvablyFair = require('../infra/provably-fair/ProvablyFair');

class RoundManager {
    constructor(game, morty, ui) {
        this.game = game;
        this.morty = morty;
        this.ui = ui;
    }

    #generateAndShowCommit(boxCount, round) {
        const fair = new ProvablyFair(boxCount);
        const commit = fair.generateSecret();
        this.ui.showCommit(commit, round);
        return { fair, commit };
    }

    async #prepareFirstRound() {
        const { boxCount } = this.game;
        const { fair, commit } = this.#generateAndShowCommit(boxCount, "firstRound");
        this.game.playerFirstNumber = await this.ui.askFirstNumber(0, boxCount);
        return { fair1: fair, commit1: commit, firstNumber: this.game.playerFirstNumber };
    }

    async #prepareSecondRound() {
        const { boxCount } = this.game;
        this.game.playerGuess = await this.ui.askPlayerGuess(0, boxCount);
        this.ui.showSuggestGenerateSecondNumberMessage();
        const { fair, commit } = this.#generateAndShowCommit(boxCount, "secondRound");
        this.game.playerSecondNumber = await this.ui.askSecondNumber(0, boxCount);
        return { fair2: fair, commit2: commit, secondNumber: this.game.playerSecondNumber, playerGuess: this.game.playerGuess };
    }

    async playFirstRound() {
        const { boxCount } = this.game;
        const { fair1, commit1, firstNumber } = await this.#prepareFirstRound();
         this.game.secretBox  = this.morty.hidePortalGun(fair1.secretNumber, firstNumber, boxCount);
        return { fair1, commit1 };
    }

    async playSecondRound() {
        const { boxCount, secretBox } = this.game;
        const { fair2, commit2, secondNumber, playerGuess } = await this.#prepareSecondRound();
        const boxesToKeep = this.morty.chooseBoxToKeep(
            secretBox,
            playerGuess,
            boxCount,
            secondNumber,
            fair2.secretNumber
        );
        return { fair2, commit2, boxesToKeep };
    }

    async playFinalRound(boxesToKeep) {
        this.ui.showKeptBoxes(boxesToKeep);
        const switchChoice = await this.ui.askSwitch();
        this.game.setFinalBox(boxesToKeep, switchChoice);
        const isWinner = this.game.isPlayerWinner();
        return { isWinner, switchChoice };
    }
}

module.exports = RoundManager;
