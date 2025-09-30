const crypto = require('crypto');
const createCommitment = require('./Commitment');

class ProvablyFair {
    constructor(boxCount) {
        if (typeof boxCount !== 'number' || boxCount < 3) {
            throw new Error(`Invalid boxCount: ${boxCount}`);
        }
        this.boxCount = boxCount;
        this.secretNumber = null;
        this.commitment = null;
    }

    generateSecret() {
        this.secretNumber = crypto.randomInt(0, this.boxCount);
        this.commitment = createCommitment(this.secretNumber);
        return this.commitment;
    }

    revealSecret() {
        if (this.secretNumber === null || !this.commitment) {
            throw new Error('Secret number not generated yet');
        }
        return {
            number: this.secretNumber,
            key: this.commitment.key
        };
    }
}

module.exports = ProvablyFair;
