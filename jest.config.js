module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  // Add this to ensure Jest uses the correct environment
  testEnvironment: 'jsdom',
};
