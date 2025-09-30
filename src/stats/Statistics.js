const Table = require("cli-table3");

class Statistics {
    constructor() {
        this.switchWins = 0;
        this.stayWins = 0;
        this.switches = 0;
        this.stays = 0;
    }

    recordRound(win, switchChoice) {
        if (switchChoice === true) {
            this.switches++;
            if (win) this.switchWins++;
        } else {
            this.stays++;
            if (win) this.stayWins++;
        }
    }

    printSummary(probs) {
        const stayWinPct = this.stays > 0 ? ((this.stayWins / this.stays) * 100).toFixed(3) : "0.000";
        const switchWinPct = this.switches > 0 ? ((this.switchWins / this.switches) * 100).toFixed(3) : "0.000";

        const table = new Table({
            head: ["Game results", "Rick switched", "Rick stayed"],
            colAligns: ["left", "right", "right"],
        });

        table.push(
            ["Rounds", this.switches, this.stays],
            ["Wins", this.switchWins, this.stayWins],
            ["P (estimate)", switchWinPct, stayWinPct],
            ["P (exact)", (probs.switch * 100).toFixed(6), (probs.stay * 100).toFixed(6)]
        );

        console.log("\n                  GAME STATS");
        console.log(table.toString());
    }
}

module.exports = Statistics;
