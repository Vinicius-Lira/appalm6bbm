// const path = require('path');
//
// module.exports = {
//     outputDir: path.resolve(__dirname, './public/'),
//     devServer: {
//         proxy: {
//             '/': {
//                 target: 'http://localhost:3000'
//             }
//         }
//     }
// };

module.exports = {
    // options...
    publicPath: process.env.VUE_APP_BASE_URL,
    // Other options include:
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
  }