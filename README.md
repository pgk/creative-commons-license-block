Gutenberg Block Kit
===================

The fastest way to get started building blocks for the Gutenberg block editor. 
Develop your block, see live updates as you code, then download your block as 
a WordPress plugin.

![Gutenberg Block Kit Logo](https://cdn.glitch.com/d2032613-1317-456e-be8e-bc0af5fd945c%2Fblock-kit-logo.svg?1557824541477)

Getting Started
---------------

[Remix this project](https://glitch.com/edit/#!/remix/gutenberg-block-kit)
to get an editable version of the code here.

Open `src/block.js` from the file list on the left side, and start making 
changes. Your changes will show up on your project site as you make them.

Going Further
-------------

- [Learn more about making Gutenberg blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/)
- Download your block as a WordPress plugin and try it out on your own site

Files
-----

- `src/block.js` - This is the JavaScript for our custom block
- `src/editor.scss` - A Sass stylesheet for the editor view of the block
- `src/style.scss` - A Sass stylesheet for the published version of the block
- `src/common.scss` - A place to put things used by both `editor.scss` and `style.scss`
- `src/index.html` - The entry point for ParcelJS, this is what you see in your browser when developing
- `src/index.js` - This creates the Gutenberg block editor and adds our block to the page
- `src/index.scss` - Styles for the Gutenberg block editor page
- `server.js` - This loads up the web server and then lets ParcelJS serve up our live-reloading environment
- `plugin/*` - These files get added to the plugin ZIP file. Anything you add here should show up in the download
- `lib/*` - These are helpers for `server.js` to build the plugin and serve up API calls
- `gutenberg.js` - This can be used to generate all the Gutenberg packages available on `window.wp`