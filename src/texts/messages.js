const messages = {
    initial: (boxCount) => `Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the ${boxCount} boxes, okay?`,
    hmac: (round, hmac) => `Morty: HMAC${round}=${hmac}`,
    playerChoicePrompt: (boxCount) => `Morty: Rick, enter your number [0, ${boxCount}) so you don’t whine later that I cheated, alright?`,
    hiddenMessage: (boxCount) => `Morty: Okay, okay, I hid the gun. What's your guess [0, ${boxCount})?`,
    suggestGenerateSecond: `Let's, uh, generate another value now, I mean, to select a box to keep in the game.`,
    secondFairPrompt: (boxCount) => `Morty: Rick, enter your number [0, ${boxCount}), and, uh, don’t say I didn’t play fair, okay?`,
    keptBoxes: (boxes) => `Morty: I'm keeping the box you chose, I mean ${boxes[0]}, and the box ${boxes[1]}.`,
    switchPrompt: `Morty: You can switch your box (enter 0), or, you know, stick with it (enter 1).`,
    fairNumber: (round, mortyRand, key, playerNum, boxCount) =>
        `Morty: Aww man, my ${round} random value is ${mortyRand}.\n` +
        `Morty: KEY${round}=${key}\n` +
        `So the ${round} fair number is (${mortyRand} + ${playerNum}) % ${boxCount} = ${(mortyRand + playerNum) % boxCount}`,
    finalBox: (secretBox) => `Morty: Your portal gun is in the box ${secretBox}.`,
    roundResult: (win) => `Morty: Aww man, you ${win ? 'won' : 'lost'}, Rick.`,
    endMessage: `Morty: Now we gotta go on one of *my* adventures!`,
    playAgain: `Morty: D-do you wanna play another round (y/n)?`,
    invalidNumber: (min, max) => `Please enter a number between ${min} and ${max - 1}`,
    invalidSwitch: `Just type 0 to switch or 1 to stay, Rick...`
};

module.exports = messages;