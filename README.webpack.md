# Webpack

NPM adds a bin folder in the node_modules folder, which holds the executables for all modules downloaded. Each has some sort of CLI or binary executable.

NPM allows you to run 'scripts' that hoist that binary package within it's scope.

This allows us to run webpack using simply 'webpack' from the scripts commands.

By default webpack will look for the entry point src/index.js, and default outputs to dist/main.js

## Scripts

### Build Mode

Optimize for build speed or production optimization/quality.

Defaults to Production.

```"--"```: pipe in the next arguments onto the original command

eg.

```webpack --help```

```webpack  --json > stats.json```

To run these from script entries:

```npm run webpack -- --help```

```npm run webpack -- --json > stats.js```

```npm run webpack -- --mode development```

### Setting up debuging
If you want to debug a node application, or script, you can so do py passing a couple of arguments when executing the binary: inspect and inspect-rbk

This allows debugging via Chrome Dev Tools via the Url ```chrome://inspect```

ie to debug webpack:

```"debug": node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js```

so to debug in a given mode:

```"dev:debug": "npm run debug -- --mode development"```

### Module syntax

Modules (EMS, CommonJS, etc) are converted to Harmony imports. Each file must be one format and could not, say, combine ```export default``` (EMS) and ```module.exports``` (CommonJS)

ESM makes tree shaking and dead code elimination possible.

## Core concepts

By default, when it runs it requires ```webpack.config.js```, or at least tries to (zero config is possible via webpack defaults)

```webpack.config``` is a CommonJS module and must export a config object, or a function that returns a config object

```
module.exports = {
  mode: "none"
}
```

```
module.exports = () => {
  mode: "none"
}
```

### Bundling

Each module is wrapped in an IIFE, and an array of all modules (the dependency graph) is passed to wbepack.

Webpack require takes an Id and calls the module and returns an exports if it's available.

The last line of ```__webpack_require__``` calls webpack require against the first module in the array of IIFE modules (the entry point)

```__webpack_require__``` replaces the import statement in your bundled code.

Output works in tandem with Entry telling Webpack where and how to distribute bundles or compilations. Loaders instruct Webpack on how to modify files before its added to the dependency graph.

### Chaining Loaders

Chaining Loaders are transformations applied in a pipeline to the resource. Each loader passes values onto the next loader until the end loader, where Webpack expects JavaScript to be returned.

```
module: {
  rules:[
    {
      test:/\.css$/,
      use:['style-loader','css-loader']
    }
  ]
},
```
```css-loader``` is applied to each .css file, _then_ ```style-loader```, before the file is added to the dependency graph.

A loader could simply collectmeta data and emit a file on disk, for example. You cold inject special Javascript for images on the fly, etc, compress images on the fly

### Plugins

An Object with an ```apply``` property on the prototype chain.

Allows you to hook into the entire compilation lifecycle.

_Plugins allow you to do anything you can't do with a loader_

## Config

As the webpack module needs to return an object, or a function that returns an object, we can easily utilise the function route to accept an environment object as a parameter

script definition
```
"prod": "npm run webpack -- --env.mode production"
```

webpack module export
```
module.exports = ({mode}) => {
  // return config, with access to env.mode
}
```

### Plugins

Some will be common to Development and Production, some only required in Development, and some only in Production mode.

Once the HTML Plugin is added, we can see _two_ assets have been emitted - our compiled bundle, and index.html containing an injected reference to our bundle.

#### HTML Webpack Plugin
Essentially injects everything found in the dist folder into a generated (or provided) HTML file.

#### Progress Plugin
One of many provided out of the box by webpack.

### Webpack Development Server

Sets up a local development server based on Express with Webpack that serves the contents of a distributed folder (well, instead of creatinga bundle in your dist folder, it generates a bundle _in memory_, and sreves that information up to Express). Connects to the browser via web sockets, providing a new bundle when the watched bundle file changes.

Provides a live development experience via a reload.

#### Webpack Merge utility
Webpack merge is a utility that functions much like Object.assign, allowing us to provide our default config (a safety net), then extend via Production config or Development config. Object.assign is not enough in this instance, as ordering of Arrays between configs may be important etc. WebpackMerge handles this for us.

#### ModeConfig
https://frontendmasters.com/courses/webpack-fundamentals/splitting-environment-config-files/

By abusing the fact that require is a function, we require mode config from the utils folder, extending our default configuration for our given environment.

#### Hot Module Replacement
Enables update of code shiped to browser _without_ having to reload.
Webpack can patch changes incrementally and apply them to a web document without ever having to reload the browser.
Achieved by adding the flag ```--hot``` to the development script.

## Using Plugins

### CSS-Loader, Style-Loader, MiniCssExtractPlugin
An appropriate loader must be added to handle css (et al) files, as webpack cannot parse these standalone.

CSS Loader generates an array of style modules.
Style Loader consumes the genereated array of CSS modules, and injects into the browser via a script tag.

When building for Production, we would want to extract out our CSS, via the Mini CSS Extract Plugin, after the CSS has been extracted by the CSS Loader.

### File Loader
file-loader loads up your file into the dist and then provides a url, or reference, inside your bundle so your code can still find it on execution

### Url Loader
url-loader will encode files to base64 and include them inline rather than having them loaded as separate files with another request (subject to a byte size limit).

```data:;base64,aW1wb3J0IFJlYWN0IGZ...```

i.e. can be good for small files in order to save on http requests.

Setting a byte size limit ensures everything above this file size will default to the ```file-loader```

```
test: /\.(png|jpg|gif)$/i,
use: [
  {
    loader: 'url-loader',
    options: {
      limit: 8192
    }
  }
]
```

### Loading Images
Loaders enable anything to be used like it's Javascript.

Importing an image will result in the file being transformed to a Javascript module, the image to a base64 data Uri of the image.
These modules can be inlined in the bundle via url-loader, or placed in the dist folder via url-loader falling abck to file-loader, or file-loader (there will be further options, too)

## Implementimg Presets
Presets can be used for one or a few special coding scenarios such as testing a feature or analyzing a build when not wanting to endanger the production Webpack configuration.



