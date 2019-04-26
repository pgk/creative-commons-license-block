// server.js
// where your node app starts

// init project
const app = require( 'express' )();
const Parcel = require( 'parcel-bundler' );
const parcel = new Parcel( 'src/index.html', { contentHash: false } );

const plugin = require( './lib/plugin' );
const apiMock = require( './lib/wp-api-mock' );

// http://expressjs.com/en/starter/basic-routing.html

// Mock out some API responses that Gutenberg expects:
app.use( '/wp/v2/:path', apiMock );

// Serve up a plugin ZIP file
app.use( '/plugin.zip', plugin.middleware( parcel ) );

// Send remaining requests to parcel
app.use( parcel.middleware() );

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
