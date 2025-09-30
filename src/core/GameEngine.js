const Game = require('./Game');
const Statistics = require('../stats/Statistics');
const RoundManager = require('./RoundManager');

class GameEngine {
    constructor(game, morty, ui) {
        this.game = game;
        this.morty = morty;
        this.ui = ui;
        this.stats = new Statistics();
        this.roundManager = new RoundManager(game, morty, ui);
    }

    async start() {
        let playAgain = true;
        while (playAgain) {
            await this.playRound();
            playAgain = await this.askPlayAgain();
        }
        this.showSummaryAndClose();
    }

    async playRound() {
        this.game.reset();
        this.ui.showInitialMessage(this.game.boxCount);

        const { fair1, commit1 } = await this.roundManager.playFirstRound();
        const { fair2, commit2, boxesToKeep } = await this.roundManager.playSecondRound();
        const { isWinner, switchChoice } = await this.roundManager.playFinalRound(boxesToKeep);

        this.stats.recordRound(isWinner, switchChoice);
        this.showResult(fair1, commit1, fair2, commit2, isWinner);
    }

    async askPlayAgain() {
        const again = await this.ui.askPlayAgain();
        return again.trim().toLowerCase().startsWith('y');
    }

    showResult(fair1, commit1, fair2, commit2, isWinner) {
        const { boxCount, secretBox, playerFirstNumber, playerSecondNumber } = this.game;
        this.ui.showFairNumber(fair1.secretNumber, playerFirstNumber, boxCount, commit1.key, 1);
        this.ui.showFairNumber(fair2.secretNumber, playerSecondNumber, boxCount, commit2.key, 2);
        this.ui.showRoundResult(secretBox, isWinner);
    }

    showSummaryAndClose() {
        this.stats.printSummary({
            switch: (this.game.boxCount - 1) / this.game.boxCount,
            stay: 1 / this.game.boxCount
        });
        this.ui.close();
    }
}

module.exports = GameEngine;
