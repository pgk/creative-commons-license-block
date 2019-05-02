Gutenberg Block Kit
===================

This is a minimal Gutenberg block development environment for Glitch. We 
want to get you up and running as fast as possible so that you can turn
your idea into a block.

Getting Started
---------------

You will want to [remix this project](https://glitch.com/edit/#!/remix/gutenberg-block-kit)
to get an editable version of the code here. After you click the [remix
this project](https://glitch.com/edit/#!/remix/gutenberg-block-kit) link, 
use the Show link at the top of the editor to see your new block.

Now you click on `src/block.js` on the file list on the left side, and 
start making changes. You should quickly see your changes as the editor
window updates.

Going Further
-------------

- [Learn more about making Gutenberg blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/)
- Download your block as a WordPress plugin and try it out on your own site

Files
-----

- `server.js` - This loads up the web server and then lets ParcelJS serve up our live-reloading environment
- `src/block.js` - This is the JavaScript for our custom block
- `src/index.js` - This creates the Gutenberg editor and adds our block to the page
- `src/editor.scss` - A Sass stylesheet for the editor view of the block
- `src/style.scss` - A Sass stylesheet for the published version of the block
- `src/common.scss` - A place to put things used by both `editor.scss` and `style.scss`
- `src/index.html` - The entry point for ParcelJS, this is what you see in your browser when developing
- `plugin/*` - These files get added to the plugin ZIP file
- `lib/*` - These are helpers for `server.js` to build the plugin and serve up API calls
