const {
  override,
  fixBabelImports,
  addLessLoader,
  addBundleVisualizer,
  addWebpackPlugin,
  addWebpackExternals,
  addWebpackAlias
} = require('customize-cra');
const antdThemeConfig = require('./antd-theme-modify-vars');
const webpack = require('webpack');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antdThemeConfig
  }),
  addBundleVisualizer({}, true),
  addWebpackExternals({
    BMap: 'BMap'
  }),
  addWebpackAlias({
    // ['src']: path.resolve(__dirname, 'src')
  })
);
