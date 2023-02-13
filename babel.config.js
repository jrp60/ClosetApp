module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    //'@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    {
      runtime: 'automatic',
    },
    ['module:react-native-dotenv'],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
  ],
};
