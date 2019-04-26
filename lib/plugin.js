const { basename } = require( 'path' );
const archiver = require( 'archiver' );


// Walk the bundle tree to collect all the files
function collectFiles( bundle, files = new Set() ) {
  files.add( bundle.name );
  bundle.childBundles.forEach( child => collectFiles( child, files ) );
  return files;
}

// Request handler that will generate the plugin
module.exports = ( parcel ) => ( request, response ) => {
  response.attachment( 'plugin.zip' ); // force download

  parcel.bundle()
  .then( ( bundle ) => {
    const zipFile = archiver( 'zip' );
    zipFile.pipe( response );

    const files = collectFiles( bundle );
    files.delete( bundle.name ); // Remove our index.html entry point
    
    files.forEach( fileName => {
      zipFile.file( fileName, { name: basename( fileName ) } );
    } );
    zipFile.file( 'helpers/plugin.php', { name: 'plugin.php' } );
    
    zipFile.finalize();
  } )
  .catch( () => response.sendStatus( 500 ) )
}
