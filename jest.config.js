module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/tests/mocks/style-mock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/src/tests/mocks/file-mock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/mocks/local-storage.mock.js", "<rootDir>/src/tests/mocks/URL.mock.js"]
};