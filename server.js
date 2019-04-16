// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Serve up cgb dist files
app.use( '/dist', express.static('dist'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

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
    content: "<!-- wp:paragraph -->↵    <p>3</p>↵    <!-- /wp:paragraph -->",
    id: 42,
    title: "Guten Tag You're It",
  } ) );
} );

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
