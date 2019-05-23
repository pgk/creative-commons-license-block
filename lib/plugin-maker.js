const archiver = require( 'archiver' );
const Mustache = require( 'mustache' );
const { readFileSync, readdirSync } = require( 'fs' );
const { basename, extname } = require( 'path' );

// Walk the bundle tree to collect all the files
function collectFiles( bundle, files = new Set() ) {
  files.add( bundle.name );
  bundle.childBundles.forEach( child => collectFiles( child, files ) );
  return files;
}

// Make a reasonable plugin name
const normalizePluginName = ( name = 'block-plugin' ) => name.toLocaleLowerCase()
  .replace( /[ \/-]/g, '_' ) // replace space, /, or - with _
  .replace( /[^a-z0-9_]/g, '' ); // leave only alphanumerics and _

// Remove Parcel's content hashes
const removeContentHash = ( hashedPath ) => {
  const fileName = basename( hashedPath );
  let ext = extname( fileName );
  
  // Better off leaving sourcemaps as-is
  if ( '.map' === ext ) {
    return fileName;
  }
  
  // split on the . then remove the last two (extension and hash) then re-add the .ext
  return fileName.split( '.' ).slice( 0, -2 ).join( '.' ) + ext;
}
  
// Request handler that will generate the plugin. It uses a route like /:namespace/:name.zip
// to pass the block name here from the front-end.
// Needs a parcel-bundler to work, so that's the first parameter
module.exports = ( parcel ) => ( request, response ) => {
  const { params } = request;
  const pluginName = normalizePluginName( params.namespace + '_' + params.name );
  
  response.attachment( `${pluginName}.zip` ); // force download
  const zipFile = archiver( 'zip' );
  zipFile.pipe( response );
  
  // Add everything in the plugin dir _EXCEPT_ our plugin.php
  readdirSync( './plugin', { encoding: 'utf8' } )
    .filter( f => f !== 'plugin.php.mustache' )
    .forEach( f => zipFile.file( f, { name: `${pluginName}/${f}` } ) );
  
  // Make a special PHP file for our plugin
  const pluginPhp = Mustache.render( readFileSync( './plugin/plugin.php.mustache', 'utf8' ), { pluginName } );
  zipFile.append( pluginPhp, { name: `${pluginName}/${pluginName}.php` } );
  
  // Add source files to continue developing
  zipFile.directory( 'src/', `${pluginName}/src`);

  // Make sure we have everything fully built
  parcel.bundle()
  .then( ( bundle ) => {
    const files = collectFiles( bundle );
    files.delete( bundle.name ); // Remove our index.html entry point
    
    files.forEach( fileName => {
      zipFile.file( fileName, { name: `${pluginName}/dist/${removeContentHash( fileName )}` } );
    } );
    
    zipFile.finalize();
  } )
  .catch( ( e ) => {
    console.error( e );
    response.sendStatus( 500 );
  } )
}
