var path = require('path')

function standAloneChunks (options) {
  options = options || {}
  this.chunkPath = options.chunkPath || "[name]"
}

standAloneChunks.prototype.apply = function(compiler) {

  var self = this
  interpolatePath = function(name) {
    return self.chunkPath.replace(/\[name\]/g, name)
  }

  compiler.plugin('emit', function(compilation, callback) {

    var newAssets = {} 
    var assetChunksMap = {} // maps asset to chunks that refer to them

    // for all modules in compilation
    for (var moduleName in compilation._modules) {
      var module = compilation._modules[moduleName]

      // for all assets in module
      for (var assetName in module.assets) {
        // this key is only added if the module has assets
        assetChunksMap[assetName] = []

        for (var chunkIndex in module.chunks) {
          var chunk = module.chunks[chunkIndex]
          if (chunk.name) {
            // map the asset name to each named chunk
            assetChunksMap[assetName].push(chunk.name)           
          }
        }
      }
    }

    for (var filename in compilation.assets) {
      // if this filename isn't in the map, add it directly to newAssets
      if (!assetChunksMap[filename]) {
        newAssets[filename] = compilation.assets[filename]
      }

      for (var chunkIndex in assetChunksMap[filename]) {
        var chunkName = assetChunksMap[filename][chunkIndex]
        // add an interpolated asset key with old value for each chunk
        newAssets[path.join(interpolatePath(chunkName), filename)] = compilation.assets[filename]
      }
    }

    compilation.assets = newAssets
    callback();
  });

}

module.exports = standAloneChunks