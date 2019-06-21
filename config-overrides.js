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

const ENVIRONMENT_PATH_CONFIG = {
  demo: 'environment.demo.js',
  dev: 'environment.dev.js',
  hotfix: 'environment.hotfix.js',
  local: 'environment.local.js',
  local_backend: 'environment.local_backend.js',
  prod: 'environment.prod.js',
  rc: 'environment.rc.js'
};

const env = process.env.CONFIGURATION;
const environmentPath = ENVIRONMENT_PATH_CONFIG[env] || ENVIRONMENT_PATH_CONFIG.prod;
console.log('----------------', environmentPath);

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
  addBundleVisualizer({}, true)
  // addWebpackPlugin(new webpack.NormalModuleReplacementPlugin(/environments\/environment\.js/, environmentPath))
);
