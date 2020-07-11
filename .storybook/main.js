module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.js'],
  // 这里有一个大坑，在默认创建的addons中有一个 @storybook/preset-create-react-app, 
  //这个项将导致后面loader选项中的options不生效。
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: require.resolve('ts-loader')
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true
            }
          }
        }],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
