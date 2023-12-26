const path = require("path");

const CMD_PRETTIER = "prettier --write --no-error-on-unmatched-pattern";
const CMD_ESLINT = "eslint --no-error-on-unmatched-pattern --max-warnings=0";

const getTargetPaths = (paths) => {
  return paths.map((file) => path.relative(__dirname, file)).join(" ");
};

module.exports = {
  "src/**/*.{ts,tsx,js}": (paths) => [
    `${CMD_ESLINT} ${getTargetPaths(paths)}`,
    `${CMD_PRETTIER} ${getTargetPaths(paths)}`,
    "tsc --noEmit -p ./tsconfig.json",
  ],
  "*": (paths) => [
    `cspell ${getTargetPaths(paths)} --cache --no-must-find-files`,
  ],
};
