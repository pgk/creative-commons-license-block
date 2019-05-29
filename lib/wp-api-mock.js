// Mock out some API responses that Gutenberg expects:

// This should be served up at wp/v2/types/wp_block
exports.typesWPBlock = ( request, response ) => {
    response.setHeader( 'Content-Type', 'application/json' );
  
    // Temporary fix for https://github.com/Automattic/gutenberg-block-kit/issues/1 is to return a 500 error
    // response.end( JSON.stringify( {
    //     "description": "",
    //     "hierarchical": false,
    //     "name": "Blocks",
    //     "slug": "wp_block",
    //     "taxonomies": [],
    //     "rest_base": "blocks",
    //     "viewable": false,
    //     "_links": {}
    // } ) );
  response.status(500);
  response.render( {} )
}

// This should be served up at wp/v2/blocks
exports.blocks = ( request, response ) => {
    response.setHeader( 'Content-Type', 'application/json' );
    response.end( JSON.stringify( [] ) );
}