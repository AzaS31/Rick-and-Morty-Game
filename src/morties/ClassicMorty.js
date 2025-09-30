const MortyBase = require('./MortyBase');

class ClassicMorty extends MortyBase {
    hidePortalGun(mortyRandomNumber, playerFirstNumber, boxCount) {
        const secretBox = (mortyRandomNumber + playerFirstNumber) % boxCount;
        return secretBox;
    }

    chooseBoxToKeep(secretBox, guessBox, boxCount, playerSecondNumber, mortySecondNumber) {
        const boxes = [...Array(boxCount).keys()];
        if (guessBox === secretBox) {
            boxes[guessBox] = boxes[boxes.length - 1];
            boxes.pop();
            const chosenBox = boxes[(playerSecondNumber + mortySecondNumber) % boxes.length];
            return [guessBox, chosenBox];
        }
        return [secretBox, guessBox];
    }
}

module.exports = ClassicMorty;
