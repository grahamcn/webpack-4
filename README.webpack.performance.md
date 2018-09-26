# Webpack Performance

## Top performance issues

* Amount of Javascript for initial download
* Amount of CSS for initial download
* Amount of Network Requests on initial download

### Goals

* <= 200kb (Uncompressed) initial JS
* <= 100kb (Uncompressed) initial CSS
* HTTP <= 6 initial nework calls
* HTTP/2 <= 20-25 initial network calls
* 90% Code Coverage (only 10% of code unused)

Code coverage can be seen by:
* Open Chrome Dev tools
* Command Shift P
* Type Coverage to bring up the Code Coverage utility, select
* Click the refersh icon to run

## Code Splitting

The process of splitting pieces of your code into async chunks at build time.

* The future of web is mobile
* The average mobile website takes 14 seconds to become interactive
* Load Less Code == Interactive Faster

### Types of Code Splitting

* Static
	* "Heavy" Javascript
		* D3, when needed
	* Anything temporal
		* Modal, tooltip, dialog, below the fold
	* Routes
* "Dynamic"
	* _Heavy quotes_ round that.
	* At build time, not technically dynamic.

#### Code Spliiting named exports
Lazy loading is currently for default exports.
Becaue of that we need to access the module we need directly if we can rather than relying on pulling from a hoisted parent instance.

```import {unique} from "loash-es"```

```const getLoashUnique = () >import("loash-es/unique")```

Vendor bundles are an anti pattern. By caching you are only saving the newtwork time needed to get that file. So you're doing yourself few favours optimising for caching, rather than the optimising for the smallest amount of code. This is why commons chunk was removed.

```
const getTheme = themeName =>
	import(`./src/themes/${themeName}`)
```

Chunks for each possible chunk name will be generated at build time.

Can be used for A/B tests, which could normally contribute to unused code.
