const path = require('path');

const rootPath = '/';
const postcssImport = require('postcss-import')({
  path: path.join(__dirname, rootPath),
});

module.exports = {
  plugins: [
    postcssImport, // eslint-disable-line
    require('postcss-custom-properties'), // eslint-disable-line
    require('postcss-css-reset'), // eslint-disable-line
    require('postcss-nested'), // eslint-disable-line
    require('postcss-custom-media'), // eslint-disable-line
    require('autoprefixer'), // eslint-disable-line
  ],
};
