module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@screens': './src/screens',
            '@components': './src/components',
            '@data': './src/data',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
