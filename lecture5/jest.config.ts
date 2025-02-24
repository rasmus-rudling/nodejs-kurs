/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // or "jsdom" if testing browser code
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
};