var path = require('path')
var srcDir = path.join(__dirname, "src")
var standAloneChunks = require('./stand-alone-chunks')

var chunkPath = "[name]"
module.exports = {
  entry: {
    appA: path.join(srcDir, "appA.js"),
    appB:  path.join(srcDir, "appB.js"),
  },
  output: {
  	path: path.join(__dirname, "dist"),
  	filename: path.join(chunkPath, "bundle.js"),
  },
  module: {
    loaders: [
      { test: /\.png$/, loader: "file?name=images/[name].[ext]" }
    ]
  },
  plugins: [
    new standAloneChunks({chunkPath: chunkPath})
  ]
}