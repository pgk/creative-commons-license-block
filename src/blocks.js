/* global wp */
const { 
  data: { dispatch, select }, 
  blocks: { createBlock, getBlockContent, getBlockTypes } 
} = wp;

// Load our custom blocks
import './common.scss';
import './block/block.js';

// Get a list of blocks whose names do not start with "core" (core/, core-embed/…)
const glitchBlocks = getBlockTypes().filter( b => ! b.name.startsWith( 'core' ) );

// Add our custom blocks to the editor, so they show on reload
let htmlPreview = '';
glitchBlocks.forEach( b => {
  const block = createBlock( b.name, {} );
  dispatch( 'core/editor' ).insertBlock( block );
  dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );
  htmlPreview += getBlockContent( block );
} );

document.querySelector( '#preview' ).innerHTML = htmlPreview;
