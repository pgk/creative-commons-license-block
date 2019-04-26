// Mock out some API responses that Gutenberg expects:

// This should be served up at wp/v2/types/wp_block
exports.typesWPBlock = ( request, response ) => {
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
}

// This should be served up at wp/v2/blocks
exports.blocks = ( request, response ) => {
    response.setHeader( 'Content-Type', 'application/json' );
    response.end( JSON.stringify( {
      content: '<!-- cgb/block-my-block -->↵<div class="wp-block-cgb-block-my-block"><p>— Hello from the frontend.</p><p>CGB BLOCK: <code>my-block</code> is a new Gutenberg block.</p><p>It was created via <code><a href="https://github.com/ahmadawais/create-guten-block">create-guten-block</a></code>.</p></div><!-- /cgb/block-my-block -->',
      id: 42,
      title: "Guten Tag You're It",
    } ) );
}