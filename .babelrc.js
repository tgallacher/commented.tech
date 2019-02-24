module.exports = {
  plugins: [
    'babel-plugin-emotion',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
      },
    ],
  ],
  env: {
    development: {
      plugins: [['babel-plugin-emotion', { sourceMap: true }]],
    },
  },
};
