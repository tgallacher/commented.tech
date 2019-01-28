module.exports = {
  plugins: ['babel-plugin-emotion'],
  env: {
    development: {
      plugins: [['babel-plugin-emotion', { sourceMap: true }]],
    },
  },
};
