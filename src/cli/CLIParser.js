const fs = require("fs");
const path = require("path");

class CLIParser {
    static parse(argv) {
        const args = argv.slice(2);

        if (args.length < 2) {
            throw new Error(
                "Usage: node main.js <boxCount> <mortyPath>\n" +
                "Example: node main.js 3 ./src/morties/ClassicMorty.js"
            );
        }

        const boxCount = parseInt(args[0], 10);
        if (isNaN(boxCount)) {
            throw new Error("boxCount must be a number");
        }
        if (boxCount < 3) {
            throw new Error("boxCount must be at least 3");
        }
        if (boxCount > 1_000_000) {
            throw new Error("boxCount must not exceed 1,000,000");
        }

        const mortyPath = path.resolve(args[1]);
        if (!fs.existsSync(mortyPath)) {
            throw new Error(`Morty file not found: ${mortyPath}`);
        }

        return { boxCount, mortyPath };
    }
}

module.exports = CLIParser;
