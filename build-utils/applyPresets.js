const webpackMerge = require('webpack-merge')

const applyPresets = env => {
  const {presets} = env

  // flatten presets - could be array, array of arrays, etc
  const mergedPresets = [].concat(...[presets])
  // ... which gives an array of strings

  // ... then ...
  const mergedConfigs = mergedPresets.map(presetName =>
    require(`./presets/webpack.${presetName}`)(env)
  )

  return webpackMerge({}, ...mergedConfigs)
}

module.exports = applyPresets
