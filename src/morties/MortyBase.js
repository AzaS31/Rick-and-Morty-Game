class MortyBase {
    hidePortalGun(mortyRandomNumber, playerFirstNumber, boxCount) {
        throw new Error('hidePortalGun() must be implemented by subclass');
    }

    chooseBoxToKeep(secretBox, guessBox, boxCount, playerSecondNumber, mortySecondNumber) {
        throw new Error('chooseBoxToKeep() must be implemented by subclass');
    }
}

module.exports = MortyBase;
