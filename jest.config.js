module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  rootDir: "./",
  roots: [
    '<rootDir>/',
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: [],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: `spec\.`
};
