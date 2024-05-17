/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", ".build"],
  resetModules: true,
  maxConcurrency: 1,
  maxWorkers: 1,
};
