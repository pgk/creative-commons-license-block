const { basename } = require( 'path' );
const archiver = require( 'archiver' );
const Mustache = require( 'mustache' );
const { readFileSync } = require( 'fs' );

// Walk the bundle tree to collect all the files
function collectFiles( bundle, files = new Set() ) {
  files.add( bundle.name );
  bundle.childBundles.forEach( child => collectFiles( child, files ) );
  return files;
}

// Make a reasonable plugin name
const normalizePluginName = ( name = 'block-plugin' ) => name.toLocaleLowerCase()
  .replace( ' ', '-' )
  .replace( /[^a-z0-9\-]/, '' );
  
// Request handler that will generate the plugin
// Needs a parcel-bundler to work
module.exports = ( parcel ) => ( request, response ) => {
  const pluginName = normalizePluginName( request.query.name );
  
  response.attachment( `${pluginName}.zip` ); // force download
  const zipFile = archiver( 'zip' );
  zipFile.pipe( response );
  
  const pluginPhp = Mustache.render( readFileSync( './helpers/plugin.php.mustache', 'utf8' ), { pluginName } );
  console.log( pluginPhp );
  

  // One Promise for our Parcel bundle
  const parcelPromise = parcel.bundle()
  .then( ( bundle ) => {

    const files = collectFiles( bundle );
    files.delete( bundle.name ); // Remove our index.html entry point
    
    files.forEach( fileName => {
      zipFile.file( fileName, { name: `${pluginName}/${basename( fileName )}` } );
    } );
    zipFile.file( 'helpers/plugin.php', { name: `${pluginName}/${pluginName}.php` } );
    
    zipFile.finalize();
  } )
  .catch( ( e ) => {
    console.error( e );
    response.sendStatus( 500 );
  } )
}
