// server.js
// where your node app starts

// init project
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Mock out some API responses
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

// Proxy requests to parcel server
app.use( '/proxy', proxy( 'localhost:1234' ) );
app.use( '/', proxy( 'localhost:1234' ) );

// Serve up cgb dist files
app.use( '/dist', express.static('dist'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
