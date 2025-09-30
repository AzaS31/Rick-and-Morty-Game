const CLIParser = require("./cli/CLIParser");
const GameFactory = require("./core/GameFactory");

async function main() {
    try {
        const { boxCount, mortyPath } = CLIParser.parse(process.argv);
        const gameEngine = GameFactory.create(boxCount, mortyPath);
        await gameEngine.start();
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
        process.exit(1);
    }
}

main();
