const glob = require("glob")
const fs = require('fs')
const path = require('path')

/* example plugin, likely fairly naive */
module.exports = class ListTypeScriptFilesPlugin {
	apply(compiler) {
		compiler.hooks.entryOption.tap('ListTypeScriptFilesPlugin', (x, y) => {
      const srcPath = path.resolve(__dirname, '..', '..', 'src')
			const arrFiles = glob.sync(`${srcPath}/**/*.ts`)
      const outputPath = `${srcPath}/.generated/files.json`

			try {
				fs.unlinkSync(outputPath)
			} catch (e) {}

			fs.writeFileSync(outputPath, JSON.stringify({arrFiles}), {
				flag: 'a+', // create if required
			}, function(err) {
					if(err) {
							return console.log(err)
					}

					console.log(`Files written to ${outputPath}`)
				});
		})
	}
}
