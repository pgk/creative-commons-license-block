const archiver = require( 'archiver' );


// Package up a plugin zip file
function collectFiles( bundle, files = new Set() ) {
  files.add( bundle.name );
  bundle.childBundles.forEach( child => collectFiles( child, files ) );
  return files;
}

// Middleware to generate the plugin
export const middleware = ( parcel ) => ( request, response, next ) => {
  response.attachment( 'plugin.zip' ); // force download

  parcel.bundle()
  .then( ( bundle ) => {
    const files = collectFiles( bundle );
    files.delete( bundle.name ); // Remove our index.html entry point
    console.log( Array.from( files ) );

    const zipFile = archiver( 'zip' );
    zipFile.directory( 'dist', 'plugin/dist' );
    zipFile.pipe( response );
    zipFile.finalize();
  } )
  .catch( () => response.sendStatus( 500 ) )
}
