var path = require('path')
var srcDir = path.join(__dirname, "src")

module.exports = {
  entry: {
    appA: path.join(srcDir, "./appA.js"),
    appB:  path.join(srcDir, "./appB.js"),
  },
  output: {
  	path: path.join(__dirname, "dist"),
  	filename: "./[name]/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.png$/, loader: "file?name=[path]/[name].[ext]" }
    ]
  }
}