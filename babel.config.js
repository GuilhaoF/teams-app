module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "@components": "./src/components",
            "@assets": "./src/assets",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@utils": "./src/utils",
            '@theme': './src/theme',
            '@types': './src/types',
            '@storage': './src/storage',
          }
        }
      ]
    ]
  };
};
