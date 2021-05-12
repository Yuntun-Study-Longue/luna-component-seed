const webpack = require('webpack');
const path = require("path");

module.exports = {
  "stories": [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-postcss",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => require(`../webpack.client`)(config, webpack)
}