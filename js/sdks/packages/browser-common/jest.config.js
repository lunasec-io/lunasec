module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // This will need to be jsdom eventually once we write tests that touch the dom
  collectCoverage:true
};
