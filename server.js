// server.js
// where your node app starts

// init project
const app = require( 'express' )();
const Parcel = require( 'parcel-bundler' );
const parcel = new Parcel( 'src/index.html', { contentHash: false } );

const plugin = require( './lib/plugin' );

// http://expressjs.com/en/starter/basic-routing.html

// Mock out some API responses that Gutenberg expects:
app.get( '/wp/v2/types/wp_block', function( request, response) {
    response.setHeader( 'Content-Type', 'application/json' );
    response.end( JSON.stringify( {
      "capabilities": { },
      "description": "",
      "hierarchical": false,
      "labels": {},
      "name": "Blocks",
      "slug": "wp_block",
      "taxonomies": [],
      "rest_base": "blocks",
      "supports": {},
      "viewable": false,
      "_links": {}
  } ) );
} );

app.get( '/wp/v2/blocks', function( request, response) {
    response.setHeader( 'Content-Type', 'application/json' );
    response.end( JSON.stringify( {
    content: '<!-- cgb/block-my-block -->↵<div class="wp-block-cgb-block-my-block"><p>— Hello from the frontend.</p><p>CGB BLOCK: <code>my-block</code> is a new Gutenberg block.</p><p>It was created via <code><a href="https://github.com/ahmadawais/create-guten-block">create-guten-block</a></code>.</p></div><!-- /cgb/block-my-block -->',
    id: 42,
    title: "Guten Tag You're It",
  } ) );
} );

// // Package up a plugin zip file
// function collectFiles( bundle, files = new Set() ) {
//   files.add( bundle.name );
//   bundle.childBundles.forEach( child => collectFiles( child, files ) );
//   return files;
// }

// app.get( '/plugin.zip', function ( request, response ) {
//   response.attachment( 'plugin.zip' ); // force download

//   parcel.bundle()
//   .then( ( bundle ) => {
//     const files = collectFiles( bundle );
//     files.delete( bundle.name ); // Remove our index.html entry point
//     console.log( Array.from( files ) );

//     const zipFile = archiver( 'zip' );
//     zipFile.directory( 'dist', 'plugin/dist' );
//     zipFile.pipe( response );
//     zipFile.finalize();
//   } )
//   .catch( () => response.sendStatus( 500 ) )
// } );

// Send remaining requests to parcel
app.use( parcel.middleware() );

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
