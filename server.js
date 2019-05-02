// server.js
// where your node app starts

// init project
const app = require( 'express' )();
const Parcel = require( 'parcel-bundler' );
const parcel = new Parcel( './src/index.html', { contentHash: false, outDir: './.dist' } );

const pluginMaker = require( './lib/plugin-maker' );
const apiMock = require( './lib/wp-api-mock' );

// http://expressjs.com/en/starter/basic-routing.html

// Mock out some API responses that Gutenberg expects:
app.get( '/wp/v2/types/wp_block', apiMock.typesWPBlock );
app.get( '/wp/v2/blocks', apiMock.blocks );

// Serve up the block as a WP Plugin
app.get( '/:namespace/:name.zip', pluginMaker( parcel ) );

// Send remaining requests to parcel
app.use( parcel.middleware() );

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
} );
