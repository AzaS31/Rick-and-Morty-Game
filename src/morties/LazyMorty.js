const MortyBase = require("./MortyBase");

class LazyMorty extends MortyBase {
    hidePortalGun(mortyRandomNumber, playerFirstNumber, boxCount) {
        const secretBox = (mortyRandomNumber + playerFirstNumber) % boxCount;
        return secretBox;
    }

    chooseBoxToKeep(secretBox, guessBox, boxCount) {
        return guessBox === secretBox
            ? [guessBox, [...Array(boxCount).keys()].find(i => i !== guessBox)]
            : [secretBox, guessBox];
    }
}

module.exports = LazyMorty;